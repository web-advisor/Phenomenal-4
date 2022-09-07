import React from 'react'

import Swal from "sweetalert2";

function Doctor(props) {
  const appointclick = async (e)=>{
  //  e.preventDefault();
  const pToken = `JWT ${localStorage.getItem("patientToken")}`;
  try {
    const url = `http://localhost:5000/patient/appointments/create/${props.slug}`
      const response = await fetch(url, {
          method: "POST",
          headers: {
              Accept: "application/json",
            "Content-Type": "application/json",
              "Authorization": pToken
          },
          // body: JSON.stringify(
          //     data
          // )
      });
      const answerData = (await response.json());
      if(answerData?.apiStatus==="SUCCESS"){
        return Swal.fire({

          icon: "info",

          title: `Slot: ${answerData.data.startTime} , Token No: ${answerData.data.tokenNo} `,
          text: "Plz Take a Screenshot of it for show at reception",
      })
     
      }
  
        else {
          
          alert("Already have an account with the same mobile and/or Email")
        }
      console.log(answerData);
    //  navigate('/admin/dashboard');
  } catch (error) {
      console.log(error)
     // alert("Already have an account with the mobile number")
  }



    
  }


  return (
    <div className='background my-2 '>
    <section  className="d-flex align-item-centre  m-2">
    <div className="container-fluid background">
            <div className="row background">
                <div className="col-10 mx-auto background">
                <div className="row background">
                 
                    <div className="background col-lg-8 col-md-8 pt-1 pt-lg-0 order-2 order-lg-1 d-flex justify-centent-center flex-column mt-2">
                        <lable className='mt-2 background'>Dr. {props.name}</lable>
                        <lable className='mt-1 background'>Clinic : {props.clinic}</lable>
                        <lable className='mt-1 background'>Location: {props.location}</lable>
                        <lable className='mt-1 background'>Education: {props.education}</lable>
                        <lable className='mt-1 background mb-2'>Available time : {props.time1}-{props.time2}</lable>
                    </div>
                    <div className='background col-lg-3 order-1 order-lg-2 header-img '>
                      <ul className='mt-2 background'>
                        <ol className='mb-2 background'>
                           <button className="background ApointBtn " onClick={appointclick} > Appointment</button>
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