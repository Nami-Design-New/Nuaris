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
          weather restriction
        </Tab>
        <Tab eventKey={"roles"} title={"Roles and instructions"}>
          roles and instructions
        </Tab>
        <Tab
          eventKey={"allowed"}
          title={"Allowed and not allowed items on board"}
        >
          allowed and not allowed items on board
        </Tab>
        <Tab eventKey={"cancelation"} title={"Cancelation policy"}>
          cancelation policy
        </Tab>
      </Tabs>
    </div>
  );
}
