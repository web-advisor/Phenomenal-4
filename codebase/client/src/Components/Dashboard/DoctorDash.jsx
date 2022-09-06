import React from 'react'

import './Dashboard.css'
import Doctor from './Doctor'

function DoctorDash() {
  return (
    <div className="container DashboardContainer text-center">
        
    <div className=''>
    <h1 className='loginHeader pb-5 '> Book Appointment</h1>

<Doctor className='m-2'/>
<Doctor/>
      
    </div>
    </div>
  )
}

export default DoctorDash