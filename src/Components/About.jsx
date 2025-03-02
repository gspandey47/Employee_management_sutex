import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const teamMembers = [
    { name: 'GAURAV PANDEY' },
    { name: 'SABHAJEET YADAV' },
    { name: 'HARIKESH SAINI' },
    { name: 'KRUNAL SATOTE' },
  ];

  const projectDetails = [
    'This project is designed for employees who work as field workers.',
    'Field workers can belong to any company, such as broadband services, WiFi installation, Swiggy, Zomato, or other delivery services.',
    'How to Use: 1. Register 2. Login.',
    'Note: Login and registration details must match. If they match, the user can log in; otherwise, they cannot.',
    'Once logged in, the user will be directed to the home page or UI where they can apply for job registration. The response will be shown in the notifications.',
    'Hard work is also involved. Once the user applies, there will be a call process or other activities.',
    'If the job is approved, the user’s card will be displayed on the home page, and all details will be visible on the view page.',
    'Shift changing is also part of the system.',
    'Leave requests can be submitted.',
    'An attendance system is also included.',
  ];

  const futureFeatures = [
    'Real-time notifications for job updates and approvals.',
    'Integration with Google Maps for tracking field workers.',
    'Advanced analytics and reporting for employee performance.',
    'Mobile app support for better accessibility.',
    'Chatbot integration for employee queries and support.',
    'Payroll management system integration.',
    'Multi-language support for diverse workforces.',
    'AI-based shift scheduling for optimal resource allocation.',
    'Integration with biometric devices for attendance tracking.',
    'Employee feedback and review system.',
  ];

  const enhancements = [
    'Improve the user interface (UI) for better user experience.',
    'Add role-based access control (e.g., admin, manager, employee).',
    'Implement a robust backend for handling large datasets.',
    'Add a dashboard for admins to monitor employee activities.',
    'Integrate third-party APIs for additional functionality (e.g., weather updates for field workers).',
    'Add a feature for employees to upload documents (e.g., ID proofs, certificates).',
    'Implement a task management system for field workers.',
    'Add a feature for employees to track their daily tasks and progress.',
    'Integrate a reward system for employee motivation.',
    'Add a feature for employees to request equipment or tools.',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
            EMPLOYEE MANAGEMENT SYSTEM
          </h1>

          {/* Team Members Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Team Members:</h2>
            <ul className="space-y-2">
              {teamMembers.map((member, index) => (
                <li key={index} className="text-gray-700">
                  {index + 1}. {member.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Project Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Details:</h2>
            <ul className="space-y-3">
              {projectDetails.map((detail, index) => (
                <li key={index} className="text-gray-700">
                  {index + 1}. {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Future Features Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Future Features:</h2>
            <ul className="space-y-3">
              {futureFeatures.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {index + 1}. {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Enhancements Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Enhance the Project:</h2>
            <ul className="space-y-3">
              {enhancements.map((enhancement, index) => (
                <li key={index} className="text-gray-700">
                  {index + 1}. {enhancement}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tech Stack:</h2>
            <ul className="space-y-2">
              <li className="text-gray-700">Frontend: ReactJS, TailwindCSS, Framer Motion</li>
              <li className="text-gray-700">Backend: PHP</li>
              <li className="text-gray-700">Database: MySQL</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
