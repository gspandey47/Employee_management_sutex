// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function EmployeeLogin() {
//   const [Id, setEmployeeId] = useState("");
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await axios.post("http://localhost/my-backend/employee_login.php", {
        
//         email,
//       });
      
//       if (response.data.success) {
//         navigate("/shift"); // Redirect to Shift Page upon successful login
//       } else {
//         setError("Invalid Employee ID or Email");
//       }
//     } catch (err) {
//       setError("Server error. Please try again later.");
//     }

//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Employee Login</h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Employee ID"
//             value={Id}
//             onChange={(e) => setEmployeeId(e.target.value)}
//             className="w-full p-2 border rounded mb-2"
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded mb-4"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EmployeeLogin = () => {
    const [Id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post("http://localhost/my-backend/employee_login.php", { Id, email })
            .then(response => {
                if (response.data.success) {
                  navigate("/shift"); // Redirect to Shift Page upon successfully
                    setMessage("Login successful!");
                } else {
                    setMessage("Invalid Id or email.");
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                setMessage("An error occurred. Please try again.");
            });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Before Enter the shift page please Logein </h2>
            {message && <p className="text-red-500 mb-2">{message}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700">Id:</label>
                    <input
                        type="text"
                        value={Id}
                        onChange={(e) => setId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default EmployeeLogin;
