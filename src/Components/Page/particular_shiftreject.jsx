import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ParticularShiftReject = () => {
    const [rejectShifts, setRejectShifts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRejectedShifts = async () => {
            try {
                const response = await axios.get("http://localhost/my-backend/particular_rejectshift.php", {
                    withCredentials: true, // Include session
                });

                if (response.data.success) {
                    setRejectShifts(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching rejected shifts:", error);
                setError("Failed to fetch rejected shifts.");
            }
        };

        fetchRejectedShifts();
    }, []);

    return (
        <div className="p-6 ml-40">
            <h2 className="text-2xl font-bold mb-4">Rejected Shift Requests</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rejectShifts.map((shift, index) => (
                    <motion.div
                        key={index}
                        className="bg-red-100 p-4 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p><strong>Employee ID:</strong> {shift.employee_id}</p>
                        <p><strong>Status:</strong> {shift.status}</p>
                        <p><strong>Message:</strong> {shift.message}</p>
                        <p><strong>Reject Date:</strong> {shift.reject_date}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ParticularShiftReject;
