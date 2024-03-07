import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import DayAccordionItem from "./DayAccordionItem";
import { DAYS } from "../../constants";

const DaysAccordion = ({ setFormData }) => {
  const [daysArray, setDaysArray] = useState([]);

  const handleSetFormData = (day, hours) => {
    const updatedDaysArray = [...daysArray];
    const index = updatedDaysArray.findIndex((item) => item.day === day);
    if (index !== -1) {
      updatedDaysArray[index].hours = hours;
    } else {
      updatedDaysArray.push({ day, hours });
    }
    setDaysArray(updatedDaysArray);
    setFormData(updatedDaysArray);
  };

  return (
    <Accordion>
      {DAYS.map((day, index) => (
        <DayAccordionItem
          day={day}
          index={index}
          key={day}
          daysArray={daysArray}
          setDaysArray={setDaysArray}
          setFormData={handleSetFormData}
        />
      ))}
    </Accordion>
  );
};

export default DaysAccordion;
