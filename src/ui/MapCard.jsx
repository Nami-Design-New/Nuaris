import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function MapCard({ title, location, lat, lng }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const position = {
    lat: Number(lat) || 24.7136,
    lng: Number(lng || 46.6753),
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="map-card">
      <div className="content">
        <img src="/images/icons/pin.svg" alt="pin icon" />
        <div className="text">
          <span>{title}</span>
          <p>{location}</p>
        </div>
      </div>
      <div className="map">
        <GoogleMap
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            disableDefaultUI: true,
            clickableIcons: false,
          }}
          zoom={8}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
        >
          <Marker icon="/images/icons/mapPin.svg" position={position}></Marker>
        </GoogleMap>
      </div>
    </div>
  );
}
