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
  const [permissionMap, setPermissionMap] = useState([]);
  const [loading, setLoading] = useState(false);
  const { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [permissionsCount, setPermissionsCount] = useState(0);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    try {
      axios
        .get(`/groups/${groupId}/`)
        .then((res) => {
          setGroup(res?.data);
          setFormData({
            name: res?.data?.name,
            permissions: res?.data?.permissions
          });
          const groupPermissionMap = {};
          res?.data?.permissions.forEach((permission) => {
            groupPermissionMap[permission.id] = true;
          });
          setPermissionMap(groupPermissionMap);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [groupId]);

  useEffect(() => {
    try {
      axios
        .get(`/permissions/?page_size=9`, {
          params: {
            page: currentPage
          }
        })
        .then((res) => {
          setPermissionsCount(res?.data?.count);
          setPermissions(res?.data?.results);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  const handleAddPermission = (e, passedPermission) => {
    const checked = e.target.checked;
    const updatedMap = {
      ...permissionMap,
      [passedPermission.id]: !permissionMap[passedPermission.id]
    };
    setPermissionMap(updatedMap);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, permissions } = formData;
      await axios.patch(`groups/${groupId}/`, { name, permissions });
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
                    value={group?.name}
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
              {permissions?.map((p) => (
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
