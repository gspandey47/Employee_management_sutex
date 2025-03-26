

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  async function onSubmit(data) {
    try {
      setLoading(true);
      console.log("Sending data:", data);
      const response = await axios.post("http://localhost/my-backend/register.php", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      console.log("Response from PHP:", response.data);
      setMessage(response.data.message);
      
      setTimeout(() => {
        setRedirecting(true);
        setTimeout(() => navigate('/login'), 1000);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error connecting to the backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div  className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
            EMPLOYEE MANAGEMENT SYSTEM
          </h1>

    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }} 
      className="bg-white h-auto md:mx-auto rounded-lg shadow-lg w-full max-w-md p-6"
    >
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Register</h2>
      
      <div className='border border-black p-2 mb-4'>{message && <p className="text-black">{message}</p>}</div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Username</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full mt-1 p-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full mt-1 p-2 border rounded-md"
            />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters required' } })}
            className="w-full mt-1 p-2 border rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <motion.button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : 'Register'}
        </motion.button>
      </form>
      
      {redirecting && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center mt-4 text-green-600">Redirecting to login...</motion.div>}

      <motion.p 
        className="text-center text-sm text-gray-600 mt-4"
        whileHover={{ scale: 1.1 }}
      >
        Already registered? <span className="text-purple-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>Login here</span>
      </motion.p>
    </motion.div>
        </div>
  );
};

export default Register;
