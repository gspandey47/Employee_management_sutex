import { useState } from "react";
import axios from "axios";

const SendNoticePublic = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    if (image) formData.append("image", image);
    if (pdf) formData.append("pdf", pdf);
    
    try {
      const response = await axios.post("http://localhost/my-backend/add_public_notice.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Notice Sent Successfully");
      setTitle("");
      setMessage("");
      setImage(null);
      setPdf(null);
    } catch (error) {
      console.error("Error sending notice:", error);
      alert("Failed to send notice");
    }
  };
  
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Send Public Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows="4"
          required
        ></textarea>
        <label className="block text-gray-700 font-medium">Upload Image (Optional)</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded-lg" />
        <label className="block text-gray-700 font-medium">Upload PDF (Optional)</label>
        <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} className="w-full p-2 border rounded-lg" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Send Notice</button>
      </form>
    </div>
  );
};

export default SendNoticePublic;
