import React from 'react'
import { NavLink } from 'react-router-dom'

function Doctor() {
  return (
    <div className='background my-2 '>
    <section  className="d-flex align-item-centre  m-2">
    <div className="container-fluid background">
            <div className="row background">
                <div className="col-10 mx-auto background">
                <div className="row background">
                  <div className='col-lg-2 background'>
                    <img src="https://max-website20-images.s3.ap-south-1.amazonaws.com/Dr_Puneet_sq_3be6907e0c.jpg" className='drPic' alt="xyz" srcSet="" />
                  </div>
                    <div className="background col-lg-7 col-md-8 pt-1 pt-lg-0 order-2 order-lg-1 d-flex justify-centent-center flex-column mt-2">
                        <lable className='mt-2 background'>Dr. Aman Gupta</lable>
                        <lable className='mt-1 background'>Clinic Location: Saket</lable>
                        <lable className='mt-1 background'>Education: MBBS</lable>
                        <lable className='mt-1 background mb-2'>Available time : 2:00pm</lable>
                    </div>
                    <div className='background col-lg-3 order-1 order-lg-2 header-img '>
                      <ul className='mt-2 background'>
                        <ol className='mb-2 background'>
                           <NavLink className="background ApointBtn " to="/appointment"> Appointment</NavLink>
                        </ol>
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

export default Doctor