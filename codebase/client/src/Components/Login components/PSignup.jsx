import React, { useState  } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { AiOutlineMobile } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom'
//import {newStatus} from '../HomeComp/Navbar'

let status = 0; 
function PSignup(props) {
  const navigate = useNavigate();
  const [data,setdata]=useState(
    {
        name:'',
        email:'',
        phoneNo:"",
        password:"",
    }
)
//useEffect(() => {
//  status=newStatus
  // eslint-disable-next-line
//}, [newStatus])
const changeHandler = (e)=>{
  const {name,value} = e.target;
  setdata((preValue)=>{
      return{
          ...preValue,
          [name] : value,
      }
  }) 
  console.log(data);
}

const SubmitHandler = async (e)=>{
  e.preventDefault();
try {
    const response = await fetch(`http://localhost:5000/auth/signup/patient`, {
        method: "POST",
        headers: {
            Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
            data
        )
    });
    const answerData = (await response.json());
    if(answerData?.apiStatus==="SUCCESS"){
      localStorage.setItem("patientToken",answerData.data.jwtToken)
      status=1;
      navigate('/dashboard');}
      else {
        alert("Already have an account with the same mobile and/or Email")
      }
    console.log(answerData);
} catch (error) {
    console.log(error)
   // alert("Already have an account with the mobile number")
}
}

  return (
    <div className="container form-container text-center">
        
    <div>
    <h1 className='loginHeader'>Patient Sign Up</h1>
    <form className="form pt-5" onSubmit={SubmitHandler} >
        <div className= "input_field p-3">
        <label><AiOutlineUser/></label>
        <input type="text" required name="name" value={data.name} id='name' placeholder="Enter your name" autoComplete="off" onChange={changeHandler} />
        </div>

        <div className= "input_field p-3">
        <label><FiMail/></label>
        <input type="text" required value={data.email} name="email" id='email' placeholder="Enter your Email" autoComplete="off" onChange={changeHandler}  />
        </div>

        <div className= "input_field p-3">
        <label><AiOutlineMobile/></label>
        <input type="number" required value={data.phoneNo} name="phoneNo" id='number' placeholder="Enter your Number" autoComplete="off" onChange={changeHandler} />
        </div>


<div className= "input_field p-3">
        <label><RiLockPasswordLine/></label>
        <input type="password" value={data.password} name="password" id='password' placeholder="Enter your password" autoComplete="off" required onChange={changeHandler} />
        </div>

        
       

        <br/>
    <button type="submit"  className="btn btn-primary"  >Submit</button>


  </form>
    </div>
    </div>
  )
}

export default PSignup
export {status}