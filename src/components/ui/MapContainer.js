import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = ({ google, markerPosition, onMarkerDragEnd }) => {
  return (
    <Map
      google={google}
      zoom={14}
      initialCenter={{
        lat: markerPosition.lat,
        lng: markerPosition.lng
      }}
    >
      <Marker
        position={{
          lat: markerPosition.lat,
          lng: markerPosition.lng
        }}
        draggable={true}
        onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey:
    "AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw&libraries=places&callback=initMap"
})(MapContainer);
