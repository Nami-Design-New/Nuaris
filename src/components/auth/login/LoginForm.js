import * as React from "react";
import leftArrow from "../../../assets/images/left-arrow.svg";
import googleIcon from "../../../assets/images/google.svg";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import wavingHand from "../../../assets/images/waving-hand.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const boxStyle = {
  display: "flex",
  alignItems: "center",
};

const lineStyle = {
  flexGrow: 1,
  backgroundColor: "#F2F2F2",
  height: "2px",
};
const signWithStyle = {
  margin: "0 10px",
  color: "#666B88",
  fontSize: "14px",
  fontWeight: "400",
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

const LoginForm = ({ setShowOtp, formData, setFormData, setSelection }) => {
  const [loading, setLoading] = React.useState(false);
  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    url: "/users/send-otp/",
    headers: headersList,
    data: formData,
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .request(requestOptions)
      .then(() => {
        setSelection("OTP");
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.email?.length > 0) {
          const errorMessage = err.response.data.email[0];
          toast.error(errorMessage);
        } else {
          toast.error("User does not exist");
        }
      })
      .finally(() => setLoading(false));
    setLoading(false);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: "480px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div className="login-message">
        <div className="welcome-message">
          <h2>Welcome Back!</h2>
          <img src={wavingHand} alt="waving hand" loading="lazy" />
        </div>
        <p className="guide">
          Please enter the email address Or phone number registered with us as
          an <span className="agent">agent</span>.
        </p>
      </div>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Email & Phone tabs"
        >
          <Tab label="Email" />
          <Tab label="Phone Number" />
        </Tabs>
        {value === 0 && (
          <TabPanel>
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <div className="input_field">
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="EX: mail@mail.com"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="submit-buttons">
                <Button
                  sx={{
                    border: "1px solid grey",
                    flex: 1,
                    ":hover": {
                      border: "1px solid #006980",
                    },
                  }}
                  variant="outlined"
                  disabled={loading}
                  onClick={() => setSelection("Selection")}
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin" />
                  ) : (
                    <img src={leftArrow} alt="left arrow" loading="lazy" />
                  )}
                </Button>
                <Button
                  disabled={loading}
                  variant="contained"
                  type="submit"
                  color="secondary"
                  sx={{ flex: 13, padding: "16px 20px" }}
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin ml-5" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
          </TabPanel>
        )}
        {value === 1 && (
          <TabPanel>
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <div className="input_field">
                  <input
                    required
                    type="phone"
                    id="phone"
                    name="phone"
                    placeholder="EX: 01115489563"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <Box className="submit-buttons">
                <Button
                  sx={{
                    border: "1px solid grey",
                    flex: 1,
                    ":hover": {
                      border: "1px solid #006980",
                    },
                  }}
                  variant="outlined"
                  disabled={loading}
                  onClick={() => setSelection("Selection")}
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin" />
                  ) : (
                    <img src={leftArrow} alt="left arrow" loading="lazy" />
                  )}
                </Button>
                <Button
                  disabled={loading}
                  variant="contained"
                  type="submit"
                  color="secondary"
                  sx={{ flex: 13, padding: "16px 20px" }}
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin ml-5" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Box>
            </form>
          </TabPanel>
        )}
      </div>
      <Box style={boxStyle}>
        <div style={lineStyle}></div>
        <Typography style={signWithStyle}>Or sign with</Typography>
        <div style={lineStyle}></div>
      </Box>
      <Button
        sx={{ background: "#EBF3F5", color: "#231F20", padding: "16px 24px" }}
        startIcon={<img src={googleIcon} loading="lazy" alt="google icon" />}
      >
        Continue with Google
      </Button>
    </Box>
  );
};

export default LoginForm;
