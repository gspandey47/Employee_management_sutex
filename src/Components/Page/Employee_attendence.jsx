import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayEmployeeAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch attendance data automatically when the component loads
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost/my-backend/fetch_employee_attendence.php', {
          withCredentials: true, // ✅ Include credentials (cookies) for session-based authentication
        });

        // Check if the response contains data
        if (Array.isArray(response.data)) {
          setAttendanceData(response.data);
        } else if (response.data.message) {
          setError(response.data.message);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('Error fetching attendance data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Attendance Records</h1>

      {/* Display Attendance Data in a Table */}
      {attendanceData.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Date Time</th>
              <th className="py-2 px-4 border-b">Session ID</th>
              <th className="py-2 px-4 border-b">Session Email</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{record.type}</td>
                <td className="py-2 px-4 border-b">{record.location}</td>
                <td className="py-2 px-4 border-b">{record.DateTime}</td>
                <td className="py-2 px-4 border-b">{record.session_id}</td>
                <td className="py-2 px-4 border-b">{record.session_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4">No attendance records found.</div>
      )}
    </div>
  );
};

export default DisplayEmployeeAttendance;