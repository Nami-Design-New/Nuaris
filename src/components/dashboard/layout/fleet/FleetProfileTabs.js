import { Tab, Tabs } from "react-bootstrap";

export default function FleetProfileTabs({ fleet }) {
  return (
    <div className="fleet-part">
      <Tabs>
        <Tab eventKey="description" title="Description">
          <p>
            {fleet?.description ||
              `A yacht is a luxury vessel used for leisure and sport. They vary in
              size from small, sail-powered boats to large motor-powered mega
              yachts with lavish amenities. Yachts typically feature sleek
              designs, high-end interiors, and advanced navigation technology.
              They symbolize wealth and status, often found in exclusive maritime
              locations like the Mediterranean and the Caribbean. Yachts require
              significant investment and are popular among affluent individuals.`}
          </p>
        </Tab>
        <Tab eventKey={"weather"} title={"Weather restriction"}>
          <ol>
            {Array(5)
              .fill(0)
              .map((e, i) => {
                return (
                  <li>
                    {e?.content ||
                      "Wind Conditions: Too little or too much wind can affect sailing."}
                  </li>
                );
              })}
          </ol>
        </Tab>
        <Tab eventKey={"roles"} title={"Roles and instructions"}>
          <ol>
            {Array(7)
              .fill(0)
              .map((e, i) => {
                return (
                  <li>
                    {e?.content ||
                      "Captain: Oversees navigation, safety, and overall management."}
                  </li>
                );
              })}
          </ol>
        </Tab>
        <Tab
          eventKey={"allowed"}
          title={"Allowed and not allowed items on board"}
        >
          <ol className="bold-list">
            <li>Allowed Items:</li>
            <ol className="alpha">
              {Array(7)
                .fill(0)
                .map((e) => {
                  return (
                    <li>
                      {e?.content ||
                        "Personal Clothing and Gear: Suitable for the weather and activities planned."}
                    </li>
                  );
                })}
            </ol>
            <li>Not Allowed Items:</li>
            <ol className="alpha">
              {Array(7)
                .fill(0)
                .map((e) => {
                  return (
                    <li>
                      {e?.content ||
                        "Illegal Substances: Drugs, certain plants or animals, etc."}
                    </li>
                  );
                })}
            </ol>
          </ol>
        </Tab>
        <Tab eventKey={"cancelation"} title={"Cancelation policy"}>
          <p>
            If cancel before <span>2</span> days refund in <span>10%</span>
          </p>
          <p>
            If cancel before <span>5</span> days refund in <span>20%</span>
          </p>
        </Tab>
      </Tabs>
    </div>
  );
}
