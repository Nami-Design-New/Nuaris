import { Form } from "react-bootstrap";

const CheckFieldPermissions = ({ name, id, onChange }) => {
  return (
    <div className="check_field">
      <Form.Check type="switch" id={id} label={name} onChange={onChange} />
    </div>
  );
};

export default CheckFieldPermissions;
