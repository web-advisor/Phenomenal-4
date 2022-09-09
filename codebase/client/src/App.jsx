import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route } from 'react-router-dom'
import PLogin from './Components/Login components/PLogin'
import PSignup from './Components/Login components/PSignup'
import DrLogin from './Components/Login components/Drlogin.jsx'
import AdminLogin from './Components/Login components/AdminLogin.jsx'
import Home from './Components/HomeComp/Home'
import PatientDash from './Components/Dashboard/PatientDash';
import Footer from './Components/HomeComp/Footer';
import AddDoctor from './Components/Login components/AddDoctor';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import DoctorDash from './Components/Dashboard/DoctorDash';
import Pbooking from './Components/Dashboard/Pbooking';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path='/' exact="true" />
        <Route element={<PLogin />} path="/plogin" exact='true' />
        <Route element={<AddDoctor />} path="/admin/adddoctor" exact='true' />
        <Route element={<DrLogin />} path="/drlogin" exact='true' />
        <Route element={<PSignup />} path="/psignup" exact='true' />
        <Route element={<AdminLogin />} path="/adminlogin" exact='true' />
        <Route element={<PatientDash />} path="/dashboard" exact='true' />
        <Route element={<AdminDashboard />} path="/admin/dashboard" exact='true' />
        <Route element={<DoctorDash />} path="/drdashboard" exact='true' />
        <Route element={<Pbooking />} path="/mybooking" exact='true' />
      </Routes>
      <Footer />
    </div>)
}

export default App