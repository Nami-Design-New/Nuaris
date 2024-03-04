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
  const { userId } = useParams();
  const [userData, setUser] = useState({});

  const [loading, setLoading] = useState(false);

  const positions = useSelector((state) => state.positions.positions);
  const user = useSelector((state) => state.user.user);
  const form = useRef(null);

  useEffect(() => {
    if (user) {
      setUser((prev) => ({
        ...prev,
        parent: Number(user.id),
      }));
    }
  }, [user]);

  // fetch user using the id
  useEffect(() => {
    (async () => {
      if (userData.mobile_number) return;
      const user = await axios.get(`/users/${userId}/`);
      console.log(user.data);
      setUser(user.data);
      setUser({
        ...user.data,
      });
    })();
  }, [userId, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(`/users/${userData.id}/`, userData);
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
                  <NameField formData={userData} setFormData={setUser} />
                </div>
                <div className="col-lg-4  col-12 p-2">
                  <div className="input-field">
                    <label htmlFor="positions">Positions</label>
                    <select
                      defaultValue={"select"}
                      name="positions"
                      id="positions"
                      required
                      value={userData.position}
                      onChange={(e) => {
                        const selectedOption =
                          e.target.options[e.target.selectedIndex].value;
                        setUser({
                          ...userData,
                          position: selectedOption,
                        });
                      }}
                    >
                      <option value="select" disabled>
                        Select
                      </option>
                      {positions.map((option) => (
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
                        setUser((prev) => ({ ...prev, country: code }));
                      }}
                      selected={userData.country || "SA"}
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
                    formData={userData}
                    setFormData={setUser}
                    value={userData["email"]}
                  />
                </div>
                <div className="col-lg-6 col-12 p-2">
                  <PhoneField
                    formData={userData}
                    setFormData={setUser}
                    id="mobile_number"
                    value={userData["mobile_number"]}
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
          <AssignGroup ivitedUserId={userData.id} />
        </div>
      </section>
    </>
  );
}
