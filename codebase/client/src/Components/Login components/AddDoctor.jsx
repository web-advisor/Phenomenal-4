import React,{useState} from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { BsHouseDoor } from 'react-icons/bs';
import { GiNotebook } from 'react-icons/gi';
//import { AiOutlineFileImage } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function AddDoctor() {
  const navigate = useNavigate();
    const [data,setdata]=useState(
        {
            name:'',
            email:'',
            address:"",
            clinic:'',
            degree:"",
            spec:'',
            profilePic:"", 
            fees:'',
            openTime:"",
            closeTime:"", 
            phoneNo:"",     
        }
    )
        
    const SubmitHandler = async (e)=>{
      e.preventDefault();
    const adminToken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY3OWEyODIwYjJmMDljZmVmYjhlZSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjYyNDE3MzE0fQ.7cokUDmBiK_2SoseXBsEYDSDxmTbeGuHz68WFRtPMsI`;
    try {
        const response = await fetch(`http://localhost:5000/admin/manage/doctor/create`, {
            method: "POST",
            headers: {
                Accept: "application/json",
              "Content-Type": "application/json",
                "Authorization": adminToken
            },
            body: JSON.stringify(
                data
            )
        });
        const answerData = (await response.json());
        if(answerData?.apiStatus==="SUCCESS"){
          navigate('/admin/dashboard');}
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












//     const [imageSelected, setImageSelected] = useState('')

//     const uploadImage = async () =>{
//       const files = imageSelected
//       const data = new FormData()
//       data.append('file',files)
//       data.append('upload_preset','kaidly1w')
//     // setLoading(true)
//       const res = await fetch('https://api.cloudinary.com/v1_1/aman2000/image/upload',
//   {
//       method: 'POST',
//       body: data
//   })

//   const file = await res.json() 
//   setImageSelected(file.secure_url)
//   console.log(imageSelected);
// //  if(imageSelected!=='' && imageSelected!==undefined){
//     //  setLoading(false)
//   //}
 // }
















    const changeHandler = (e)=>{
      const {name,value} = e.target;
    console.log(data);
      setdata((preValue)=>{
          return{
              ...preValue,
              [name] : value,
          }
        })
    
    // const SubmitHandler = (e)=>{
    //   e.preventDefault();
    //   if(data.password===data.cpassword)
    //   console.log(data);
    //   else
    //    alert("Enter correct Password")
      
      
    //      // props.history.push('/login')
    //       //  axios.post('admin/manage/doctor/create',data)
    //       //  .then((response) =>{
    //       //         console.log(response);
    //       //     })
    //       //     .catch((error)=>{
    //       //         console.log(error);
    //       //     })
      
    
       
    }
  return (
    <div className="container form-container text-center">
        
    <div>
    <h1 className='loginHeader'>Add A Doctor</h1>
    <form className="form pt-5" onSubmit={SubmitHandler} >
        <div className= "input_field p-3">
        <label><AiOutlineUser/></label>
        <input type="text" required name="name" value={data.name} id='name' placeholder="Enter name" autoComplete="off" onChange={changeHandler} />
        </div>
        
        <div className= "input_field p-3">
        <label><FiMail/></label>
        <input type="text" required value={data.email} name="email" id='email' placeholder="Enter your Email" autoComplete="off" onChange={changeHandler}  />
        </div>

        <div className= "input_field p-3">
        <label><BsHouseDoor/></label>
        <input type="text" required value={data.address} name="address" id='location' placeholder="Enter Address" autoComplete="off" onChange={changeHandler} />
        </div>

        <div className= "input_field p-3">
        <label><GiNotebook/></label>
        <input type="number" required value={data.phoneNo} name="phoneNo" id='phoneNo' placeholder="Enter No." autoComplete="off" onChange={changeHandler} />
        </div>

        <div className= "input_field p-3">
        <label><BsHouseDoor/></label>
        <input type="text" required value={data.clinic} name="clinic" id='clinic' placeholder="Enter clinic" autoComplete="off" onChange={changeHandler} />
        </div>

        <div className= "input_field p-3">
        <label><GiNotebook/></label>
        <input type="text" required value={data.degree} name="degree" id='education' placeholder="Enter Education" autoComplete="off" onChange={changeHandler} />
        </div>

        <div className= "input_field p-3">
        <label><GiNotebook/></label>
        <input type="text" required value={data.spec} name="spec" id='spec' placeholder="Enter Specialisation" autoComplete="off" onChange={changeHandler} />
        </div>

        <div className= "input_field p-3">
        <label><RiLockPasswordLine/></label>
        <input type="password" value={data.password} name="password" id='password' placeholder="Enter your password" autoComplete="off" required onChange={changeHandler} />
        </div>

        <div className= "input_field p-3">
        <label><GiNotebook/></label>
        <input type="text" required value={data.openTime} name="openTime" id='openTime' placeholder="Clinic Open Time" autoComplete="off" onChange={changeHandler} />
        </div>
        
        <div className= "input_field p-3">
        <label><GiNotebook/></label>
        <input type="text" required value={data.closeTime} name="closeTime" id='closeTime' placeholder="Clinic Close Time" autoComplete="off" onChange={changeHandler} />
        </div>

        <div className= "input_field p-3">
        <label><GiNotebook/></label>
        <input type="number" required value={data.fees} name="fees" id='fees' placeholder="Enter Fee Amount" autoComplete="off" onChange={changeHandler} />
        </div>

        
       

        <br/>
    <button type="submit"  className="btn btn-primary"  >Submit</button>


  </form>
    </div>
    </div>
  )
}

export default AddDoctor




// <div className= "input_field p-3">
//         <label><AiOutlineFileImage/></label>
//         <input type="file"  value={data.profilePic} name="profilePic" id='profilePic'  placeholder="" autoComplete="off" 
//         onChange={changeHandler}/>
//         </div>