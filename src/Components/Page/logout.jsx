



// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Logout = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         setTimeout(() => {
//             localStorage.removeItem("userEmail");
//             localStorage.removeItem("userName");
//             navigate("/login");
//         }, 2000);
//     }, [navigate]);

//     return (
//         <motion.div 
//             initial={{ opacity: 0, y: -20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.5 }} 
//             className="flex mx-auto flex-col items-center justify-center h-screen"
//         >
//             <h2 className="text-2xl font-bold text-red-600 mb-4">Logging Out...</h2>
//             <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ repeat: Infinity, duration: 1 }}
//                 className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full"
//             />
//         </motion.div>
//     );
// };

// export default Logout;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                // Call the backend to destroy the session
                await axios.get("http://localhost/my-backend/logout.php", { withCredentials: true });

                // Clear local storage
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userName");

                // Redirect to login page
                navigate("/login");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }} 
            className="flex mx-auto flex-col items-center justify-center h-screen"
        >
            <h2 className="text-2xl font-bold text-red-600 mb-4">Logging Out...</h2>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full"
            />
        </motion.div>
    );
};

export default Logout;
