import React, { useRef, useState } from "react";
import PageHeader from "../layout/PageHeader";
import InputField from "../../ui/form-elements/InputField";
import { useSelector } from "react-redux";
import axios from "../../../util/axios";
import { toast } from "react-toastify";

import SubmitButton from "./../../ui/form-elements/SubmitButton";
import CheckField from "../../ui/form-elements/CheckField";

const CreatePermission = () => {
  const formRef = useRef(null);
  const permissions = useSelector(
    (state) => state.permissions.permissions?.results
  );

  const [formData, setFormData] = useState({ permissions: [] });
  const [loading, setLoading] = useState(false);

  const handleAddPermission = (e, passedPermission) => {
    const checked = e.target.checked;
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, passedPermission]
      });
    } else {
      const filteredPermessions = formData.permissions.filter(
        (permission) => permission.id !== passedPermission.id
      );
      setFormData({ ...formData, permissions: filteredPermessions });
    }
  };

  const requestOptions = {
    method: "POST",
    url: "/groups/",
    data: formData
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.request(requestOptions);
      if (response.status === 201 || response.status === 200) {
        toast.success(
          `${formData.name} permissions group Created Successfully`
        );
        formRef.current.reset();
      } else {
        toast.error("group with this name already exists.");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Create Permissions" />
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <form
              className="row m-0 form-ui"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="col-12 p-2 mb-2">
                <InputField
                  htmlFor="name"
                  label="Group & Permissions Name"
                  id="groupOfPermissionsName"
                  placeholder="Write Here"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="col-12 p-2">
                <h6 className="simiLabel">
                  Choose permissions to assign to group
                </h6>
              </div>
              {permissions?.map((p) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={p.id}>
                  <CheckField
                    label={p.codename}
                    name={p.name}
                    id={p.id}
                    onChange={(e) => handleAddPermission(e, p)}
                  />
                </div>
              ))}
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
      </div>
    </section>
  );
};

export default CreatePermission;
