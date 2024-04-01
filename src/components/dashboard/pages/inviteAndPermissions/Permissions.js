import React, { useEffect, useState } from "react";
import PageHeader from "../../layout/PageHeader";
import deleteIcon from "../../../../assets/images/delete.svg";
import editIcon from "../../../../assets/images/edit.svg";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import axios from "../../../../util/axios";
import DeleteModal from "../../../ui/DeleteModal";
import CustomPagination from "../../../ui/CustomPagination";
import TableLoader from "../../../ui/TableLoader";

const Permissions = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupsData, setGroupsData] = useState([]);
  const [groupsCount, setGroupsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState({});
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
          setGroupsData(res?.data?.results);
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

  // Actions ui
  const actionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button onClick={() => deleteRow(rowData)}>
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Link to={`edit-permissions/${rowData.id}`}>
          <Button>
            <img src={editIcon} alt="edit" />
          </Button>
        </Link>
      </div>
    );
  };

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setRow(rowData);
  };

  const deleteGroup = () => {
    setShowDeleteModal(false);
    axios
      .delete(`/groups/${row.id}/`)
      .then(() => {
        setGroupsData((prevData) =>
          prevData.filter((group) => group.id !== row.id)
        );
        if (groupsData.length === 1 && currentPage > 1) {
          const newPage = parseInt(currentPage) - 1;
          searchParams.set("page", newPage.toString());
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${searchParams.toString()}`
          );
        }
        setGroupsCount((prevCount) => prevCount - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <section className="section-main-content">
        <header className="flex-header">
          <PageHeader />
        </header>
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="card_header">
                <h3>Permissions</h3>
                <div className="buttons">
                  <Link
                    to="/dashboard/invite-user/permissions/create-permissions"
                    className="button"
                  >
                    Create Permissions
                  </Link>
                </div>
              </div>{" "}
              {loading ? (
                <TableLoader />
              ) : (
                <div className="table-container">
                  <DataTable value={groupsData}>
                    <Column field="name" header="Permission Name" />
                    <Column header="Actions" body={actionTemplate} />
                  </DataTable>
                  {groupsCount > 0 && <CustomPagination count={groupsCount} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        onConfirm={deleteGroup}
        DeletionTarget={row.name}
      />
    </React.Fragment>
  );
};

export default Permissions;
