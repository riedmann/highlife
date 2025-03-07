const json = {
  header: {
    actor: "highlife1",
    user: "xmluser",
    password: "H",
    version: "1.6.3",
  },
  request: {
    hotelId: 19912,
    checkIn: "2025-05-01",
    nights: 2,
    guests: 4,
    nationality: "DE",
  },
};

const transformed = {
  username: json.header.user,
  hotel: json.request.hotelId,
  stayInfo: `${json.request.nights} nights`,
};

console.log(JSON.stringify(transformed, null, 2));
