import { Accordion, Form } from "react-bootstrap";
import TimeRow from "./TimeRow";

const DayAccordionItem = ({ formData, day, index, setFormData }) => {
  const currentObject = formData.find((obj) => obj.day === day);

  function handleCheck(e) {
    const { checked } = e.target;


    setFormData((prev) => {
      return [
        ...prev.filter((obj) => obj.day !== day),
        {
          ...currentObject,
          selected: checked,
        },
      ];
    });
  }

  return (
    <Accordion.Item key={day} eventKey={index}>
      <Accordion.Header>
        <Form.Check onClick={handleCheck} type="switch" id={day} label={day} />
      </Accordion.Header>
      <Accordion.Body>
        <div className="form-ui timesRow">
          {currentObject.hours.map((_, i) => (
            <TimeRow
              key={i}
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

export default DayAccordionItem;
