import React, {useState,useEffect} from 'react'
import axios from 'axios';

function DrList(props) {
  console.log(props.isVerified);
  const [isActive, setactive] = useState("a")
  
  const deleteItem = () => {
    let url = `https://fast-eyrie-20747.herokuapp.com/admin/manage/doctor/delete/${props.slug}`
      axios.delete(url, { mode: 'no-cors', redirect: 'follow',
    headers:{authorization :`JWT ${localStorage.getItem('adminToken')}`}
    }) 
    
        .then((response) => {
          props.functionSetDeleted()
            console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
  }

useEffect(() => {
  if(props?.isVerified){
    setactive("Active")
  }else{
    setactive("Inactive")
  } 
 }, [props?.isVerified])

  const handler1 = async (e)=>{
    e.preventDefault();
  const adminToken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY3OWEyODIwYjJmMDljZmVmYjhlZSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjYyNDE3MzE0fQ.7cokUDmBiK_2SoseXBsEYDSDxmTbeGuHz68WFRtPMsI`;
  try {
      const response = await fetch(`https://fast-eyrie-20747.herokuapp.com/admin/manage/doctor/verify/${props.slug}`, {
          method: "PATCH",
          headers: {
              Accept: "application/json",
            "Content-Type": "application/json",
              "Authorization": adminToken
          },
          
      });
      const answerData = (await response.json());
      if(answerData?.apiStatus==="SUCCESS"){
      setactive("Active")
    }
        else {
          alert("Already have an account with the same mobile and/or Email")
        }
      console.log(answerData);
  } catch (error) {
      console.log(error)
  }
}
  const handler2 =  async (e)=>{
    e.preventDefault();
  const adminToken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY3OWEyODIwYjJmMDljZmVmYjhlZSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjYyNDE3MzE0fQ.7cokUDmBiK_2SoseXBsEYDSDxmTbeGuHz68WFRtPMsI`;
  try {
      const response = await fetch(`https://fast-eyrie-20747.herokuapp.com/admin/manage/doctor/remove/${props.slug}`, {
          method: "PATCH",
          headers: {
              Accept: "application/json",
            "Content-Type": "application/json",
              "Authorization": adminToken
          },
          
      });
      const answerData = (await response.json());
      if(answerData?.apiStatus==="SUCCESS"){
      setactive("Inactive")
    }
        else {
          alert("Already have an account with the same mobile and/or Email")
        }
        console.log(`handler2 ${isActive}`);
      console.log(answerData);
    
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
                  
                    <div className="background col-lg-8 col-md-8 pt-1 pt-lg-0 order-2 order-lg-1 d-flex justify-centent-center flex-column mt-2">
                        <lable className='mt-2 background'>Dr. {props.name}</lable>
                        <lable className='mt-1 background'>Clinic Location: {props.location}</lable>
                        <lable className='mt-1 background'>Education: {props.education} </lable>
                        <lable className='mt-1 background mb-2'>Available time : {props.time1}-{props.time2}</lable>
                    </div>
                    <div className='background col-lg-4 order-1 order-lg-2 header-img '>
                      <ul className='mt-1 background'>
                        <ol className=' background'>
                           <button className="background listBtn " > Update</button>
                        </ol>
                        <ol className='background'>
                           <button className="background listBtn " onClick={deleteItem} >Delete</button>
                        </ol>
                        {
                          console.log(isActive)
                        }{ 
                          isActive==="Active" ? 
                          <ol className=' background'>
                          <button className="background listBtn " onClick={handler2} > {isActive}</button>
                       </ol>
                        :
                        <ol className=' background'>
                        <button className="background listBtn " onClick={handler1}> {isActive}</button>
                     </ol>
                     
                        }
                        
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

export default DrList