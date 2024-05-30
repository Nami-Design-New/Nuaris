import React, { useEffect, useState } from "react";
import PageHeader from "../../layout/shared/PageHeader";
import PackageInfoForm from "../../layout/packages/PackageInfoForm";
import PackagePriceTime from "../../layout/packages/PackagePriceTime";
import PolicyForm from "../../layout/packages/PolicyForm";
import { useParams } from "react-router-dom";
import axios from "./../../../../util/axios";
import { useSelector } from "react-redux";
import { DAYS } from "../../../../constants";

const TripPackagesForm = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;
  const [form, setForm] = useState("Package Info");
  const [tripPackage, setTripPackage] = useState(null);
  const [isMainInfoValid, setIsMainInfoValid] = useState(false);
  const [isPriceTimeValid, setIsPriceTimeValid] = useState(false);

  const addonsInitial = {
    addon: null,
    quantity: ""
  };
  const activitiesInitial = {
    activity: null,
    quantity: ""
  };
  const periodInitial = {
    start_time: "",
    end_time: "",
    price: "",
    price_type: ""
  };
  const pricesInitial = DAYS.map((day, index) => {
    return {
      day,
      index,
      selected: false,
      periods: [periodInitial]
    };
  });

  const [formData, setFormData] = useState({
    sub_user: subUser,
    name: "",
    description: "",
    period_of_activation_from: "",
    period_of_activation_to: "",
    yacht: "",
    video_link: "",
    images_list: Array(3).fill(""),
    activities_list: [activitiesInitial],
    addons_list: [addonsInitial],
    trip_package_days: pricesInitial
  });

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

  const handleFormChange = (newForm) => {
    const steps = ["Package Info", "Package Time & Price", "Policy"];
    const newFormIndex = steps.indexOf(newForm);
    const currentFormIndex = steps.indexOf(form);
    if (newFormIndex < currentFormIndex) {
      setForm(newForm);
    } else {
      if (
        (form === "Package Info" && isMainInfoValid) ||
        (form === "Package Time & Price" && isPriceTimeValid) ||
        form === "Policy"
      ) {
        setForm(newForm);
      }
    }
  };

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
                onClick={() => handleFormChange(fo)}
              >
                <div className="step_no">{i + 1}</div>
                <h6>{fo}</h6>
              </div>
            ))}
          </div>
          <div className="bg_white_card">
            {form === "Package Info" && (
              <PackageInfoForm
                setForm={setForm}
                formData={formData}
                tripPackage={tripPackage}
                setFormData={setFormData}
                isMainInfoValid={isMainInfoValid}
                setIsMainInfoValid={setIsMainInfoValid}
              />
            )}
            {form === "Package Time & Price" && (
              <PackagePriceTime
                setForm={setForm}
                formData={formData}
                tripPackage={tripPackage}
                setFormData={setFormData}
                isPriceTimeValid={isPriceTimeValid}
                setIsPriceTimeValid={setIsPriceTimeValid}
              />
            )}
            {form === "Policy" && (
              <PolicyForm setForm={setForm} tripPackage={tripPackage} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripPackagesForm;
