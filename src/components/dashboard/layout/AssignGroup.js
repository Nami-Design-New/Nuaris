import React, { useEffect, useState } from "react";
import CheckField from "../../ui/form-elements/CheckField";
import AssignGroupModal from "./AssignGroupModal";
import CustomPagination from "./../../ui/CustomPagination";
import { useSearchParams } from "react-router-dom";
import axios from "./../../../util/axios";

const AssignGroup = ({ ivitedUserId }) => {
  const [permissionMap, setPermissionMap] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({ id: "" });
  const [groups, setGroups] = useState([]);
  const [groupsCount, setGroupsCount] = useState(0);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    try {
      axios
        .get(`/groups/`, {
          params: {
            page: currentPage
          }
        })
        .then((res) => {
          setGroupsCount(res?.data?.count);
          setGroups(res?.data?.results);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  useEffect(() => {
    if (groups) {
      const permissionGroupsMap = groups?.reduce((acc, group) => {
        acc[group.id] = false;
        return acc;
      }, {});
      setPermissionMap(permissionGroupsMap);
    }
  }, [groups]);

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
            {groups?.map((g) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={g.id}>
                <CheckField
                  name={g.name}
                  id={g.id}
                  checked={permissionMap[g.id]}
                  onChange={() => handleAddGroup(g)}
                />
              </div>
            ))}
            <CustomPagination count={groupsCount} />
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
