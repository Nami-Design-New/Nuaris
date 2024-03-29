import React, { useEffect, useState } from "react";
import PageHeader from "../layout/PageHeader";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import deleteIcon from "../../../assets/images/delete.svg";
import editIcon from "../../../assets/images/edit.svg";
import eyeView from "../../../assets/images/eye.svg";
import AddOnModal from "../layout/AddOnModal";
import CustomPagination from "../../ui/CustomPagination";
import axios from "../../../util/axios";
import TableLoader from "./../../ui/TableLoader";
import DeleteModal from "../../ui/DeleteModal";

const AddOns = () => {
  const [row, setRow] = useState({});
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const currentPage = searchParams.get("page");
  const [addonsData, setAddonsData] = useState([]);
  const [addonsCount, setAddonsCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  useEffect(() => {
    try {
      axios
        .get("/addons/", {
          params: {
            page: currentPage
          }
        })
        .then((res) => {
          setAddonsCount(res?.data?.count);
          setAddonsData(res?.data?.results);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, [currentPage]);

  // Actions ui
  const imageTemplate = (item) => {
    return <img src={item?.attachments[0]} alt="addon" className="addon" />;
  };
  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>{item.price} $ </h4>
        <span>/ {item.price_type}</span>
      </div>
    );
  };

  const deleteAddOn = () => {
    setShowDeleteModal(false);
    axios
      .delete(`/addons/${row.id}/`)
      .then(() => {
        setAddonsData((prevData) =>
          prevData.filter((employee) => employee.id !== row.id)
        );
        if (addonsData.length === 1 && currentPage > 1) {
          const newPage = parseInt(currentPage) - 1;
          searchParams.set("page", newPage.toString());
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${searchParams.toString()}`
          );
        }
        setAddonsCount((prevCount) => prevCount - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-new-addon" className="button success">
          Add New addons
        </Link>
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <div className="col-12 p-2">
              {loading ? (
                <TableLoader />
              ) : (
                <div className="table-container p-relative">
                  <DataTable
                    value={addonsData}
                    // paginator
                    rows={5}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  >
                    <Column field="image" body={imageTemplate} header="Image" />
                    <Column field="name" header="Name" />
                    <Column field="category" header="Category " />
                    <Column field="parent_yacht_name" header="Parent Yacht" />
                    <Column field="quantity" header="Quantity" />
                    <Column field="price" body={priceTemplate} header="Price" />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {addonsCount > 0 && <CustomPagination count={addonsCount} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {row && (
        <AddOnModal
          data={row}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <DeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        DeletionTarget={row?.name}
        onConfirm={deleteAddOn}
      />
    </section>
  );
};

export default AddOns;
