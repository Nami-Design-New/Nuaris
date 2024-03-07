import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import TimeRow from "./TimeRow";
import addIcon from "../../assets/images/addRow.svg";

const DayAccordionItem = ({ day, index, setFormData }) => {
  const [timeRows, setTimeRows] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setFormData(day, []);
    }
  };

  const handleAddTimeRow = () => {
    setTimeRows([...timeRows, {}]);
    if (!isChecked) {
      setIsChecked(true);
      setFormData(day, []);
    }
  };

  const handleDeleteTimeRow = (index) => {
    const newTimeRows = [...timeRows];
    newTimeRows.splice(index, 1);
    setTimeRows(newTimeRows);
    setFormData(day, newTimeRows);
  };

  const handleSetHours = (hours) => {
    setFormData(day, hours);
  };

  return (
    <Accordion.Item key={day} eventKey={index}>
      <Accordion.Header>
        <Form.Check
          type="switch"
          id={day}
          label={day}
          checked={isChecked}
          onChange={handleCheck}
        />
      </Accordion.Header>
      <Accordion.Body>
        <div className="form-ui timesRow">
          <div className="time_row">
            {/* From time */}
            <div className="input-field">
              <input type="time" required />
            </div>
            {/* To time */}
            <div className="input-field">
              <input type="time" required />
            </div>
            <button onClick={handleAddTimeRow}>
              <img src={addIcon} alt="addIcon" />
            </button>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default DayAccordionItem;
