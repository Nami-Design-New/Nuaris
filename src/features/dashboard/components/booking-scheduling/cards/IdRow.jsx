import InputField from "../../../../../ui/form-elements/InputField";

const IdRow = ({ formData, setFormData }) => {
  const addClientRow = () => {
    setFormData((prev) => ({
      ...prev,
      clients: [...prev.clients, { name: "", id_number: "", dob: "" }],
    }));
  };

  const handleDeleteRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      clients: prev.clients.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      clients: prev.clients.map((addon, i) => {
        if (index !== i) return addon;
        return {
          ...addon,
          [name]: value,
        };
      }),
    }));
  };

  return (
    <div className="d-flex flex-column gap-2">
      {formData?.clients?.map((client, index) => (
        <div className="id_row" key={index}>
          <InputField
            label="Name"
            id="name"
            name="name"
            placeholder="EX: mahmoud gamal"
            value={client.name}
            required
            onChange={(e) => handleChange(e, index)}
          />
          <InputField
            label="ID Number"
            id="id_number"
            name="id_number"
            required
            placeholder="EX: 123456789"
            value={client.id_number}
            onChange={(e) => handleChange(e, index)}
          />
          <InputField
            label="Date Of Birth"
            type="date"
            id="dob"
            name="dob"
            required
            value={client.dob}
            onChange={(e) => handleChange(e, index)}
          />
          <div className="add_button">
            <button
              type="button"
              onClick={
                index === 0 ? addClientRow : () => handleDeleteRow(index)
              }
            >
              <img
                src={
                  index === 0
                    ? "/images/icons/addRow.svg"
                    : "/images/icons/delete.svg"
                }
                alt="addRow"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdRow;
