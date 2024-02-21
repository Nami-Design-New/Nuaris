import { Form } from "react-bootstrap";

const CheckFieldGroup = ({ label, name, onChange }) => {
  return (
    <div className="check_field">
      <Form.Check
        type="switch"
        value={label}
        id={label}
        label={name}
        onChange={onChange}
      />
    </div>
  );
};

export default CheckFieldGroup;
