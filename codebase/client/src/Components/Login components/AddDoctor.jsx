import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { BsHouseDoor } from 'react-icons/bs';
import { GiNotebook } from 'react-icons/gi';
//import { AiOutlineFileImage } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Navbar from '../HomeComp/Navbar'

function AddDoctor() {
  const navigate = useNavigate();
  const [data, setdata] = useState(
    {
      name: '',
      email: '',
      address: "",
      clinic: '',
      degree: "",
      spec: '',
      profilePic: "",
      fees: '',
      openTime: "",
      closeTime: "",
      phoneNo: "",
    }
  )

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const adminToken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY3OWEyODIwYjJmMDljZmVmYjhlZSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjYyNDE3MzE0fQ.7cokUDmBiK_2SoseXBsEYDSDxmTbeGuHz68WFRtPMsI`;
    try {
      const response = await fetch(`https://fast-eyrie-20747.herokuapp.com/admin/manage/doctor/create`, {
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
      if (answerData?.apiStatus === "SUCCESS") {
        navigate('/admin/dashboard');
      }
      else {
        alert("Already have an account with the same mobile and/or Email")
      }
      console.log(answerData);
    } catch (error) {
      console.log(error)
    }
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(data);
    setdata((preValue) => {
      return {
        ...preValue,
        [name]: value,
      }
    })
  }
  return (
    <div> <Navbar role='admin'/>
    <div className="container form-container text-center">
   
      <div>
        <h1 className='loginHeader'>Add A Doctor</h1>
        <form className="form pt-5" onSubmit={SubmitHandler} >
          <div className="input_field p-3">
            <label><AiOutlineUser /></label>
            <input type="text" required name="name" value={data.name} id='name' placeholder="Enter name" autoComplete="off" onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><FiMail /></label>
            <input type="text" required value={data.email} name="email" id='email' placeholder="Enter your Email" autoComplete="off" onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><BsHouseDoor /></label>
            <input type="text" required value={data.address} name="address" id='location' placeholder="Enter Address" autoComplete="off" onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><GiNotebook /></label>
            <input type="number" required value={data.phoneNo} name="phoneNo" id='phoneNo' placeholder="Enter No." autoComplete="off" onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><BsHouseDoor /></label>
            <input type="text" required value={data.clinic} name="clinic" id='clinic' placeholder="Enter clinic" autoComplete="off" onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><GiNotebook /></label>
            <input type="text" required value={data.degree} name="degree" id='education' placeholder="Enter Education" autoComplete="off" onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><GiNotebook /></label>
            <input type="text" required value={data.spec} name="spec" id='spec' placeholder="Enter Specialisation" autoComplete="off" onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><RiLockPasswordLine /></label>
            <input type="password" value={data.password} name="password" id='password' placeholder="Enter your password" autoComplete="off" required onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><GiNotebook /></label>
            <input type="text" required value={data.openTime} name="openTime" id='openTime' placeholder="Clinic Open Time" autoComplete="off" onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><GiNotebook /></label>
            <input type="text" required value={data.closeTime} name="closeTime" id='closeTime' placeholder="Clinic Close Time" autoComplete="off" onChange={changeHandler} />
          </div>

          <div className="input_field p-3">
            <label><GiNotebook /></label>
            <input type="number" required value={data.fees} name="fees" id='fees' placeholder="Enter Fee Amount" autoComplete="off" onChange={changeHandler} />
          </div><br />
          <button type="submit" className="btn btn-primary"  >Submit</button>

        </form>
      </div>
    </div>
  </div>
  )
}

export default AddDoctor