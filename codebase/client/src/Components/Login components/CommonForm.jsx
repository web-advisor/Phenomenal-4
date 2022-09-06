import React,{ useState ,  } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
let newData;
function CommonForm(props) {
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
    newData=data;
    const HandleSubmit = props.function;
   
  return (
    <div className="container form-container text-center">
        
    <div>
    <h1 className='loginHeader'>{props.Name} Login</h1>
    <form className="form pt-5" onSubmit={HandleSubmit} >

        <div className= "input_field p-3">
        <label><AiOutlineUser/></label>
        <input type="text" required value={data.email} name="email" id={props.type} placeholder={props.field} autoComplete="off" onChange={changeHandler}  />
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

export default CommonForm
export {newData}