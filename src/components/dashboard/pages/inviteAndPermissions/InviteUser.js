import React, { useState, useEffect } from "react";
import axios from "../../../../util/axios";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import deleteIcon from "../../../../assets/images/delete.svg";
import editIcon from "../../../../assets/images/edit.svg";
import PageHeader from "../../layout/PageHeader";
import CustomPagination from "../../../ui/CustomPagination";
import TableLoader from "../../../ui/TableLoader";
import DeleteModal from "../../../ui/DeleteModal";

const InviteUser = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [employeesData, setEmployeesData] = useState([]);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [row, setRow] = useState({});
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;

  useEffect(() => {
    try {
      axios
        .get(`/employees/?sub_user=${subUser}`, {
          params: {
            page: currentPage
          }
        })
        .then((res) => {
          setEmployeesCount(res?.data?.count);
          setEmployeesData(res?.data?.results);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [currentPage, subUser]);

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

  const deleteEmployee = () => {
    setShowDeleteModal(false);
    axios
      .delete(`/employees/${row.id}/`, { data: { sub_user: subUser } })
      .then(() => {
        setEmployeesData((prevData) =>
          prevData.filter((employee) => employee.id !== row.id)
        );
        if (employeesData.length === 1 && currentPage > 1) {
          const newPage = parseInt(currentPage) - 1;
          searchParams.set("page", newPage.toString());
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${searchParams.toString()}`
          );
        }
        setEmployeesCount((prevCount) => prevCount - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const groupsNamesTemplate = (rowData) => {
    if (rowData?.group_names?.length === 0) {
      return "-";
    }
    return rowData?.group_names?.map((group) => group).join(", ");
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
              {loading ? (
                <TableLoader />
              ) : (
                <div className="table-container">
                  <DataTable value={employeesData}>
                    <Column
                      body={(rowData) =>
                        `${rowData.first_name} ${rowData.last_name}`
                      }
                      header="Name"
                    />
                    <Column field="position_name" header="Position" />
                    <Column field="phone_number" header="Phone number" />
                    <Column
                      body={groupsNamesTemplate}
                      header="Permission Groups Name"
                    />
                    <Column header="Actions" body={actionTemplate} />
                  </DataTable>
                  {employeesCount > 0 && (
                    <CustomPagination count={employeesCount} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        onConfirm={deleteEmployee}
        DeletionTarget={row.first_name + " " + row.last_name}
      />
    </React.Fragment>
  );
};

export default InviteUser;
