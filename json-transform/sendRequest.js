const https = require("https");
const zlib = require("zlib");

async function sendRequest(inhouseJson, callback) {
  console.log("inhouse", inhouseJson);

  const options = {
    method: inhouseJson.method,
    headers: inhouseJson.header,
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
      response.on("end", async () => {
        console.log("--------------");

        console.log("end", data);
        console.log(data[0], data[1]);

        // let unzuipped = await unzipData(data);

        callback(null, data);
      });
    })
    .on("error", (err) => {
      console.log("error");

      callback(err);
    });
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
