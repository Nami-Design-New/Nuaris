import axios from "./../../../utils/axios";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authedUser";

import invite from "../../../assets/images/icons/inviteUser.svg";
import manage from "../../../assets/images/icons/manageAccount.svg";
import addAcc from "../../../assets/images/icons/addAcc.svg";
import logoutIcon from "../../../assets/images/icons/logout.svg";
import fav from "../../../assets/images/fav.svg";
import editIcon from "../../../assets/images/icons/editIcon.svg";

export default function ProfileMenu({
  profileDropDown,
  user,
  subUsers,
  setProfileDropDown
}) {
  const dropdownRef = useRef(null);
  const multiAccounts = subUsers?.length > 1;
  const filteredSubUsers = subUsers?.filter((u) => {
    return u.role !== user.current_role && u.role;
  });
  const dispatch = useDispatch();

  async function handleSwitch(subUserRole) {
    const res = await axios.post(`/users/${user.id}/switch-role/`, {
      role: subUserRole
    });
    console.log("switch role =>", res);
    dispatch(logout());
    window.location.pathname = "/dashboard";
  }

  const variants = {
    open: {
      opacity: 1,
      height: "max-content"
    },
    closed: {
      opacity: 0,
      height: 0
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const isDropdownButton = event.target.closest(".dropdownButton");
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !isDropdownButton
      ) {
        setProfileDropDown(false);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setProfileDropDown, dropdownRef]);

  return (
    <motion.div
      variants={variants}
      initial="closed"
      animate={profileDropDown ? "open" : "closed"}
      className={`profile_dropdown`}
      ref={dropdownRef}
    >
      {/* authed user */}
      <div className="account_owner">
        <div className="avatar">
          <img src={user && user.logo ? user.logo : fav} alt="avatar" />
          <Link className="edit">
            <img src={editIcon} alt="edit" />
          </Link>
        </div>
        <div className="account_welcoming">
          <h6>{`Hi , ${
            user && user.commercial_name
              ? user.commercial_name
              : " Amwaj Al Bahar"
          }`}</h6>
          <span>{user && user.email ? user.email : "mail@mail.com"}</span>
        </div>
      </div>
      {/* manage and invite links */}
      <div className="manage_invite">
        <div className="link" onClick={() => setProfileDropDown(false)}>
          <img src={invite} alt="invite-user" />
          <Link to="/dashboard/invite-user">
            invite user ( employee ) / Permissions
          </Link>
        </div>
        <div className="link" onClick={() => setProfileDropDown(false)}>
          <img src={manage} alt="manage-account" />
          <Link to="/dashboard/manage-account">Manage Your Nuaris Account</Link>
        </div>
      </div>
      {/* switch users */}
      <div className="select_frame">
        {multiAccounts && (
          <div className="accounts">
            {filteredSubUsers.map((subUser, index) => (
              <button
                onClick={() => handleSwitch(subUser.role)}
                className="acc align-items-center"
                key={index}
              >
                <div className="avatar">
                  {/* TODO: Change image to be parent image || ask for adding an image to the subuser model */}
                  <img src={!subUser?.logo ? subUser.logo : fav} alt="avatar" />
                </div>
                <div className="type_mail">
                  <h6>{`${subUser.role ? subUser.role : "Admin"} User`}</h6>
                  <span>{subUser.email}</span>
                </div>
              </button>
            ))}
          </div>
        )}
        <div className="manage_invite">
          <div className="link ps-2">
            <img src={addAcc} alt="add-account" />
            <Link to="/register">Add a new account</Link>
          </div>
          {multiAccounts ? (
            <div className="link ps-2">
              <img src={logoutIcon} alt="logout" />
              <Link to={"/logout"}>Logout from all accounts</Link>
            </div>
          ) : (
            <div className="link ps-2">
              <img src={logoutIcon} alt="logout" />
              <Link to={"/logout"}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
