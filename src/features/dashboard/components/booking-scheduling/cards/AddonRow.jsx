import InputField from "../../../../../ui/form-elements/InputField";
import SelectField from "../../../../../ui/form-elements/SelectField";

const AddonRow = ({ formData, setFormData, addons }) => {
  const addAddonRow = () => {
    setFormData((prev) => ({
      ...prev,
      booking_addons: [
        ...prev.booking_addons,
        { addon_id: "", quantity: "", price_id: "" },
      ],
    }));
  };

  const handleDeleteRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      booking_addons: prev.booking_addons.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      booking_addons: prev.booking_addons.map((addon, i) => {
        if (index !== i) return addon;
        return {
          ...addon,
          [name]: value,
        };
      }),
    }));
  };

  return (
    <>
      <div className="col-12 p-2 d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Addons</h6>
        <button type="button" onClick={addAddonRow}>
          <img
            style={{ height: "20px", marginRight: "8px" }}
            src={"/images/icons/add.svg"}
            alt="addrow"
          />
        </button>
      </div>
      {formData?.booking_addons?.length > 0 && (
        <div className="col-12 p-2 d-flex flex-column gap-2 mb-2">
          {formData?.booking_addons?.map((addon, index) => (
            <div className="addons_wrapper" key={index}>
              <SelectField
                label="Addon"
                id="addon_id"
                name="addon_id"
                value={addon.addon_id}
                options={addons?.data?.map((addon) => ({
                  name: addon.name,
                  value: addon.id,
                }))}
                onChange={(e) => handleChange(e, index)}
              />
              <InputField
                label="Quantity"
                id={`quantity-${index}`}
                name="quantity"
                type="number"
                placeholder="00"
                min="1"
                value={addon.quantity}
                onChange={(e) => handleChange(e, index)}
              />
              <div className="add_button">
                <button type="button" onClick={() => handleDeleteRow(index)}>
                  <img src={"/images/icons/delete.svg"} alt="addrow" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddonRow;
