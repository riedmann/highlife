module.exports = function anotherTransform(json) {
  return {
    user: json.header.user,
    version: json.header.version,
    details: {
      hotel: json.request.hotelId,
      checkIn: json.request.checkIn,
      guests: json.request.guests,
    },
  };
};
