import React from 'react'
import { useState } from 'react'


function AppointList() {
    const [status, setStatus] = useState("Pending")

    const changeStatus= ()=>{      
          setStatus('Done')
    }
  return (
    <div className='background my-2 '>
    <section  className="d-flex align-item-centre  m-2">
    <div className="container-fluid background">
            <div className="row background">
                <div className="col-10 mx-auto background">
                <div className="row background">
                  
                    <div className="background col-lg-9 col-md-8 pt-1 pt-lg-0 order-2 order-lg-1 d-flex justify-centent-center flex-column mt-2">
                        <lable className='mt-2 background'>Mr. Aman Gupta</lable>
                        <lable className='mt-1 background'>Appointment ID: 4231</lable>
                        <lable className='mt-1 background'>Appointment Time: 2:00pm</lable>
                        <lable className='mt-1 background mb-2 '>Appointment Status : <strong className='text-success'>{status}</strong></lable>
                    </div>
                    <div className='background col-lg-3 order-1 order-lg-2 header-img '>
                      <ul className='mt-1 background'>
                        <ol className=' background'>
                           <button className="background listBtn " onClick={changeStatus}> Done</button>
                        </ol>
                        <ol className='background'>
                           <button className="background listBtn " > Unfullfilled</button>
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

export default AppointList