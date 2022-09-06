import React, { useState  } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { AiOutlineMobile } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';


function PSignup(props) {
  const [data,setdata]=useState(
    {
        name:'',
        email:'',
        phoneNo:"",
        password:"",
    }
)
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
const SubmitHandler = (e)=>{
  e.preventDefault();
  if(data.password===data.cpassword)
  console.log(data);
  else
   alert("Enter correct Password")
  
  if(data.password===data.cpassword && (data.role!== "")){
     // props.history.push('/login')
      //  axios.post('https://api.saaspect.com/user/register',data)
      //  .then((response) =>{
      //         console.log(response);
      //     })
      //     .catch((error)=>{
      //         console.log(error);
      //     })
  }
  else{
      // alert('Enter correct password')
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