import React,{ useState ,  } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom'

function CommonForm(props) {
  const navigate = useNavigate();
    const [data,setdata]=useState(
        {      
            email:'',     
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
      
    }

    const SubmitHandler = async (e)=>{
      e.preventDefault();
      
    try {
        const response = await fetch(`${props.myulr}`, {
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
          localStorage.setItem(`${props.role}Token`,answerData.data.jwtToken)
          localStorage.setItem("name",answerData.data.name)
         navigate(`${props.navigateTo}`);     
    }
          else {
            alert("Already have an account with the same mobile and/or Email OR have Entered Incorrect Details")
          }
        // console.log(answerData);
    } catch (error) {
        console.log(error)
    }
    }
   
  return (
    <div className="container form-container text-center">
        
    <div>
    <h1 className='loginHeader'>{props.Name} Login</h1>
    <form className="form pt-5" onSubmit={SubmitHandler} >

        <div className= "input_field p-3">
        <label><AiOutlineUser/></label>
        <input type="text" required value={data.email} name="email" id={props.type} placeholder={props.field} autoComplete="off" onChange={changeHandler}  />
        </div>

        

<div className= "input_field p-3">
        <label><RiLockPasswordLine/></label>
        <input type="password" value={data.password} name="password" id='password' placeholder="Enter your password" autoComplete="off" required onChange={changeHandler} />
        </div> <br/>
    <button type="submit"  className="btn btn-primary"  >Submit</button>

  </form>
    </div>
    </div>
  )
}

export default CommonForm