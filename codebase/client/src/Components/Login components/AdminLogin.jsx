import React from 'react'
import CommonForm from './CommonForm'

function AdminLogin() {
  return (
    <div className='fullContainer'>
    <CommonForm Name ='Admin' type="adminEmail" field='Enter Email Or Username'/>
    </div>
  )
}

export default AdminLogin