import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ParticularApprovedShift = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/my-backend/particular_shiftapprove.php", { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setShifts(response.data.shifts);
        }
      })
      .catch((error) => console.error("Error fetching shift data:", error));
  }, []);

  return (
    <div className=" mx-auto min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Approved Shifts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {shifts.map((shift, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">Shift: {shift.shift}</h2>
            <h2 className="text-xl font-semibold text-gray-800">Shift: {shift.employee_id}</h2>
            <p className="text-gray-600 mt-1">Reason: {shift.reason}</p>
            <p className="text-gray-600 mt-1">Date: {shift.shift_date}</p>
            <p className="text-gray-600 mt-1">Additional Notes: {shift.additional_notes}</p>
            <p className="text-gray-600 mt-1">Request Date: {shift.request_date}</p>
            <p className="text-gray-800 font-bold mt-2">Status: {shift.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParticularApprovedShift;
