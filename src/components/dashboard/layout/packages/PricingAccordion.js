import React from "react";
import { Accordion } from "react-bootstrap";
import { DAYS } from "../../../../constants";
import PricingAccordionItem from "./PricingAccordionItem";

const PricingAccordion = ({ formData, setFormData }) => {
  return (
    <Accordion>
      {DAYS.map((day, index) => (
        <PricingAccordionItem
          key={index}
          day={day}
          index={index}
          setFormData={setFormData}
          formData={formData}
        />
      ))}
    </Accordion>
  );
};

export default PricingAccordion;
