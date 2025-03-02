import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeParticular = () => {
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
    <div className="flex px-8 mx-auto justify-center items-center h-screen bg-gray-100">
      <div className="bg-white px-12 py-4 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Employee Details</h2>
        {employee ? (
          <div className="py-2">
            <img
              src={`http://localhost/my-backend/${employee.image}`}
              alt="Employee"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <p><strong>Id:</strong> {employee.Id}</p>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Mobile:</strong> {employee.mobile}</p>
            <p><strong>Age:</strong> {employee.age}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>Adhaar:</strong> {employee.adhaar}</p>
            <p><strong>PAN:</strong> {employee.pan}</p>
            <p><strong>Account:</strong> {employee.account}</p>
            <p><strong>Date of Birth:</strong> {employee.dob}</p>
            <p><strong>Address:</strong> {employee.address}</p>
            <p><strong>City:</strong> {employee.city}</p>
            <p><strong>Nominee:</strong> {employee.nominee}</p>
          </div>
        ) : (
          <p>No Employee Data Found</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeParticular;
