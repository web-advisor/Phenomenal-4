import React from 'react'

function BookingCard(props) {
    const options = {  year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    const countryUpdated = new Date(props.slot *1);
    // console.log(countryUpdated.toLocaleDateString("en-us", options));

  return (
    <div className='background my-2 '>
    <section  className="d-flex align-item-centre  m-2">
    <div className="container-fluid background">
            <div className="row background">
                <div className="col-10 mx-auto background">
                <div className="row background">
                  
                    <div className="background col-lg-12 col-md-8 pt-1 pt-lg-0 order-2 order-lg-1 d-flex justify-centent-center flex-column mt-2">
                        <lable className='mt-2 background'>Dr. {props.drName}  </lable>
                        <lable className='mt-1 background'>Clinic:{props.clinic} </lable>
                        <lable className='mt-1 background'>Location: {props.location} </lable>
                        <lable className='mt-1 background'>Status : {props.Status}</lable>
                        <lable className='mt-1 background '><strong>Token No. {props.tokenNo}</strong></lable>
                        <lable className='mt-1 background mb-2'><strong>Slot : {countryUpdated.toLocaleDateString("en-us", options)}</strong></lable>                      
                    </div>
                    
                       
                      
                    </div>
                </div>
            </div>
    </div>
</section>
</div>
  )
}

export default BookingCard