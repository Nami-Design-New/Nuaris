import React from "react";
import PageHeader from "../layout/PageHeader";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Permissions = () => {
  const backLinks = [
    { name: "Dashboard", to: "/host-dashboard" },
    { name: "Invite User", to: "/host-dashboard/invite-user" },
  ];
  const staticData = [
    { id: 1, name: "John Doe", age: 30, city: "New York" },
    { id: 2, name: "Jane Smith", age: 25, city: "Los Angeles" },
    { id: 3, name: "Michael Johnson", age: 35, city: "Chicago" },
    { id: 4, name: "Emily Davis", age: 28, city: "San Francisco" },
    { id: 5, name: "William Brown", age: 32, city: "Seattle" },
  ];
  return (
    <React.Fragment>
      <PageHeader name="Permissions" backLinks={backLinks} />
      <div className="inner_card">
        <div className="card_header">
          <h3>Permissions</h3>
          <div className="buttons">
            <Link
              to="/host-dashboard/invite-user/permissions/create-permissions"
              className="boton"
            >
              Create Permissions
            </Link>
          </div>
        </div>
        <div className="table-container">
          <DataTable value={staticData}>
            <Column field="username" header="User Name" sortable={true}/>
            <Column field="position" header="Position" />
            <Column field="age" header="Age" />
            <Column field="city" header="City" />
          </DataTable>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Permissions;
