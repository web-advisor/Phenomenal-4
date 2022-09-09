import React from 'react'
import CommonForm from './CommonForm'

function AdminLogin() {
  const url = "https://fast-eyrie-20747.herokuapp.com/auth/login/admin"
  return (
    <div className='fullContainer'> 
    <CommonForm Name ='Admin' type="adminEmail" field='Enter Email Or Username' myulr={url} navigateTo = "/admin/dashboard" role='admin'/>
    </div>
  )
}

export default AdminLogin