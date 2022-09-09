const { response } = require("../../utils/response");
const opencage = require('opencage-api-client');
const Doctor = require("../../models/doctorSchema");


const listDoctors = async (req, res, next) => {
  Doctor.find().then(DoctorList => {
    doctorList = DoctorList;
    return next(response(200, "", doctorList));
  }).catch(e => {
    console.log(`Error fetching`);
    return next(404, e);
  });
}

const listDoctorsVerified = async (req, res, next) => {
  Doctor.find({ "isVerified": true }).then(DoctorList => {
    doctorList = DoctorList;
    return next(response(200, "", doctorList));
  }).catch(e => {
    console.log(`Error fetching`);
    return next(404, e);
  });
}

const getDoctor = async (req, res, next) => {
  let slug = req.params.slug;
  Doctor.findOne({ "slug": slug }).then(Doctor => {
    doctor = Doctor;
    return next(response(200, "", doctor));
  }).catch(e => {
    console.log(`Error fetching`);
    return next(response(404, e));
  });
}

const listDoctorsNearby = async (req, res, next) => {
  var location = {};
  var errorMessage = "";

  // ---- OpenCage GeoLocation API ---- //
  await opencage
    .geocode({ q: req.query.address })
    .then((data) => {
      if (data.results.length > 0) {
        const place = data.results[0];
        console.log(place.formatted);
        console.log(place.geometry);
        console.log(place.annotations.timezone.name);
        location = {
          lat: place.geometry.lat,
          lng: place.geometry.lng,
        }
      } else {
        console.log('Status', data.status.message);
        console.log('total_results', data.total_results);
        errorMessage = "UNABLE_TO_LOCATE_ADDRESS";
      }
    })
    .catch((error) => {
      errorMessage = error.message;
    });
  if (errorMessage != "") {
    return next(response(400, errorMessage))
  }
  let obj = {
    isVerified: true,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [location.lat, location.lng]
        },
      }
    }
  }

  Doctor.find(obj).then(doctorList => {
    DoctorList = doctorList;
    return next(response(200, "", DoctorList));
  }).catch(e => {
    console.log("Error fetching");
    return  next(response(404, e));
  })
}

const listDoctorsBySpec = async (req, res, next) => {
  let spec = req.params.spec;
  Doctor.find({ isVerified: true, spec }).then(doctorList => {
    DoctorList = doctorList;
    return next(response(200, "", DoctorList));
  }).catch(e => {
    console.log("Error fetching");
    return next(response(404, e));
  })
}

module.exports = {
  listDoctors,
  listDoctorsVerified,
  getDoctor,
  listDoctorsNearby,
  listDoctorsBySpec
}

