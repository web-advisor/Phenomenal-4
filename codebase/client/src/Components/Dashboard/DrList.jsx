import React, {useState,useEffect} from 'react'


function DrList(props) {
  console.log(props.isVerified);
  const [isActive, setactive] = useState("a")

useEffect(() => {
  if(props?.isVerified){
    setactive("Active")
  }else{
    setactive("Inactive")
  }

  
 }, [])

  const handler1 = async (e)=>{
    e.preventDefault();
  const adminToken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY3OWEyODIwYjJmMDljZmVmYjhlZSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjYyNDE3MzE0fQ.7cokUDmBiK_2SoseXBsEYDSDxmTbeGuHz68WFRtPMsI`;
  try {
      const response = await fetch(`http://localhost:5000/admin/manage/doctor/verify/${props.slug}`, {
          method: "PATCH",
          headers: {
              Accept: "application/json",
            "Content-Type": "application/json",
              "Authorization": adminToken
          },
          
      });
      const answerData = (await response.json());
      if(answerData?.apiStatus==="SUCCESS"){
       // if(isActive==="Inactive")
      setactive("Active")
      //  navigate('/admin/dashboard');
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
  const handler2 =  async (e)=>{
    e.preventDefault();
  const adminToken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY3OWEyODIwYjJmMDljZmVmYjhlZSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjYyNDE3MzE0fQ.7cokUDmBiK_2SoseXBsEYDSDxmTbeGuHz68WFRtPMsI`;
  try {
      const response = await fetch(`http://localhost:5000/admin/manage/doctor/remove/${props.slug}`, {
          method: "PATCH",
          headers: {
              Accept: "application/json",
            "Content-Type": "application/json",
              "Authorization": adminToken
          },
          
      });
      const answerData = (await response.json());
      if(answerData?.apiStatus==="SUCCESS"){
      //  navigate('/admin/dashboard');
    //  if(isActive==="Active")
      setactive("Inactive")
    }
        else {
          alert("Already have an account with the same mobile and/or Email")
        }
        console.log(`handler2 ${isActive}`);
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
                           <button className="background listBtn " > Remove</button>
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