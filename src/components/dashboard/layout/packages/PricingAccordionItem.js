import React from "react";
import { Accordion, Form } from "react-bootstrap";
import PricePeriodRow from "./PricePeriodRow";

const PricingAccordionItem = ({ formData, setFormData, day, index }) => {
  const currentObject = formData.find((obj) => obj.day === day);

  return (
    <Accordion.Item key={day} eventKey={index}>
      <Accordion.Header>
        <Form.Check
          checked={formData[index].selected}
          onClick={() => {
            setFormData((prev) => {
              let newFormData = [...prev];
              newFormData[index].selected = !newFormData[index].selected;
              return newFormData;
            });
          }}
          type="switch"
          id={day}
          label={day}
        />
      </Accordion.Header>
      <Accordion.Body>
        <div className="form-ui timesRow">
          {currentObject.periods.map((_, i) => (
            <PricePeriodRow
              formData={formData}
              setFormData={setFormData}
              currentObject={currentObject}
              index={i}
              day={day}
            />
          ))}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PricingAccordionItem;
