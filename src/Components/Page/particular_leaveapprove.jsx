import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ParticularLeaveApproved = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/my-backend/particular_leaveapproved.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setLeaves(response.data.leaves);
        } else {
          console.error("Error fetching leave data:", response.data.error);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className=" mx-auto min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Approved Leaves</h2>

      {loading ? (
        <p className="text-gray-600">Loading leave details...</p>
      ) : leaves.length === 0 ? (
        <p className="text-gray-600">No approved leaves found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaves.map((leave, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Leave Type: {leave.leaveType}
              </h3>
              <p className="text-gray-600">
                <strong>Id:</strong> {leave.employee_id}
              </p>
              <p className="text-gray-600">
                <strong>From:</strong> {leave.fromDate}
              </p>
              <p className="text-gray-600">
                <strong>To:</strong> {leave.toDate}
              </p>
              <p className="text-gray-600">
                <strong>Reason:</strong> {leave.reason}
              </p>
              <p className="text-gray-600">
                <strong>Comments:</strong> {leave.comments}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    leave.status === "Approved" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {leave.status}
                </span>
              </p>
              <p className="text-gray-500 text-sm mt-2">
                <strong>Applied On:</strong> {leave.LeaveDate}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticularLeaveApproved;
