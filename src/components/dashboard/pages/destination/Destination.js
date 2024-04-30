import React, { useEffect, useState } from "react";
import PageHeader from "../../layout/shared/PageHeader";
import AddDestinationModal from "./AddDestinationModal";
import axios from "../../../../util/axios";
import CustomPagination from "../../../ui/CustomPagination";
import { useSearchParams } from "react-router-dom";
import TableLoader from "../../../ui/TableLoader";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import deleteIcon from "../../../../assets/images/delete.svg";
import editIcon from "../../../../assets/images/edit.svg";
import { Button } from "primereact/button";
import { Form } from "react-bootstrap";
import DeleteModal from "../../../ui/DeleteModal";

const Destination = () => {
  const [showAddDestinationModal, setShowAddDestinationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [destinationsCount, setDestinationsCount] = useState(0);
  const [destinationForEdit, setDestinationForEdit] = useState({});
  const [destinationForDelete, setDestinationForDelete] = useState({});
  const currentPage = searchParams.get("page");

  // fetch destinations
  const fetchDestinations = () => {
    setLoading(true);
    axios
      .get(`/destinations/`, {
        params: {
          page: currentPage,
        },
      })
      .then((res) => {
        setDestinations(res?.data?.results);
        setDestinationsCount(res?.data?.count);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDestinations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Table Actions Template
  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button onClick={() => deleteRow(rowData)}>
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Button onClick={() => editRow(rowData)}>
          <img src={editIcon} alt="edit" />
        </Button>
        <div className="rowActivation">
          <Form.Check type="switch" />
        </div>
      </div>
    );
  };

  // delete row
  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setDestinationForDelete(rowData);
  };

  const deleteDestination = () => {
    setShowDeleteModal(false);
    axios
      .delete(`/destinations/${destinationForDelete.id}/`)
      .then(() => {
        setDestinations((prevData) =>
          prevData.filter((employee) => employee.id !== destinationForDelete.id)
        );
        if (destinations.length === 1 && currentPage > 1) {
          const newPage = parseInt(currentPage) - 1;
          searchParams.set("page", newPage.toString());
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${searchParams.toString()}`
          );
        }
        setDestinationsCount((prevCount) => prevCount - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editRow = (rowData) => {
    setDestinationForEdit(rowData);
    setShowAddDestinationModal(true);
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <button
          className="button success"
          onClick={() => setShowAddDestinationModal(true)}
        >
          Add New Destination
        </button>
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            {loading ? (
              <TableLoader />
            ) : (
              <div className="table-container p-relative">
                <DataTable value={destinations}>
                  <Column field="name" header="Name" />
                  <Column header="Actions" body={ActionTemplate} />
                </DataTable>
                {destinationsCount > 0 && (
                  <CustomPagination count={destinationsCount} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <AddDestinationModal
        target={destinationForEdit}
        setTarget={setDestinationForEdit}
        fetchDestinations={fetchDestinations}
        showModal={showAddDestinationModal}
        setShowModal={setShowAddDestinationModal}
      />
      <DeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        DeletionTarget={destinationForDelete?.name}
        onConfirm={deleteDestination}
      />
    </section>
  );
};

export default Destination;
