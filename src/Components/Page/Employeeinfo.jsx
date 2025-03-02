import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeInfo() {
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
            axios.post("http://localhost/my-backend/fetch_employee.php", { email: userEmail })
                .then(response => {
                    if (response.data.success) {
                        setEmployee(response.data.employee);
                    } else {
                        setEmployee(null);
                    }
                })
                .catch(error => console.error("Error fetching employee data:", error));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        navigate("/login"); // Redirect to login page
    };

    if (!employee) {
        return <p className="text-center text-gray-500 mt-10">No employee data found.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10 border border-gray-200">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Employee Information</h1>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 mt-6">
                {/* Employee Image */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                    <img src={employee.image} alt="Employee" className="w-48 h-48 rounded-lg object-cover shadow-md border border-gray-300" />
                </div>
                
                {/* Employee Details */}
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold">{employee.name}</h2>
                    <p className="text-gray-600 text-lg">{employee.email}</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p><strong className="text-gray-700">Mobile:</strong> {employee.mobile}</p>
                        <p><strong className="text-gray-700">Age:</strong> {employee.age}</p>
                        <p><strong className="text-gray-700">Gender:</strong> {employee.gender}</p>
                        <p><strong className="text-gray-700">Aadhaar:</strong> {employee.adhaar}</p>
                        <p><strong className="text-gray-700">PAN:</strong> {employee.pan}</p>
                        <p><strong className="text-gray-700">Account:</strong> {employee.account}</p>
                        <p><strong className="text-gray-700">DOB:</strong> {employee.dob}</p>
                        <p><strong className="text-gray-700">City:</strong> {employee.city}</p>
                        <p className="col-span-2"><strong className="text-gray-700">Address:</strong> {employee.address}</p>
                        <p className="col-span-2"><strong className="text-gray-700">Nominee:</strong> {employee.nominee}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeInfo;
