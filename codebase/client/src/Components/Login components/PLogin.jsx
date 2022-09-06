import React,{useState} from 'react'
import CommonForm from './CommonForm';
import { newData } from './CommonForm';
import { useNavigate } from 'react-router-dom'
let Pstatus=0;

function PLogin() {
  const navigate = useNavigate();
  
  
  const SubmitHandler = async (e)=>{
    e.preventDefault();
    
  try {
      const response = await fetch(`http://localhost:5000/auth/login/patient`, {
          method: "POST",
          headers: {
              Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
              newData
          )
      });
      const answerData = (await response.json());
      if(answerData?.apiStatus==="SUCCESS"){
        localStorage.setItem("patientToken",answerData.data.jwtToken)
        localStorage.setItem("name",answerData.data.name)
      //  localStorage.setItem("loc",answerData.data)
        Pstatus=1;
       navigate('/dashboard');
     //  console.log(answerData.data.name);
       
      
  }
        else {
          alert("Already have an account with the same mobile and/or Email OR have Entered Incorrect Details")
        }
      // console.log(answerData);
  } catch (error) {
      console.log(error)
     // alert("Already have an account with the mobile number")
  }
  }


  return (
    <div className='fullContainer'>
   <CommonForm Name ='Patient' type="adminEmail" field='Enter Email' function={SubmitHandler}/>
   </div>
  )
}

export default PLogin
export {Pstatus}