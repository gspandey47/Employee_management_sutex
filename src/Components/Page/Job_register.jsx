

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Job = () => {
  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (image) formData.append("image", image);
    if (resume) formData.append("resume", resume);

    try {
      const response = await axios.post("http://localhost/my-backend/job_register.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Form Submitted Successfully!", data);
      alert(response.data.message || response.data.error);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
    setLoading(false);
  };

  const password = watch("password");

  const validateStep = async (step) => {
    let fields = [];
    switch (step) {
      case 1:
        fields = ["name", "email", "mobile", "date"];
        break;
      case 2:
        fields = ["age", "gender", "adhaar", "pan"];
        break;
      case 3:
        fields = ["account", "dob", "address", "city", "nominee"];
        break;
      case 4:
        fields = ["password", "confirmPassword"];
        break;
      default:
        break;
    }
    const result = await trigger(fields);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(step);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8 rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Job Registration Form</h2>
      {loading && <div className="text-center text-yellow-600 font-bold">Submitting...</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name should contain only letters and spaces",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile:</label>
              <input
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your mobile number"
              />
              {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date:</label>
              <input
                type="date"
                {...register("Date", { required: "Date is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.Date && <span className="text-red-500 text-sm">{errors.Date.message}</span>}
            </div>

            {/* Next Button */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Age:</label>
              <input
                type="number"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 18, message: "Age must be at least 18" },
                  max: { value: 60, message: "Age must be at most 60" },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your age"
              />
              {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender:</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
            </div>

            {/* Adhaar */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Adhaar:</label>
              <input
                {...register("Adhaar", {
                  required: "Adhaar number is required",
                  pattern: {
                    value: /^[0-9]{12}$/,
                    message: "Adhaar number must be 12 digits",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Adhaar number"
              />
              {errors.Adhaar && <span className="text-red-500 text-sm">{errors.Adhaar.message}</span>}
            </div>

            {/* PAN */}
            <div>
              <label className="block text-sm font-medium text-gray-700">PAN:</label>
              <input
                {...register("pan", {
                  required: "PAN number is required",
                  pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message: "Invalid PAN number (e.g., ABCDE1234F)",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your PAN number"
              />
              {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
            </div>

            {/* Previous and Next Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {/* Account No */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Account No:</label>
              <input
                {...register("account", {
                  required: "Account number is required",
                  pattern: {
                    value: /^[0-9]{9,18}$/,
                    message: "Account number must be 9 to 18 digits",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Account Number"
              />
              {errors.account && <span className="text-red-500 text-sm">{errors.account.message}</span>}
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium text-gray-700">DOB:</label>
              <input
                type="date"
                {...register("Date", { required: "Date of Birth is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.Date && <span className="text-red-500 text-sm">{errors.Date.message}</span>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address:</label>
              <input
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your address"
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">City:</label>
              <input
                {...register("city", {
                  required: "City is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "City should contain only letters and spaces",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your city"
              />
              {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
            </div>

            {/* Nominee */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nominee:</label>
              <input
                {...register("Nominee", {
                  required: "Nominee is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Nominee should contain only letters and spaces",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter nominee name"
              />
              {errors.Nominee && <span className="text-red-500 text-sm">{errors.Nominee.message}</span>}
            </div>

            {/* Previous and Next Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>

            {/* Upload Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Image:</label>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Upload Resume */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Resume:</label>
              <input
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Previous and Submit Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={loading}
                onSubmit={'Navigate'}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Job;








// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// const Job = () => {
//   const [image, setImage] = useState(null);
//   const [resume, setResume] = useState(null);
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       formData.append(key, data[key]);
//     });
//     if (image) formData.append("image", image);
//     if (resume) formData.append("resume", resume);

//     try {
//       const response = await axios.post("http://localhost/my-backend/job_register.php", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Form Submitted Successfully!", data);
//       alert(response.data.message || response.data.error);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while submitting the form.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-full max-w-lg mx-auto  px-8 py-10 rounded-lg shadow-lg text-black">
//       <h2 className="text-3xl font-bold text-center mb-6">Job Registration Form</h2>
//       {loading && <div className="text-center text-yellow-300 font-bold">Submitting...</div>}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {step === 1 && (
//           <div className="px-4 space-y-4">
//             <label className="block">Name:</label>
//             <input {...register("name", { required: true })} className="input-field" placeholder="Enter your name" />
//             <label className="block">Email:</label>
//             <input {...register("email", { required: true })} className="input-field" placeholder="Enter your email" />
//             <label className="block">Mobile:</label>
//             <input {...register("mobile", { required: true })} className="input-field" placeholder="Enter your mobile number" />
//             <label className="block">Date:</label>
//             <input type="date" {...register("Date", { required: true })} className="input-field" />
//             <div className="flex justify-between">
//               <button type="button" onClick={() => setStep(step + 1)} className="btn-next">Next</button>
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="px-4 space-y-4">
//             <label className="block">Age:</label>
//             <input type="number" {...register("age", { required: true })} className="input-field" placeholder="Enter your age" />
//             <label className="block">Gender:</label>
//             <select {...register("gender", { required: true })} className="input-field">
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//             <label className="block">Adhaar:</label>
//             <input {...register("Adhaar", { required: true })} className="input-field" placeholder="Enter your Adhaar number" />
//             <label className="block">PAN:</label>
//             <input {...register("pan", { required: true })} className="input-field" placeholder="Enter your PAN number" />
//             <div className="flex justify-between">
//               <button type="button" onClick={() => setStep(step - 1)} className="btn-prev">Previous</button>
//               <button type="button" onClick={() => setStep(step + 1)} className="btn-next">Next</button>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div className=" px-4 space-y-4">
//             <label className="block">Account No:</label>
//             <input {...register("account", { required: true })} className="input-field" placeholder="Enter your Account Number" />
//             <label className="block">DOB:</label>
//             <input type="date" {...register("dob", { required: true })} className="input-field" />
//             <label className="block">Address:</label>
//             <input {...register("address", { required: true })} className="input-field" placeholder="Enter your address" />
//             <label className="block">City:</label>
//             <input {...register("city", { required: true })} className="input-field" placeholder="Enter your city" />
//             <label className="block">Nominee:</label>
//             <input {...register("Nominee", { required: true })} className="input-field" placeholder="Enter nominee name" />
//             <div className="flex justify-between">
//               <button type="button" onClick={() => setStep(step - 1)} className="btn-prev">Previous</button>
//               <button type="button" onClick={() => setStep(step + 1)} className="btn-next">Next</button>
//             </div>
//           </div>
//         )}

//         {step === 4 && (
//           <div className=" px-4 space-y-4">
//             <label className="block">Password:</label>
//             <input type="password" {...register("password", { required: true })} className="input-field" placeholder="Enter password" />
//             <label className="block">Confirm Password:</label>
//             <input type="password" {...register("confirmPassword", { required: true })} className="input-field" placeholder="Confirm password" />
//             <label className="block">Upload Image:</label>
//             <input type="file" accept="image/jpeg, image/png" onChange={(e) => setImage(e.target.files[0])} className="input-field" />
//             <label className="block">Upload Resume:</label>
//             <input type="file" accept=".pdf, .doc, .docx" onChange={(e) => setResume(e.target.files[0])} className="input-field" />
//             <div className="flex justify-between">
//               <button type="button" onClick={() => setStep(step - 1)} className="btn-prev">Previous</button>
//               <button type="submit" disabled={loading} className="btn-submit bg-blue-800">{loading ? "Submitting..." : "Submit"}</button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Job;


// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// const Job = () => {
//   const [image, setImage] = useState(null);
//   const [resume, setResume] = useState(null);
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       formData.append(key, data[key]);
//     });
//     if (image) formData.append("image", image);
//     if (resume) formData.append("resume", resume);

//     try {
//       const response = await axios.post("http://localhost/my-backend/job_register.php", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Form Submitted Successfully!", data);
//       alert(response.data.message || response.data.error);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while submitting the form.");
//     }
//     setLoading(false);
//   };

//   const password = watch("password");

//   return (
//     <div className="w-full max-w-lg mx-auto px-4 py-8 rounded-lg shadow-lg bg-white">
//       <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Job Registration Form</h2>
//       {loading && <div className="text-center text-yellow-600 font-bold">Submitting...</div>}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {step === 1 && (
//           <div className="space-y-4">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name:</label>
//               <input
//                 {...register("name", {
//                   required: "Name is required",
//                   pattern: {
//                     value: /^[A-Za-z\s]+$/,
//                     message: "Name should contain only letters and spaces",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your name"
//               />
//               {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email:</label>
//               <input
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your email"
//               />
//               {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
//             </div>

//             {/* Mobile */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Mobile:</label>
//               <input
//                 {...register("mobile", {
//                   required: "Mobile number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Mobile number must be 10 digits",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your mobile number"
//               />
//               {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
//             </div>

//             {/* Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Date:</label>
//               <input
//                 type="date"
//                 {...register("date", { required: "Date is required" })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//               {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
//             </div>

//             {/* Next Button */}
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={() => setStep(step + 1)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-4">
//             {/* Age */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Age:</label>
//               <input
//                 type="number"
//                 {...register("age", {
//                   required: "Age is required",
//                   min: { value: 18, message: "Age must be at least 18" },
//                   max: { value: 60, message: "Age must be at most 60" },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your age"
//               />
//               {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
//             </div>

//             {/* Gender */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Gender:</label>
//               <select
//                 {...register("gender", { required: "Gender is required" })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//               {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
//             </div>

//             {/* Adhaar */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Adhaar:</label>
//               <input
//                 {...register("adhaar", {
//                   required: "Adhaar number is required",
//                   pattern: {
//                     value: /^[0-9]{12}$/,
//                     message: "Adhaar number must be 12 digits",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your Adhaar number"
//               />
//               {errors.adhaar && <span className="text-red-500 text-sm">{errors.adhaar.message}</span>}
//             </div>

//             {/* PAN */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">PAN:</label>
//               <input
//                 {...register("pan", {
//                   required: "PAN number is required",
//                   pattern: {
//                     value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//                     message: "Invalid PAN number (e.g., ABCDE1234F)",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your PAN number"
//               />
//               {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
//             </div>

//             {/* Previous and Next Buttons */}
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={() => setStep(step - 1)}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Previous
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setStep(step + 1)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-4">
//             {/* Account No */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Account No:</label>
//               <input
//                 {...register("account", {
//                   required: "Account number is required",
//                   pattern: {
//                     value: /^[0-9]{9,18}$/,
//                     message: "Account number must be 9 to 18 digits",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your Account Number"
//               />
//               {errors.account && <span className="text-red-500 text-sm">{errors.account.message}</span>}
//             </div>

//             {/* DOB */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">DOB:</label>
//               <input
//                 type="date"
//                 {...register("dob", { required: "Date of Birth is required" })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//               {errors.dob && <span className="text-red-500 text-sm">{errors.dob.message}</span>}
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Address:</label>
//               <input
//                 {...register("address", {
//                   required: "Address is required",
//                   minLength: {
//                     value: 10,
//                     message: "Address must be at least 10 characters",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your address"
//               />
//               {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
//             </div>

//             {/* City */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">City:</label>
//               <input
//                 {...register("city", {
//                   required: "City is required",
//                   pattern: {
//                     value: /^[A-Za-z\s]+$/,
//                     message: "City should contain only letters and spaces",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your city"
//               />
//               {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
//             </div>

//             {/* Nominee */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Nominee:</label>
//               <input
//                 {...register("nominee", {
//                   required: "Nominee is required",
//                   pattern: {
//                     value: /^[A-Za-z\s]+$/,
//                     message: "Nominee should contain only letters and spaces",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter nominee name"
//               />
//               {errors.nominee && <span className="text-red-500 text-sm">{errors.nominee.message}</span>}
//             </div>

//             {/* Previous and Next Buttons */}
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={() => setStep(step - 1)}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Previous
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setStep(step + 1)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {step === 4 && (
//           <div className="space-y-4">
//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password:</label>
//               <input
//                 type="password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters",
//                   },
//                   pattern: {
//                     value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
//                   },
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter password"
//               />
//               {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
//               <input
//                 type="password"
//                 {...register("confirmPassword", {
//                   required: "Please confirm your password",
//                   validate: (value) => value === password || "Passwords do not match",
//                 })}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Confirm password"
//               />
//               {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
//             </div>

//             {/* Upload Image */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Upload Image:</label>
//               <input
//                 type="file"
//                 accept="image/jpeg, image/png"
//                 onChange={(e) => setImage(e.target.files[0])}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             {/* Upload Resume */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Upload Resume:</label>
//               <input
//                 type="file"
//                 accept=".pdf, .doc, .docx"
//                 onChange={(e) => setResume(e.target.files[0])}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             {/* Previous and Submit Buttons */}
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={() => setStep(step - 1)}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Previous
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 {loading ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Job;