import { Tab, Tabs } from "react-bootstrap";

export default function FleetProfileTabs({ fleet }) {
  return (
    <div className="col-12 p-2">
      <div className="fleet-part">
        <Tabs>
          <Tab eventKey="description" title="Description">
            <p>{fleet?.description_en}</p>
          </Tab>
          <Tab eventKey={"weather"} title={"Weather restriction"}>
            <p>{fleet?.policies[0]?.weather_restrictions}</p>
          </Tab>
          <Tab eventKey={"roles"} title={"Roles and instructions"}>
            <p>{fleet?.policies[0]?.rules_and_instructions}</p>
          </Tab>
          <Tab
            eventKey={"allowed"}
            title={"Allowed and not allowed items on board"}
          >
            <p>{fleet?.policies[0]?.allowed_and_not_allowed_items}</p>
          </Tab>
          <Tab eventKey={"cancelation"} title={"Cancelation policy"}>
            <p>
              If cancel before{" "}
              <span>
                {fleet?.policies[0]?.cancellation_policies[0]?.cancel_before}
              </span>{" "}
              {fleet?.policies[0]?.cancellation_policies[0]?.type} refund in{" "}
              <span>
                {fleet?.policies[0]?.cancellation_policies[0]?.percentage} %
              </span>
            </p>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
