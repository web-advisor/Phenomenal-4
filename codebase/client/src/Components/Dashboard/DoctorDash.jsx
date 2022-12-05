import React,{useEffect, useState} from 'react'
import AppointList from './AppointList'
import Navbar from '../HomeComp/Navbar'
import axios from 'axios'
function DoctorDash() {
  const [card, setcard] = useState([])
  useEffect(() => {
    let url = `http://13.232.26.236:5000/doctor/appointments/list`
    axios.get(url, { mode: 'no-cors', redirect: 'follow',
  headers:{authorization :`JWT ${localStorage.getItem('doctorToken')}`}
  })
  
      .then((response) => {
        const Sdata = response.data.data
        setcard(Sdata)
          console.log(Sdata[0]._id);
      })
      .catch((error) => {
        console.log(error);
      })
  }// eslint-disable-next-line
    ,[])

  return (
    <div>
    <Navbar role='doctor'/>
    <div className="container DashboardContainer text-center">
        
    <div className=''>
    <h1 className='loginHeader pb-5 '> My Appointments</h1>

    {

      card.map((val, index) =>
        <AppointList
          key={val.id}
          id={index}
          pName={val.patientName}
          tokenNo={val.tokenNo}
          slot={val.startTime}
          Status = {val.status}
          key2 ={val._id}  
        />)
    }
    
    </div>
    </div>
    </div>
  ) 
}

export default DoctorDash