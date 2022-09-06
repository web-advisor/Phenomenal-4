const opencage = require('opencage-api-client');
// const { checkNotNull } = require("./check");
var { location, errorMessage } = require("../controllers/doctorControllers");

const validAddress = async (address) => {

    // var query = "";
    // query = query + address.firstLine + ","; 
    // if(checkNotNull(address.secondLine)) query = query + address.secondLine + ", ";
    // query = query + address.city + ", " + address.state + ", " + address.pin;
    // if(checkNotNull(address.country)) query = query + ", " + country; 


    await opencage
        .geocode({ q: address })
        .then((data) => {
            if (data.results.length > 0) {
                const place = data.results[0];
                console.log(place.formatted);
                console.log(place.geometry);
                console.log(place.annotations.timezone.name);
                location = {
                    type: "Point",
                    coordinates: [
                        place.geometry.lat,
                        place.geometry.lon
                    ]
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


}

module.exports = {
    validAddress
};