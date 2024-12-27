export default function FleetInfoMiniCard({
  icon,
  title,
  text,
  per,
  crewGenders,
}) {
  return (
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
          {crewGenders === "male" && (
            <img src="/images/icons/male.svg" alt="male" />
          )}
          {crewGenders === "female" && (
            <img src="/images/icons/female.svg" alt="female" />
          )}
          {crewGenders === "both" && (
            <>
              <img src="/images/icons/male.svg" alt="male" />
              <img src="/images/icons/female.svg" alt="female" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
