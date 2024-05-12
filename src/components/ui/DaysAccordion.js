import React from "react";
import { Accordion } from "react-bootstrap";
import DayAccordionItem from "./DayAccordionItem";
import { DAYS } from "../../constants";

const DaysAccordion = ({ formData, setFormData }) => {
  return (
    <Accordion>
      {DAYS.map((day, index) => (
        <DayAccordionItem
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

export default DaysAccordion;
