import React,{useState,useEffect} from 'react'
import Navbar from "../HomeComp/Navbar"
import axios from 'axios';
import './Dashboard.css'
import Doctor from './Doctor'
//server : listdr nearby : line 77 : getdr.js -> isVerified =true in find function
function PatientDash() {
  const [card, setcard] = useState([])
  const [address, setAddress] = useState("")

  const deleteItem = () => {
    console.log("deleted");
  }
  useEffect(() => {
    let url = `https://fast-eyrie-20747.herokuapp.com/admin/manage/doctor/delete/${card.slug}`
    axios.delete(url, { mode: 'no-cors', redirect: 'follow',
  headers:{authorization :`JWT ${localStorage.getItem('adminToken')}`}
  })
  
      .then((response) => {
       
          console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }// eslint-disable-next-line
    ,[deleteItem])






 useEffect(() => {
  let url = `https://fast-eyrie-20747.herokuapp.com/data/doctors/nearby?address=${address}`
  axios.get(url, { mode: 'no-cors', redirect: 'follow',
})

    .then((response) => {
      const Sdata = response.data.data
      setcard(Sdata)
        console.log(Sdata[0].name);
    })
    .catch((error) => {
      console.log(error);
    })
}// eslint-disable-next-line
  ,[])

  const changeHandler = (e)=>{
    setAddress(e.target.value)
  }

  const HandleSubmit = async (e)=>{
    e.preventDefault();
    try {

      let url = `https://fast-eyrie-20747.herokuapp.com/data/doctors/nearby?address=${address}`
      axios.get(url, { mode: 'no-cors', redirect: 'follow' })

    .then((response) => {
      const Sdata = response.data.data
      setcard(Sdata)
        console.log(Sdata[0].slug);
    })
    .catch((error) => {
      console.log(error);
    })
    } catch (error) {
      console.log(error)
     
  }
  }

  return (
    <div>
    <Navbar role='patient'/>
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
          slug={val.slug}
          function = {deleteItem}  
        />)
    }

      
    </div>
    </div>
    </div>
  )
}

export default PatientDash