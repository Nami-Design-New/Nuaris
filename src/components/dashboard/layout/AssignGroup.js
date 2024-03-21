import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckField from "../../ui/form-elements/CheckField";
import AssignGroupModal from "./AssignGroupModal";

const AssignGroup = ({ ivitedUserId }) => {
  const [permissionMap, setPermissionMap] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({ id: "" });

  const permissionsGroups = useSelector(
    (state) => state.permissionsGroups.permissionsGroups?.results
  );

  useEffect(() => {
    if (permissionsGroups) {
      const permissionGroupsMap = permissionsGroups?.reduce((acc, group) => {
        acc[group.id] = false;
        return acc;
      }, {});
      setPermissionMap(permissionGroupsMap);
    }
  }, [permissionsGroups]);

  const handleAddGroup = (passedGroup) => {
    const groupId = passedGroup.id;
    const updatedMap = {};
    for (const key in permissionMap) {
      updatedMap[key] = key === groupId;
    }
    updatedMap[groupId] = !permissionMap[groupId];
    setPermissionMap(updatedMap);
    setFormData({ id: groupId });
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };
  return (
    <>
      <div className="col-12 p-2">
        <div className="inner_card mt-4">
          <form action="" className="row m-0 form-ui">
            <div className="col-12 p-2">
              <h6 className="simiLabel">
                Assign Group Permissions to employee
              </h6>
            </div>
            {permissionsGroups?.map((g) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={g.id}>
                <CheckField
                  name={g.name}
                  id={g.id}
                  checked={permissionMap[g.id]}
                  onChange={(e) => handleAddGroup(g)}
                />
              </div>
            ))}
            <div className="col-12 p-2 d-flex justify-content-end">
              <button className="log w-25" onClick={handleOpenModal}>
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
      <AssignGroupModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        ivitedUserId={ivitedUserId}
        formData={formData}
      />
    </>
  );
};

export default AssignGroup;
