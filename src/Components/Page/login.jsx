import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [usernameOrPassword, setUsernameOrPassword] = useState(""); // Single field for username/password
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/my-backend/login.php",
        { email, usernameOrPassword }, // Send usernameOrPassword instead of separate username/password
        {
          withCredentials: true, // ✅ Ensures session cookies are sent
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Backend response:", response.data); // Debugging

      if (response.data.success) {
        setMessage("Login successful!");
        if (response.data.role === "admin") {
          // ✅ Open Admin Dashboard in a new tab
          window.open("/admin", "_blank");
        } else {
          setTimeout(() => navigate("/home"), 1000); // Redirect to home page
        }
      } else {
        setMessage(response.data.error || "Invalid email, username, or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Username or Password"
            value={usernameOrPassword}
            onChange={(e) => setUsernameOrPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [usernameOrPassword, setUsernameOrPassword] = useState(""); // Single field for username/password
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();


//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await axios.post(
//         "http://localhost/my-backend/login1.php",
//         { email, usernameOrPassword },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
  
//       console.log("Backend response:", response.data); // Debugging
  
//       if (response.data.success) {
//         setMessage("Login successful!");
//         if (response.data.role === "admin") {
//           setTimeout(() => (window.location.href = "/admin"), 1000); // ✅ Full page reload for admin
//         } else {
//           setTimeout(() => navigate("/home"), 1000);
//         }
//       } else {
//         setMessage(response.data.error || "Invalid email, username, or password.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };
  

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost/my-backend/login1.php",
//   //       { email, usernameOrPassword }, // Send usernameOrPassword instead of separate username/password
//   //       {
//   //         withCredentials: true, // ✅ Ensures session cookies are sent
//   //         headers: { "Content-Type": "application/json" },
//   //       }
//   //     );

//   //     console.log("Backend response:", response.data); // Debugging

//   //     if (response.data.success) {
//   //       setMessage("Login successful!");
//   //       if (response.data.role === "admin") {
//   //         setTimeout(() => (window.location.href="/admin"), 1000); // Redirect to admin page
//   //       } else {
//   //         setTimeout(() => navigate("/home"), 1000); // Redirect to home page
//   //       }
//   //     } else {
//   //       setMessage(response.data.error || "Invalid email, username, or password.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login error:", error);
//   //     setMessage("An error occurred. Please try again.");
//   //   }
//   // };

//   return (
//     <motion.div
//       className="flex justify-center items-center h-screen bg-gray-100"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         {message && <p className="text-red-500 text-center">{message}</p>}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Username or Password"
//             value={usernameOrPassword}
//             onChange={(e) => setUsernameOrPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default Login;







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost/my-backend/login.php",
//         { username, email },
//         {
//           withCredentials: true, // ✅ Ensures session cookies are sent
//           headers: { "Content-Type": "application/json" }
//         }
//       )
      

//       if (response.data.success) {
//         setMessage("Login successful!");
//         setTimeout(() => navigate("/home"), 1000); // Redirect after delay
//       } else {
//         setMessage("Invalid username or email.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <motion.div
//       className="flex justify-center items-center h-screen bg-gray-100"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         {message && <p className="text-red-500 text-center">{message}</p>}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost/my-backend/login1.php",
//         { email, password },
//         {
//           withCredentials: true, // ✅ Ensures session cookies are sent
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       console.log("Backend response:", response.data); // Debugging

//       if (response.data.success) {
//         setMessage("Login successful!");
//         if (response.data.role === "admin") {
//           setTimeout(() => navigate("/admin"), 1000); // Redirect to admin page
//         } else {
//           setTimeout(() => navigate("/home"), 1000); // Redirect to home page
//         }
//       } else {
//         setMessage(response.data.error || "Invalid email or password.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <motion.div
//       className="flex justify-center items-center h-screen bg-gray-100"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         {message && <p className="text-red-500 text-center">{message}</p>}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default Login;