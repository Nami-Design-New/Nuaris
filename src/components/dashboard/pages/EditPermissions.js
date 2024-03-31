import React, { useState, useEffect } from "react";
import PageHeader from "../layout/PageHeader";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import CheckField from "../../ui/form-elements/CheckField";
import CustomPagination from "../../ui/CustomPagination";

const EditPermissions = () => {
  const [formData, setFormData] = useState({ name: "", permissions: [] });
  const [permissionMap, setPermissionMap] = useState({});
  const [loading, setLoading] = useState(false);
  const { groupId } = useParams();
  const [permissions, setPermissions] = useState([]);
  const [permissionsCount, setPermissionsCount] = useState(0);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupResponse = await axios.get(`/groups/${groupId}/`);
        const permissionsResponse = await axios.get(`/permissions/`, {
          params: { page: currentPage, page_size: 9 },
        });
        setFormData({
          name: groupResponse.data.name,
          permissions: groupResponse.data.permissions,
        });
        const groupPermissionMap = {};
        groupResponse.data.permissions.forEach((permission) => {
          groupPermissionMap[permission.id] = true;
        });
        setPermissionMap(groupPermissionMap);
        setPermissionsCount(permissionsResponse.data.count);
        setPermissions(permissionsResponse.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [groupId, currentPage]);

  const handleAddPermission = (permission) => {
    const updatedMap = {
      ...permissionMap,
      [permission.id]: !permissionMap[permission.id],
    };
    setPermissionMap(updatedMap);
    const updatedPermissions = updatedMap[permission.id]
      ? [...formData.permissions, permission]
      : formData.permissions.filter((p) => p.id !== permission.id);
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const permission_ids = formData.permissions.map(
      (permission) => permission.id
    );
    try {
      setLoading(true);
      const response = await axios.patch(`/groups/${groupId}/`, {
        name: formData.name,
        permission_ids,
      });
      if (response?.status === 200 || response?.status === 201) {
        setLoading(false);
        toast.success("Permissions group updated successfully");
      } else {
        toast.error("Failed to update permissions group");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating permissions group:", error);
      setLoading(false);
      toast.error("Failed to update permissions group");
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader removeLast={true} name="Edit Permissions" />
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
                    onChange={() => handleAddPermission(p)}
                  />
                </div>
              ))}
              {permissionsCount > 0 && (
                <CustomPagination count={permissionsCount} pageSize={9} />
              )}
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
