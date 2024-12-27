import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { filterEmptyKeys, handleChange } from "../../../../utils/helper";
import { PAGE_SIZE } from "../../../../utils/constants";
import useGetYachts from "./../../../../hooks/yacht/useGetYachts";
import useGetAddons from "../../../../hooks/addons/useGetAddons";
import useGetActivities from "./../../../../hooks/activities/useGetActivities";
import InputField from "../../../../ui/form-elements/InputField";
import DatePicker from "../../../../ui/form-elements/DatePicker";
import SelectField from "./../../../../ui/form-elements/SelectField";
import TextField from "../../../../ui/form-elements/TextField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import AddonsToConnect from "./AddonsToConnect";
import ActivitiesToConnect from "./ActivitiesToConnect";
import axiosInstance from "../../../../utils/axiosInstance";
import useGetDirections from "./../../../../hooks/location-destination/useGetDirections";

const PackageInfoForm = ({
  id,
  setForm,
  formData,
  setFormData,
  isMainInfoValid,
  setIsMainInfoValid,
  addonsInitial,
  activitiesInitial,
  createdPackageId,
}) => {
  const [, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { data: yachts } = useGetYachts(PAGE_SIZE);
  const { data: addons } = useGetAddons(PAGE_SIZE);
  const { data: activities } = useGetActivities(PAGE_SIZE);
  const { data: locations } = useGetDirections("Location");
  const { data: destinations } = useGetDirections("Destination");

  const handleNext = (e) => {
    e.preventDefault();
    if (isMainInfoValid) {
      setForm("Package Time & Price");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isObjectEmpty = (obj) => {
      return Object.values(obj).every(
        (value) => value === "" || value === null
      );
    };

    const filteredActivities =
      formData.activities.length === 1 && isObjectEmpty(formData.activities[0])
        ? []
        : formData.activities;

    const filteredAddons =
      formData.addons.length === 1 && isObjectEmpty(formData.addons[0])
        ? []
        : formData.addons;

    const payload = filterEmptyKeys({
      step_id: 1,
      name: formData.name,
      description: formData.description,
      period_of_activation_from: formData.period_of_activation_from,
      period_of_activation_to: formData.period_of_activation_to,
      yacht_id: Number(formData.yacht_id),
      location_id: Number(formData.location_id),
      destination_id: Number(formData.destination_id),
      activities: filteredActivities,
      advance_payment_percentage: formData.advance_payment_percentage,
      addons: filteredAddons,
    });
    if (id || createdPackageId) {
      payload.trip_package_id = id || createdPackageId;
    }

    try {
      const response = await axiosInstance.post(
        "/trip/create_trip_package",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Trip Package Main Info Saved Successfully");
        setForm("Package Time & Price");
        setIsMainInfoValid(true);
        queryClient.invalidateQueries({ queryKey: ["trip-packages"] });
        queryClient.invalidateQueries({
          queryKey: ["trip-package", createdPackageId || id],
        });
        setSearchParams({ package_id: response.data.id });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="form_title">Package Info</h6>
        </div>

        <div className="col-lg-6 col-12 p-2">
          <InputField
            required
            type="text"
            label="Package Name"
            name="name"
            id="name"
            placeholder="write here"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            required
            id="yacht_id"
            name="yacht_id"
            label="Parent Yacht"
            value={formData.yacht_id}
            onChange={(e) => handleChange(e, setFormData)}
            options={yachts?.data?.map((yacht) => ({
              name: yacht.name_en,
              value: yacht.id,
            }))}
          />
        </div>
        <div className="col-12 p-2">
          <InputField
            id="advance_payment_percentage"
            name="advance_payment_percentage"
            label="Advance Payment Percentage"
            placeholder="00"
            value={formData.advance_payment_percentage}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            required
            id="location_id"
            name="location_id"
            label="Location"
            value={formData.location_id}
            onChange={(e) => handleChange(e, setFormData)}
            options={locations?.data?.map((location) => ({
              name: location.name,
              value: location.id,
            }))}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            required
            id="destination_id"
            name="destination_id"
            label="Destination"
            value={formData.destination_id}
            onChange={(e) => handleChange(e, setFormData)}
            options={destinations?.data?.map((des) => ({
              name: des.name,
              value: des.id,
            }))}
          />
        </div>
        <div className="col-lg-12 p-2 input-field">
          <label>Period of package activation </label>
          <div className="row px-2">
            <div className="col-lg-6 col-12 p-2">
              <DatePicker
                beforeContent={"From"}
                value={formData.period_of_activation_from}
                id="period_of_activation_from"
                name="period_of_activation_from"
                required
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <DatePicker
                beforeContent={"To"}
                value={formData.period_of_activation_to}
                id="period_of_activation_to"
                name="period_of_activation_to"
                required
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
          </div>
        </div>
        <div className="col-12 p-2">
          <TextField
            label="Description"
            id="description"
            name="description"
            placeholder="Write here"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <AddonsToConnect
          addons={addons?.data}
          formData={formData}
          setFormData={setFormData}
          addonsInitial={addonsInitial}
        />
        <ActivitiesToConnect
          formData={formData}
          activities={activities?.data}
          setFormData={setFormData}
          activitiesInitial={activitiesInitial}
        />
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default PackageInfoForm;
