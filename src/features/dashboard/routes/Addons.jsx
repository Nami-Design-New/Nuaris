import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import useGetAddons from "./../../../hooks/useGetAddons";
import PageHeader from "../layout/PageHeader";
import TableLoader from "../../../ui/loaders/TableLoader";
import AddonModal from "../../../ui/modals/AddonModal";
import eyeView from "../../../assets/images/icons/eye.svg";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import editIcon from "../../../assets/images/icons/edit.svg";
import Pagination from "../../../ui/Pagination";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmDeleteModal";

const AddOns = () => {
  const [row, setRow] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const currency = useSelector((state) => state.user?.user?.currency);
  const queryClient = useQueryClient();
  const { data: addons, isLoading } = useGetAddons(currentPage);

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setRow(rowData);
  };

  const viewRow = (rowData) => {
    setShowModal(true);
    setRow(rowData);
  };

  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button onClick={() => deleteRow(rowData)}>
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Link to={`edit-addon/${rowData.id}`}>
          <Button>
            <img src={editIcon} alt="edit" />
          </Button>
        </Link>
        <Button onClick={() => viewRow(rowData)}>
          <img src={eyeView} alt="view" />
        </Button>
      </div>
    );
  };
  const imageTemplate = (item) => {
    return <img src={item?.attachments[0]} alt="addon" className="addon" />;
  };
  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>
          {item.price} {currency}{" "}
        </h4>
        <span>/ {item.price_type}</span>
      </div>
    );
  };

  const deleteAddOn = async () => {
    setShowDeleteModal(false);
    setLoading(true);
    try {
      const res = await axios.delete(`/addons/${row?.id}`);
      if (res.status === 200) {
        toast.success("Addon deleted successfully");
        queryClient.invalidateQueries(["addons"]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
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
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <div className="col-12 p-2">
              {isLoading ? (
                <TableLoader />
              ) : (
                <div className="table-container p-relative">
                  <DataTable value={addons?.data}>
                    <Column field="image" body={imageTemplate} header="Image" />
                    <Column field="name" header="Name" />
                    <Column field="category" header="Category " />
                    <Column field="parent_yacht_name" header="Parent Yacht" />
                    <Column field="quantity" header="Quantity" />
                    <Column field="price" body={priceTemplate} header="Price" />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {addons?.count > 0 && <Pagination count={addons?.count} />}
                </div>
              )}
            </div>
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
