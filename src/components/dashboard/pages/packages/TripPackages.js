import React, { useEffect, useState } from "react";
import PageHeader from "../../layout/shared/PageHeader";
import { Link, useSearchParams } from "react-router-dom";
import TableLoader from "../../../ui/TableLoader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomPagination from "../../../ui/CustomPagination";
import deleteIcon from "../../../../assets/images/delete.svg";
import editIcon from "../../../../assets/images/edit.svg";
import eyeView from "../../../../assets/images/eye.svg";
import StarsRate from "../../../ui/StarsRate";
import { Button } from "primereact/button";
import PackageModal from "../../../../components/dashboard/layout/packages/PackageModal";
import { useSelector } from "react-redux";
import axios from "./../../../../util/axios";
import DeleteModal from "../../../ui/DeleteModal";

const TripPackages = () => {
  const [loading, setLoading] = useState(true);
  const [packegesData, setPackegesData] = useState([]);
  const [packagesCount, setPackagesCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [row, setRow] = useState(null);
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const currentPage = searchParams.get("page");
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;

  const deletePackage = () => {
    setShowDeleteModal(false);
    axios
      .delete(`/trip-packages/${row.id}/`)
      .then(() => {
        setPackegesData((prevData) =>
          prevData.filter((employee) => employee.id !== row.id)
        );
        if (packegesData.length === 1 && currentPage > 1) {
          const newPage = parseInt(currentPage) - 1;
          searchParams.set("page", newPage.toString());
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${searchParams.toString()}`
          );
        }
        setPackagesCount((prevCount) => prevCount - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const imageTemplate = (item) => {
    return <img src={item?.images[0]} alt={item?.name} className="addon" />;
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
              <h4>{firstPeriod.price} $ </h4>
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
          <img src={deleteIcon} alt="delete" />
        </Button>
        <Link to={`edit-package/${rowData.id}`}>
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

  const deleteRow = (rowData) => {
    setShowDeleteModal(true);
    setRow(rowData);
  };

  const viewRow = (rowData) => {
    setShowModal(true);
    setRow(rowData);
  };

  useEffect(() => {
    try {
      axios
        .get(`/trip-packages/?sub_user=${subUser}`, {
          params: {
            page: currentPage
          }
        })
        .then((res) => {
          setPackagesCount(res?.data?.count);
          setPackegesData(res?.data?.results);
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
  }, [currentPage, subUser]);

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
                  <DataTable value={packegesData}>
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
        {row && (
          <PackageModal
            data={row}
            setPackegesData={setPackegesData}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
      <DeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        DeletionTarget={row?.name}
        onConfirm={deletePackage}
      />
    </section>
  );
};

export default TripPackages;
