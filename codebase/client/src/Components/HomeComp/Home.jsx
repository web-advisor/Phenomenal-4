import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
    <section id="header" className="d-flex align-item-centre">
         <div className="container-fluid">
                 <div className="row">
                     <div className="col-10 mx-auto ">
                     <div className="row ">
                         <div className=" col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-centent-center flex-column mt-5">
                             <h1 className='mt-5'>Search Doctor, <strong className="brand-name"> Make an Appointment</strong></h1><br/>
                             <h2 className="my-3">Discover the best doctor's clinic nearest to you</h2>
                             
                         </div>
                         <div className='col-lg-6 order-1 order-lg-2 header-img mt-5'>
                         <ul className='animated mt-5'>
                         <ol className='mb-4 mt-5'>
                         <NavLink  exact='true' className=" btn-get-started mt-5 mb-5" to='/drlogin'>Doctor Login</NavLink>
                         </ol>
                         <ol className='mb-4'>
                         <NavLink  className=" btn-get-started " to="/plogin">Get Appointment</NavLink></ol>
                         
                         </ul>
                         </div>
                         </div>
                     </div>
                 </div>
         </div>
    </section>

     </div>
  )
}

export default Home