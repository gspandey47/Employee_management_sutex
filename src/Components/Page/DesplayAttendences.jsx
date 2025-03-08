import React, { useEffect, useState } from 'react';

const DisplayAttendences = () => {
  const [attendences, setAttendences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the PHP API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/my-backend/Fetch_attendence.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAttendences(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete action
  const handleDelete = async (session_id) => {
    try {
      const response = await fetch(`http://your-server-url/delete-attendence.php?session_id=${session_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
      // Remove the deleted record from the state
      setAttendences(attendences.filter(attendence => attendence.session_id !== session_id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendence Records</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Date Time</th>
            <th className="py-2 px-4 border-b">Session ID</th>
            <th className="py-2 px-4 border-b">Session Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendences.map((attendence) => (
            <tr key={attendence.session_id}>
              <td className="py-2 px-4 border-b">{attendence.type}</td>
              <td className="py-2 px-4 border-b">{attendence.location}</td>
              <td className="py-2 px-4 border-b">{attendence.DateTime}</td>
              <td className="py-2 px-4 border-b">{attendence.session_id}</td>
              <td className="py-2 px-4 border-b">{attendence.session_email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(attendence.session_id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayAttendences;