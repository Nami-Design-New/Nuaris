import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CheckFieldGroup = ({ label, name, id, formData, setFormData }) => {
  const groups = useSelector(state => state.permissionsGroups.permissionsGroups);
  const handleAddPermission = () => {
    const pe = groups.find(g => g.id === id);
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

export default CheckFieldGroup;
