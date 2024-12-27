import FleetMediaSwiper from "./FleetMediaSwiper";
import MapCard from "./../../../../../ui/MapCard";
import useGetDirections from "../../../../../hooks/location-destination/useGetDirections";

export default function FleetProfileMedia({ fleet }) {
  const { data: loacations } = useGetDirections("Location");
  return (
    <>
      <div className="col-lg-6 col-12 p-2">
        <FleetMediaSwiper state={fleet?.state} media={fleet?.media || []} />
      </div>
      <div className="col-lg-3 col-12 p-2">
        <MapCard
          title={"Vessel Location"}
          location={
            loacations?.data?.find(
              (location) => location?.id === fleet?.fleet_location_id
            )?.name
          }
          lat={
            loacations?.data?.find(
              (location) => location?.id === fleet?.fleet_location_id
            )?.point?.lat
          }
          lng={
            loacations?.data?.find(
              (location) => location?.id === fleet?.fleet_location_id
            )?.point?.lng
          }
        />
      </div>
      <div className="col-lg-3 col-12 p-2">
        <MapCard
          title={"Meeting Client Place"}
          location={fleet?.meeting_location?.address}
          lat={fleet?.meeting_location?.lat}
          lng={fleet?.meeting_location?.lng}
        />
      </div>
    </>
  );
}
