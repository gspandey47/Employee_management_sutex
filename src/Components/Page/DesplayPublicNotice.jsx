// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const DesplayPublicNotice = () => {
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   const fetchNotices = () => {
//     axios
//       .get("http://localhost/my-backend/Admindesplay_public_notice.php", {
//         withCredentials: true,
//       })
//       .then((response) => {
//         if (response.data.success) {
//           setNotices(response.data.notices);
//         } else {
//           console.error("Error fetching data:", response.data.error);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   };

//   const handleDelete = (noticeId) => {
//     axios
//       .post(
//         "http://localhost/my-backend/delete_notice.php",
//         { notice_Id: noticeId },
//         { withCredentials: true }
//       )
//       .then((response) => {
//         if (response.data.success) {
//           fetchNotices(); // Refresh the notices after deletion
//         } else {
//           console.error("Error deleting notice:", response.data.error);
//         }
//       })
//       .catch((error) => {
//         console.error("Error deleting notice:", error);
//       });
//   };


//   const handleViewImage = (imageUrl) => {
//     window.open(`http://localhost/my-backend/${imageUrl}`, "_blank");
//   };

//   const handleViewFile = (fileUrl) => {
//     window.open(`http://localhost/my-backend/${fileUrl}`, "_blank");
//   };

//   return (
//     <div className="mx-auto min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">NoticeBoard</h2>

//       {loading ? (
//         <p className="text-gray-600">Loading ....</p>
//       ) : notices.length === 0 ? (
//         <p className="text-gray-600">No notices found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {notices.map((notice, index) => (
//             <motion.div
//               key={index}
//               className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 Notice Id: {notice.notice_Id}
//               </h3>
//               <p className="text-gray-600">
//                 <strong>Title:</strong> {notice.title}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Messages:</strong> {notice.notice_message}
//               </p>

            //   <p className="text-gray-600">
            //     <strong>Image:</strong> {notice.image_file && (
            //       <button
            //         onClick={() => handleViewImage(notice.image_file)}
            //         className="text-blue-500 underline"
            //       >
            //         View Image
            //       </button>
            //     )}
            //   </p>

            //   <p className="text-gray-600">
            //     <strong>File:</strong> {notice.pdf_file && (
            //       <button
            //         onClick={() => handleViewFile(notice.pdf_file)}
            //         className="text-blue-500 underline"
            //       >
            //         View File
            //       </button>
            //     )}
            //   </p>
//               <p className="text-gray-600">
//                 <strong>Date:</strong> {notice.notice_date}
//               </p>
//               <button
//                 onClick={() => handleDelete(notice.notice_Id)}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DesplayPublicNotice;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DesplayPublicNotice = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/my-backend/Admindesplay_public_notice.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setLeaves(response.data.leaves);
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">NoticeBoard</h2>

      {loading ? (
        <p className="text-gray-600">Loading ....</p>
      ) : leaves.length === 0 ? (
        <p className="text-gray-600">No notices found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaves.map((leave, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Notice Id: {leave.notice_Id}
              </h3>
              <p className="text-gray-600">
                <strong>Title:</strong> {leave.title}
              </p>
              <p className="text-gray-600">
                <strong>Messages:</strong> {leave.notice_message}
              </p>
              
              <p className="text-gray-600">
                <strong>Image:</strong> {leave.image_file && (
                  <button
                    onClick={() => handleViewImage(leave.image_file)}
                    className="text-blue-500 underline"
                  >
                    View Image
                  </button>
                )}
              </p>
              
              <p className="text-gray-600">
                <strong>File:</strong> {leave.pdf_file && (
                  <button
                    onClick={() => handleViewFile(leave.pdf_file)}
                    className="text-blue-500 underline"
                  >
                    View File
                  </button>
                )}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {leave.notice_date}
              </p>
              
              
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesplayPublicNotice;
