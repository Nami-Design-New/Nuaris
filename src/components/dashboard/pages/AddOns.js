import React, { useEffect, useState } from "react";
import PageHeader from "../layout/PageHeader";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import deleteIcon from "../../../assets/images/delete.svg";
import editIcon from "../../../assets/images/edit.svg";
import inflatableImage from "../../../assets/images/inflatable.png";
import eyeView from "../../../assets/images/eye.svg";
import AddOnModal from "../layout/AddOnModal";
import CustomPagination from "../../ui/CustomPagination";
import axios from "../../../util/axios";

const AddOns = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const [addonsData, setAddonsData] = useState([]);
  const [addonsCount, setAddonsCount] = useState(0);

  useEffect(() => {
    axios
      .get("/addons/", {
        params: {
          page: currentPage,
        },
      })
      .then((res) => {
        setAddonsCount(res?.data?.count);
        setAddonsData(res?.data?.results);
        console.log(res.data);
      });
  }, [currentPage]);

  const [tableData] = useState([
    {
      id: 1,
      name: "Inflatable boat",
      image: inflatableImage,
      category: "F&B",
      parent_yacht: "Titanic",
      quantity: 2,
      price: 200,
      active: true,
    },
    {
      id: 2,
      name: "Inflatable boat",
      image: inflatableImage,
      category: "Party Themes",
      parent_yacht: "Mayflower",
      quantity: 2,
      price: 200,
      active: false,
    },
  ]);
  // Actions ui
  const actionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button onClick={() => deleteRow(rowData)}>
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Link to={`edit-addon/${rowData.id}`}>
          <Button onClick={() => editRow(rowData)}>
            <img src={editIcon} alt="edit" />
          </Button>
        </Link>
        <Button onClick={() => setShowModal(true)}>
          <img src={eyeView} alt="view" />
        </Button>
      </div>
    );
  };
  const imageTemplate = (item) => {
    return <img src={item.attachments[0]} alt="addon" className="addon" />;
  };
  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>{item.price} $ </h4>
        <span>/ {item.price_type}</span>
      </div>
    );
  };
  // edit and delete
  const editRow = (rowData) => {
    console.log("Editing row:", rowData);
  };
  const deleteRow = (rowData) => {
    console.log(rowData);
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
                  <Column field="parent_yacht" header="Parent Yacht" />
                  <Column field="quantity" header="Quantity" />
                  <Column field="price" body={priceTemplate} header="Price" />
                  <Column header="Actions" body={actionTemplate} />
                </DataTable>
                <CustomPagination count={addonsCount} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddOnModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default AddOns;
