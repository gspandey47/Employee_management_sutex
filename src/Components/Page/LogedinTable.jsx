import React, { useEffect, useState } from "react";
import axios from "axios";

const LogedinTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost/my-backend/fetch_logedin.php") // Adjust path if needed
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Function to delete a user
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.post("http://localhost/my-backend/delete_logedin.php", { id }) // Backend API for deletion
                .then(() => {
                    setUsers(users.filter(user => user.id!==id)); // Remove user from UI
                })
                .catch(error => console.error("Error deleting user:", error));
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Logedin Users</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-gray-100 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-purple-700 text-white text-left">
                           
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.id} className="border-b hover:bg-gray-200 transition">
                                   
                                    <td className="px-4 py-2">{user.username}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(user.email)}
                                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-3 text-center text-gray-600">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LogedinTable;
