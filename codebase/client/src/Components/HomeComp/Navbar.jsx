import React, {  } from 'react'
import { NavLink } from 'react-router-dom'


function Navbar() {
  const isLogin = 0 ;

 
  return (
    <>
    <div className="container-fluid sticky-top nav_bg nav_bg1">
        <div className="row">
            <div className="col-10 mx-auto">
            


    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
    <div className="container-fluid">
      <NavLink exact='true' className="navbar-brand" to='/'>Global彡Hospital</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ">
         

          {
             isLogin ? 
             <ul className="navbar-nav m-auto">
             <li className="nav-item">
             <p className='nav-link'>Patient FName</p>
           </li>
             <li className="nav-item">
             <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')}  to= '/dashboard' >My Dashboard</NavLink>
           </li>
             <li className="nav-item">
             <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')}  to= '/' >Logout</NavLink>
           </li></ul>
           : 

           <ul className="navbar-nav m-auto">
           <li className="nav-item">
           <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')} exact='true'  aria-current="page" to='/'>Home</NavLink>
         </li>
           
         
         <li className="nav-item">
           <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')} exact='true'  to='/psignup'>Patient Signup</NavLink>
         </li>
         <NavLink className={({isActive}) => (isActive ? "active-style nav-link" : 'nav-link')} exact='true'  to='/about'>Our Hospitals</NavLink>
           </ul>
          }
          
        </ul>
      </div>
    </div>
  </nav>
  </div>
  </div>
</div>
    
    </>
    
  )
}

export default Navbar