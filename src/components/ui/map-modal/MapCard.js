import pin from "../../../assets/images/pin.svg";
export default function MapCard({ title, location, lat, lng }) {
  return (
    <div className="map-card">
      <div className="content">
        <img src={pin} alt="pin icon" />
        <div className="text">
          <span>{title || "vessel location"}</span>
          <p>{location || "Riyadh, Saudi arabia"}</p>
        </div>
      </div>
      <div className="map"></div>
    </div>
  );
}
