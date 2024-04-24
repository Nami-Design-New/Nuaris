import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import PageHeader from "../../layout/shared/PageHeader";
import CustomPagination from "../../../ui/CustomPagination";
import deleteIcon from "../../../../assets/images/delete.svg";
import editIcon from "../../../../assets/images/edit.svg";
import eyeView from "../../../../assets/images/eye.svg";

const Activities = () => {
  const [loading, setLoading] = useState(true);
  const [activitiesCount, setActivitiesCount] = useState(0);
  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button>
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Link to={`edit-package/${rowData.id}`}>
          <Button>
            <img src={editIcon} alt="edit" />
          </Button>
        </Link>
        <Button>
          <img src={eyeView} alt="view" />
        </Button>
      </div>
    );
  };
  const imageTemplate = (item) => {
    return <img src={item?.images[0]} alt={item?.name} className="addon" />;
  };

  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>{item.price} $ </h4>
        {/* <span>/ {item.trip_package_days[0].periods[0].price || ""}</span> */}
      </div>
    );
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-new-activity" className="button success">
          Add New Activity
        </Link>
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <div className="table-container p-relative">
              <DataTable value="">
                <Column body={imageTemplate} header="Image" />
                <Column field="name" header="Name" />
                <Column field="category" header="category" />
                <Column field="parent_yacht" header="Parent Yacht" />
                <Column field="quantity" header="Quantity" />
                <Column body={priceTemplate} header="Price" />
                <Column header="Actions" body={ActionTemplate} />
              </DataTable>
              {activitiesCount > 0 && (
                <CustomPagination count={activitiesCount} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
