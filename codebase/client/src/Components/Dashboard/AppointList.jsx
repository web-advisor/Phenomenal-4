import React from 'react'
import { useState } from 'react'


function AppointList(props) {
  console.log(props.key2);
    const [status, setStatus] = useState("Pending")
    const options = {  year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    const countryUpdated = new Date(props.slot *1);

    const changeStatusDone= async ()=>{  
      
        const drToken = `JWT ${localStorage.getItem('doctorToken')}`;
        try {
          const response = await fetch(`https://phenomenal-doctors.onrender.com/doctor/appointments/update/${props.key2}`, {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization": drToken
            },
            body: JSON.stringify(
              {status: "Complete"}
            )
          });
          const answerData = (await response.json());
          if (answerData?.apiStatus === "SUCCESS") {
            setStatus('Done')
          }
          else {
            alert("Already have an account with the same mobile and/or Email")
          }  
        } catch (error) {
          console.log(error)
        }
        
    }

    const changeStatusUnfullfilled= async ()=>{  
      
        const drToken = `JWT ${localStorage.getItem('doctorToken')}`;
        try {
          const response = await fetch(`https://phenomenal-doctors.onrender.com/doctor/appointments/update/${props.key2}`, {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization": drToken
            },
            body: JSON.stringify(
              {status: "Unfullfilled"}
            )
          });
          const answerData = (await response.json());
          if (answerData?.apiStatus === "SUCCESS") {
            setStatus('Unfullfilled')

          }
          else {
            alert("Already have an account with the same mobile and/or Email")
          }
        
        } catch (error) {
          console.log(error)
        }      
    }
    
  return (
    <div className='background my-2 '>
    <section  className="d-flex align-item-centre  m-2">
    <div className="container-fluid background">
            <div className="row background">
                <div className="col-10 mx-auto background">
                <div className="row background">
                  
                    <div className="background col-lg-9 col-md-8 pt-1 pt-lg-0 order-2 order-lg-1 d-flex justify-centent-center flex-column mt-2">
                    <lable className='mt-2 background'>Patient: {props.pName}  </lable>
      
                    <lable className='mt-1 background '><strong>Token No. {props.tokenNo}</strong></lable>
                    <lable className='mt-1 background mb-2'><strong>Slot : {countryUpdated.toLocaleDateString("en-us", options)}</strong></lable>
                        <lable className='mt-1 background mb-2 '>Appointment Status : <strong className='text-success'>{status}</strong></lable>
                    </div>
                    <div className='background col-lg-3 order-1 order-lg-2 header-img '>
                      <ul className='mt-1 background'>
                        <ol className=' background'>
                           <button className="background listBtn " onClick={changeStatusDone}> Done</button>
                        </ol>
                        <ol className='background'>
                           <button className="background listBtn " onClick={changeStatusUnfullfilled}> Unfullfilled</button>
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