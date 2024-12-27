import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import InputField from "./../form-elements/InputField";
import GoogleMaps from "./../GoogleMaps";
import SubmitButton from "./../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import SelectField from "./../form-elements/SelectField";
import useGetCountries from "../../hooks/app/useGetCountries";

const AddDestinationModal = ({
  showModal,
  setShowModal,
  target,
  setTarget,
}) => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "Destination";
  const page = searchParams.get("page") || 1;

  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState("Search on Map");
  const [showLocationFirst, setShowLocationFirst] = useState(false);

  const [LocationPoint, setLocationPoint] = useState({
    lat: 24.7136,
    lng: 46.6753,
  });

  const [formData, setFormData] = useState({
    point: LocationPoint,
    location_type: "",
    name: "",
    city_id: "",
    country_id: "",
    name_on_map: "",
  });

  const { data: countries } = useGetCountries();

  useEffect(() => {
    if (target && target.point && target.name_on_map) {
      setFormData({
        direction_id: target?.id,
        location_type: target?.location_type,
        name: target?.name,
        city_id: target?.city?.id,
        country_id: target?.city?.country_id,
        name_on_map: target?.name_on_map,
      });
      setLocationPoint({
        lat: target.point.lat,
        lng: target.point.lng,
      });
      setSearchedPlace(target.name_on_map);
      setShowLocationFirst(true);
    } else {
      setShowLocationFirst(false);
    }
  }, [target]);

  const handleSelectCity = (city) => {
    const cities = countries.find(
      (c) => c.id === Number(formData.country_id)
    )?.cities;

    const selected = cities?.find((c) => c.id === Number(city));

    setFormData((prev) => ({
      ...prev,
      city_id: city,
    }));

    setLocationPoint({
      lat: Number(selected?.lat).toFixed(6),
      lng: Number(selected?.lng).toFixed(6),
    });
    setSearchedPlace(selected.name);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      name_on_map: searchedPlace,
      point: LocationPoint,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedPlace]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endPoint = target?.id
      ? "/location/update_direction"
      : "/location/create_direction";

    try {
      const res = await axiosInstance.post(endPoint, formData);
      if (res.status === 201 || res.status === 200) {
        toast.success(
          `${
            formData?.location_type === "Location" ? "Location" : "Destination"
          } ${target?.id ? "updated" : "added"} successfully`
        );
        queryClient.invalidateQueries(["destinations", filter, page]);
        hideModal();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const hideModal = () => {
    setFormData({
      name: "",
      name_on_map: "",
      location_type: "",
      city_id: "",
      country_id: "",
      point: {
        lat: 24.7136,
        lng: 46.6753,
      },
    });
    setTarget({});
    setLocationPoint({
      lat: 24.7136,
      lng: 46.6753,
    });
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={hideModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Add New Destination</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit}>
          <div className="row">
            {/* --- */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label={"Location Name"}
                placeholder={"write here"}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            {/* --- */}
            <div className="col-lg-6 col-12 p-2">
              <SelectField
                label={"Type"}
                value={formData.location_type}
                placeholder={"write here"}
                id={"type"}
                options={[
                  {
                    name: "Destination",
                    value: "Destination",
                  },
                  {
                    name: "Location",
                    value: "Location",
                  },
                ]}
                onChange={(e) =>
                  setFormData({ ...formData, location_type: e.target.value })
                }
              />
            </div>
            {/* --- */}
            <div className="col-lg-6 col-12 p-2">
              <SelectField
                label="Country"
                required
                id="country"
                name="country"
                value={formData.country_id}
                options={countries?.map((country) => ({
                  name: country?.name,
                  value: country?.id,
                }))}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    country_id: e.target.value,
                    city_id: "",
                  });
                }}
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <SelectField
                label="City"
                required
                name="city"
                id="city"
                value={formData.city_id}
                options={countries
                  ?.find((c) => c?.id === Number(formData?.country_id))
                  ?.cities?.map((city) => ({
                    name: city?.name,
                    value: city?.id,
                  }))}
                onChange={(e) => handleSelectCity(e.target.value)}
              />
            </div>
            <div className="col-12 p-2">
              {mapLoaded && (
                <GoogleMaps
                  formData={LocationPoint}
                  setFormData={setLocationPoint}
                  setSearchedPlace={setSearchedPlace}
                  showLocationFirst={showLocationFirst}
                />
              )}
            </div>
            <div className="col-12 p-2">
              <SubmitButton name={"Save"} loading={loading} />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDestinationModal;
