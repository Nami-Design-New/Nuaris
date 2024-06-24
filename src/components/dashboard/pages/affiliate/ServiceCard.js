import trashIcon from "../../../../assets/images/delete.svg";
import { OPTIONS } from "../../../../constants";
import CheckboxInput from "../../../ui/form-elements/CheckboxInput";
import InputField from "../../../ui/form-elements/InputField";
import SelectField from "../../../ui/form-elements/SelectField";

function ServiceCard({ index, service, lenght, onDelete, onChange }) {
  return (
    <div className="col-12 p-2">
      <div className="service_discounst_box">
        <div className="d-flex align-items-center justify-content-between">
          <p className="card_header">Service {index + 1}</p>
          <button
            style={{ opacity: lenght === 1 ? 0.5 : 1 }}
            disabled={lenght === 1}
            onClick={(e) => onDelete(e, index)}
          >
            <img src={trashIcon} alt="delete" />
          </button>
        </div>
        <div className="m-0 col-12 d-flex flex-column gap-4">
          {/*  Affiliate link options */}
          <div className="col-12 ">
            <SelectField
              htmlFor="type"
              label=" Affiliate link options"
              id="boatType"
              value={service.service}
              setFormData={onChange}
              formData={service}
              options={OPTIONS}
            />
          </div>
          {/* Special Discount */}
          <div className="col-12 d-flex align-items-center">
            <CheckboxInput
              name="generate_special_discount"
              label=" Generate a special discount code"
              checked={service.generate_special_discount}
              onChange={onChange}
            />
          </div>
          {/* Discount */}
          <div className="row col-12 m-0">
            {/*  Boat */}
            <div className="col-lg-4 col-12 m-0">
              <SelectField
                htmlFor="type"
                label=" Boat"
                id="boatType"
                value={service.boat}
                formData={service}
                setFormData={onChange}
                options={OPTIONS}
              />
            </div>
            {/* Discount */}
            <div className="row col-lg-4 col-12 m-0">
              <div className="col-6 m-0">
                <SelectField
                  htmlFor="discount_way"
                  label=" Discount"
                  id="discount_way"
                  value={service.discount_way}
                  formData={service}
                  setFormData={onChange}
                  options={OPTIONS}
                />
              </div>
              <div className="col-6 m-0 d-flex align-items-end">
                <InputField
                  type="number"
                  htmlFor="discount_value"
                  value={service.value}
                  placeholder="00"
                  id="discount_value"
                  formData={service}
                  setFormData={onChange}
                />
              </div>
            </div>
            {/* Discount code */}
            <div className="col-4 m-0">
              <InputField
                type="number"
                htmlFor="discount_code"
                label="Code name"
                value={service.discount_code}
                placeholder="EX: mxxxx"
                id="discount_code"
                formData={service}
                setFormData={onChange}
              />
            </div>
          </div>
          {/* Link period */}
          <div className="row col-12 p-2 m-0">
            <h6 className="col-12 m-0">Link period</h6>
            <div className="row col-12 p-0 row m-0">
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  type="date"
                  htmlFor="DateFrom"
                  label="From"
                  id="date_from"
                  formData={service}
                  setFormData={onChange}
                />
              </div>
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  type="date"
                  htmlFor="DateTo"
                  label="To"
                  id="date_to"
                  formData={service}
                  setFormData={onChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
