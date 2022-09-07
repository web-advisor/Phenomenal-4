import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './Dashboard.css'
import Doctor from './Doctor'

function PatientDash() {
  const [card, setcard] = useState([])
 
 useEffect(() => {
  let url = `http://localhost:5000/data/doctors/list/verified`
  axios.get(url, { mode: 'no-cors', redirect: 'follow' })

    .then((response) => {
      const Sdata = response.data.data
      setcard(Sdata)
        console.log(Sdata[0].name);
    })
    .catch((error) => {
      console.log(error);
    })
}
  , [])

  return (
    <div className="container DashboardContainer text-center">
        
    <div className=''>
    <h1 className='loginHeader pb-5 '> Book Appointment</h1>

    {
      card.map((val, index) =>
        <Doctor 
          key={val.id}
          id={index}
          name={val.name}
          education={val.degree}
          location = {val.clinic}
          time1 = {val.clinicTime.openTime}
          time2 = {val.clinicTime.closeTime}  
        />)
    }

      
    </div>
    </div>
  )
}

export default PatientDash