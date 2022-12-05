import React from 'react'
import CommonForm from './CommonForm'
import Navbar from '../HomeComp/Navbar'
function Drlogin() {
  const url = "http://13.232.26.236:5000/auth/login/doctor"
  return (
    <div className='fullContainer'>
    <Navbar/>
    <CommonForm Name ='Doctor' type="adminEmail" field='Enter Email' myulr={url} navigateTo = "/drdashboard" role='doctor'/>
    </div>
  )
}

export default Drlogin
