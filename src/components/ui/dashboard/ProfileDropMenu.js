import React from "react";
import { Link } from "react-router-dom";
import invite from "../../../assets/images/inviteUser.svg";
import manage from "../../../assets/images/manageAccount.svg";
import addAcc from "../../../assets/images/addAcc.svg";
import logout from "../../../assets/images/logout.svg";
import fav from "../../../assets/images/fav.svg";
import editIcon from "../../../assets/images/editIcon.svg";

const ProfileDropMenu = ({
  profileDropDown,
  user,
  subUsers,
  setProfileDropDown
}) => {
  return (
    <div className={`profile_dropdown ${profileDropDown ? "open" : ""}`}>
      {/* authed user */}
      <div className="account_owner">
        <div className="avatar">
          <img src={user && user.logo ? user.logo : fav} alt="avatar" />
          <Link className="edit">
            <img src={editIcon} alt="edit" />
          </Link>
        </div>
        <div className="account_welcoming">
          <h6>{`Hi , ${user && user.commercial_name
            ? user.commercial_name
            : " Amwaj Al Bahar"}`}</h6>
          <span>
            {user && user.email ? user.email : "mail@mail.com"}
          </span>
        </div>
      </div>
      {/* manage and invite links */}
      <div className="manage_invite">
        <div className="link" onClick={() => setProfileDropDown(false)}>
          <img src={invite} alt="invite-user" />
          <Link to="/host-dashboard/invite-user">
            invite user ( employee ) / Permissions
          </Link>
        </div>
        <div className="link" onClick={() => setProfileDropDown(false)}>
          <img src={manage} alt="manage-account" />
          <Link to="/host-dashboard/manage-account">
            Manage Your Nuaris Account
          </Link>
        </div>
      </div>
      {/* switch users */}
      <div className="select_frame">
        {subUsers &&
          subUsers.length > 0 &&
          <div className="accounts">
            {subUsers.map((subUser, index) =>
              <div className="acc" key={index}>
                <div className="avatar">
                  <img
                    src={subUser.logo !== null ? subUser.logo : fav}
                    alt="avatar"
                  />
                </div>
                <div className="type_mail">
                  <h6>{`${subUser.role ? subUser.role : "Admin"} User`}</h6>
                  <span>
                    {subUser.email}
                  </span>
                </div>
              </div>
            )}
          </div>}
        <div className="manage_invite">
          <div className="link ps-2">
            <img src={addAcc} alt="add-account" />
            <Link to="/login">Add a new account</Link>
          </div>
          {subUsers &&
            subUsers.length > 0 &&
            <div className="link ps-2">
              <img src={logout} alt="logout" />
              <h6>Logout from all accounts</h6>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropMenu;
