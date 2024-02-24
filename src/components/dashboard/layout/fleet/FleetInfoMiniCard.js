import male from "../../../../assets/images/male.svg";
import female from "../../../../assets/images/female.svg";

export default function FleetInfoMiniCard({
  icon,
  title,
  text,
  per,
  crewGenders,
}) {
  return (
    <div className="col-12 col-md-6 col-lg-3 p-2">
      <div className="fleet-info-minicard">
        <div className="content">
          <img src={icon} alt="fleet" />
          <div className="text">
            <span>{title}</span>
            <p>
              {text} {per && <span className="text-lowercase">/ {per}</span>}
            </p>
          </div>
        </div>
        {crewGenders && (
          <div className="crew_gender">
            {crewGenders?.includes("male") && <img src={male} alt="male" />}
            {crewGenders?.includes("female") && (
              <img src={female} alt="female" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
