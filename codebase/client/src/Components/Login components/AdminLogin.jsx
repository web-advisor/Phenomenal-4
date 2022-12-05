import React from 'react'
import CommonForm from './CommonForm'

function AdminLogin() {
  const url = "http://13.232.26.236:5000/auth/login/admin"
  return (
    <div className='fullContainer'> 
    <CommonForm Name ='Admin' type="adminEmail" field='Enter Email Or Username' myulr={url} navigateTo = "/admin/dashboard" role='admin'/>
    </div>
  )
}

export default AdminLogin