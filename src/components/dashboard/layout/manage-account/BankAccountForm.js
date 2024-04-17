import React, { useEffect, useState } from "react";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const BankAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user);

  const [formData, setFormData] = useState({
    bank_name: "",
    account_name: "",
    account_number: "",
    iban: "",
    user: user.id
  });

  useEffect(() => {
    if (user?.bankdetail?.length !== 0) {
      setFormData({
        bank_name: user?.bankdetail[0]?.bank_name || "",
        account_name: user?.bankdetail[0]?.account_name || "",
        account_number: user?.bankdetail[0]?.account_number || "",
        iban: user?.bankdetail[0]?.iban || ""
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestOptions = {
      method: user?.bankdetail?.length !== 0 ? "PATCH" : "POST",
      url:
        user?.bankdetail?.length !== 0
          ? `/bank-details/${user?.bankdetail[0]?.id}/`
          : "/bank-details/",
      data: formData
    };

    try {
      const response = await axios.request(requestOptions);
      if (response.status === 201 || response.status === 200) {
        user?.bankdetail?.length !== 0
          ? toast.success("Bank account updated successfully")
          : toast.success("Bank account added successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg_white_card">
      <form onSubmit={handleSubmit} className="form-ui">
        <div className="row m-0">
          <div className="col-12 p-2">
            <h6 className="form_title">Bank Account</h6>
          </div>
          <div className="col-12 p-2">
            <CustomInputField
              label={"Bank Name"}
              id="bank_name"
              name="bank_name"
              placeholder="write here"
              value={formData.bank_name}
              onChange={(e) =>
                setFormData({ ...formData, bank_name: e.target.value })
              }
            />
          </div>
          <div className="col-12 p-2">
            <CustomInputField
              label={"Account Holder's Name"}
              id="holder_name"
              name="holder_name"
              placeholder="write here"
              value={formData.account_name}
              onChange={(e) =>
                setFormData({ ...formData, account_name: e.target.value })
              }
            />
          </div>
          <div className="col-12 p-2">
            <CustomInputField
              label={"Bank account number"}
              id="account_number"
              name="account_number"
              type="number"
              placeholder="write here"
              value={formData.account_number}
              onChange={(e) =>
                setFormData({ ...formData, account_number: e.target.value })
              }
            />
          </div>
          <div className="col-12 p-2">
            <CustomInputField
              label={"IBAN Number"}
              tyoe="number"
              id="account_number"
              name="account_number"
              placeholder="write here"
              value={formData.iban}
              onChange={(e) =>
                setFormData({ ...formData, iban: e.target.value })
              }
            />
          </div>
          <div className="col-12 p-2">
            <SubmitButton name={"Save"} loading={loading} className={"mt-2"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankAccountForm;
