import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { s3Url } from "../../../utils/constants";
import PageHeader from "../layout/PageHeader";
import TableLoader from "./../../../ui/loaders/TableLoader";
import Pagination from "../../../ui/Pagination";
import StarsRate from "./../../../ui/StarsRate";
import useGetTripPackages from "./../../../hooks/trip-packages/useGetTripPackages";
import axiosInstance from "../../../utils/axiosInstance";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmDeleteModal";
import PackageModal from "../../../ui/modals/PackageModal";

export default function TripPackages() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const { data: packages, isLoading } = useGetTripPackages();

  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";

  const deleteTripPackage = async () => {
    setLoading(true);
    console.log(row && row?.id);
    try {
      const res = await axiosInstance.delete("/trip/delete_trip_by_id", {
        data: { trip_package_id: row?.id },
      });
      if (res.status === 204) {
        toast.success("Trip Package deleted successfully");
        queryClient.invalidateQueries(["trip-packages"]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setShowDeleteModal(false);
      setLoading(false);
    }
  };

  const imageTemplate = (item) => {
    return (
      <img
        src={
          s3Url +
            item?.media?.filter(
              (media) => media?.type === "IMAGE" && media?.is_active
            )?.[0]?.path || "/images/fav.svg"
        }
        alt={item?.name}
        className="addon"
      />
    );
  };

  const rateTemplate = (item) => {
    return <StarsRate rate={item?.overall_rate || 0} />;
  };

  const bookingNumber = (item) => {
    return <p className="text-center">{item.booking_number}</p>;
  };

  const priceTemplate = (item) => {
    if (item.trip_package_days && item.trip_package_days.length > 0) {
      const firstDay = item.trip_package_days[0];
      if (firstDay.periods && firstDay.periods.length > 0) {
        const firstPeriod = firstDay.periods[0];
        if (firstPeriod.price && firstPeriod.price_type) {
          return (
            <div className="price_template">
              <h4>
                {firstPeriod.price} {currency}{" "}
              </h4>
              <span>/ {firstPeriod.price_type}</span>
            </div>
          );
        }
      }
    }
    return null;
  };

  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button onClick={() => deleteRow(rowData)}>
          <img src="/images/icons/delete.svg" alt="delete" />
        </Button>
        <Link to={`edit-trip-package/${rowData.id}`}>
          <Button>
            <img src="/images/icons/edit.svg" alt="edit" />
          </Button>
        </Link>
        <Button onClick={() => viewRow(rowData)}>
          <img src="/images/icons/eye.svg" alt="view" />
        </Button>
      </div>
    );
  };

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setRow(rowData);
  };

  const viewRow = (rowData) => {
    setShowModal(true);
    setRow(rowData);
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-trip-package" className="button success">
          Create Package
        </Link>
      </header>
      <div className="row">
        <div className="col-12 p-2">
          <div className="inner_card">
            <div className="col-12 p-2">
              {isLoading ? (
                <TableLoader />
              ) : (
                <div className="table-container p-relative">
                  <DataTable value={packages?.data}>
                    <Column body={imageTemplate} header="Image" />
                    <Column field="name" header="Package Name" />
                    <Column body={priceTemplate} header="Price" />
                    <Column body={bookingNumber} header="Number Of Booking " />
                    <Column field="last_ordered" header="last ordered" />
                    <Column field="date_added" header="Expiration Date" />
                    <Column body={rateTemplate} header="Overall rate" />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {packages?.count > 10 && (
                    <Pagination count={packages?.count} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <PackageModal
          data={row}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        deletionTarget={row?.name}
        loading={loading}
        onConfirm={deleteTripPackage}
      />
    </section>
  );
}
