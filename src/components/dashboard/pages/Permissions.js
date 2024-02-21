import React, { useEffect, useState } from "react";
import PageHeader from "../layout/PageHeader";
import deleteIcon from "../../../assets/images/delete.svg";
import editIcon from "../../../assets/images/edit.svg";
import DeleteGroupModal from "./../layout/DeleteGroupModal";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";

const Permissions = () => {
  const [row, setRow] = useState({});
  const [tableData, setTableData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const groups = useSelector(
    (state) => state.permissionsGroups.permissionsGroups
  );
  useEffect(() => {
    setTableData(groups);
  }, [groups]);

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
      <PageHeader />
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
        </div>
      </div>
      <DeleteGroupModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        row={row}
      />
    </React.Fragment>
  );
};

export default Permissions;
