import React, { useEffect, useState } from "react";
import PageHeader from "../layout/PageHeader";
import deleteIcon from "../../../assets/images/delete.svg";
import editIcon from "../../../assets/images/edit.svg";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import DeleteModal from "../layout/DeleteModal";
import { removePermissionGroup } from "../../../redux/slices/permissionsGroups";
import axios from "./../../../util/axios";

const Permissions = () => {
  const [row, setRow] = useState({});
  const [tableData, setTableData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextLink, setNextLink] = useState(null);
  const [previousLink, setPreviousLink] = useState(null);
  const fetchTableData = async () => {
    try {
      const response = await axios.get("/groups/");
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

  // Actions ui
  const actionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button onClick={() => deleteRow(rowData)}>
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Button onClick={() => editRow(rowData)}>
          <img src={editIcon} alt="edit" />
        </Button>
      </div>
    );
  };
  // edit and delete
  const editRow = (rowData) => {
    navigate(`/dashboard/invite-user/edit-permissions/${rowData.id}`);
  };

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setRow(rowData);
  };

  return (
    <React.Fragment>
      <section className="section-main-content">
        <header className="flex-header">
          <PageHeader />
        </header>
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="card_header">
                <h3>Permissions</h3>
                <div className="buttons">
                  <Link
                    to="/dashboard/invite-user/permissions/create-permissions"
                    className="button"
                  >
                    Create Permissions
                  </Link>
                </div>
              </div>
              <div className="table-container">
                <DataTable value={tableData}>
                  <Column field="name" header="Permission Name" />
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
        endPoint="groups"
        tableData={tableData}
        setTableData={setTableData}
        totalRecords={totalRecords}
        showDeleteModal={showDeleteModal}
        setTotalRecords={setTotalRecords}
        setShowDeleteModal={setShowDeleteModal}
      />
    </React.Fragment>
  );
};

export default Permissions;
