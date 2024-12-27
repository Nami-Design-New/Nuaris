import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { formatNumber, stripSpaces } from "../../../../utils/helper";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import useGetVats from "../../../../hooks/app/useGetVats";
import axiosInstance from "../../../../utils/axiosInstance";
import SelectField from "../../../../ui/form-elements/SelectField";
import InputField from "../../../../ui/form-elements/InputField";
import useGetOrganizationInfo from "../../../../hooks/user/useGetOrganizationInfo";

const RegisterVat = () => {
  const { data: organization } = useGetOrganizationInfo();
  const { data: vats } = useGetVats();

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    vat_registration_number: "",
  });

  useEffect(() => {
    setFormData({
      country: organization?.vat_predefined_country_code || "",
      vat_registration_number: organization?.vat_registration_number || "",
    });
  }, [organization]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/organization/update_organization_vat",
        formData
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("VAT updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["organization-info"],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleNumberChange = (e) => {
    let { value } = e.target;
    value = stripSpaces(value);
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const formattedValue = formatNumber(value);
    setFormData({ ...formData, [e.target.name]: value });
    e.target.value = formattedValue;
  };

  return (
    <div className="bg_white_card">
      <form className="form_ui" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 p-2">
            <div className="vat_row form_ui">
              <div className="row">
                <div className="col-12 p-2 d-flex justify-content-end pt-0 pb-0">
                  <Form.Check id="vat" type="switch" />
                </div>

                <div className="col-12 p-2">
                  <div className="input-field">
                    <label
                      htmlFor="companyLocation"
                      className="form_check_label"
                    >
                      Country of the VAT Registration
                    </label>
                    <SelectField
                      name="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      options={vats?.map((c) => ({
                        name: c?.country?.name,
                        value: c?.country?.code,
                      }))}
                    />
                  </div>
                </div>

                <div className="col-12 p-2">
                  <label
                    htmlFor="vat_registration_number"
                    className="form_check_label"
                  >
                    VAT Registration Number
                  </label>
                  <InputField
                    placeholder="XXXX XXXX XXXX XXXX"
                    pattern="\d{4} \d{4} \d{4} \d{4}"
                    name="vat_registration_number"
                    id="vat_registration_number"
                    type="text"
                    value={formatNumber(formData.vat_registration_number)}
                    onChange={handleNumberChange}
                  />
                </div>

                {formData?.country && (
                  <div className="col-12 p-2">
                    <h6 className="value_placeholder">
                      Vat Value:{" "}
                      <span>
                        {Math.floor(
                          Number(
                            vats
                              ?.find(
                                (c) => c?.country?.code === formData.country
                              )
                              ?.value?.split("%")[0]
                          ) * 100
                        )}{" "}
                        %
                      </span>
                    </h6>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            <SubmitButton name="Save" loading={loading} className="mt-2" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterVat;
