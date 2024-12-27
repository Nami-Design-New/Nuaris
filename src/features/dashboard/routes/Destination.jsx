import { useState } from "react";
import { Button } from "primereact/button";
import { Form } from "react-bootstrap";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import TableLoader from "../../../ui/loaders/TableLoader";
import Pagination from "../../../ui/Pagination";
import AddDestinationModal from "../../../ui/modals/AddDestinationModal";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmDeleteModal";
import axiosInstance from "../../../utils/axiosInstance";
import useGetDirections from "../../../hooks/location-destination/useGetDirections";

export default function Destination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(
    searchParams.get("filter") || "Destination"
  );
  const [showAddDestinationModal, setShowAddDestinationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [destinationForEdit, setDestinationForEdit] = useState({});
  const [destinationForDelete, setDestinationForDelete] = useState({});
  const [loading, setLoading] = useState(false);
  const { data: destinations, isLoading, refetch } = useGetDirections(filter);

  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button onClick={() => deleteRow(rowData)}>
          <img src="/images/icons/delete.svg" alt="delete" />
        </Button>
        <Button onClick={() => editRow(rowData)}>
          <img src="/images/icons/edit.svg" alt="edit" />
        </Button>
        <div className="rowActivation">
          <Form.Check type="switch" />
        </div>
      </div>
    );
  };

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setDestinationForDelete(rowData);
  };

  const editRow = (rowData) => {
    setDestinationForEdit(rowData);
    setShowAddDestinationModal(true);
  };

  const deleteDestination = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.delete(
        "/location/delete_direction",
        {
          data: {
            direction_id: destinationForDelete?.id,
            location_type: destinationForDelete?.location_type,
          },
        }
      );
      if (res.status === 204) {
        toast.success(
          `${
            destinationForDelete?.location_type ? "Location" : "Destination"
          } deleted successfully`
        );
        refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteModal(false);
      setLoading(false);
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name={" Destination & Location"} />
        <button
          className="button success"
          onClick={() => setShowAddDestinationModal(true)}
        >
          Add New Destination
        </button>
      </header>

      <div className="row">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            {isLoading ? (
              <TableLoader />
            ) : (
              <>
                <div className="location-destination-tabs">
                  <span className={`activeTab ${filter}`} />
                  <div
                    className={`tab ${
                      filter === "Destination" ? "active" : ""
                    }`}
                    onClick={() => {
                      setFilter("Destination");
                      setSearchParams({ filter: "Destination" });
                    }}
                  >
                    <h6>Destinations</h6>
                  </div>
                  <div
                    className={`tab ${filter === "Location" ? "active" : ""}`}
                    onClick={() => {
                      setFilter("Location");
                      setSearchParams({ filter: "Location" });
                    }}
                  >
                    <h6>Locations</h6>
                  </div>
                </div>
                <div className="table-container p-relative">
                  <DataTable value={destinations?.data}>
                    <Column field="name" header="Name" />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {destinations?.count > 5 && (
                    <Pagination count={destinations?.count} pageSize={5} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Add destination modal */}
      <AddDestinationModal
        target={destinationForEdit}
        setTarget={setDestinationForEdit}
        showModal={showAddDestinationModal}
        setShowModal={setShowAddDestinationModal}
      />
      {/* Confirm delete modal */}
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        deletionTarget={destinationForDelete?.name}
        loading={loading}
        onConfirm={deleteDestination}
      />
    </section>
  );
}
