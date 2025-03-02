import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ParticularRejectLeave = () => {
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/my-backend/particular_rejectleave.php", {
        withCredentials: true, // Ensures session is sent
      })
      .then((response) => {
        if (response.data.success) {
          setRejectedLeaves(response.data.rejectedLeaves);
        } else {
          setError("No rejected leave records found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching rejected leave data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col mx-auto items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ❌ Rejected Leaves
      </motion.h1>

      {loading && <p className="text-gray-600">Loading rejected leaves...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rejectedLeaves.map((leave, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-5 border-l-8 border-red-500 w-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-lg font-semibold text-red-600">Rejected Leave</h2>
            <p className="text-gray-700 mt-2">
              <strong>Employee ID:</strong> {leave.employee_id}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {leave.status}
            </p>
            <p className="text-gray-700">
              <strong>Message:</strong> {leave.message}
            </p>
            <p className="text-gray-700">
              <strong>Rejected Date:</strong> {leave.RejectDtae}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParticularRejectLeave;
