import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
function Navbar(props) {
  const navigate = useNavigate();  
  const name = localStorage.getItem("name")

  const logOut = ()=>{ 
    localStorage.removeItem(`${props.role}Token`);
    localStorage.removeItem('name')
    navigate('/');
  }

  if(props && props.role==='patient'){  
  return(
    <div>
    <div className="container-fluid sticky-top nav_bg nav_bg1">
    <div className="row">
        <div className="col-10 mx-auto">
<nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
<div className="container-fluid">
  <button exact='true' className="navbar-brand logobutton" >Direct2Clinic彡</button>
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
             <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')}  to= '/mybooking' >My Booking</NavLink>
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

  else if(props && props.role==='doctor'){
  return(
    <div className="container-fluid sticky-top nav_bg nav_bg1">
    <div className="row">
        <div className="col-10 mx-auto">
        
<nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
<div className="container-fluid">
  <button exact='true' className="navbar-brand logobutton" >Direct2Clinic彡</button>
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
  else if(props && props.role==='admin'){
  return(
    <div className="container-fluid sticky-top nav_bg nav_bg1">
        <div className="row">
            <div className="col-10 mx-auto">

    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
    <div className="container-fluid">
    <button exact='true' className="navbar-brand logobutton" >Direct2Clinic彡</button>
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
  else {
  return(
    <div className="container-fluid sticky-top nav_bg nav_bg1">
    <div className="row">
        <div className="col-10 mx-auto">
        
<nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
<div className="container-fluid">
  <button exact='true' className="navbar-brand logobutton" >Direct2Clinic彡</button>
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
  )}
}

export default Navbar
