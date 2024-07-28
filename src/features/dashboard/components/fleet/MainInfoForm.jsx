// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import { BRANDS, TYPE } from "../../../../utils/contants";
// import SelectField from "../../../../ui/form-elements/SelectField";
// import InputField from "../../../../ui/form-elements/InputField";
// import SubmitButton from "../../../../ui/form-elements/SubmitButton";

// import CommentField from "./../../../ui/form-elements/CommentField";
// import InputWithUnit from "../../../ui/form-elements/InputWithUnit";
// import axiosInstance from "./../../../../util/axios";
// import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
// import { handleSelectCountry } from "../../../../utils/helper";

// const MainInfoForm = ({ setForm, yacht }) => {
//   const [fileLoading, setFileLoading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const user = useSelector((state) => state.user?.user);
//   const subUserSet = user?.subuser_set;

//   // const handleFileChange = async (e) => {
//   //   if (!e || e.length === 0) {
//   //     setFileLoading(false);
//   //     return;
//   //   }
//   //   if (fileLoading) {
//   //     return;
//   //   }
//   //   try {
//   //     const file = e[0].file;
//   //     const link = await handleUploadMedia(file, setFileLoading, fileLoading);
//   //     setFormData((prevFormData) => ({
//   //       ...prevFormData,
//   //       license_file: link
//   //     }));
//   //   } catch (error) {
//   //     console.error("Error handling File upload:", error);
//   //     setFileLoading(false);
//   //     toast.error("Error uploading file");
//   //   }
//   // };

//   const [formData, setFormData] = useState({
//     type: "select",
//     brand: "select",
//     name_en: "",
//     name_ar: "",
//     number: "",
//     license_number: "",
//     license_file: "",
//     license_expire_date: "",
//     preparation_time: "",
//     description_en: "",
//     description_ar: ""
//   });

//   useEffect(() => {
//     if (yacht) {
//       setFormData({
//         type: yacht?.type,
//         brand: yacht?.brand,
//         name_en: yacht?.name_en,
//         name_ar: yacht?.name_ar,
//         number: yacht?.number,
//         license_number: yacht?.license_number,
//         license_file: yacht?.license_file,
//         license_expire_date: yacht?.license_expire_date,
//         preparation_time: yacht?.preparation_time,
//         description_en: yacht?.description_en,
//         description_ar: yacht?.description_ar
//       });
//     }
//   }, [yacht]);

//   const handleNext = (e) => {
//     e.preventDefault();
//     setForm("Location");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const subUser = subUserSet?.filter((u) => u.role === user.current_role);
//       if (!subUser) {
//         throw new Error("No matching sub user found");
//       }
//       const data = {
//         ...formData,
//         sub_user: subUser[0]?.id,
//         type: formData.type.toLowerCase()
//       };
//       const response = await axiosInstance.request({
//         url: yacht?.id ? `/yachts/${yacht.id}/` : "/yachts/",
//         method: yacht ? "PATCH" : "POST",
//         data
//       });
//       if (response.status === 201 || response.status === 200) {
//         setForm("Location");
//         yacht
//           ? toast.success("Main Info Updated Successfully")
//           : toast.success("Main Info Saved Successfully");
//         sessionStorage.setItem("yacht_id", response?.data?.id);
//       } else {
//         toast.error("Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="form-ui" onSubmit={handleSubmit}>
//       <div className="row m-0">
//         <div className="col-12 p-2">
//           <h6 className="form_title">Main Info</h6>
//         </div>
//         <div className="col-lg-6 col-12 p-2">
//           <SelectField
//             label="Boat Type"
//             id="type"
//             required
//             name="type"
//             value={formData.type}
//             onChange={(e) => handleSelectCountry(e, setFormData)}
//             options={TYPE.map((t) => ({ name: t, value: t }))}
//           />
//         </div>
//         <div className="col-lg-6 col-12 p-2">
//           <SelectField
//             id="brand"
//             required
//             name="brand"
//             label="Vessel Brand"
//             value={formData.brand}
//             onChange={(e) => handleSelectCountry(e, setFormData)}
//             options={BRANDS.map((b) => ({ name: b, value: b }))}
//           />
//         </div>
//         <div className="col-lg-6 col-12 p-2">
//           <InputField
//             id="name_en"
//             required
//             name="name_en"
//             hint="( English )"
//             label="Vessel Name"
//             placeholder="Write here"
//             value={formData.name_en}
//             onChange={(e) => handleSelectCountry(e, setFormData)}
//           />
//         </div>
//         <div className="col-lg-6 col-12 p-2">
//           <InputField
//             id="name_ar"
//             required
//             name="name_ar"
//             label="Vessel Name"
//             hint="( عربى )"
//             placeholder="Write here"
//             value={formData.name_ar}
//             onChange={(e) => handleSelectCountry(e, setFormData)}
//           />
//         </div>
//         <div className="col-lg-6 col-12 p-2">
//           <InputField
//             required
//             type="number"
//             htmlFor="number"
//             label="Vessel Number"
//             placeholder="Write here"
//             id="vesselNumber"
//             value={formData.number}
//             formData={formData}
//             setFormData={setFormData}
//           />
//         </div>
//         {/* vessel license number */}
//         <div className="col-lg-6 col-12 p-2">
//           <InputField
//             type="number"
//             htmlFor="license_number"
//             label="Vessel license Number"
//             value={formData.license_number}
//             placeholder="Write here"
//             id="vesselLicenseNumber"
//             formData={formData}
//             setFormData={setFormData}
//           />
//         </div>
//         {/* Vessel License and registration */}
//         <div className="col-12 p-2">
//           <CustomFileUpload
//             label="Vessel License and registration"
//             labelIdle="Drag & Drop your files or Browse"
//             pannelRatio=".075"
//             accept={["application/pdf"]}
//             allowMultiple={false}
//             onUpdateFiles={(e) => handleFileChange(e)}
//           />
//         </div>
//         {/* license expiration date */}
//         <div className="col-lg-6 col-12 p-2">
//           <InputField
//             type="date"
//             htmlFor="license_expire_date"
//             label="License expiration date"
//             id="licenseExpireDate"
//             formData={formData}
//             setFormData={setFormData}
//           />
//         </div>
//         {/* preparation time */}
//         <div className="col-lg-6 col-12 p-2">
//           <InputWithUnit
//             htmlFor="preparation_time"
//             label="Preparation Time"
//             hint="(Time Between trips needed)"
//             id="preparationTime"
//             units={["Minutes", "Houres"]}
//             formData={formData}
//             setFormData={setFormData}
//           />
//         </div>
//         {/* description english */}
//         <div className="col-lg-6 col-12 p-2">
//           <CommentField
//             htmlFor="description_en"
//             hint="( English )"
//             label="Description"
//             placeholder="Write here"
//             id="description"
//             formData={formData}
//             setFormData={setFormData}
//             value={formData.description_en}
//           />
//         </div>
//         {/* description arabic */}
//         <div className="col-lg-6 col-12 p-2">
//           <CommentField
//             htmlFor="description_ar"
//             hint="( عربى )"
//             label="Description"
//             placeholder="Write here"
//             id="description"
//             formData={formData}
//             setFormData={setFormData}
//             value={formData.description_ar}
//           />
//         </div>
//         <div className="col-12 p-2 pt-4 d-flex gap-3">
//           <SubmitButton
//             loading={loading}
//             fileLoading={fileLoading}
//             name="Save"
//             className="save_btn ms-auto"
//           />
//           <button className="next_btn" onClick={handleNext}>
//             Next
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default MainInfoForm;
