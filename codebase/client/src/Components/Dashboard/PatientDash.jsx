import React,{useState,useEffect} from 'react'

import axios from 'axios';
import './Dashboard.css'
import Doctor from './Doctor'

function PatientDash() {
  const [card, setcard] = useState([])
  const [address, setAddress] = useState("")
 useEffect(() => {
  let url = `http://localhost:5000/data/doctors/nearby?address=${address}`
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

  const changeHandler = (e)=>{
    const {name,value} = e.target;
    console.log(e.target.value);
    setAddress(e.target.value)
    
  }

  const HandleSubmit = async (e)=>{
    e.preventDefault();
    try {

      let url = `http://localhost:5000/data/doctors/nearby?address=${address}`
      axios.get(url, { mode: 'no-cors', redirect: 'follow' })

    .then((response) => {
      const Sdata = response.data.data
      setcard(Sdata)
        console.log(Sdata[0].name);
    })
    .catch((error) => {
      console.log(error);
    })
    } catch (error) {
      console.log(error)
     // alert("Already have an account with the mobile number")
  }
  }

  return (
    <div className="container DashboardContainer text-center">
        
    <div className=''>
    <h1 className='loginHeader pb-5 '> Book Appointment</h1>
    <form className="form pt-5" onSubmit={HandleSubmit} >

        <div className= "input_field p-3">
        <input type="text" required value={address} name="address" id="address" placeholder="Your Current Location" autoComplete="off" onChange={changeHandler}  />
        </div>
        <button type="submit"  className="btn btn-primary"  >Submit Location</button>
      </form>
      <br />
    {
      card.map((val, index) =>
        <Doctor 
          key={val.id}
          id={index}
          name={val.name}
          education={val.degree}
          location = {val.address}
          clinic = {val.clinic}
          time1 = {val.clinicTime.openTime}
          time2 = {val.clinicTime.closeTime}  
        />)
    }

      
    </div>
    </div>
  )
}

export default PatientDash