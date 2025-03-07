const https = require("https");

async function sendRequest(inhouseJson, callback) {
  console.log("inhouse", inhouseJson);

  const options = {
    headers: {
      Authorization: `Bearer ${inhouseJson.header.authentication.bearer}`,
      "Accept-Encoding": "gzip",
    },
  };

  console.log("url", inhouseJson.url);

  https
    .get(inhouseJson.url, options, (response) => {
      let data = "";
      //console.log("response", response);

      // A chunk of data has been received.
      response.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      response.on("end", () => {
        console.log("-------------- result ----------");

        callback(null, data);
      });
    })
    .on("error", (err) => {
      console.log("error");

      callback(err);
    });
}

module.exports = sendRequest;
