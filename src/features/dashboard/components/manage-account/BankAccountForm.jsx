import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { filterEmptyKeys } from "../../../../utils/helper";
import InputField from "../../../../ui/form-elements/InputField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";
import useGetOrganizationInfo from "../../../../hooks/user/useGetOrganizationInfo";

const BankAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { data: organization } = useGetOrganizationInfo();

  useEffect(() => {
    setFormData({
      bank_name: organization?.bank_name || "",
      account_name: organization?.account_name || "",
      account_number: organization?.account_number || "",
      iban: organization?.iban || ""
    });
  }, [organization]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const filteredData = filterEmptyKeys(formData);
      const res = await axiosInstance.put(
        "/organization/update_organization_info",
        filteredData
      );
      if (res) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg_white_card">
      <form className="form_ui" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 p-2">
            <h6 className="form_title">Bank Account</h6>
          </div>
          <div className="col-12 p-2">
            <InputField
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
            <InputField
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
            <InputField
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
            <InputField
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
            <SubmitButton name={"Save"} loading={loading} className={"mt-3"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankAccountForm;
