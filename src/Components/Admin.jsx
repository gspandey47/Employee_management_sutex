import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// import Logout from "./Page/logout";
import { RiAdminFill } from 'react-icons/ri';
const cards = [
  { title: "Registered Users", count: 120, link: "/register-table" },
  { title: "Logged-in Users", count: 85, link: "/logedin" },
  { title: "Job Registrations", count: 40, link: "/EmployeeList" },
  { title: "Attendances", count: 320, link: "/attendences" },
  { title: "Shifts", count: 25, link: "/shifts" },
  { title: "ApprovedShifts", count: 25, link: "/Approvedshifts" },
  { title: "RejectedShifts", count: 25, link: "/Rejectededshifts" },
  { title: "Requested Leaves", count: 18, link: "/desplayleaves" },
  { title: "Approved Leaves", count: 18, link: "/desplayapprovedleaves" },
  { title: "Rejected Leaves", count: 18, link: "/desplayrejectedleaves" },
  { title: "Approved Employees", count: 18, link: "/approve" },
  { title: "Send Public Notice", count: 18, link: "/sendpublic_notice" },
  { title: "Desplay Public Notice", count: 18, link: "/desplaypublic_notice" },
  { title: "Send Employee Notice", count: 18, link: "/sendemp_notice" },
  { title: "Desplay Employee Notice", count: 18, link: "/desplayemp_notice" },
];

function Admin() {
  return (
    <div className="min-h-screen mx-auto bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <NavLink to="/logout" className={({isActive})=>isActive?"Activeuper":""}>
                <div className="flex items-center">
                                    <RiAdminFill className="inline-block mr-2 text-lg" />
                                    <span>Logout</span>
                                  </div>
              </NavLink>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-700">{card.title}</h2>
            <p className="text-3xl font-bold text-purple-700 mt-2">{card.count}</p>
            <Link
              to={card.link}
              className="mt-4 inline-block bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition"
            >
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
