const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const transformJsonToTargetFormat: any = require("./src/transformJsonToTargetFormat");
const sendRequestFunction = require("./src/sendRequest");
const convertXmlToJson = require("./src/xml2json");

const app = express();
const port = 3000;

app.use(cors());

// Configure body parser middleware to parse plain text
app.use(bodyParser.text({ type: "*/*" })); // Accepts any content type as plain text

// Handle POST request
app.post("/", async (req: any, res: any) => {
  console.log(req.body);

  const result = transformJsonToTargetFormat(JSON.parse(req.body));

  let output: any = {};
  try {
    // Call the sendRequest function and await the result
    const data = await sendRequestFunction(result);
    if (result.bodytype == "xml") {
      console.log("its xml");
      const response = await convertXmlToJson(data);
      output = response;
    } else {
      output = data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
  res.send(output); // Echoes the received text back to the client
});

// Start the server
app.listen(port, () =>
  console.log(`Server is running and listening on http://localhost:${port}`)
);
