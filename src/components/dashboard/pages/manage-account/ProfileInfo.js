import React from "react";
import ProfileInfoForm from "../../layout/manage-account/ProfileInfoForm";
import BankAccountForm from "../../layout/manage-account/BankAccountForm";
import LanguageSwitcher from "../../layout/manage-account/LanguageSwitcher";

const ProfileInfo = () => {
  return (
    <div className="profile_info_wrapper">
      <ProfileInfoForm />
      <BankAccountForm />
      <LanguageSwitcher />
    </div>
  );
};

export default ProfileInfo;
