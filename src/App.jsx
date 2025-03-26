// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import About from './Components/About';
// import Home from './Components/Home';
// import Dashboard from './Components/Dashboard';
// import Dynamic from './Components/Dynamic';
// import Header from './Components/Header';
// import Attendence from './Components/Attendence';
// import Leave from './Components/Leave';
// import Personal_Dtl from './Components/Personal_Dtl';
// import Att_detail from './Components/Att_detail';
// import Shift from './Components/Shift';
// import View from './Components/View';
// import Contact from './Components/View/Contact';
// import Employeement from './Components/View/Employeement';
// import Experience from './Components/View/Experience';
// import Nominee from './Components/View/Nominee';
// import Personal from './Components/View/Personal';
// import Qualification from './Components/View/Qualification';
// import Register from './Components/Page/Register';

// import Job from './Components/Page/Job_register';
// import Admin from './Components/Admin';
// import RegisterTable from './Components/Page/RegisterTable';
// import LogedinTable from './Components/Page/LogedinTable';
// import EmployeeList from './Components/Page/EmployeeList';
// import Approved from './Components/Page/Approved_job';
// import Login from './Components/Page/login';
// import Requestshift from './Components/Page/Display_requestshift';
// import Approved_shift from './Components/Page/Approved_shift';
// import Reject_shift from './Components/Page/Rejectshiftrequest';
// import Displayleaves from './Components/Page/Desplayleaves';
// import DisplayApprovedLeaves from './Components/Page/DesplayApprovedLeaves';
// import Rejected_leaves from './Components/Page/DesaplyRejected_leaves';
// import EmployeeLogin from './Components/Page/emp_shiftLogin';
// import EmployeeleaveLogin from './Components/Page/emp_leavelogin';
// import EmployeeInfo from './Components/Page/Employeeinfo';
// import Logout from './Components/Page/logout';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <Router>
//       <Header />
//       <div className="flex h-full">
        // <Routes>
        //   <Route path="/" element={<><Navbar /><Home /></>} />
        //   <Route path="/about" element={<><Navbar /><About /></>} />
        //   <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
        //   <Route path="/register-table" element={<RegisterTable />} />
        //   <Route path="/EmployeeList" element={<EmployeeList/>} />
        //   <Route path="/logedin" element={<LogedinTable/>} />
        //   <Route path="/approve" element={<Approved/>} />
        //   <Route path="/Approvedshifts" element={<Approved_shift/>} />
        //   <Route path="/Rejectededshifts" element={<Reject_shift/>} />
        //   <Route path="/shifts" element={<Requestshift/>} />
        //   <Route path="/desplayleaves" element={<Displayleaves/>} />
        //   <Route path="/employeeinfo" element={<EmployeeInfo/>} />
        //   <Route path="/desplayrejectedleaves" element={<Rejected_leaves/>} />
        //   <Route path="/desplayapprovedleaves" element={<DisplayApprovedLeaves/>} />
        //   <Route path="/desplay" element={<><Navbar /><RegisterTable/></>} />
        //   <Route path="/att" element={<><Navbar /><Attendence /></>} />
        //   <Route path="/leave" element={<><Navbar /><Leave /></>} />
        //   <Route path="/dtl" element={<><Navbar /><Personal_Dtl /></>} />
        //   <Route path="/Att_dtl" element={<><Navbar /><Att_detail /></>} />
        //   <Route path="/shift" element={<><Navbar /><Shift /></>} />
        //   <Route path="/shiftlogin_emp" element={<><Navbar /><EmployeeLogin/></>} />
        //   <Route path="/leavelogin_emp" element={<><Navbar /><EmployeeleaveLogin/></>} />
        //   <Route path="/view" element={<><Navbar /><View /></>} />
        //   <Route path="/Register" element={<><Navbar /><Register /></>} />
        //   <Route path="/Login" element={<><Navbar/><Login/></>}/>
         
        //   <Route path="/Job_Registration" element={<><Navbar /><Job /></>} />
        //   <Route path="/contact" element={<Contact />} />
        //   <Route path="/Employeement" element={<Employeement />} />
        //   <Route path="/Exceperience" element={<Experience />} />
        //   <Route path="/Nominee" element={<Nominee />} />
        //   <Route path="/Personal" element={<Personal />} />
        //   <Route path="/Qualification" element={<Qualification />} />
        //   <Route path="/student/:id" element={<><Navbar /><Dynamic /></>} />
        //   <Route path="/admin" element={<><Navbar /><Admin /></>} /> {/* Admin Route */}
        //   <Route path="/logout" element={<><Navbar /><Logout/></>} /> 
        // </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from './Components/Navbar';
// import About from './Components/About';
// import Home from './Components/Home';
// import Dashboard from './Components/Dashboard';
// import Dynamic from './Components/Dynamic';
// import Header from './Components/Header';
// import Attendence from './Components/Attendence';
// import Leave from './Components/Leave';
// import Personal_Dtl from './Components/Personal_Dtl';
// import Att_detail from './Components/Att_detail';
// import Shift from './Components/Shift';
// import View from './Components/View';
// import Contact from './Components/View/Contact';
// import Employeement from './Components/View/Employeement';
// import Experience from './Components/View/Experience';
// import Nominee from './Components/View/Nominee';
// import Personal from './Components/View/Personal';
// import Qualification from './Components/View/Qualification';
// import Register from './Components/Page/Register';

// import Job from './Components/Page/Job_register';
// import Admin from './Components/Admin';
// import RegisterTable from './Components/Page/RegisterTable';
// import LogedinTable from './Components/Page/LogedinTable';
// import EmployeeList from './Components/Page/EmployeeList';
// import Approved from './Components/Page/Approved_job';
// import Login from './Components/Page/login';
// import Requestshift from './Components/Page/Display_requestshift';
// import Approved_shift from './Components/Page/Approved_shift';
// import Reject_shift from './Components/Page/Rejectshiftrequest';
// import Displayleaves from './Components/Page/Desplayleaves';
// import DisplayApprovedLeaves from './Components/Page/DesplayApprovedLeaves';
// import Rejected_leaves from './Components/Page/DesaplyRejected_leaves';
// import EmployeeLogin from './Components/Page/emp_shiftLogin';
// import EmployeeleaveLogin from './Components/Page/emp_leavelogin';
// import EmployeeInfo from './Components/Page/Employeeinfo';
// import Logout from './Components/Page/logout';

// import { motion } from "framer-motion";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/*"
//           element={
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Header />
//               <div className="app-container">
//                 <Navbar />
//                 <Routes>
//                 <Route path="/" element={<Home />} />
//           <Route path="/about" element={<><Navbar /><About /></>} />
//           <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
//           <Route path="/register-table" element={<RegisterTable />} />
//           <Route path="/EmployeeList" element={<EmployeeList/>} />
//           <Route path="/logedin" element={<LogedinTable/>} />
//           <Route path="/approve" element={<Approved/>} />
//           <Route path="/Approvedshifts" element={<Approved_shift/>} />
//           <Route path="/Rejectededshifts" element={<Reject_shift/>} />
//           <Route path="/shifts" element={<Requestshift/>} />
//           <Route path="/desplayleaves" element={<Displayleaves/>} />
//           <Route path="/employeeinfo" element={<EmployeeInfo/>} />
//           <Route path="/desplayrejectedleaves" element={<Rejected_leaves/>} />
//           <Route path="/desplayapprovedleaves" element={<DisplayApprovedLeaves/>} />
//           <Route path="/desplay" element={<><Navbar /><RegisterTable/></>} />
//           <Route path="/att" element={<><Navbar /><Attendence /></>} />
//           <Route path="/leave" element={<><Navbar /><Leave /></>} />
//           <Route path="/dtl" element={<><Navbar /><Personal_Dtl /></>} />
//           <Route path="/Att_dtl" element={<><Navbar /><Att_detail /></>} />
//           <Route path="/shift" element={<><Navbar /><Shift /></>} />
//           <Route path="/shiftlogin_emp" element={<><Navbar /><EmployeeLogin/></>} />
//           <Route path="/leavelogin_emp" element={<><Navbar /><EmployeeleaveLogin/></>} />
//           <Route path="/view" element={<><Navbar /><View /></>} />
//           <Route path="/Register" element={<><Navbar /><Register /></>} />
//           <Route path="/Login" element={<><Navbar/><Login/></>}/>
         
//           <Route path="/Job_Registration" element={<><Navbar /><Job /></>} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/Employeement" element={<Employeement />} />
//           <Route path="/Exceperience" element={<Experience />} />
//           <Route path="/Nominee" element={<Nominee />} />
//           <Route path="/Personal" element={<Personal />} />
//           <Route path="/Qualification" element={<Qualification />} />
//           <Route path="/student/:id" element={<><Navbar /><Dynamic /></>} />
//           <Route path="/admin" element={<><Navbar /><Admin /></>} /> {/* Admin Route */}
//           <Route path="/logout" element={<><Navbar /><Logout/></>} /> 
//         </Routes>
//               </div>
//             </motion.div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Dynamic from './Components/Dynamic';
import Header from './Components/Header';
import Attendence from './Components/Attendence';
import Leave from './Components/Leave';
import Personal_Dtl from './Components/Personal_Dtl';
import Att_detail from './Components/Att_detail';
import Shift from './Components/Shift';
import View from './Components/View';
import Contact from './Components/View/Contact';
import Employeement from './Components/View/Employeement';
import Experience from './Components/View/Experience';
import Nominee from './Components/View/Nominee';
import Personal from './Components/View/Personal';
import Qualification from './Components/View/Qualification';
import Register from './Components/Page/Register';
import Job from './Components/Page/Job_register';
// import Admin from './Components/Admin';
import RegisterTable from './Components/Page/RegisterTable';
import LogedinTable from './Components/Page/LogedinTable';
import EmployeeList from './Components/Page/EmployeeList';
import Approved from './Components/Page/Approved_job';
import Login from './Components/Page/login';
import Requestshift from './Components/Page/Display_requestshift';
import Approved_shift from './Components/Page/Approved_shift';
import Reject_shift from './Components/Page/Rejectshiftrequest';
import Displayleaves from './Components/Page/Desplayleaves';
import DisplayApprovedLeaves from './Components/Page/DesplayApprovedLeaves';
import Rejected_leaves from './Components/Page/DesaplyRejected_leaves';
import EmployeeLogin from './Components/Page/emp_shiftLogin';
import EmployeeleaveLogin from './Components/Page/emp_leavelogin';
import EmployeeInfo from './Components/Page/Employeeinfo';
import Logout from './Components/Page/logout';
import Admin from "./Components/Admin";

import { motion } from "framer-motion";
import Particular_infoDisplay from "./Components/Page/employee_particular";
import ParticularApprovedShift from "./Components/Page/Particular_shiftapprove";
import ParticularLeaveApproved from "./Components/Page/particular_leaveapprove";
import ParticularRejectLeave from "./Components/Page/particular_rejectleave";
import ParticularRejectShift from "./Components/Page/particular_shiftreject";
import SendNoticePublic from "./Components/Page/send_public_notice";
import Admindesplay_public_notice from "./Components/Page/DesplayPublicNotice";
import SendEmployeeNotice from "./Components/Page/sendEmployeeNotice";
import DesplayEmployeeNotice from "./Components/Page/DesplayEmployeeNotice";
import Notices from "./Components/Page/FetchallNotice_employee";
import DisplayAttendences from "./Components/Page/DesplayAttendences";
import DisplayEmployeeAttendance from "./Components/Page/Employee_attendence";
import ForgotPassword from "./Components/Page/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ If Not Logged In, Show Register/Login */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword/>} />



        <Route path="/logout" element={<Logout/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/register-table" element={<RegisterTable />} />
        <Route path="/EmployeeList" element={<EmployeeList />} />
        <Route path="/attendences" element={<DisplayAttendences/>} />
                  <Route path="/logedin" element={<LogedinTable />} />
                  <Route path="/approve" element={<Approved />} />
                  <Route path="/Approvedshifts" element={<Approved_shift />} />
                  <Route path="/Rejectededshifts" element={<Reject_shift />} />
                  <Route path="/shifts" element={<Requestshift />} />
                  <Route path="/desplayrejectedleaves" element={<Rejected_leaves />} />
                  <Route path="/desplayapprovedleaves" element={<DisplayApprovedLeaves />} />
                  <Route path="/sendpublic_notice" element={<SendNoticePublic/>} />
                  <Route path="/sendemp_notice" element={<SendEmployeeNotice/>} />
                  <Route path="/desplaypublic_notice" element={<Admindesplay_public_notice/>} />
                  <Route path="/desplayemp_notice" element={<DesplayEmployeeNotice/>} />

                  <Route path="/desplayleaves" element={<Displayleaves />} />
        {/* ✅ Once Logged In, Show Dashboard or Home */}
        <Route
          path="/*"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Header />
              <div className="flex h-full">
                <Navbar />
                <Routes>
                  {/* ✅ Default Home Page After Login */}
                  <Route path="/home" element={ <><Navbar/><Home /></>} />
                  
                  <Route path="/notice" element={<><Navbar /><Notices/></>} />
                  <Route path="/about" element={<><Navbar /><About /></>} />
                  <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
                  <Route path="/employeeleavelogin" element={<><Navbar /><EmployeeleaveLogin/></>} />
                  <Route path="/EmployeeList" element={<EmployeeList />} />
                  <Route path="/logedin" element={<LogedinTable />} />
                  <Route path="/approve" element={<Approved />} />
                  <Route path="/Approvedshifts" element={<Approved_shift />} />
                  <Route path="/Rejectededshifts" element={<Reject_shift />} />
                  <Route path="/particular" element={<Particular_infoDisplay/>} />
                  <Route path="/shifts" element={<Requestshift />} />
                  <Route path="/desplayleaves" element={<Displayleaves />} />
                  <Route path="/employeeinfo" element={<EmployeeInfo />} />
                  <Route path="/particular_rejectLeave" element={<ParticularRejectLeave/>} />
                  <Route path="/particular_rejectshift" element={<ParticularRejectShift/>} />
                  <Route path="/particular_leaveapprove" element={<ParticularLeaveApproved/>} />
                  <Route path="/particular_shiftapprove" element={<ParticularApprovedShift/>} />
                  <Route path="/particular_leaveapprove" element={<ParticularLeaveApproved/>} />
                  <Route path="/desplayrejectedleaves" element={<Rejected_leaves />} />
                  <Route path="/desplayapprovedleaves" element={<DisplayApprovedLeaves />} />
                  <Route path="/desplay" element={<><Navbar /><RegisterTable /></>} />
                  <Route path="/admin" element={<><Navbar /><EmployeeleaveLogin/></>} />
                  <Route path="/att" element={<><Navbar /><Attendence /></>} />
                  <Route path="/leave" element={<><Navbar /><Leave /></>} />
                  <Route path="/dtl" element={<><Navbar /><Personal_Dtl /></>} />
                  <Route path="/Att_dtl" element={<><Navbar /><Att_detail /></>} />
                  <Route path="/shift" element={<><Navbar /><Shift /></>} />
                  <Route path="/shiftlogin_emp" element={<><Navbar /><EmployeeLogin /></>} />
                  <Route path="/display_employee_attendence" element={<><Navbar /><DisplayEmployeeAttendance/></>} />
                  <Route path="/leavelogin_emp" element={<><Navbar /><EmployeeleaveLogin /></>} />
                  <Route path="/view" element={<><Navbar /><View /></>} />
                  <Route path="/Register" element={<><Navbar /><Register /></>} />
                  <Route path="/Login" element={<><Navbar /><Login /></>} />
                  <Route path="/Job_Registration" element={<><Navbar /><Job /></>} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/Employeement" element={<Employeement />} />
                  <Route path="/Exceperience" element={<Experience />} />
                  <Route path="/Nominee" element={<Nominee />} />
                  <Route path="/Personal" element={<Personal />} />
                  <Route path="/Qualification" element={<Qualification />} />
                  <Route path="/student/:id" element={<><Navbar /><Dynamic /></>} />
                  {/* <Route path="/admin" element={<><Navbar /><Admin /></>} />  */}
                  <Route path="/logout" element={<><Navbar /><Logout /></>} /> 
                </Routes>
              </div>
            </motion.div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
