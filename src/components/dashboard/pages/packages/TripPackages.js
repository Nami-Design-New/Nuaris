import React, { useState } from "react";
import PageHeader from "../../layout/PageHeader";
import { Link } from "react-router-dom";
import TableLoader from "../../../ui/TableLoader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import packageImg from "../../../../assets/images/package.jpg";
import CustomPagination from "../../../ui/CustomPagination";
import deleteIcon from "../../../../assets/images/delete.svg";
import editIcon from "../../../../assets/images/edit.svg";
import eyeView from "../../../../assets/images/eye.svg";
import StarsRate from "../../../ui/StarsRate";
import { Button } from "primereact/button";

const TripPackages = () => {
  const [packegesData, setPackegesData] = useState([]);
  const [packagesCount, setPackagesCount] = useState(0);
  const [loading] = useState(false);

  // for test
  const testData = [
    {
      image: packageImg,
      name: "Package 1",
      price: 1000,
      price_type: "Trip",
      booking_number: 10,
      last_ordered: "12/12/2022",
      date_added: "12/12/2022",
      overall_rate: 4
    },
    {
      image: packageImg,
      name: "Package 2",
      price: 1000,
      booking_number: 10,
      price_type: "Trip",
      last_ordered: "12/12/2022",
      date_added: "12/12/2022",
      overall_rate: 3
    },
    {
      image: packageImg,
      name: "Package 3",
      price: 1000,
      booking_number: 10,
      price_type: "Person",
      last_ordered: "12/12/2022",
      date_added: "12/12/2022",
      overall_rate: 5
    }
  ];
  const imageTemplate = (item) => {
    return <img src={item?.image} alt={item?.name} className="addon" />;
  };
  const rateTemplate = (item) => {
    return <StarsRate rate={item?.overall_rate} />;
  };
  const bookingNumber = (item) => {
    return <p className="text-center">{item.booking_number}</p>;
  };
  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button>
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Button>
          <img src={editIcon} alt="edit" />
        </Button>
        <Button>
          <img src={eyeView} alt="view" />
        </Button>
      </div>
    );
  };
  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>{item.price} $ </h4>
        <span>/ {item.price_type}</span>
      </div>
    );
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="create-package" className="button success">
          Create Package
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
                  <DataTable value={testData}>
                    <Column body={imageTemplate} header="Image" />
                    <Column field="name" header="Package Name" />
                    <Column body={priceTemplate} header="Price" />
                    <Column body={bookingNumber} header="Booking number" />
                    <Column field="last_ordered" header="last ordered" />
                    <Column field="date_added" header="Date added" />
                    <Column body={rateTemplate} header="Overall rate" />
                    <Column header="Actions" body={ActionTemplate} />
                  </DataTable>
                  {packagesCount > 0 && (
                    <CustomPagination count={packagesCount} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripPackages;
