const https = require("https");
const zlib = require("zlib");
const js2xmlparser = require("js2xmlparser");

async function sendRequest(inhouseJson, callback) {
  let body = JSON.stringify(inhouseJson.body);

  if (inhouseJson.bodytype == "xml") {
    body = jsonToXml(inhouseJson.xmlbody);
  }

  const options = {
    method: inhouseJson.method,
    headers: {
      ...inhouseJson.header,
      "Content-Length": Buffer.byteLength(body),
    },
  };

  const req = https.request(inhouseJson.url, options, (response) => {
    let data = "";

    // A chunk of data has been received.
    response.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    response.on("end", async () => {
      callback(data);
    });
  });

  req.on("error", (err) => {
    callback(err);
  });

  // Write the body to the request
  req.write(body);
  req.end();
}

module.exports = sendRequest;

function jsonToXml(json) {
  const xml = js2xmlparser.parse("envelope", json);
  return xml;
}
