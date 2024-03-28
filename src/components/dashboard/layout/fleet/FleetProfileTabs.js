import { Tab, Tabs } from "react-bootstrap";

export default function FleetProfileTabs({ fleet }) {
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };
  return (
    <div className="col-12 p-2">
      <div className="fleet-part">
        <Tabs>
          <Tab eventKey="description" title="Description">
            <p>{fleet?.description_en}</p>
          </Tab>
          <Tab eventKey={"weather"} title={"Weather restriction"}>
            {fleet?.policies && (
              <p
                dangerouslySetInnerHTML={renderHTML(
                  fleet?.policies[0]?.weather_restrictions
                )}
              ></p>
            )}
          </Tab>
          <Tab eventKey={"roles"} title={"Roles and instructions"}>
            {fleet?.policies && (
              <p
                dangerouslySetInnerHTML={renderHTML(
                  fleet?.policies[0]?.rules_and_instructions
                )}
              ></p>
            )}
          </Tab>
          <Tab
            eventKey={"allowed"}
            title={"Allowed and not allowed items on board"}
          >
            {fleet?.policies && (
              <p
                dangerouslySetInnerHTML={renderHTML(
                  fleet?.policies[0]?.allowed_and_not_allowed_items
                )}
              ></p>
            )}
          </Tab>
          <Tab eventKey={"cancelation"} title={"Cancellation policy"}>
            {fleet?.policies &&
              fleet?.policies[0]?.cancellation_policies.map((policy, index) => (
                <p key={index}>
                  If canceled before <span>{policy.cancel_before}</span>{" "}
                  {policy.type} refund is <span>{policy.percentage}%</span>
                </p>
              ))}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
