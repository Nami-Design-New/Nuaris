import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { s3Url } from "../../../utils/constants";
import PageHeader from "../layout/PageHeader";
import useGetActivities from "../../../hooks/activities/useGetActivities";
import Pagination from "../../../ui/Pagination";
import TableLoader from "../../../ui/loaders/TableLoader";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmDeleteModal";
import axiosInstance from "../../../utils/axiosInstance";
import ActivityModal from "../../../ui/modals/ActivityModal";

export default function Activities() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";

  const { data: activities, isLoading } = useGetActivities(currentPage);

  const deleteActitvity = async () => {
    setLoading(true);
    console.log(row && row?.id);

    try {
      const res = await axiosInstance.delete(
        "/activity/delete_activity_by_id",
        {
          data: { activity_id: row?.id },
        }
      );
      if (res.status === 204) {
        toast.success("Activity deleted successfully");
        queryClient.invalidateQueries(["activities"]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setShowDeleteModal(false);
      setLoading(false);
    }
  };

  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button
          onClick={() => {
            setShowDeleteModal(true);
            setRow(rowData);
          }}
        >
          <img src="/images/icons/delete.svg" alt="delete" />
        </Button>
        <Link to={`edit-activity/${rowData.id}`}>
          <Button>
            <img src="/images/icons/edit.svg" alt="edit" />
          </Button>
        </Link>
        <Button
          onClick={() => {
            setShowModal(true);
            setRow(rowData);
          }}
        >
          <img src="/images/icons/eye.svg" alt="view" />
        </Button>
      </div>
    );
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

  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>
          {(item?.prices && Number(item?.prices[0]?.price)) || ""} {currency}{" "}
        </h4>
        <span>/ {item.prices && item.prices[0]?.period?.name}</span>
      </div>
    );
  };

  const yachtNameTemplate = (item) => {
    return <span>{item?.yacht?.name_en}</span>;
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-activity" className="button success">
          Add New Activity
        </Link>
      </header>
      <div className="row">
        <div className="col-12 p-2">
          <div className="inner_card">
            {isLoading ? (
              <TableLoader />
            ) : (
              <div className="table-container p-relative">
                <DataTable value={activities?.data}>
                  <Column body={imageTemplate} header="Image" />
                  <Column field="name" header="Name" />
                  <Column field="category" header="category" />
                  <Column body={yachtNameTemplate} header="Parent Yacht" />
                  <Column field="quantity" header="Quantity" />
                  <Column body={priceTemplate} header="Price" />
                  <Column header="Actions" body={ActionTemplate} />
                </DataTable>
                {activities?.count > 5 && (
                  <Pagination count={activities?.count} pageSize={5} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        deletionTarget={row?.name}
        loading={loading}
        onConfirm={deleteActitvity}
      />
      <ActivityModal
        data={row}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </section>
  );
}
