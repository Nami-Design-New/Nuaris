import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { DAYS } from "../../../../utils/constants";
import PageHeader from "./../../layout/PageHeader";
import PackageInfoForm from "../../components/trip-packages/PackageInfoForm";
import PackagePriceTime from "../../components/trip-packages/PackagePriceTime";
import PolicyForm from "../../components/trip-packages/PolicyForm";
import useGetTripPackageById from "./../../../../hooks/trip-packages/useGetTripPackageById";
import Media from "../../components/trip-packages/Media";

export default function TripPackageForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const createdPackageId = searchParams.get("package_id");
  const [formData, setFormData] = useState({});
  const [form, setForm] = useState("Package Info");
  const [isMainInfoValid, setIsMainInfoValid] = useState(
    id || createdPackageId ? true : false
  );
  const [isPriceTimeValid, setIsPriceTimeValid] = useState(
    id || createdPackageId ? true : false
  );

  const { data: tripPackage } = useGetTripPackageById(id || createdPackageId);

  const addonsInitial = {
    addon_id: "",
    quantity: "",
  };

  const activitiesInitial = {
    activity_id: "",
    quantity: "",
  };

  const periodInitial = {
    start_time: "",
    end_time: "",
    price: "",
    period_id: "",
  };

  const pricesInitial = DAYS.map((day, index) => {
    return {
      day,
      index,
      selected: false,
      periods: [periodInitial],
    };
  });

  useEffect(() => {
    let newPrices = pricesInitial;

    if (Array.isArray(tripPackage?.trip_package_days)) {
      newPrices = pricesInitial.map((item) => {
        const packageHours = tripPackage.trip_package_days.find(
          (hour) => hour.day === item.day
        );
        if (packageHours) {
          return {
            ...item,
            periods: packageHours.trip_package_day_periods.map((h) => {
              return {
                start_time: h.start_time.split(":").slice(0, 2).join(":"),
                end_time: h.end_time.split(":").slice(0, 2).join(":"),
                price: h.price,
                period_id: h.period.id,
              };
            }),
            selected: true,
          };
        }
        return item;
      });
    }

    setFormData((prev) => ({
      ...prev,
      name: tripPackage?.name || "",
      description: tripPackage?.description || "",
      yacht_id: tripPackage?.yacht_id || "",
      period_of_activation_from: tripPackage?.period_of_activation_from || "",
      period_of_activation_to: tripPackage?.period_of_activation_to || "",
      location_id: tripPackage?.location_id || "",
      destination_id: tripPackage?.destination_id || "",
      advance_payment_percentage: tripPackage?.advance_payment_percentage || "",
      activities:
        tripPackage?.activities?.length > 0
          ? tripPackage?.activities
          : [activitiesInitial],
      addons:
        tripPackage?.addons?.length > 0 ? tripPackage?.addons : [addonsInitial],

      policy: {
        cancellation_policy: tripPackage?.policy[0]?.cancellation_policy || [
          {
            cancel_before: "",
            percentage: "",
            type: "minutes",
          },
        ],

        weather_restrictions:
          tripPackage?.policy[0]?.weather_restrictions || "",
        rules_and_instructions:
          tripPackage?.policy[0]?.rules_and_instructions || "",
        allowed_and_not_allowed_items:
          tripPackage?.policy[0]?.allowed_and_not_allowed_items,
      },

      trip_package_days: newPrices,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripPackage]);

  const handleFormChange = (newForm) => {
    const steps = ["Package Info", "Media", "Package Time & Price", "Policy"];
    const newFormIndex = steps.indexOf(newForm);
    const currentFormIndex = steps.indexOf(form);
    if (newFormIndex < currentFormIndex) {
      setForm(newForm);
    } else {
      if (
        (form === "Package Info" && isMainInfoValid) ||
        (form === "Package Time & Price" && isPriceTimeValid) ||
        form === "Policy" ||
        form === "Media"
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
      <div className="row">
        <div className="inner_form_wrapper">
          <div className="wizard_tabs">
            {["Package Info", "Media", "Package Time & Price", "Policy"].map(
              (fo, i) => (
                <div
                  key={i}
                  className={`wizard_tab ${form === fo ? "active" : ""}`}
                  onClick={() => handleFormChange(fo)}
                >
                  <div className="step_no">{i + 1}</div>
                  <h6>{fo}</h6>
                </div>
              )
            )}
          </div>
          <div className="bg_white_card">
            {form === "Package Info" && (
              <PackageInfoForm
                id={id}
                setForm={setForm}
                formData={formData}
                setFormData={setFormData}
                isMainInfoValid={isMainInfoValid}
                setIsMainInfoValid={setIsMainInfoValid}
                addonsInitial={addonsInitial}
                activitiesInitial={activitiesInitial}
                createdPackageId={createdPackageId}
              />
            )}
            {form === "Media" && (
              <Media
                id={id}
                setForm={setForm}
                media={tripPackage?.media || []}
                createdPackageId={createdPackageId}
              />
            )}
            {form === "Package Time & Price" && (
              <PackagePriceTime
                id={id}
                setForm={setForm}
                formData={formData}
                setFormData={setFormData}
                isPriceTimeValid={isPriceTimeValid}
                createdPackageId={createdPackageId}
                setIsPriceTimeValid={setIsPriceTimeValid}
              />
            )}
            {form === "Policy" && (
              <PolicyForm
                id={id}
                setForm={setForm}
                formData={formData}
                setFormData={setFormData}
                createdPackageId={createdPackageId}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
