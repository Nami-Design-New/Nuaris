import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import PageHeader from "../layout/PageHeader";
import editIcon from "../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import useGetGroups from "../../../hooks/useGetGroups";
import Pagination from "../../../ui/Pagination";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmDeleteModal";
import TableLoader from "../../../ui/loaders/TableLoader";

const Permissions = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState({});
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const queryClient = useQueryClient();
  const { data: groups, isLoading } = useGetGroups(currentPage);

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

  const deleteGroup = async () => {
    setShowDeleteModal(false);
    setLoading(true);
    try {
      const res = await axios.delete(`/groups/${row?.id}`);
      if (res.status === 200) {
        toast.success("Permission group deleted successfully");
        queryClient.invalidateQueries(["groups"]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setRow(rowData);
  };

  return (
    <>
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
              {isLoading ? (
                <TableLoader />
              ) : (
                <div className="table-container">
                  <DataTable value={groups?.data}>
                    <Column field="name" header="Permission Name" />
                    <Column header="Actions" body={actionTemplate} />
                  </DataTable>
                  {groups?.count > 0 && <Pagination count={groups?.count} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        deletionTarget={row?.name}
        loading={loading}
        onConfirm={deleteGroup}
      />
    </>
  );
};

export default Permissions;
