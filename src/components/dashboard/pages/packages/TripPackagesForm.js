import React, { useEffect, useState } from "react";
import PageHeader from "../../layout/PageHeader";
import PackageInfoForm from "../../layout/packages/PackageInfoForm";
import PackagePriceTime from "../../layout/packages/PackagePriceTime";
import PolicyForm from "../../layout/packages/PolicyForm";
import { useParams } from "react-router-dom";
import axios from "./../../../../util/axios";

const TripPackagesForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState("Package Info");
  const [tripPackage, setTripPackage] = useState(null);
  useEffect(() => {
    if (id) {
      axios
        .get(`/trip-packages/${id}/`)
        .then((res) => {
          setTripPackage(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, form]);

  let formComponent;
  if (form === "Package Info") {
    formComponent = (
      <PackageInfoForm setForm={setForm} tripPackage={tripPackage} />
    );
  } else if (form === "Package Time & Price") {
    formComponent = (
      <PackagePriceTime setForm={setForm} tripPackage={tripPackage} />
    );
  } else {
    formComponent = <PolicyForm setForm={setForm} tripPackage={tripPackage} />;
  }

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader
          name={id ? "Edit Package" : "Create Package"}
          removeLast={id ? true : false}
        />
      </header>
      <div className="row m-0">
        <div className="addon_form_wrapper">
          <div className="wizard_tabs">
            {["Package Info", "Package Time & Price", "Policy"].map((fo, i) => (
              <div
                key={i}
                className={`wizard_tab ${form === fo ? "active" : ""}`}
                onClick={() => setForm(fo)}
              >
                <div className="step_no">{i + 1}</div>
                <h6>{fo}</h6>
              </div>
            ))}
          </div>
          <div className="bg_white_card">{formComponent}</div>
        </div>
      </div>
    </section>
  );
};

export default TripPackagesForm;
