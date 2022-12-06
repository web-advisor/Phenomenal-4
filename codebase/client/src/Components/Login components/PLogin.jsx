import React from 'react'
import CommonForm from './CommonForm';
import Navbar from '../HomeComp/Navbar'
let Pstatus=0;

function PLogin() {
  const url ="https://phenomenal-doctors.onrender.com/auth/login/patient"   
  
  return (
    <div className='fullContainer'>
    <Navbar/>
   <CommonForm Name ='Patient' type="adminEmail" field='Enter Email' myulr={url} navigateTo = "/dashboard" role='patient'/>
   </div>
  )
}

export default PLogin
export {Pstatus}