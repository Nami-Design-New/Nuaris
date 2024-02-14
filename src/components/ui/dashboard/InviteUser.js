import React from "react";
import PageHeader from "./PageHeader";
import { Link } from "react-router-dom";

const InviteUser = () => {
  const backLinks = [{ name: "Dashboard", to: "/host-dashboard" }];

  return (
    <React.Fragment>
      <PageHeader name="invite user" backLinks={backLinks} />
      <div className="inner_card">
        <div className="card_header">
          <h3>Users (employee) / Permissions</h3>
          <div className="buttons">
            <Link
              to="/host-dashboard/permissions"
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
      </div>
    </React.Fragment>
  );
};

export default InviteUser;
