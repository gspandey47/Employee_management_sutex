import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get("http://localhost/my-backend/emp.php")
      .then(response => {
        // Ensure that each employee has a default status of "Pending" if not already set
        setEmployees(response.data.map(emp => ({ ...emp, status: emp.status || "Pending" })));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleApprove = (emp) => {
    if (window.confirm("Are you sure you want to approve this employee?")) {
      axios.post("http://localhost/my-backend/jobApproved.php", emp)
        .then(response => {
            navigate("/admin"); // Redirect to /admin after approval
          if (response.data.success) {
            setEmployees(prevEmployees =>
              prevEmployees.map(e =>
                e.Id === emp.Id ? { ...e, status: "Approved" } : e
              )
            );
            alert("Employee approved and moved to another table.");
          }
        })
        .catch(error => {
          console.error("Error approving employee:", error);
          alert("An error occurred.");
        });
    }
  };

  const handleReject = (emp) => {
    if (window.confirm("Are you sure you want to reject this employee?")) {
      axios.post("http://localhost/my-backend/jobRejected.php", emp)
        .then(response => {
            navigate("/admin"); // Redirect to /admin after rejection
          if (response.data.success) {
            setEmployees(prevEmployees =>
              prevEmployees.map(e =>
                e.Id === emp.Id ? { ...e, status: "Rejected" } : e
              )
            );
            alert("Employee rejected.");
          }
        })
        .catch(error => {
          console.error("Error rejecting employee:", error);
          alert("An error occurred.");
        });
    }
  };

  const handleDelete = (Id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.post(
        "http://localhost/my-backend/Dlt_emp.php",
        { Id },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        setEmployees(prevEmployees => prevEmployees.filter(emp => emp.Id !== Id));
      })
      .catch(error => console.error("Error deleting user:", error));
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Employee List", 14, 20);

    const tableColumn = [
      "ID", "Name", "Email", "Mobile", "Date", "DOB", "Age", "Gender", 
      "Adhaar", "PAN", "Account", "Address", "City", "Nominee", "Password", 
      "Image", "Resume", "Status"
    ];
    const tableRows = employees.map(emp => [
      emp.Id,
      emp.name,
      emp.email,
      emp.mobile,
      emp.date,
      emp.dob,
      emp.age,
      emp.gender,
      emp.adhaar,
      emp.pan,
      emp.account,
      emp.address,
      emp.city,
      emp.nominee,
      emp.password,
      emp.image ? "[Profile Image]" : "N/A",
      emp.resume ? "[Resume Attached]" : "N/A",
      emp.status || "Pending"
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10, cellPadding: 3 }
    });

    doc.save("Employee_List.pdf");
  };

  // Function to open resume in new tab
  const handleViewResume = (resumeUrl) => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else {
      alert("Resume not available.");
    }
  };

  return (
    <div className="container ml-30 p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Job Request Employee List</h2>
      <div className="flex justify-end flex-col mb-4">
        <button onClick={handleDownloadPDF} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Download PDF
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Date</th>
              <th className="p-3">DOB</th>
              <th className="p-3">Age</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Adhaar</th>
              <th className="p-3">PAN</th>
              <th className="p-3">Account</th>
              <th className="p-3">Address</th>
              <th className="p-3">City</th>
              <th className="p-3">Nominee</th>
              <th className="p-3">Password</th>
              <th className="p-3">Resume</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(emp => (
                <tr key={emp.Id} className="border-b">
                  <td className="p-3 text-center">{emp.Id}</td>
                  <td className="p-3 text-center">
                    {emp.image ? (
                      <img 
                        src={`http://localhost/my-backend/uploads/${emp.image}`} // Correct image path
                        alt="Profile" 
                        className="w-10 h-10 rounded-full" 
                      />
                    ) : "N/A"}
                  </td>
                  <td className="p-3 text-center">{emp.name}</td>
                  <td className="p-3 text-center">{emp.email}</td>
                  <td className="p-3 text-center">{emp.mobile}</td>
                  <td className="p-3 text-center">{emp.date}</td>
                  <td className="p-3 text-center">{emp.dob}</td>
                  <td className="p-3 text-center">{emp.age}</td>
                  <td className="p-3 text-center">{emp.gender}</td>
                  <td className="p-3 text-center">{emp.adhaar}</td>
                  <td className="p-3 text-center">{emp.pan}</td>
                  <td className="p-3 text-center">{emp.account}</td>
                  <td className="p-3 text-center">{emp.address}</td>
                  <td className="p-3 text-center">{emp.city}</td>
                  <td className="p-3 text-center">{emp.nominee}</td>
                  <td className="p-3 text-center">{emp.password}</td>
                  <td className="p-3 text-center">
                    {emp.resume ? (
                      <button
                        onClick={() => handleViewResume(emp.resume)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                      >
                        View Resume
                      </button>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className={`p-3 text-center font-bold ${emp.status === "Approved" ? "text-green-500" : emp.status === "Rejected" ? "text-red-500" : "text-gray-500"}`}>
                    {emp.status}
                  </td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button 
                      onClick={() => handleApprove(emp)} 
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600" 
                      disabled={emp.status === "Approved" || emp.status === "Rejected"}
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(emp)} 
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600" 
                      disabled={emp.status === "Approved" || emp.status === "Rejected"}
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleDelete(emp.Id)} 
                      className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="19" className="p-3 text-center text-red-500 font-bold">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isopen, setIsOpen] =useState();

//   // 
  
//   useEffect(() => {
//     axios.get("http://localhost/my-backend/emp.php")
//       .then(response => {
//         console.log("API Response:", response.data); // Debugging API data
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
  





//   const handleDownloadPDF = () => {
//     const doc = new jsPDF("p", "mm", "a4"); // Vertical layout
//     doc.setFontSize(16);
//     doc.text("Employee List", 14, 20);
    
//     const tableColumn = ["ID", "Name", "Email", "Mobile", "Date", "DOB", "Age", "Gender", "Adhaar", "PAN", "Account", "Address", "City", "Nominee", "Password", "Image", "Resume", "Status"];
//     const tableRows = employees.map(emp => [
//       emp.Id,
//       emp.name,
//       emp.email,
//       emp.mobile,
//       emp.date,
//       emp.dob,
//       emp.age,
//       emp.gender,
//       emp.adhaar,
//       emp.pan,
//       emp.account,
//       emp.address,
//       emp.city,
//       emp.nominee,
//       emp.password,
//       emp.image ? "[Profile Image]" : "N/A",
//       emp.resume ? "[Resume Attached]" : "N/A",
//       emp.status || "Pending"
//     ]);

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 30,
//       styles: { fontSize: 10, cellPadding: 3 }
//     });

//     doc.save("Employee_List.pdf");
//   };

//   const handleApproved= (Id, status) => {
//     setEmployees(prevEmployees =>
//       prevEmployees.map(emp =>
//         emp.Id === Id ? { ...emp, status } : emp
//       )
      
//     );

// const approved=()=>{
// setIsOpen(!isopen);
// }

//   };
//   const handleReject = (Id, status) => {
//     setEmployees(prevEmployees =>
//       prevEmployees.map(emp =>
//         emp.Id === Id ? { ...emp, status } : emp
//       )
//     );
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100">
//       <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Employee List</h2>
//       <div className="flex justify-end flex-col mb-4">
//         <button onClick={handleDownloadPDF} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
//           Download PDF
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
//           <thead>
//             <tr className="bg-blue-500 text-white">
//               <th className="p-3">ID</th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Mobile</th>
//               <th className="p-3">Date</th>
//               <th className="p-3">DOB</th>
//               <th className="p-3">Age</th>
//               <th className="p-3">Gender</th>
//               <th className="p-3">Adhaar</th>
//               <th className="p-3">PAN</th>
//               <th className="p-3">Account</th>
//               <th className="p-3">Address</th>
//               <th className="p-3">City</th>
//               <th className="p-3">Nominee</th>
//               <th className="p-3">Password</th>
//               <th className="p-3">Resume</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length > 0 ? (
//               employees.map((emp) => (
//                 <tr key={emp.id} className="border-b">
//                   <td className="p-3 text-center">{emp.Id}</td>
//                   <td className="p-3 text-center">
//                     {emp.image ? <img src={emp.image} alt="Profile" className="w-10 h-10 rounded-full lg:h-[40px] lg:w-[40px] " /> : "N/A"}
//                   </td>
//                   <td className="p-3 text-center">{emp.name}</td>
//                   <td className="p-3 text-center">{emp.email}</td>
//                   <td className="p-3 text-center">{emp.mobile}</td>
//                   <td className="p-3 text-center">{emp.date}</td>
//                   <td className="p-3 text-center">{emp.dob}</td>
//                   <td className="p-3 text-center">{emp.age}</td>
//                   <td className="p-3 text-center">{emp.gender}</td>
//                   <td className="p-3 text-center">{emp.adhaar}</td>
//                   <td className="p-3 text-center">{emp.pan}</td>
//                   <td className="p-3 text-center">{emp.account}</td>
//                   <td className="p-3 text-center">{emp.address}</td>
//                   <td className="p-3 text-center">{emp.city}</td>
//                   <td className="p-3 text-center">{emp.nominee}</td>
//                   <td className="p-3 text-center">{emp.password}</td>
//                   {/* <td className="p-3 text-center">
//                     {emp.image ? <img src={emp.image} alt="Profile" className="w-10 h-10 rounded-full lg:h-[40px] lg:w-[40px] " /> : "N/A"}
//                   </td> */}



//                   <td className="p-3 text-center">
//                     {emp.resume ? <a href={emp.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a> : "N/A"}
//                   </td>
//                   <td className={`p-3 text-center font-bold ${emp.status === "Approved" ? "text-green-500" : emp.status === "Rejected" ? "text-red-500" : "text-gray-500"}`}>
//                     {emp.status || "Pending"}
//                   </td>
//                   <td className="p-3 flex justify-center space-x-2">
//                     <button name="approved" onClick={() => handleApproved(emp.Id,"Approved")}className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
//                       Approve
//                     </button>
//                     <button onClick={() => handleReject(emp.Id, "Rejected")} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="18" className="p-3 text-center text-red-500 font-bold">No employees found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost/my-backend/emp.php")
//       .then(response => {
//         setEmployees(response.data.map(emp => ({ ...emp, status: emp.status || "Pending" })));
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const handleApprove = (emp) => {
//     if (window.confirm("Are you sure you want to approve this employee?")) {
//       axios.post("http://localhost/my-backend/jobApproved.php", emp)
//         .then(response => {
//           if (response.data.success) {
//             setEmployees(prevEmployees =>
//               prevEmployees.map(e =>
//                 e.Id === emp.Id ? { ...e, status: "Approved" } : e
//               )
//             );
//             alert("Employee approved and moved to another table.");
//           } else {
//             alert("Failed to approve employee.");
//           }
//         })
//         .catch(error => {
//           console.error("Error approving employee:", error);
//           alert("An error occurred.");
//         });
//     }
//   };
  
//   const handlereject = (Id, status) => {
//     setEmployees(prevEmployees =>
//       prevEmployees.map(emp =>
//         emp.Id === Id ? { ...emp, status } : emp
//       )
//     );
//   };

//   const handleDelete = (Id) => {
  
//       if (window.confirm("Are you sure you want to delete this user?")) {
//           axios.post("http://localhost/my-backend/Dlt_emp.php", { Id }) // Backend API for deletion
//               .then(() => {
//                   console.log("working with dltemployee")
//                 setEmployees(prevEmployees => prevEmployees.filter(emp => emp.Id !== Id));
//               })
//               .catch(error => console.error("Error deleting user:", error));
//       }
  
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100">
//       <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Employee List</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
//           <thead>
//             <tr className="bg-blue-500 text-white">
//               <th className="p-3">ID</th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Mobile</th>
//               <th className="p-3">Date</th>
//                <th className="p-3">DOB</th>
//                <th className="p-3">Age</th>
//                <th className="p-3">Gender</th>
//                <th className="p-3">Adhaar</th>
//                <th className="p-3">PAN</th>
//                <th className="p-3">Account</th>
//                <th className="p-3">Address</th>
//                <th className="p-3">City</th>
//              <th className="p-3">Nominee</th>
//                <th className="p-3">Password</th>
//                <th className="p-3">Resume</th>
               
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length > 0 ? (
//               employees.map((emp) => (
//                 <tr key={emp.Id} className="border-b">
//                   <td name="id" className="p-3 text-center">{emp.Id}</td>
//                   <td name="image" className="p-3 text-center">
//                     {emp.image ? <img src={emp.image} alt="Profile" className="w-10 h-10 rounded-full" /> : "N/A"}
//                   </td>
//                   <td name="name" className="p-3 text-center">{emp.name}</td>
//                   <td name="email" className="p-3 text-center">{emp.email}</td>
//                   <td  name="mobile" className="p-3 text-center">{emp.mobile}</td>
//                   <td  name="date" className="p-3 text-center">{emp.date}</td>
//                   <td  name="dob" className="p-3 text-center">{ emp.dob}</td>
                  
//                   <td name="age" className="p-3 text-center">{ emp.age}</td>
//                   <td name="gender" className="p-3 text-center">{ emp.gender}</td>
//                   <td  name="adhaar" className="p-3 text-center">{ emp.adhaar}</td>
//                   <td name="pan" className="p-3 text-center">{  emp.pan}</td>
//                   <td  name="account" className="p-3 text-center">{  emp.account}</td>
//                   <td name="address" className="p-3 text-center">{  emp.address}</td>
//                   <td name="city" className="p-3 text-center">{  emp.city}</td>
                  
//                   <td name="nominee" className="p-3 text-center">{ emp.nominee}</td>
//                   <td name="password" className="p-3 text-center">{emp.password}</td>
//                   <td  name="resume" className="p-3 text-center">{emp.resume ? "[Resume Attached]" : "N/A"}</td>
                  
                        
                        
      
//                   <td className={`p-3 text-center font-bold ${emp.status === "Approved" ? "text-green-500" : emp.status === "Rejected" ? "text-red-500" : "text-gray-500"}`}>
//                     {emp.status}
//                   </td>
//                   <td className="p-3 flex justify-center space-x-2">
//                   <button 
//   onClick={() => handleApprove(emp)} 
//   className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600" 
//   disabled={emp.status === "Approved" || emp.status === "Rejected"}
// >
//   Approve
// </button>

//                     <button 
//                       onClick={() => handlereject(emp.Id, "Rejected")} 
//                       className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600" 
//                       disabled={emp.status === "Approved" || emp.status === "Rejected"}
//                     >
//                       Reject
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(emp.Id)} 
//                       className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="p-3 text-center text-red-500 font-bold">No employees found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost/my-backend/emp.php")
//       .then(response => {
//         // Ensure that each employee has a default status of "Pending" if not already set
//         setEmployees(response.data.map(emp => ({ ...emp, status: emp.status || "Pending" })));
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   // Approve handler sends only the employee Id to the backend
//   const handleApprove = (emp) => {
//     if (window.confirm("Are you sure you want to approve this employee?")) {
//       axios.post(
//         "http://localhost/my-backend/jobApproved.php",
//         { Id: emp.Id },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then(response => {
//         console.log("Approve Response:", response.data);
//         if (response.data.success) {
//           setEmployees(prevEmployees =>
//             prevEmployees.map(e =>
//               e.Id === emp.Id ? { ...e, status: "Approved" } : e
//             )
//           );
//           alert("Employee approved and moved to the approved table.");
//         } else {
//           // Use a fallback message if response.data.message is not set
         
//         }
//       })
//       .catch(error => {
//         console.error("Error approving employee:", error);
//         // Try to extract a message from the error response
//         const errorMsg = error.response && error.response.data && error.response.data.message
//                           ? error.response.data.message
//                           : error.message;
//         alert("An error occurred: " + errorMsg);
//       });
//     }
//   };
  

//   const handlereject = (Id, status) => {
//     setEmployees(prevEmployees =>
//       prevEmployees.map(emp =>
//         emp.Id === Id ? { ...emp, status } : emp
//       )
//     );
//   };

//   const handleDelete = (Id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       axios.post(
//         "http://localhost/my-backend/Dlt_emp.php",
//         { Id },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then(() => {
//         setEmployees(prevEmployees => prevEmployees.filter(emp => emp.Id !== Id));
//       })
//       .catch(error => console.error("Error deleting user:", error));
//     }
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF("p", "mm", "a4");
//     doc.setFontSize(16);
//     doc.text("Employee List", 14, 20);

//     const tableColumn = [
//       "ID", "Name", "Email", "Mobile", "Date", "DOB", "Age", "Gender", 
//       "Adhaar", "PAN", "Account", "Address", "City", "Nominee", "Password", 
//       "Image", "Resume", "Status"
//     ];
//     const tableRows = employees.map(emp => [
//       emp.Id,
//       emp.name,
//       emp.email,
//       emp.mobile,
//       emp.date,
//       emp.dob,
//       emp.age,
//       emp.gender,
//       emp.adhaar,
//       emp.pan,
//       emp.account,
//       emp.address,
//       emp.city,
//       emp.nominee,
//       emp.password,
//       emp.image ? "[Profile Image]" : "N/A",
//       emp.resume ? "[Resume Attached]" : "N/A",
//       emp.status || "Pending"
//     ]);

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 30,
//       styles: { fontSize: 10, cellPadding: 3 }
//     });

//     doc.save("Employee_List.pdf");
//   };

//   return (
//     <div className="container ml-30 p-6 bg-gray-100">
//       <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Employee List</h2>
//       <div className="flex justify-end flex-col mb-4">
//         <button onClick={handleDownloadPDF} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
//           Download PDF
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
//           <thead>
//             <tr className="bg-blue-500 text-white">
//               <th className="p-3">ID</th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Mobile</th>
//               <th className="p-3">Date</th>
//               <th className="p-3">DOB</th>
//               <th className="p-3">Age</th>
//               <th className="p-3">Gender</th>
//               <th className="p-3">Adhaar</th>
//               <th className="p-3">PAN</th>
//               <th className="p-3">Account</th>
//               <th className="p-3">Address</th>
//               <th className="p-3">City</th>
//               <th className="p-3">Nominee</th>
//               <th className="p-3">Password</th>
//               <th className="p-3">Resume</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length > 0 ? (
//               employees.map(emp => (
//                 <tr key={emp.Id} className="border-b">
//                   <td className="p-3 text-center">{emp.Id}</td>
//                   <td className="p-3 text-center">
//                     {emp.image ? <img src={emp.image} alt="Profile" className="w-10 h-10 rounded-full" /> : "N/A"}
//                   </td>
//                   <td className="p-3 text-center">{emp.name}</td>
//                   <td className="p-3 text-center">{emp.email}</td>
//                   <td className="p-3 text-center">{emp.mobile}</td>
//                   <td className="p-3 text-center">{emp.date}</td>
//                   <td className="p-3 text-center">{emp.dob}</td>
//                   <td className="p-3 text-center">{emp.age}</td>
//                   <td className="p-3 text-center">{emp.gender}</td>
//                   <td className="p-3 text-center">{emp.adhaar}</td>
//                   <td className="p-3 text-center">{emp.pan}</td>
//                   <td className="p-3 text-center">{emp.account}</td>
//                   <td className="p-3 text-center">{emp.address}</td>
//                   <td className="p-3 text-center">{emp.city}</td>
//                   <td className="p-3 text-center">{emp.nominee}</td>
//                   <td className="p-3 text-center">{emp.password}</td>
//                   <td className="p-3 text-center">{emp.resume ? "[Resume Attached]" : "N/A"}</td>
//                   <td className={`p-3 text-center font-bold ${emp.status === "Approved" ? "text-green-500" : emp.status === "Rejected" ? "text-red-500" : "text-gray-500"}`}>
//                     {emp.status}
//                   </td>
//                   <td className="p-3 flex justify-center space-x-2">
//                     <button 
//                       onClick={() => handleApprove(emp)} 
//                       className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600" 
//                       disabled={emp.status === "Approved" || emp.status === "Rejected"}
//                     >
//                       Approve
//                     </button>
//                     <button 
//                       onClick={() => handlereject(emp.Id, "Rejected")} 
//                       className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600" 
//                       disabled={emp.status === "Approved" || emp.status === "Rejected"}
//                     >
//                       Reject
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(emp.Id)} 
//                       className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="19" className="p-3 text-center text-red-500 font-bold">No employees found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;
