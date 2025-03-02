// import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");

//     const handleLogin = (e) => {
//         e.preventDefault();

//         axios.post("http://localhost/my-backend/login.php", { username, email })
//             .then(response => {
//                 if (response.data.success) {
//                     setMessage("Login successful!");
//                 } else {
//                     setMessage("Invalid username or email.");
//                 }
//             })
//             .catch(error => {
//                 console.error("Login error:", error);
//                 setMessage("An error occurred. Please try again.");
//             });
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
//             {message && <p className="text-red-500 mb-2">{message}</p>}
//             <form onSubmit={handleLogin}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Username:</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         className="w-full px-3 py-2 border rounded-lg"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full px-3 py-2 border rounded-lg"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = (e) => {
//         e.preventDefault();

//         axios.post("http://localhost/my-backend/login.php", { username, email })
//         // axios.post("http://localhost/my-backend/fetch_employee.php", {  email })
//             .then(response => {
//                 if (response.data.success) {
//                     localStorage.setItem("userEmail", email);
//                     localStorage.setItem("userName", username);
//                     setMessage("Login successful!");
//                     // navigate("/employeeinfo"); // Redirect to Employee Info page
//                 } else {
//                     setMessage("Invalid username or email.");
//                 }
//             })
//             .catch(error => {
//                 console.error("Login error:", error);
//                 setMessage("An error occurred. Please try again.");
//             });
        
//iske niche ka us effect nhi us ekran hai bhai 


// useEffect(() => {
//         axios.post("http://localhost/my-backend/fetch_employee.php", { email })
//         // axios.post("http://localhost/my-backend/fetch_employee.php", {  email })
//             .then(response => {
//                 if (response.data.success) {
//                     localStorage.setItem("userEmail", email);
//                     // localStorage.setItem("userName", username);
//                     setMessage("Login successful!");
//                     // navigate("/employeeinfo"); // Redirect to Employee Info page
//                 } else {
//                     setMessage("Invalid username or email.");
//                 }
//             })
//             .catch(error => {
//                 console.error("Login error:", error);
//                 setMessage("An error occurred. Please try again.");
//             });
//         },[]);
    // };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
//             {message && <p className="text-red-500 mb-2">{message}</p>}
//             <form onSubmit={handleLogin}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Username:</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         className="w-full px-3 py-2 border rounded-lg"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full px-3 py-2 border rounded-lg"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;