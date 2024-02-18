import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CheckFieldPermissions = ({ label, name, id, formData, setFormData }) => {
  const permissions = useSelector(state => state.permissions.permissions);
  const handleAddPermission = () => {
    const pe = permissions.find(p => p.id === id);
    setFormData({ ...formData, permissions: [...formData.permissions, pe] });
  };
  return (
    <div className="check_field">
      <Form.Check
        type="switch"
        id={label}
        label={name}
        onChange={handleAddPermission}
      />
    </div>
  );
};

export default CheckFieldPermissions;
