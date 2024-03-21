import React, { useState, useEffect } from "react";
import axios from "./../../../util/axios";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { removeEmployee } from "../../../redux/slices/employeesSlice";
import deleteIcon from "../../../assets/images/delete.svg";
import editIcon from "../../../assets/images/edit.svg";
import PageHeader from "../layout/PageHeader";
import DeleteModal from "../layout/DeleteModal";

const InviteUser = () => {
  const user = useSelector((state) => state.user?.user);
  const subUserSet = user?.subuser_set;
  const subUser = subUserSet?.filter((u) => u.role === user.current_role)[0]
    ?.id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [row, setRow] = useState({});
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextLink, setNextLink] = useState(null);
  const [previousLink, setPreviousLink] = useState(null);

  const fetchTableData = async () => {
    try {
      const response = await axios.get(`/employees/?sub_user=${subUser}`);
      setTotalRecords(response?.data?.count);
      setTableData(response?.data?.results);
      setNextLink(response?.data?.next);
      setPreviousLink(response?.data?.previous);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePagination = async (link) => {
    if (!link) return;
    const response = await axios.get(link);
    setTableData(response?.data?.results);
    setNextLink(response?.data?.next);
    setPreviousLink(response?.data?.previous);
    setCurrentPage((prevPage) => {
      if (link === nextLink) return prevPage + 1;
      if (link === previousLink) return prevPage - 1;
      return prevPage;
    });
  };

  useEffect(() => {
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const entriesPerPage = tableData?.length;
  const startIndex =
    totalRecords === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
  const endIndex =
    totalRecords === 0
      ? 0
      : currentPage === Math.ceil(totalRecords / entriesPerPage)
      ? totalRecords
      : currentPage * entriesPerPage;

  const actionTemplate = (rowData) => (
    <div className="actions_cell">
      <Button onClick={() => deleteRow(rowData)}>
        <img src={deleteIcon} alt="delete" />
      </Button>
      <Link to={`edit-user/${rowData.id}`}>
        <Button>
          <img src={editIcon} alt="edit" />
        </Button>
      </Link>
    </div>
  );

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setRow(rowData);
  };

  return (
    <React.Fragment>
      <section className="section-main-content">
        <header className="flex-header">
          <PageHeader name="Invite user" />
        </header>
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="card_header">
                <h3>Users (employee) / Permissions</h3>
                <div className="buttons">
                  <Link to="permissions" className="button transparent">
                    Create New Group Permissions
                  </Link>
                  <Link to="create-user" className="button">
                    Create a User (employee)
                  </Link>
                </div>
              </div>
              <div className="table-container">
                <DataTable value={tableData}>
                  <Column
                    body={(rowData) =>
                      `${rowData.first_name} ${rowData.last_name}`
                    }
                    header="Name"
                  />
                  <Column field="position" header="Position" />
                  <Column field="phone_number" header="Phone number" />
                  <Column field="group_name" header="Permission Groups Name" />
                  <Column header="Actions" body={actionTemplate} />
                </DataTable>
                <div className="pagination_template">
                  <div className="showing">
                    <p>
                      Showing {startIndex} to {endIndex} of {totalRecords}{" "}
                      entries
                    </p>
                  </div>
                  <div className="pagination_btns">
                    <button
                      className={`paginator_btn ${
                        previousLink ? "" : "disabled"
                      }`}
                      onClick={() => handlePagination(previousLink)}
                    >
                      <i className="fa-regular fa-angle-left"></i>
                    </button>
                    <button
                      className={`paginator_btn ${nextLink ? "" : "disabled"}`}
                      onClick={() => handlePagination(nextLink)}
                    >
                      <i className="fa-regular fa-angle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteModal
        row={row}
        endPoint="users"
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        sliceAction={removeEmployee}
      />
    </React.Fragment>
  );
};

export default InviteUser;
