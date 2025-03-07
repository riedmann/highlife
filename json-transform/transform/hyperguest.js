const { url } = require("inspector");

module.exports = function basicTransform(json) {
  return {
    url:
      "https://search-api.hyperguest.io/2.0/?checkIn=" +
      json.request.checkIn +
      "&checkOut=" +
      json.request.checkOut +
      "&hotelIds=" +
      json.request.hotelId +
      "&nights=" +
      json.request.nights +
      "&guests=" +
      json.request.guests +
      "&nationality=" +
      json.request.nationality,
    header: {
      method: "GET",
      authentication: {
        bearer: "439ef03b7b504104aa8584578d3cc1ae",
      },
    },
    body: {},
  };
};
