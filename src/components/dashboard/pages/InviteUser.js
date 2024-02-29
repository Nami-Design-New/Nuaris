import React, { useEffect, useState } from "react";
import PageHeader from "../layout/PageHeader";
import deleteIcon from "../../../assets/images/delete.svg";
import editIcon from "../../../assets/images/edit.svg";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import DeleteModal from "../layout/DeleteModal";
import { removeEmployee } from "../../../redux/slices/employeesSlice";


const InviteUser = () => {
  const [row, setRow] = useState({});
  const [tableData, setTableData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const employees = useSelector((state) => state.employees.employees);

  useEffect(() => {
    setTableData(employees);
  }, [employees]);

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
    console.log("Editing row:", rowData);
  };
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
                <DataTable
                  value={tableData}
                  paginator
                  rows={10}
                  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                  currentPageReportTemplate="{first} to {last} of {totalRecords}"
                >
                  <Column field="username" header="User Name" />
                  <Column field="position" header="Position" />
                  <Column field="mobile_number" header="Phone number" />
                  <Column field="groups" header="Permission Groups Name" />
                  <Column header="Actions" body={actionTemplate} />
                </DataTable>
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
