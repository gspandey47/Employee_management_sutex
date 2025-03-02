import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DesplayEmployeeNotice = () => {
  const [Employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/my-backend/Admindesplay_employee_notice.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setEmployee(response.data.leaves);
        } else {
          console.error("Error fetching data:", response.data.error);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching  data:", error);
        setLoading(false);
      });
  }, []);

  
  const handleViewImage = (imageUrl) => {
    window.open(`http://localhost/my-backend/${imageUrl}`, "_blank");
  };


  const handleViewFile = (fileUrl) => {
    window.open(`http://localhost/my-backend/${fileUrl}`, "_blank");
  };

  return (
    <div className=" mx-auto min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee NoticeBoard</h2>

      {loading ? (
        <p className="text-gray-600">Loading ....</p>
      ) : Employee.length === 0 ? (
        <p className="text-gray-600">No  Employee notices found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Employee.map((employee, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Employee Id: {employee.employeeId}
              </h3>
              <p className="text-gray-600">
                <strong>Title:</strong> {employee.title}
              </p>
              <p className="text-gray-600">
                <strong>Messages:</strong> {employee.message}
              </p>
              
              <p className="text-gray-600">
                <strong>Image:</strong> {employee.image_file && (
                  <button
                    onClick={() => handleViewImage(employee.image_file)}
                    className="text-blue-500 underline"
                  >
                    View Image
                  </button>
                )}
              </p>
              
              <p className="text-gray-600">
                <strong>File:</strong> {employee.pdf_file && (
                  <button
                    onClick={() => handleViewFile(employee.pdf_file)}
                    className="text-blue-500 underline"
                  >
                    View File
                  </button>
                )}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {employee.notice_date}
              </p>
              
              
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesplayEmployeeNotice;
