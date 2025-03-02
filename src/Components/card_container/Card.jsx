// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const Card = () => {
//   const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     axios
//       .get("http://localhost/my-backend/fetch_employee.php", {
//         withCredentials: true, // ✅ Ensures session is sent
//         headers: { "Content-Type": "application/json" },
//       })
//       .then((res) => {
//         console.log("API Response:", res.data); // ✅ Debugging
//         if (res.data.success) {
//           setEmployee(res.data.employee);
//         } else {
//           setError(res.data.error);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch Error:", err); // ✅ Debugging
//         setError("Error fetching employee details");
//         setLoading(false);
//       });
//   }, []);
  

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
  
    
  
    
//       <div className="bg-gray-100 p-4 lg:h-[330px] rounded-lg shadow-lg max-w-md">
       
//         {employee ? (
//               <div>
                

//                 <img
//                   src={`http://localhost/my-backend/${employee.image}`}
//                   alt="Employee"
//                   className="w-28 h-28 rounded-full mx-auto mb-4"
//                   />
//                 <p><strong>Id:</strong> {employee.Id}</p>
//                 <p><strong>Name:</strong> {employee.name}</p>
//                 <p><strong>Email:</strong> {employee.email}</p>
//                 <p><strong>Mobile:</strong> {employee.mobile}</p>
//                 <p><strong>Address:</strong> {employee.address}</p>
        
//               </div>
//             ) : (
//               <p>No Employee Data Found</p>
//             )}
//               </div>
           
            
            
//         );
// };

// export default Card;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Framer Motion import

const Card = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/my-backend/fetch_employee.php", {
        withCredentials: true, // ✅ Ensures session is sent
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log("API Response:", res.data); // ✅ Debugging
        if (res.data.success) {
          setEmployee(res.data.employee);
        } else {
          setError(res.data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err); // ✅ Debugging
        setError("Error fetching employee details");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }} // Card starts above and invisible
      animate={{
        y: 0, // Move to original position
        opacity: 1, // Fade in
        transition: {
          type: "tween", // Smooth slide animation
          duration: 1.5, // Slow slide
        },
      }}
      whileHover={{
        y: [0, -10, 0], // Gentle jump on hover
        transition: {
          duration: 0.5, // Slow jump
          repeat: Infinity, // Infinite jump
          repeatType: "reverse", // Jump up and down
        },
      }}
      className="bg-gray-100 p-4 lg:h-[330px] rounded-lg shadow-lg max-w-md mx-auto"
    >
      {employee ? (
        <div>
          <img
            src={`http://localhost/my-backend/${employee.image}`}
            alt="Employee"
            className="w-28 h-28 rounded-full mx-auto mb-4"
          />
          <p><strong>Id:</strong> {employee.Id}</p>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Mobile:</strong> {employee.mobile}</p>
          <p><strong>Address:</strong> {employee.address}</p>
        </div>
      ) : (
        <p>No Employee Data Found</p>
      )}
    </motion.div>
  );
};

export default Card;