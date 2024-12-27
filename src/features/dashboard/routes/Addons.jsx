import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ADDONS_CATEGORIES, s3Url } from "../../../utils/constants";
import axiosInstance from "../../../utils/axiosInstance";
import useGetAddons from "./../../../hooks/addons/useGetAddons";
import PageHeader from "../layout/PageHeader";
import TableLoader from "../../../ui/loaders/TableLoader";
import AddonModal from "../../../ui/modals/AddonModal";
import Pagination from "../../../ui/Pagination";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmDeleteModal";

const AddOns = () => {
  const [row, setRow] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  const currentPage = searchParams.get("page");
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  const { data: addons, isLoading } = useGetAddons(currentPage);

  // table templates
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
        <Link to={`edit-addon/${rowData.id}`}>
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
        alt="addon"
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

  const categoryTemplate = (item) => {
    return (
      <span>
        {ADDONS_CATEGORIES.filter((c) => c.value === item?.category)[0]?.name}
      </span>
    );
  };

  const deleteAddOn = async () => {
    setLoading(true);
    console.log(row && row?.id);

    try {
      const res = await axiosInstance.delete("/addon/delete_addon", {
        data: { addon_id: row?.id },
      });
      if (res.status === 204) {
        toast.success("Addon deleted successfully");
        queryClient.invalidateQueries(["addons"]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setShowDeleteModal(false);
      setLoading(false);
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-addon" className="button success">
          Add New addons
        </Link>
      </header>
      <div className="row">
        <div className="col-12 p-2">
          <div className="inner_card">
            <>
              {isLoading ? (
                <TableLoader />
              ) : (
                <div className="table-container p-relative">
                  <DataTable value={addons?.data}>
                    <Column body={imageTemplate} header="Image" />
                    <Column field="name" header="Name" />
                    <Column body={categoryTemplate} header="Category " />
                    <Column body={yachtNameTemplate} header="Parent Yacht" />
                    <Column field="quantity" header="Quantity" />
                    <Column field="price" body={priceTemplate} header="Price" />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {addons?.count > 10 && (
                    <Pagination count={addons?.count} pageSize={10} />
                  )}
                </div>
              )}
            </>
          </div>
        </div>
      </div>
      <AddonModal
        data={row}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        deletionTarget={row?.name}
        loading={loading}
        onConfirm={deleteAddOn}
      />
    </section>
  );
};

export default AddOns;
