const https = require("https");
const zlib = require("zlib");
const js2xmlparser = require("js2xmlparser");

async function sendRequest(inhouseJson, callback) {
  let body = JSON.stringify(inhouseJson.body);

  if (inhouseJson.bodytype == "xml") {
    body = jsonToXml(inhouseJson.xmlbody);
    console.log("------ inside ------");
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
      console.log("--------------");
      console.log("end", data);
      callback(null, data);
    });
  });

  req.on("error", (err) => {
    console.log("error");
    callback(err);
  });

  // Write the body to the request
  req.write(body);
  req.end();
}

module.exports = sendRequest;

function unzipData(data) {
  // Simulated compressed binary data (replace this with your actual Buffer)
  const compressedData = Buffer.from(data, "binary");

  zlib.gunzip(compressedData, (err, decompressed) => {
    if (err) {
      console.error("❌ Error decompressing:", err);
    } else {
      console.log("✅ Decompressed Data:", decompressed.toString());
    }
  });
}

function jsonToXml(json) {
  const xml = js2xmlparser.parse("envelope", json); // "root" is the XML root element
  console.log("xml", xml);

  //const options = { compact: true, ignoreComment: true, spaces: 4 };
  return xml;
}
