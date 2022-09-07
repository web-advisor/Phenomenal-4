import React,{useState,useEffect} from 'react'
import DrList from './DrList'
import axios from 'axios';

function AdminDashboard() {
  const [card, setcard] = useState([])





 
 useEffect(() => {
  let url = `http://localhost:5000/data/doctors/list`
  axios.get(url, { mode: 'no-cors', redirect: 'follow' })

    .then((response) => {
      const Sdata = response.data.data
      setcard(Sdata)
        console.log(Sdata[0].slug);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  , [])

  return (
    <div className="container DashboardContainer text-center">     
    <div className=''>
    <h1 className='loginHeader pb-5 '> Doctor List</h1>

    {
      card.map((val, index) =>
        <DrList 
          key={val.id}
          id={index}
          name={val.name}
          education={val.degree}
          location = {val.clinic}
          time1 = {val.clinicTime.openTime}
          time2 = {val.clinicTime.closeTime} 
          slug={val.slug} 
        />)
    }

    </div>
    </div>
  )
}

export default AdminDashboard
