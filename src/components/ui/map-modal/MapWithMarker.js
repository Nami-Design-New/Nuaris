import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";

const MapWithMarker = ({ formData, setFormData, setSerchedPlace }) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: Number(formData.lat),
    lng: Number(formData.lng),
  });
  const [searchInput, setSearchInput] = useState("");
  const searchBox = useRef(null);

  useEffect(() => {
    reverseGeocodeMarkerPosition();
  }, []);

  const handleMarkerDragEnd = (coord) => {
    setMarkerPosition(coord);
    setFormData({
      ...formData,
      lat: coord.lat.toFixed(6),
      lng: coord.lng.toFixed(6),
    });
    reverseGeocodeMarkerPosition(coord); // Pass the dragged position
  };

  const reverseGeocodeMarkerPosition = (position) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setSearchInput(results[0].formatted_address);
          setSerchedPlace(results[0].formatted_address); // Set searched place
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const handlePlaceSelect = () => {
    const places = searchBox.current.getPlaces();
    if (places.length > 0) {
      const selectedPlace = places[0];
      const position = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };
      setMarkerPosition(position);
      setFormData({
        ...formData,
        lat: position.lat.toFixed(6),
        lng: position.lng.toFixed(6),
      });
      setSearchInput(selectedPlace.name);
      setSerchedPlace(selectedPlace.name);
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "300px" }}
      zoom={10}
      center={markerPosition}
    >
      <Marker
        position={markerPosition}
        draggable={true}
        onDragEnd={(e) => {
          handleMarkerDragEnd({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }}
      />
      <StandaloneSearchBox
        onLoad={(ref) => (searchBox.current = ref)}
        onPlacesChanged={handlePlaceSelect}
      >
        <input
          type="search"
          placeholder="Search places..."
          className="mapSearchInput"
          value={searchInput}
          onChange={handleInputChange}
        />
      </StandaloneSearchBox>
    </GoogleMap>
  );
};

export default MapWithMarker;
