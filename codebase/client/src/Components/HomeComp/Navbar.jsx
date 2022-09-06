import React, { useState,useEffect } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { status } from '../Login components/PSignup';
import {Pstatus} from '../Login components/PLogin'
//let newStatus = 1;

function Navbar() {
 
  const navigate = useNavigate();
  const [isdrLogin, setisdrLogin] = useState(0)
 // const [ispLogin, setPlogin] = useState(0)
  const [isadminLogin, setAdminLogin] = useState(0)
  
const name = localStorage.getItem("name")


  const [ispLogin, setPlogin] = useState(localStorage.getItem('patientToken'));
  useEffect(() => {
    function checkUserData() {
      const item = JSON.parse(localStorage.getItem("patientToken"));

      if (item) {
        setPlogin(item);
      }
    }

    window.addEventListener("storage", () => {
      checkUserData();
    });

    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, [localStorage.getItem("patientToken")]);







  // useEffect(() => {
   
  //   // console.log();
  //   if(localStorage.getItem('patientToken')){
  //     setPlogin(1);
  //     setAdminLogin(0)
  //     setisdrLogin(0)
  //   }else{
  //     setPlogin(0);
  //     setAdminLogin(0)
  //     setisdrLogin(0)
  //   }
    // if(status===1){
    // setPlogin(1);
    // setAdminLogin(0)
    // setisdrLogin(0)}
    // eslint-disable-next-line
  // }, [])
  
  console.log()
  const logOut = ()=>{
    setAdminLogin(0);
    setPlogin(0);
    setisdrLogin(0); 
    localStorage.clear();
   // newStatus=0
    navigate('/');

  }

 if(ispLogin && isadminLogin===0 && isdrLogin===0 ){
    
  return(
    <div>
    <div className="container-fluid sticky-top nav_bg nav_bg1">
    <div className="row">
        <div className="col-10 mx-auto">
<nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
<div className="container-fluid">
  <button exact='true' className="navbar-brand logobutton" >Global彡Hospital</button>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ">
    <ul className="navbar-nav m-auto">
             <li className="nav-item">
             <p className='nav-link'><strong className='text-danger'>{name}</strong></p>
           </li>
             <li className="nav-item">
             <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')}  to= '/dashboard' >Add Appointment</NavLink>
           </li>
           <li className="nav-item">
             <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')}  to= '/dashboard' >My Bookings</NavLink>
           </li>
             <li className="nav-item">
             <button className= 'nav-link'  onClick={logOut} >Logout</button>
           </li></ul>
           </ul>
           </div>
         </div>
       </nav>
       </div>
       </div>
     </div>
    </div>
  )
 }

else if( !ispLogin && isadminLogin===0 && isdrLogin===1){
  return(
    <div className="container-fluid sticky-top nav_bg nav_bg1">
    <div className="row">
        <div className="col-10 mx-auto">
        
<nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
<div className="container-fluid">
  <button exact='true' className="navbar-brand logobutton" >Global彡Hospital</button>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ">

    <li className="nav-item">
    <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')} exact='true'  to='/drdashboard'>My Appointments</NavLink>
    </li>

    <li className="nav-item">
    <button className= 'nav-link'  onClick={logOut} >Logout</button>
    </li>

    </ul>
    </div>
  </div>
</nav>
</div>
</div>
</div>
  )
}
else if( !ispLogin && isadminLogin===1 && isdrLogin===0){
  
  return(
    <div className="container-fluid sticky-top nav_bg nav_bg1">
        <div className="row">
            <div className="col-10 mx-auto">

    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
    <div className="container-fluid">
    <button exact='true' className="navbar-brand logobutton" >Global彡Hospital</button>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ">

        <li className="nav-item">
        <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')}  to= '/admin/dashboard' >Doctor List</NavLink>
        </li>

        <li className="nav-item">
        <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')}  to= '/admin/adddoctor' >Add Doctor</NavLink>
        </li>

        <li className="nav-item">
        <button className='nav-link'  onClick={logOut} >Logout</button>
        </li>

    </ul>
    </div>
  </div>
</nav>
</div>
</div>
</div>
  )
}
else if(!ispLogin && isadminLogin===0 && isdrLogin===0){
  
  return(
    <div className="container-fluid sticky-top nav_bg nav_bg1">
    <div className="row">
        <div className="col-10 mx-auto">
        
<nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
<div className="container-fluid">
  <button exact='true' className="navbar-brand logobutton" >Global彡Hospital</button>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ">
    <ul className="navbar-nav m-auto">
    <li className="nav-item">
    <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')} exact='true'  aria-current="page" to='/'>Home</NavLink>
  </li>
    
  
  <li className="nav-item">
    <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')} exact='true'  to='/psignup'>Patient Signup</NavLink>
  </li>
  
    </ul>
    </ul>
    </div>
  </div>
</nav>
</div>
</div>
</div>
  )
}
else{
  return(
    <div>Error</div>
  )
}







}

export default Navbar
//export {newStatus}