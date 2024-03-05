import React from "react";
import Accordion from "react-bootstrap/Accordion";
import DayAccordionItem from "./DayAccordionItem";

const DaysAccordion = ({ formData, setFormData }) => {
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return (
    <Accordion>
      {days.map((day, index) => (
        <DayAccordionItem
          day={day}
          index={index}
          key={day}
          formData={formData}
          setFormData={setFormData}
        />
      ))}
    </Accordion>
  );
};

export default DaysAccordion;
