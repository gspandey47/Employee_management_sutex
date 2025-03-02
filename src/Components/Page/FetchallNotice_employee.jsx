import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notices = () => {
    const [publicNotices, setPublicNotices] = useState([]);
    const [privateNotices, setPrivateNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('http://localhost/my-backend/Desplay_notices.php', {
                    withCredentials: true, // To send cookies (session) with the request
                });

                if (response.data.success) {
                    setPublicNotices(response.data.public_notices);
                    setPrivateNotices(response.data.private_notices);
                } else {
                    setError(response.data.error);
                }
            } catch (err) {
                setError('Failed to fetch notices');
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    const handleView = (imageUrl) => {
        window.open(`http://localhost/my-backend/${imageUrl}`, '_blank');
    };

    const handleViewFile = (fileUrl) => {
        window.open(`http://localhost/my-backend/${fileUrl}`, '_blank');
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Main Flex Container */}
            <div className="flex flex-col sm:flex-row gap-8">
                {/* Left Side - Private Notices */}
                <div className="sm:w-1/2">
                    <h1 className="text-3xl font-bold mb-8 text-center">Private Notices</h1>
                    <div className="flex flex-col gap-6">
                        {privateNotices.map((notice) => (
                            <div key={notice.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                                <h2 className="text-xl font-semibold mb-2">Employee ID: {notice.employeeId}</h2>
                                <h2 className="text-xl font-semibold mb-2">{notice.title}</h2>
                                <p className="text-gray-700 mb-4">{notice.message}</p>
                                <div className="flex space-x-4">
                                    <p className="text-gray-600">
                                        <strong>Image:</strong>{' '}
                                        {notice.image_file && (
                                            <button
                                                onClick={() => handleView(notice.image_file)}
                                                className="text-blue-500 underline"
                                            >
                                                View Image
                                            </button>
                                        )}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>File:</strong>{' '}
                                        {notice.pdf_file && (
                                            <button
                                                onClick={() => handleViewFile(notice.pdf_file)}
                                                className="text-blue-500 underline"
                                            >
                                                View File
                                            </button>
                                        )}
                                    </p>
                                </div>
                                <p className="text-gray-700 mb-4">{notice.notice_date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Public Notices */}
                <div className="sm:w-1/2">
                    <h1 className="text-3xl font-bold mb-8 text-center">Public Notices</h1>
                    <div className="flex flex-col gap-6">
                        {publicNotices.map((notice) => (
                            <div key={notice.notice_id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                                <h2 className="text-xl font-semibold mb-2">{notice.title}</h2>
                                <p className="text-gray-700 mb-4">{notice.notice_message}</p>
                                <div className="flex space-x-4">
                                    <p className="text-gray-600">
                                        <strong>Image:</strong>{' '}
                                        {notice.image_file && (
                                            <button
                                                onClick={() => handleView(notice.image_file)}
                                                className="text-blue-500 underline"
                                            >
                                                View Image
                                            </button>
                                        )}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>File:</strong>{' '}
                                        {notice.pdf_file && (
                                            <button
                                                onClick={() => handleViewFile(notice.pdf_file)}
                                                className="text-blue-500 underline"
                                            >
                                                View File
                                            </button>
                                        )}
                                    </p>
                                </div>
                                <p className="text-gray-700 mb-4">{notice.notice_date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notices;


