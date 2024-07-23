import { Form } from "react-bootstrap";

export default function TextField({ label, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={props.id}>{label}</label>
      <Form.Control as={"textarea"} className="form-control" {...props} />
    </div>
  );
}
