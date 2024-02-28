import React, { useState, useEffect } from "react";
import PageHeader from "../layout/PageHeader";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import CheckField from "../../ui/form-elements/CheckField";

const EditPermissions = () => {
  const [formData, setFormData] = useState({ name: "", permissions: [] });
  const [permissionMap, setPermissionMap] = useState([]);
  const [loading, setLoading] = useState(false);

  const { permissionId } = useParams();
  const permissions = useSelector((state) => state.permissions.permissions);
  const permissionsGroups = useSelector(
    (state) => state.permissionsGroups.permissionsGroups
  );

  useEffect(() => {
    const permissionsGroup = permissionsGroups.find(
      (p) => p.id === parseInt(permissionId)
    );
    if (permissionsGroup) {
      const permissionMap = permissionsGroup.permissions.reduce((acc, perm) => {
        acc[perm.id] = true;
        return acc;
      }, {});
      setPermissionMap(permissionMap);
      setFormData({
        name: permissionsGroup.name,
        permissions: permissionsGroup.permissions,
      });
    }
  }, [permissionId, permissionsGroups]);

  const handleAddPermission = (e, passedPermission) => {
    const checked = e.target.checked;
    const updatedMap = {
      ...permissionMap,
      [passedPermission.id]: !permissionMap[passedPermission.id],
    };
    setPermissionMap(updatedMap);
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, passedPermission],
      });
    } else {
      const filteredPermessions = formData.permissions.filter(
        (permission) => permission.id !== passedPermission.id
      );
      setFormData({ ...formData, permissions: filteredPermessions });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, permissions } = formData;
      await axios.patch(`groups/${permissionId}/`, { name, permissions });
      setLoading(false);
      toast.success("Permissions group updated successfully");
    } catch (error) {
      console.error("Error updating permissions group:", error);
      toast.error("Failed to update permissions group");
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Edit Permissions" />
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <form className="row m-0 form-ui" onSubmit={handleSubmit}>
              <div className="col-12 p-2 mb-2">
                <div className="input-field">
                  <label htmlFor="name">Group & Permissions Name</label>
                  <input
                    placeholder="Write Here"
                    type="text"
                    id="groupOfPermissionsName"
                    name="groupOfPermissionsName"
                    value={formData.name}
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="col-12 p-2">
                <h6 className="simiLabel">
                  Assign Group Permissions to employee
                </h6>
              </div>
              {permissions.map((p) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={p.id}>
                  <CheckField
                    label={p.codename}
                    name={p.name}
                    id={p.id}
                    checked={permissionMap[p.id] || false}
                    onChange={(e) => handleAddPermission(e, p)}
                  />
                </div>
              ))}
              <div className="col-12 p-2 d-flex justify-content-end">
                <SubmitButton
                  loading={loading}
                  name="Confirm"
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

export default EditPermissions;
