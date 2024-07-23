import { Form } from "react-bootstrap";

export default function SelectField({ label, options, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={props?.id}>{label}</label>
      <Form.Select {...props}>
        <option value="" disabled>
          Select
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
