import React, { useEffect, useState } from "react";
import PageHeader from "../layout/PageHeader";
import deleteIcon from "../../../assets/images/delete.svg";
import editIcon from "../../../assets/images/edit.svg";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import DeleteGroupModal from "./../layout/DeleteGroupModal";

const InviteUser = () => {
  const [tableData, setTableData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const allUsers = useSelector(state => state.allUsers.allUsers);
  const backLinks = [{ name: "Dashboard", to: "/host-dashboard" }];

  useEffect(
    () => {
      setTableData(allUsers);
    },
    [allUsers]
  );

  // Actions ui
  const actionTemplate = rowData => {
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
  const editRow = rowData => {
    console.log("Editing row:", rowData);
  };
  const deleteRow = rowData => {
    setShowDeleteModal(true);
    console.log("Deleting row:", rowData);
  };

  return (
    <React.Fragment>
      <PageHeader name="invite user" backLinks={backLinks} />
      <div className="inner_card">
        <div className="card_header">
          <h3>Users (employee) / Permissions</h3>
          <div className="buttons">
            <Link
              to="/host-dashboard/invite-user/permissions"
              className="boton transparent"
            >
              Create New Group Permissions
            </Link>
            <Link
              to="/host-dashboard/invite-user/create-user"
              className="boton"
            >
              Create a User (employee)
            </Link>
          </div>
        </div>
        <div className="table-container">
          <DataTable
            value={tableData}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
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
      <DeleteGroupModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </React.Fragment>
  );
};

export default InviteUser;
