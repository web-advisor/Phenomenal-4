const response = (statusCode, errorMessage, data={}) => {
    if (statusCode === 200) {
      return {
        apiStatus : "SUCCESS",
        data,
        statusCode,
      };
    } else {
      return {
        apiStatus: "FAILURE",
        errorMessage,
        statusCode,
      };
    }
  };

  module.exports = {
    response
  };