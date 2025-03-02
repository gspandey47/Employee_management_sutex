// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const Approved = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isopen, setIsOpen] =useState();

   
  
//    useEffect(() => {
//  axios.get("http://localhost/my-backend/fetch_approve.php")
//        .then(response => {
//          console.log("API Response:", response.data); // Debugging API data
//          setEmployees(response.data);
//        })
//        .catch(error => {
//          console.error("Error fetching data:", error);
//        });
//    }, []);
  


//    const handleDelete = (Id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       axios.post(
//         "http://localhost/my-backend/Dlt_approve.php",
//         { Id },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then(() => {
//         setEmployees(prevEmployees => prevEmployees.filter(emp => emp.Id !== Id));
//       })
//       .catch(error => console.error("Error deleting user:", error));
//     }
//   };




// const handleDownloadPDF = () => {
//          const doc = new jsPDF("p", "mm", "a4"); // Vertical layout
//          doc.setFontSize(16);
//          doc.text("Employee List", 14, 20);
    
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
//   return (
//     <div className="container mx-auto px-2 bg-gray-100">
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
//               {/* <th className="p-3">Status</th> */}
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
//                   {/* <td className={`p-3 text-center font-bold ${emp.status === "Approved" ? "text-green-500" : emp.status === "Rejected" ? "text-red-500" : "text-gray-500"}`}>
//                     {emp.status || "Pending"}
//                   </td> */}
//                   <td>
//                     <button onClick={() =>handleDelete(emp.Id, "Rejected")} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
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

// export default Approved;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const Approved = () => {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost/my-backend/fetch_approve.php")
//       .then(response => {
//         // Ensure that each employee has a default status of "Pending" if not already set
//         setEmployees(response.data.map(emp => ({ ...emp, status: emp.status || "Pending" })));
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const handleDelete = (Id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       axios.post(
//         "http://localhost/my-backend/delete_approve.php",
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
//     <div className="container  p-6 bg-gray-100">
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
//               {/* <th className="p-3">Status</th> */}
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
//                  <td>
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

// export default Approved;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const Approved = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost/my-backend/fetch_approve.php")
      .then(response => {
        // Ensure that each employee has a default status of "Pending" if not already set
        setEmployees(response.data.map(emp => ({ ...emp, status: emp.status || "Pending" })));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (Id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.post(
        "http://localhost/my-backend/delete_approve.php",
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
    <div className="container p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Employee List</h2>
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
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(emp => (
                <tr key={emp.Id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-center">{emp.Id}</td>
                  <td className="p-3 text-center">
                    {emp.image ? <img src={emp.image} alt="Profile" className="w-10 h-10 rounded-full" /> : "N/A"}
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
                  <td className="p-3 flex justify-center space-x-2">
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

export default Approved;