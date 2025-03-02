import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export default function Leave() {
  const [employeeId, setEmployeeId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  // Validate required fields
  const validateForm = () => {
    let newErrors = {};
    if (!employeeId) newErrors.employeeId = "Employee ID is required.";
    if (!fromDate) newErrors.fromDate = "From date is required.";
    if (!toDate) newErrors.toDate = "To date is required.";
    if (!leaveType) newErrors.leaveType = "Please select a leave type.";
    if (!reason) newErrors.reason = "Please select a reason.";
    if (!comments) newErrors.comments = "Comments are required.";

    // Date validation
    const currentDate = new Date();
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    if (fromDateObj < currentDate) {
      newErrors.fromDate = "From date cannot be in the past.";
    }
    if (toDateObj < fromDateObj) {
      newErrors.toDate = "To date cannot be before From date.";
    }
    if (toDateObj > new Date(fromDateObj.getTime() + 20 * 24 * 60 * 60 * 1000)) {
      newErrors.toDate = "The gap between From Date and To Date cannot exceed 20 days.";
    }

    return newErrors;
  };

  const handleReset = () => {
    setEmployeeId("");
    setFromDate("");
    setToDate("");
    setLeaveType("");
    setReason("");
    setComments("");
    setFile(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build FormData; only append file if it's provided.
    const formData = new FormData();
    formData.append("employee_id", employeeId);
    formData.append("from_date", fromDate);
    formData.append("to_date", toDate);
    formData.append("leave_type", leaveType);
    formData.append("reason", reason);
    formData.append("comments", comments);
    if (file) {
      formData.append("file", file);
    }

    // Debug: log all FormData entries
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post("http://localhost/my-backend/Leave_request.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response data:", response.data);
      alert(response.data.message || "Leave Request Submitted Successfully");
      handleReset();
      navigate("/home"); // Redirect to /home after successful submission
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        alert("Error submitting request: " + (error.response.data.message || error.response.statusText));
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server. Please check your connection and URL.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("Error submitting request: " + error.message);
      }
    }
  };

  return (
    <div className="flex mx-auto justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Employee Leave Request</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Employee ID</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
              {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">From Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">To Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              {errors.toDate && <p className="text-red-500 text-sm">{errors.toDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Leave Type</label>
              <select
                className="w-full p-2 border rounded"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="">Select Leave Type</option>
                <option value="full">Full Day</option>
                <option value="half">Half Day</option>
              </select>
              {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Reason</label>
              <select
                className="w-full p-2 border rounded"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select Reason</option>
                <option value="medical">Medical</option>
                <option value="personal">Personal</option>
                <option value="social">Social Function</option>
                <option value="other">Other</option>
              </select>
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Additional Comments</label>
              <textarea
                className="w-full p-2 border rounded"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Any additional information"
              />
              {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Attach File (Optional)</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handleReset} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                Reset
              </button>
              <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
                Apply Leave
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}




// import React, { useState } from "react";
// import axios from "axios";

// export default function Leave() {
//   const [employeeId, setEmployeeId] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [leaveType, setLeaveType] = useState("");
//   const [reason, setReason] = useState("");
//   const [comments, setComments] = useState("");
//   const [file, setFile] = useState(null);
//   const [errors, setErrors] = useState({});

//   // Validate required fields
//   const validateForm = () => {
//     let newErrors = {};
//     if (!employeeId) newErrors.employeeId = "Employee ID is required.";
//     if (!fromDate) newErrors.fromDate = "From date is required.";
//     if (!toDate) newErrors.toDate = "To date is required.";
//     if (!leaveType) newErrors.leaveType = "Please select a leave type.";
//     if (!reason) newErrors.reason = "Please select a reason.";
//     if (!comments) newErrors.comments = "Comments are required.";
//     return newErrors;
//   };

//   const handleReset = () => {
//     setEmployeeId("");
//     setFromDate("");
//     setToDate("");
//     setLeaveType("");
//     setReason("");
//     setComments("");
//     setFile(null);
//     setErrors({});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     // Build FormData; only append file if it's provided.
//     const formData = new FormData();
//     formData.append("employee_id", employeeId);
//     formData.append("from_date", fromDate);
//     formData.append("to_date", toDate);
//     formData.append("leave_type", leaveType);
//     formData.append("reason", reason);
//     formData.append("comments", comments);
//     if (file) {
//       formData.append("file", file);
//     }

//     // Debug: log all FormData entries
//     console.log("FormData entries:");
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }

//     try {
//       const response = await axios.post("http://localhost/my-backend/Leave_request.php", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Response data:", response.data);
//       alert(response.data.message || "Leave Request Submitted Successfully");
//       handleReset();
//     } catch (error) {
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         console.error("Status:", error.response.status);
//         console.error("Headers:", error.response.headers);
//         alert("Error submitting request: " + (error.response.data.message || error.response.statusText));
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         alert("No response from server. Please check your connection and URL.");
//       } else {
//         console.error("Error setting up request:", error.message);
//         alert("Error submitting request: " + error.message);
//       }
//     }
//   };

//   return (
//     <div className="flex mx-auto justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
//         <h2 className="text-2xl font-bold text-center mb-4">Employee Leave Request</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Employee ID</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded"
//                 value={employeeId}
//                 onChange={(e) => setEmployeeId(e.target.value)}
//               />
//               {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">From Date</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border rounded"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//               />
//               {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">To Date</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border rounded"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//               />
//               {errors.toDate && <p className="text-red-500 text-sm">{errors.toDate}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Leave Type</label>
//               <select
//                 className="w-full p-2 border rounded"
//                 value={leaveType}
//                 onChange={(e) => setLeaveType(e.target.value)}
//               >
//                 <option value="">Select Leave Type</option>
//                 <option value="full">Full Day</option>
//                 <option value="half">Half Day</option>
//               </select>
//               {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Reason</label>
//               <select
//                 className="w-full p-2 border rounded"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//               >
//                 <option value="">Select Reason</option>
//                 <option value="medical">Medical</option>
//                 <option value="personal">Personal</option>
//                 <option value="social">Social Function</option>
//                 <option value="other">Other</option>
//               </select>
//               {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Additional Comments</label>
//               <textarea
//                 className="w-full p-2 border rounded"
//                 value={comments}
//                 onChange={(e) => setComments(e.target.value)}
//                 placeholder="Any additional information"
//               />
//               {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Attach File (Optional)</label>
//               <input
//                 type="file"
//                 className="w-full p-2 border rounded"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </div>
//             <div className="flex justify-between mt-4">
//               <button type="button" onClick={handleReset} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
//                 Reset
//               </button>
//               <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
//                 Apply Leave
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import axios from "axios";

// export default function Leave() {
//   const [employeeId, setEmployeeId] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [leaveType, setLeaveType] = useState("");
//   const [reason, setReason] = useState("");
//   const [comments, setComments] = useState("");
//   const [file, setFile] = useState();
//   const [errors, setErrors] = useState({});

//   // Validate required fields before submission
//   const validateForm = () => {
//     let newErrors = {};
//     if (!employeeId) newErrors.employeeId = "Employee ID is required.";
//     if (!fromDate) newErrors.fromDate = "From date is required.";
//     if (!toDate) newErrors.toDate = "To date is required.";
//     if (!leaveType) newErrors.leaveType = "Please select a leave type.";
//     if (!reason) newErrors.reason = "Please select a reason.";
//     if (!comments) newErrors.comments = "Comments are required.";
//     return newErrors;
//   };

//   const handleReset = () => {
//     setEmployeeId("");
//     setFromDate("");
//     setToDate("");
//     setLeaveType("");
//     setReason("");
//     setComments("");
//     setFile(null);
//     setErrors({});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     // Build FormData for sending to the backend
//     const formData = new FormData();
//     formData.append("employee_id", employeeId);
//     formData.append("from_date", fromDate);
//     formData.append("to_date", toDate);
//     formData.append("leave_type", leaveType);
//     formData.append("reason", reason);
//     formData.append("comments", comments);
//     if (file) {
//       formData.append("file", file);
//     }

//     // Log all FormData key/value pairs for debugging purposes.
//     console.log("FormData entries:");
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }

//     try {
//       const response = await axios.post("http://localhost/my-backend/Leave_request.php", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Response data:", response.data);
//       alert(response.data.message || "Leave Request Submitted Successfully");
//       handleReset();
//     } catch (error) {
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         console.error("Status:", error.response.status);
//         console.error("Headers:", error.response.headers);
//         alert("Error submitting request: " + (error.response.data.message || error.response.statusText));
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         alert("No response from server. Please check your connection.");
//       } else {
//         console.error("Error setting up request:", error.message);
//         alert("Error submitting request: " + error.message);
//       }
//     }
//   };

//   return (
//     <div className="flex mx-auto justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
//         <h2 className="text-2xl font-bold text-center mb-4">Employee Leave Request</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Employee ID</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded"
//                 value={employeeId}
//                 onChange={(e) => setEmployeeId(e.target.value)}
//               />
//               {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">From Date</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border rounded"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//               />
//               {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">To Date</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border rounded"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//               />
//               {errors.toDate && <p className="text-red-500 text-sm">{errors.toDate}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Leave Type</label>
//               <select
//                 className="w-full p-2 border rounded"
//                 value={leaveType}
//                 onChange={(e) => setLeaveType(e.target.value)}
//               >
//                 <option value="">Select Leave Type</option>
//                 <option value="full">Full Day</option>
//                 <option value="half">Half Day</option>
//               </select>
//               {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Reason</label>
//               <select
//                 className="w-full p-2 border rounded"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//               >
//                 <option value="">Select Reason</option>
//                 <option value="medical">Medical</option>
//                 <option value="personal">Personal</option>
//                 <option value="social">Social Function</option>
//                 <option value="other">Other</option>
//               </select>
//               {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Additional Comments</label>
//               <textarea
//                 className="w-full p-2 border rounded"
//                 value={comments}
//                 onChange={(e) => setComments(e.target.value)}
//                 placeholder="Any additional information"
//               />
//               {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Attach File (Optional)</label>
//               <input
//                 type="file"
//                 className="w-full p-2 border rounded"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </div>
//             <div className="flex justify-between mt-4">
//               <button type="button" onClick={handleReset} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
//                 Reset
//               </button>
//               <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
//                 Apply Leave
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
