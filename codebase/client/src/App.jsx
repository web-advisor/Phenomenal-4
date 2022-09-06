import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from './Components/HomeComp/Navbar'
import {Routes,Route} from 'react-router-dom'
import PLogin from './Components/Login components/PLogin'
import PSignup from './Components/Login components/PSignup'
import DrLogin from './Components/Login components/Drlogin.jsx'
import AdminLogin from './Components/Login components/AdminLogin.jsx'
import Home from './Components/HomeComp/Home'
import DoctorDash from './Components/Dashboard/DoctorDash';
import Footer from './Components/HomeComp/Footer';
import AddDoctor from './Components/Login components/AddDoctor';
import AdminDashboard from './Components/Dashboard/AdminDashboard';

function App() {
  return (
    <div>
    <Navbar></Navbar>

    <Routes>
    <Route element={<Home/>} path='/' exact="true"/>
    <Route element={<PLogin/>} path="/plogin" exact='true'/>
    <Route element={<AddDoctor/>} path="/admin/adddoctor" exact='true'/>
    <Route element={<DrLogin/>} path="/drlogin" exact='true'/>
    <Route element={<PSignup/>} path="/psignup" exact='true'/>
    <Route element={<AdminLogin/>} path="/adminlogin" exact='true'/>
    <Route element={<DoctorDash/>} path="/dashboard" exact='true'/>
    <Route element={<AdminDashboard/>} path="/admin/dashboard" exact='true'/>
    </Routes>
    <Footer/>
    </div> )
}

export default App