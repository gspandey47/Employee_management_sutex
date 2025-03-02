
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EmployeeleaveLogin = () => {
    const [Id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post("http://localhost/my-backend/employee_login.php", { username, email })
            .then(response => {
                if (response.data.success) {
                  navigate("/leave"); // Redirect to Shift Page upon successfully
                    setMessage("Login successful!");
                } else {
                    setMessage("Invalid Id or email.");
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                setMessage("An error occurred. Please try again.");
            });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Before Enter the leave page please Logein </h2>
            {message && <p className="text-red-500 mb-2">{message}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700">username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default EmployeeleaveLogin;
