

// import { useState } from "react";
// import axios from "axios";

// const Attendence = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState("");
//   const [isAttendanceInDisabled, setIsAttendanceInDisabled] = useState(false);
//   const [isAttendanceOutDisabled, setIsAttendanceOutDisabled] = useState(false);

//   const fetchLocation = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         getAddress(latitude, longitude);
//       },
//       () => {
//         setError("Location access denied. Enable location services.");
//       }
//     );
//   };

//   const getAddress = async (lat, lon) => {
//     const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY; // Fix here
//     const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.results.length > 0) {
//         const address = data.results[0].components;

//         setLocation({
//           fullAddress: data.results[0].formatted,
//           street: address.road || "N/A",
//           city: address.city || address.town || address.village || "N/A",
//           district: address.state_district || "N/A",
//           state: address.state || "N/A",
//           country: address.country || "N/A",
//           postalCode: address.postcode || "N/A",
//           timestamp: new Date().toLocaleString(),
//         });
//       } else {
//         setError("Error fetching location data.");
//       }
//     } catch (err) {
//       setError("Error fetching data.");
//     }
//   };

//   const handleAttendance = async (type) => {
//     if (!location) {
//       setError("Please fetch your location first.");
//       return;
//     }
  
//     try {
//       // Prepare the data to be sent to the backend
//       const payload = {
//         type, // 'in' or 'out'
//         location: location.fullAddress, // Full address from OpenCage
//         timestamp: new Date().toLocaleString(), // Current timestamp
//       };
  
//       console.log("Sending data to backend:", payload); // Debugging: Log the payload
  
//       // Send attendance data to the backend
//       const res = await axios.post("http://localhost/my-backend/Attendences.php", payload);
//       // const res = await axios.post("http://localhost/my-backend/unnecesssary.php", payload);
  
//       // Check if the response contains a message
//       if (res.data && res.data.message) {
//         alert(res.data.message); // Show success message
//       } else {
//         alert("Attendance marked successfully!"); // Fallback message
//       }
  
//       // Disable the respective button after marking attendance
//       if (type === "in") {
//         setIsAttendanceInDisabled(true);
//       } else if (type === "out") {
//         setIsAttendanceOutDisabled(true);
//       }
//     } catch (err) {
//       // Handle errors
//       if (err.response && err.response.data && err.response.data.error) {
//         alert("Error: " + err.response.data.error); // Show backend error message
//       } else {
//         alert("Error processing attendance."); // Fallback error message
//       }
//     }
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <button
//         onClick={fetchLocation}
//         className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition mb-4"
//       >
//         Get My Location
//       </button>

//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {location && (
//         <div className="mt-6 p-4 bg-white shadow-md rounded-lg text-left w-full max-w-md">
//           <h2 className="text-lg font-bold mb-2">Location Details</h2>
//           <p>
//             <strong>Full Address:</strong> {location.fullAddress}
//           </p>
//           <p>
//             <strong>Street:</strong> {location.street}
//           </p>
//           <p>
//             <strong>City:</strong> {location.city}
//           </p>
//           <p>
//             <strong>District:</strong> {location.district}
//           </p>
//           <p>
//             <strong>State:</strong> {location.state}
//           </p>
//           <p>
//             <strong>Country:</strong> {location.country}
//           </p>
//           <p>
//             <strong>Postal Code:</strong> {location.postalCode}
//           </p>
//           <p>
//             <strong>Timestamp:</strong> {location.timestamp}
//           </p>

//           <div className="mt-4 flex space-x-4">
//             <button
//               onClick={() => handleAttendance("in")}
//               disabled={isAttendanceInDisabled}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition disabled:bg-gray-400"
//             >
//               Attendance In
//             </button>
//             <button
//               onClick={() => handleAttendance("out")}
//               disabled={isAttendanceOutDisabled}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition disabled:bg-gray-400"
//             >
//               Attendance Out
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Attendence;


import { useState, useEffect } from "react";
import axios from "axios";

const Attendence = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [isAttendanceInDisabled, setIsAttendanceInDisabled] = useState(false);
  const [isAttendanceOutDisabled, setIsAttendanceOutDisabled] = useState(false);
  const [sessionData, setSessionData] = useState({ email: "", Id: "" }); // State for session data

  // Fetch session data (email and Id) from the backend when the component loads
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const res = await axios.get("http://localhost/my-backend/getSessiondata.php", {
          withCredentials: true, // Include cookies for session
        });

        if (res.data && res.data.email && res.data.Id) {
          setSessionData({ email: res.data.email, Id: res.data.Id });
        } else {
          setError("Session data not found.");
        }
      } catch (err) {
        setError("Error fetching session data.");
      }
    };

    fetchSessionData();
  }, []);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getAddress(latitude, longitude);
      },
      () => {
        setError("Location access denied. Enable location services.");
      }
    );
  };

  const getAddress = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY; // Fix here
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const address = data.results[0].components;

        setLocation({
          fullAddress: data.results[0].formatted,
          street: address.road || "N/A",
          city: address.city || address.town || address.village || "N/A",
          district: address.state_district || "N/A",
          state: address.state || "N/A",
          country: address.country || "N/A",
          postalCode: address.postcode || "N/A",
          timestamp: new Date().toLocaleString(),
        });
      } else {
        setError("Error fetching location data.");
      }
    } catch (err) {
      setError("Error fetching data.");
    }
  };

  const handleAttendance = async (type) => {
    if (!location) {
      setError("Please fetch your location first.");
      return;
    }

    try {
      // Prepare the data to be sent to the backend
      const payload = {
        type, // 'in' or 'out'
        location: location.fullAddress, // Full address from OpenCage
        timestamp: new Date().toLocaleString(), // Current timestamp
        sessionId: sessionData.Id, // Include session ID
        sessionEmail: sessionData.email, // Include session email
      };

      console.log("Sending data to backend:", payload); // Debugging: Log the payload

      // Send attendance data to the backend
      const res = await axios.post("http://localhost/my-backend/Attendences.php", payload);

      // Check if the response contains a message
      if (res.data && res.data.message) {
        alert(res.data.message); // Show success message
      } else {
        alert("Attendance marked successfully!"); // Fallback message
      }

      // Disable the respective button after marking attendance
      if (type === "in") {
        setIsAttendanceInDisabled(true);
      } else if (type === "out") {
        setIsAttendanceOutDisabled(true);
      }
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data && err.response.data.error) {
        alert("Error: " + err.response.data.error); // Show backend error message
      } else {
        alert("Error processing attendance."); // Fallback error message
      }
    }
  };

  return (
    <div className="flex flex-col  mx-auto items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Display session data (email and Id) */}
      {sessionData.email && sessionData.Id && (
        <div className="mb-4 p-4 bg-white shadow-md rounded-lg text-left w-full max-w-md">
          <h2 className="text-lg font-bold mb-2">Session Details</h2>
          <p>
            <strong>Email:</strong> {sessionData.email}
          </p>
          <p>
            <strong>Session ID:</strong> {sessionData.Id}
          </p>
        </div>
      )}

      <button
        onClick={fetchLocation}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition mb-4"
      >
        Get My Location
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {location && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg text-left w-full max-w-md">
          <h2 className="text-lg font-bold mb-2">Location Details</h2>
          <p>
            <strong>Full Address:</strong> {location.fullAddress}
          </p>
          <p>
            <strong>Street:</strong> {location.street}
          </p>
          <p>
            <strong>City:</strong> {location.city}
          </p>
          <p>
            <strong>District:</strong> {location.district}
          </p>
          <p>
            <strong>State:</strong> {location.state}
          </p>
          <p>
            <strong>Country:</strong> {location.country}
          </p>
          <p>
            <strong>Postal Code:</strong> {location.postalCode}
          </p>
          <p>
            <strong>Timestamp:</strong> {location.timestamp}
          </p>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleAttendance("in")}
              disabled={isAttendanceInDisabled}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition disabled:bg-gray-400"
            >
              Attendance In
            </button>
            <button
              onClick={() => handleAttendance("out")}
              disabled={isAttendanceOutDisabled}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition disabled:bg-gray-400"
            >
              Attendance Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendence;











