module.exports = function netstormTransform(json) {
  return {
    url: "https://bridge.netstorming.net/kalima/call.php",

    method: "POST",
    bodytype: "xml",
    header: {},
    xmlbody: {
      header: {
        actor: "highlife1",
        user: "xmluser",
        password: "High_Life!",
        version: "1.6.3",
      },

      query: {
        "@": { type: "availability", product: "hotel" },

        nationality: json.request.nationality,
        filters: ["AVAILONLY", "BESTARRANGMENT"],
        checkin: { "@": { date: json.request.checkIn } },

        checkout: { "@": { date: json.request.checkOut } },
        hotel: { "@": { id: json.request.hotelId } },

        details: {
          room: {
            "@": {
              type: "twn",
              required: json.request.guests,
              occupancy: "2",
            },
          },
        },
      },
    },
  };
};
