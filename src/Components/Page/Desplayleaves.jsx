import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const Displayleaves = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost/my-backend/desaplyLeaves_request.php")
      .then(response => {
        setRequests(response.data.map(req => ({ ...req, status: req.status || "Pending" })));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleApprove = (employee_id) => {
    if (window.confirm("Approve this leaves request?")) {
      axios.post("http://localhost/my-backend/approvedLeaves.php", { employee_id: employee_id })
        .then(response => {
          alert(response.data.message);
          setRequests(prev => prev.filter(req => req.employee_id !== employee_id));
          navigate("/admin"); // Redirect to /admin after successful approval
        })
        .catch(error => alert("Error approving: " + error));
    }
  };
  const handleReject = (employee_id) => {
    if (window.confirm("Reject this leave request?")) {
      axios.post(
        "http://localhost/my-backend/rejectedleaves.php",
        { employee_id },
        { headers: { "Content-Type": "application/json" }, withCredentials: false }
      )
      .then(response => {
        alert(response.data.message);
        setRequests(prev => prev.filter(req => req.employee_id !== employee_id));
        navigate("/admin"); // Redirect to /admin after successful rejection
      })
      .catch(error => {
        console.error("Error rejecting:", error);
        alert("Network error: Could not connect to the server.");
      });
    }
  };
  const handleDelete = (employee_id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      axios.post(
        "http://localhost/my-backend/deleteLeaverequest.php",
        { employee_id },
        { headers: { "Content-Type": "application/json" }, withCredentials: false }
      )
      .then(response => {
        alert(response.data.message);
        setRequests(prev => prev.filter(req => req.employee_id !== employee_id));
      })
      .catch(error => {
        console.error("Error deleting:", error);
        alert("Network error: Could not connect to the server.");
      });
    }
  };
  

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Leave Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">EMPLOYEE ID</th>
              <th className="p-3">FROM DATE</th>
              <th className="p-3">TO DATE</th>
              <th className="p-3">LEAVE TYPE</th>
              <th className="p-3">REASON</th>
              <th className="p-3">FILE</th>
              <th className="p-3">COMMENTS</th>
              <th className="p-3">REQUEST DATE</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map(req => (
                <tr key={req.id} className="border-b">
                  <td className="p-3 text-center">{req.employee_id}</td>
                  <td className="p-3 text-center">{req.fromdate}</td>
                  <td className="p-3 text-center">{req.toDate}</td>
                  <td className="p-3 text-center">{req.leaveType}</td>
                  <td className="p-3 text-center">{req.reason}</td>
                  <td className="p-3 text-center">{req.file}</td>
                  <td className="p-3 text-center">{req.comments}</td>
                  <td className="p-3 text-center">{req.LeaveDate}</td>
                  <td className={`p-3 text-center font-bold ${req.status === "Approved" ? "text-green-500" : req.status === "Rejected" ? "text-red-500" : "text-gray-500"}`}>{req.status}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button 
                      onClick={() => handleApprove(req.employee_id)} 
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600" 
                      disabled={req.status === "Approved" || req.status === "Rejected"}
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(req.employee_id)} 
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600" 
                      disabled={req.status === "Approved" || req.status === "Rejected"}
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleDelete(req.employee_id)} 
                      className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-3 text-center text-red-500 font-bold">No leave requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Displayleaves;
