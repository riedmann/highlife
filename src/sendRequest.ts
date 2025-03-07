import type { ApiRequest } from "./types";
const https = require("https");
const js2xmlparser = require("js2xmlparser");

async function sendRequest(inhouseJson: ApiRequest): Promise<any> {
  let body = JSON.stringify(inhouseJson.body);

  if (inhouseJson.bodytype === "xml" && inhouseJson.xmlbody) {
    body = jsonToXml(inhouseJson.xmlbody);
  }

  const options = {
    method: inhouseJson.method,
    headers: {
      ...inhouseJson.header,
      "Content-Length": Buffer.byteLength(body),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(inhouseJson.url, options, (response) => {
      let data = "";

      // A chunk of data has been received.
      response.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      response.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    // Write the body to the request
    req.write(body);
    req.end();
  });
}

module.exports = sendRequest;

function jsonToXml(json: object) {
  const xml = js2xmlparser.parse("envelope", json);
  return xml;
}
