import React, { useEffect, useState } from "react";
import CheckField from "../../../ui/form-elements/CheckField";
import CustomPagination from "../../../ui/CustomPagination";
import { useSearchParams } from "react-router-dom";
import axios from "../../../../util/axios";
import ConfirmModal from "../../../ui/ConfirmModal";
import { toast } from "react-toastify";

const AssignGroup = ({ invitedUserId, groupNames }) => {
  const [permissionMap, setPermissionMap] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupsCount, setGroupsCount] = useState(0);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    try {
      axios
        .get(`/groups/`, {
          params: {
            page: currentPage,
          },
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
        acc[group.id] = groupNames?.includes(group.name);
        return acc;
      }, {});
      setPermissionMap(permissionGroupsMap);
    }
  }, [groups, groupNames]);

  const handleAddGroup = (passedGroup) => {
    const groupId = passedGroup.id;
    const updatedMap = { ...permissionMap };
    updatedMap[groupId] = !permissionMap[groupId];
    setPermissionMap(updatedMap);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleAssignGroup = async () => {
    try {
      const selectedGroupIds = Object.entries(permissionMap)
        .filter(([groupId, isChecked]) => isChecked)
        .map(([groupId]) => parseInt(groupId));

      const res = await axios.post(`/employees/${invitedUserId}/assign-group/`, {
        ids: selectedGroupIds,
      });
      if (res?.status === 201 || res?.status === 200) {
        toast.success("Group assigned successfully");
        setShowConfirmModal(false);
      } else {
        toast.error("An error occurred while assigning the group");
        setShowConfirmModal(false);
      }
    } catch (error) {
      console.log("error =>", error);
      toast.error("An error occurred while assigning the group");
    }
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
            {groupsCount > 0 && <CustomPagination count={groupsCount} />}
            <div className="col-12 p-2 d-flex justify-content-end">
              <button className="log w-25" onClick={handleOpenModal}>
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        handleConfirm={handleAssignGroup}
        message={`Are you sure you want to invite this user as a ${
          groups?.find((g) => permissionMap[g.id])?.name
        }?`}
      />
    </>
  );
};

export default AssignGroup;
