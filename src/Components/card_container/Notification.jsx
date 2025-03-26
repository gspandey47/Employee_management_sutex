// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const NoticeIcon = () => {
//   const navigate = useNavigate();

//   // Redirect to /notice on click
//   const handleClick = () => {
//     navigate("/notice");
//   };

//   return (
//     <motion.div
//       className="fixed bottom-8 right-8 w-12 h-12 bg-purple-800 rounded-full cursor-pointer flex items-center justify-center"
//       onClick={handleClick}
//       animate={{
//         scale: [1, 1.2, 1], // Pulse animation
//         boxShadow: [
//           "0 0 0 0 rgba(0, 123, 255, 0.7)",
//           "0 0 0 10px rgba(0, 123, 255, 0)",
//           "0 0 0 0 rgba(0, 123, 255, 0)",
//         ],
//       }}
//       transition={{
//         duration: 2, // Animation duration
//         repeat: Infinity, // Infinite loop
//         ease: "easeInOut",
//       }}
//     >
//       <div className="w-5 h-5 bg-white rounded-full"></div>
//     </motion.div>
//   );
// };

// export default NoticeIcon;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NoticeIcon = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  // Redirect to /notice on click
  const handleClick = () => {
    navigate("/notice");
  };

  // Show and hide message every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage((prev) => !prev); // Toggle message visibility
    }, 5000); // 5-second delay

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 right-8 w-12 h-12 bg-purple-800 rounded-full cursor-pointer flex items-center justify-center"
      onClick={handleClick}
      animate={{
        scale: [1, 1.2, 1], // Pulse animation
        boxShadow: [
          "0 0 0 0 rgba(0, 123, 255, 0.7)",
          "0 0 0 10px rgba(0, 123, 255, 0)",
          "0 0 0 0 rgba(0, 123, 255, 0)",
        ],
      }}
      transition={{
        duration: 2, // Animation duration
        repeat: Infinity, // Infinite loop
        ease: "easeInOut",
      }}
    >
      <div className="w-5 h-5 bg-white rounded-full"></div>

      {/* Message Box on the Left Side */}
      {showMessage && (
        <motion.div
          className="absolute -top-2 -left-32 bg-white text-purple-800 text-sm px-3 py-1 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
        >
          Your Notifications
        </motion.div>
      )}
    </motion.div>
  );
};

export default NoticeIcon;