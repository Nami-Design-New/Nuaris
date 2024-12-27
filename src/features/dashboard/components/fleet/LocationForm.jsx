import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import SelectField from "../../../../ui/form-elements/SelectField";
import MapLocationField from "../../../../ui/form-elements/MapLocationField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import MapModal from "../../../../ui/modals/MapModal";
import axiosInstance from "../../../../utils/axiosInstance";
import useGetDirections from "./../../../../hooks/location-destination/useGetDirections";

const LocationForm = ({
  id,
  setForm,
  formData,
  setFormData,
  isValid,
  setIsValid,
  createdYachtId
}) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [showModalMeeting, setShowModalMeeting] = useState(false);
  const [meetingLocation, setMeetingLocation] = useState(
    formData?.meeting_location?.address || "Search on Map"
  );

  const { data: locations } = useGetDirections("Location");

  useEffect(() => {
    if (meetingLocation) {
      setFormData({
        ...formData,
        meeting_location: {
          lat: formData.meeting_location?.lat,
          lng: formData.meeting_location?.lng,
          address: meetingLocation
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingLocation]);

  const changeLocation = (e) => {
    const value = e.target.value;
    const location = locations?.data?.find((l) => l?.id === Number(value));
    
    setMeetingLocation(location?.name_on_map);
    setFormData({
      ...formData,
      fleet_location_id: location?.id,
      meeting_location: {
        lat: location?.point?.lat,
        lng: location?.point?.lng,
        address: location?.name_on_map
      }
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Crew");
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      step_id: 2,
      yacht_id: id || createdYachtId,
      fleet_location_id: formData.fleet_location_id,
      meeting_location: formData.meeting_location
    };
    try {
      const response = await axiosInstance.post(
        "/yacht/create_yacht",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Yacht Location Info Saved Successfully");
        setForm("Crew");
        setIsValid(true);
        queryClient.invalidateQueries(["yachts"]);
        queryClient.invalidateQueries(["yacht", id || createdYachtId]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="form_title">Location</h6>
        </div>
        {/* location */}
        <div className="col-12 p-2">
          <SelectField
            label="Vessel Location"
            required
            id="fleet_location_id"
            name="fleet_location_id"
            value={formData.fleet_location_id}
            options={locations?.data?.map((location) => ({
              name: location?.name,
              value: location?.id
            }))}
            onChange={(e) => changeLocation(e)}
          />
        </div>
        {/* meeting location lat & lng */}
        <div className="col-12 p-2">
          <MapLocationField
            htmlFor="meetingLocation"
            label="Meeting Location"
            name={meetingLocation}
            setShowModal={setShowModalMeeting}
          />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3 ">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            name="Save"
            loading={loading}
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>

      {/* map modal meeting location */}
      <MapModal
        showModal={showModalMeeting}
        setShowModal={setShowModalMeeting}
        setFormData={setFormData}
        formData={formData}
        target="meeting_location"
        title="Meeting Location"
        showLocationFirst={true}
        setSearchedPlace={setMeetingLocation}
      />
    </form>
  );
};

export default LocationForm;
