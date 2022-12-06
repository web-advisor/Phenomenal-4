import React from 'react'
import CommonForm from './CommonForm'
import Navbar from '../HomeComp/Navbar'
function Drlogin() {
  const url = "https://phenomenal-doctors.onrender.com/auth/login/doctor"
  return (
    <div className='fullContainer'>
    <Navbar/>
    <CommonForm Name ='Doctor' type="adminEmail" field='Enter Email' myulr={url} navigateTo = "/drdashboard" role='doctor'/>
    </div>
  )
}

export default Drlogin
