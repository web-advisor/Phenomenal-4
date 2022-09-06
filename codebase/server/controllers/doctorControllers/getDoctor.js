const { response } = require("../../utils/response");
const Doctor = require("../../models/doctorSchema");

const listDoctors = async (req, res, next) => {
  Doctor.find({"isVerified": true}).then(DoctorList => {
    doctorList = DoctorList;
    return next(response(200, "", doctorList));
  }).catch(e => {
    console.log(`Error fetching`);
    return next(404, e);
  });
}

const getDoctor = async (req, res, next) => {
  let slug = req.params.slug;
  Doctor.findOne({"slug": slug}).then(Doctor => {
    doctor = Doctor;
    next(response(200, "", doctor));
  }).catch(e => {
    console.log(`Error fetching`);
    next(response(404, e));
  });
}

const listDoctorsNearby = async (req, res, next) => {
  let obj = {
    "location": {
      $near: {
        $geometry: {
           type: "Point" ,
           coordinates: [ req.query.lat , req.query.lng ]
        },
      }
    }
  }

  Doctor.find(obj).then(doctorList => {
    DoctorList = doctorList;
    next(response(200, "", DoctorList));
  }).catch(e => {
    console.log("Error fetching");
    next(response(404, e));
  })
}

const listDoctorsBySpec = async (req, res, next) => {
  let spec = req.params.spec;
  Doctor.find({"spec":spec}).then(doctorList => {
    DoctorList = doctorList;
    next(response(200, "", DoctorList));
  }).catch(e => {
    console.log("Error fetching");
    next(response(404, e));
  })
}

module.exports = {
  listDoctors,
  getDoctor,
  listDoctorsNearby,
  listDoctorsBySpec
}

