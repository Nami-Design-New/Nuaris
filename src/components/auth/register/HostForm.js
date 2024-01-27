import leftArrow from "../../../assets/images/left-arrow.svg";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Grid,
} from "@mui/material";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const HostForm = ({ formData, setFormData, setSelection }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [commercialName, setCommercialName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [mapSearch, setMapSearch] = useState("");
  const [files, setFiles] = useState([]);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };
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
    // await axios
    //   .request(requestOptions)
    //   .then(() => {
    //     clg("success");
    //   })
    //   .catch((err) => {
    //     if (
    //       err.response &&
    //       err.response.data &&
    //       err.response.data.email &&
    //       err.response.data.email.length > 0
    //     ) {
    //       const errorMessage = err.response.data.email[0];
    //       toast.error(errorMessage);
    //     }
    //   })
    //   .finally(() => setLoading(false));
    setLoading(false);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Custom styles to ensure FilePond takes full height

  return (
    <Box
      sx={{
        maxWidth: "700px",
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid
            container
            justifyContent="center"
            alignItems="stretch"
            xs={12}
            sx={{ paddingLeft: "16px" }}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Upload Your Logo</Typography>
              <FilePond
                stylePanelLayout="compact" // Optional: Adjust layout as needed
                files={files}
                acceptedFileTypes={["image/*"]}
                onupdatefiles={setFiles}
                labelIdle="Logo"
                stylePanelAspectRatio="0.5"
              />
            </Grid>

            <Grid
              container
              xs={12}
              md={6}
              sx={{
                paddingLeft: {
                  xs: "0",
                  md: "16px",
                },
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  marginBottom: {
                    xs: "16px",
                    md: "0",
                  },
                }}
              >
                <Typography variant="h6">First Name</Typography>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  value={firstName}
                  onChange={handleInputChange(setFirstName)}
                  variant="outlined"
                  placeholder="Ex: Mahmoud"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Family Name</Typography>

                <TextField
                  required
                  fullWidth
                  id="familyName"
                  value={familyName}
                  onChange={handleInputChange(setFamilyName)}
                  variant="outlined"
                  placeholder="EX: Gamal"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email Address</Typography>
            <TextField
              required
              fullWidth
              id="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              variant="outlined"
              placeholder="EX: mail@mail.com"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Mobile Number</Typography>

            <TextField
              required
              fullWidth
              id="mobileNumber"
              value={mobileNumber}
              onChange={handleInputChange(setMobileNumber)}
              variant="outlined"
              placeholder="+996"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Commercial Name</Typography>
            <TextField
              required
              fullWidth
              id="commercialName"
              value={commercialName}
              onChange={handleInputChange(setCommercialName)}
              variant="outlined"
              placeholder="EX: Luxury"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Commercial Registration Number</Typography>
            <TextField
              required
              fullWidth
              id="registrationNumber"
              value={registrationNumber}
              onChange={handleInputChange(setRegistrationNumber)}
              variant="outlined"
              placeholder="XXXX XXXX XXXX XXXX"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Company Location (Country)</Typography>
            <FormControl fullWidth>
              <Select
                labelId="country-select-label"
                id="country-select"
                value={country}
                onChange={handleInputChange(setCountry)}
              >
                {/* Populate with actual country options */}
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Country1"}>Country1</MenuItem>
                <MenuItem value={"Country2"}>Country2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Company Location (City)</Typography>
            <FormControl fullWidth>
              <Select
                labelId="city-select-label"
                id="city-select"
                value={city}
                onChange={handleInputChange(setCity)}
              >
                {/* Populate with actual city options based on coreSelected country */}
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"City1"}>City1</MenuItem>
                <MenuItem value={"City2"}>City2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Company Location (map)</Typography>
            <TextField
              fullWidth
              id="mapSearch"
              value={mapSearch}
              onChange={handleInputChange(setMapSearch)}
              variant="outlined"
              placeholder="Search on Map"
            />
          </Grid>
          <Grid item xs={12} className="submit-buttons">
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
                "Confirm"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HostForm;
