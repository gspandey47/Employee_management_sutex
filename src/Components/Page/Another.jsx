
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);

//   // Fetch Employee Data
//   useEffect(() => {
//     axios.get("http://localhost/my-backend/Emp1.php")
//       .then(response => {
//         console.log("API Response:", response.data); // Debugging API Data
//         if (Array.isArray(response.data)) {
//           setEmployees(response.data); // Ensure correct state update
//         } else {
//           console.error("Invalid API response:", response.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
  

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
//               <th className="p-3">Gender</th>
//                <th className="p-3">Adhaar</th>
//                <th className="p-3">PAN</th>
//                <th className="p-3">Account</th>               <th className="p-3">Address</th>
//                <th className="p-3">City</th>
//                <th className="p-3">Nominee</th>
//                <th className="p-3">password</th>
//               <th className="p-3">Resume</th>
//             </tr>
//           </thead>
//           <tbody>
// {employees.length > 0 ? (
//   employees.map((emp, index) => (
    
    
//   ):
// ()) }
// </tbody>
// </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;
