import React from 'react'
import AppointList from './AppointList'

function DoctorDash() {
  return (
    <div className="container DashboardContainer text-center">
        
    <div className=''>
    <h1 className='loginHeader pb-5 '> My Appointments</h1>

    
    <AppointList/><AppointList/>
      
    </div>
    </div>
  )
}

export default DoctorDash