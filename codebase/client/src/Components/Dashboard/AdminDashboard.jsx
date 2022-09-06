import React from 'react'
import DrList from './DrList'

function AdminDashboard() {
  return (
    <div className="container DashboardContainer text-center">
        
    <div className=''>
    <h1 className='loginHeader pb-5 '> Doctor List</h1>
      <DrList/>
      <DrList/>
    </div>
    </div>
  )
}

export default AdminDashboard
