import React,{useState,useEffect} from 'react'
import DrList from './DrList'
import axios from 'axios';
import Navbar from '../HomeComp/Navbar';

function AdminDashboard() {
  const [card, setcard] = useState([])
  const token = localStorage.getItem("adminToken")
   const [isdeleted, setIsDeleted] = useState(0)
 
 useEffect(() => {
 
  let url = `http://13.232.26.236:5000/data/doctors/list`
  axios.get(url, { mode: 'no-cors', redirect: 'follow' })

    .then((response) => {
      const Sdata = response.data.data
      setcard(Sdata)
        console.log(Sdata[0].slug);
        setIsDeleted(0)
    })
    .catch((error) => {
      console.log(error);
    })
  }
  , [isdeleted])

  const functionSetDelete = ()=>{
    console.log("fuction");
    setIsDeleted(1);
  }
  
  if(token){
  return (
    <div> <Navbar role='admin'/> 
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
          isVerified={val.isVerified}
          delete = {isdeleted}
          functionSetDeleted = {functionSetDelete}
        />)
    }

    </div>
    </div>
    </div>
  )
}else{
  return(
    <div className='mt-5'>
    <div className="container DashboardContainer text-center mt-5">     
    <div className='mt-5'>
    <h1 className='loginHeader pb-5 '><br/> You are not Authorised.<br/><br/></h1>

    

    </div>
    </div></div>
   
  )
}
}
export default AdminDashboard
