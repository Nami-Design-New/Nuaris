import { useParams } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import { useEffect, useRef, useState } from "react";
import axios from "../../../util/axios";
import NameField from "../../ui/form-elements/NameField";
import ReactFlagsSelect from "react-flags-select";
import InputField from "../../ui/form-elements/InputField";
import PhoneField from "../../ui/form-elements/PhoneField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import AssignGroup from "../layout/AssignGroup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function EditUser() {
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;
  const form = useRef(null);
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const positions = useSelector((state) => state.positions.positions?.results);

  useEffect(() => {
    try {
      axios
        .get(`/employees/${employeeId}/?sub_user=${subUser}`)
        .then((res) => {
          console.log(res.data);
          setEmployee(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [subUser, employeeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (employee?.phone_number?.length > 15) {
      toast.error("Please enter a valid phone number");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.put(`/employees/${employee.id}/`, {
        ...employee,
        sub_user: subUser,
      });
      toast.success("User updated successfully");
      console.log(response);
    } catch (error) {
      console.log("error =>", error);
      toast.error("An error occurred while editing user");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="section-main-content">
        <header className="flex-header">
          <PageHeader removeLast={true} name="Edit User" />
        </header>
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="inner_card">
              <form
                onSubmit={handleSubmit}
                ref={form}
                className="row m-0 form-ui"
              >
                <div className="col-lg-4  col-12 p-2">
                  <NameField formData={employee} setFormData={setEmployee} />
                </div>
                <div className="col-lg-4  col-12 p-2">
                  <div className="input-field">
                    <label htmlFor="positions">Positions</label>
                    <select
                      defaultValue={"select"}
                      name="positions"
                      id="positions"
                      required
                      value={
                        positions?.find(
                          (option) => option.id === employee.position
                        )?.name
                      }
                      onChange={(e) => {
                        const selectedOption =
                          e.target.options[e.target.selectedIndex].value;
                        setEmployee({
                          ...employee,
                          position: positions?.find(
                            (option) => option.name === selectedOption
                          )?.id,
                          position_name: selectedOption,
                        });
                      }}
                    >
                      <option value="select" disabled>
                        Select
                      </option>
                      {positions?.map((option) => (
                        <option
                          key={option.id}
                          id={option.id}
                          value={option.name}
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-4  col-12 p-2">
                  <div className="input-field">
                    <label htmlFor="Nationality">Nationality</label>
                    <ReactFlagsSelect
                      searchable={true}
                      selectedSize={false}
                      onSelect={(code) => {
                        setEmployee((prev) => ({ ...prev, nationality: code }));
                      }}
                      selected={employee.nationality || "SA"}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-12 p-2">
                  <InputField
                    htmlFor="email"
                    label="Email Address"
                    placeholder="EX: mail@mail.com"
                    type="email"
                    id="email"
                    formData={employee}
                    setFormData={setEmployee}
                    value={employee?.email}
                  />
                </div>
                <div className="col-lg-6 col-12 p-2">
                  <PhoneField
                    formData={employee}
                    setFormData={setEmployee}
                    id="phone_number"
                    value={employee?.phone_number}
                  />
                </div>
                <div className="col-12 p-2 d-flex justify-content-end">
                  <SubmitButton
                    loading={loading}
                    name="Edit"
                    className="w-25"
                  />
                </div>
              </form>
            </div>
          </div>
          <AssignGroup invitedUserId={employee.user_id} />
        </div>
      </section>
    </>
  );
}
