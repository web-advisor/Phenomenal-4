import React, { useState, useEffect } from 'react'
import Navbar from '../HomeComp/Navbar'
import BookingCard from './BookingCard'
import axios from 'axios'
function Pbooking() {
  const [card, setcard] = useState([])
  useEffect(() => {
    let url = `https://fast-eyrie-20747.herokuapp.com/patient/appointments/list`
    axios.get(url, {
      mode: 'no-cors', redirect: 'follow',
      headers: { authorization: `JWT ${localStorage.getItem('patientToken')}` }
    })

      .then((response) => {
        const Sdata = response.data.data
        setcard(Sdata)
        console.log(Sdata[0]);
      })
      .catch((error) => {
        console.log(error);
      })
  }// eslint-disable-next-line
    , [])

  return (
    <div>
      <Navbar role='patient' />
      <div className="container DashboardContainer text-center">

        <div className=''>
          <h1 className='loginHeader pb-5 '> My Booking</h1>
          <form className="form pt-5" onSubmit='' >


          </form>
          <br />

          {

            card.map((val, index) =>
              <BookingCard
                key={val.id}
                id={index}
                drName={val.doctorName}
                tokenNo={val.tokenNo}
                slot={val.startTime}
                Status={val.status}
                location={val.address}
                clinic={val.clinicName}
              />)
          }


        </div>
      </div>
    </div>

  )
}

export default Pbooking