import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import InputField from "./form-elements/InputField";
import addIcon from "../../assets/images/addRow.svg";
import TimeRow from "./TimeRow";

const DayAccordionItem = ({ day, index, formData, setFormData }) => {
  const [timeRows, setTimeRows] = useState([]);

  const handleAddTimeRow = (e) => {
    e.preventDefault();
    setTimeRows([...timeRows, {}]);
  };

  const handleDeleteTimeRow = (index) => {
    const newTimeRows = [...timeRows];
    newTimeRows.splice(index, 1);
    setTimeRows(newTimeRows);
  };

  return (
    <Accordion.Item key={day} eventKey={index}>
      <Accordion.Header>
        <Form.Check type="switch" id={day} label={day} />
      </Accordion.Header>
      <Accordion.Body>
        <div className="form-ui timesRow">
          <div className="time_row">
            {/* From time */}
            <InputField
              type="time"
              htmlFor={`fromTime-${day}`}
              id={`fromTime-${day}`}
              formData={formData}
              setFormData={setFormData}
            />
            {/* To time */}
            <InputField
              type="time"
              htmlFor={`toTime-${day}`}
              id={`toTime-${day}`}
              formData={formData}
              setFormData={setFormData}
            />
            <button onClick={handleAddTimeRow}>
              <img src={addIcon} alt="addIcon" />
            </button>
          </div>
          {timeRows.map((_, rowIndex) => (
            <TimeRow
              key={rowIndex}
              index={rowIndex}
              day={day}
              formData={formData}
              setFormData={setFormData}
              onDelete={handleDeleteTimeRow}
            />
          ))}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default DayAccordionItem;
