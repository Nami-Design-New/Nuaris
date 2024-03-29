import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactFlagsSelect from "react-flags-select";
import axios from "../../../util/axios";
import PageHeader from "../layout/PageHeader";
import AssignGroup from "../layout/AssignGroup";
import NameField from "../../ui/form-elements/NameField";
import InputField from "../../ui/form-elements/InputField";
import PhoneField from "../../ui/form-elements/PhoneField";
import SubmitButton from "../../ui/form-elements/SubmitButton";

const CreateUser = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({ nationality: "SA" });
  const [loading, setLoading] = useState(false);
  const [showAssignGroups, setShowAssignGroups] = useState(false);
  const [invitedUserId, setInvitedUserId] = useState(null);
  const positions = useSelector((state) => state.positions.positions);
  const user = useSelector((state) => state.user?.user);
  const subUserSet = user?.subuser_set;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.position) {
      toast.error("Please select a position");
      setLoading(false);
      return;
    }
    if (formData.phone_number?.length > 15) {
      toast.error("Please enter a valid phone number");
      setLoading(false);
      return;
    }
    try {
      const subUser = subUserSet?.filter((u) => u.role === user.current_role);
      if (!subUser) {
        throw new Error("No matching sub user found");
      }
      const response = await axios.post("/users/invite-user/", {
        ...formData,
        parent: subUser[0]?.id
      });
      if (response?.status === 201 || response?.status === 200) {
        toast.success("Invitation sent successfully");
        setShowAssignGroups(true);
        setInvitedUserId(response?.data?.employee?.id);
      } else {
        toast.error(
          "User with this phone number already exists, check your email if you want to override the phone number."
        );
      }
    } catch (error) {
      console.log("error =>", error);
      toast.error("An error occurred while sending the invitation");
    } finally {
      setLoading(false);
    }
  };
  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
    setFormData((prevFormData) => ({ ...prevFormData, nationality: code }));
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Create a User" hint="(employee)" />
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <form onSubmit={handleSubmit} className="row m-0 form-ui">
              <div className="col-lg-4  col-12 p-2">
                <NameField formData={formData} setFormData={setFormData} />
              </div>
              <div className="col-lg-4  col-12 p-2">
                <div className="input-field">
                  <label htmlFor="positions">Positions</label>
                  <select
                    defaultValue={"select"}
                    name="positions"
                    id="positions"
                    required
                    onChange={(e) => {
                      const selectedOptionId =
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "id"
                        );
                      setFormData({
                        ...formData,
                        position: Number(selectedOptionId)
                      });
                    }}
                  >
                    <option value="select" disabled>
                      Select
                    </option>
                    {positions?.results?.map((option) => (
                      <option
                        key={option.id}
                        id={option.id}
                        value={option.name}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-4  col-12 p-2">
                <div className="input-field">
                  <label htmlFor="Nationality">Nationality</label>
                  <ReactFlagsSelect
                    searchable={true}
                    selectedSize={false}
                    onSelect={handleCountrySelect}
                    selected={selectedCountry || "SA"}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  htmlFor="email"
                  label="Email Address"
                  placeholder="EX: mail@mail.com"
                  type="email"
                  id="email"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="col-lg-6 col-12 p-2">
                <PhoneField
                  formData={formData}
                  setFormData={setFormData}
                  id="phone_number"
                />
              </div>
              <div className="col-12 p-2 d-flex justify-content-end">
                <SubmitButton
                  loading={loading}
                  name="Create"
                  className="w-25"
                />
              </div>
            </form>
          </div>
        </div>
        {showAssignGroups && <AssignGroup invitedUserId={invitedUserId} />}
      </div>
    </section>
  );
};

export default CreateUser;
