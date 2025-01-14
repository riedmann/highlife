console.log("hello");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const getXSLTScript = require("./XSLTFactory");
const transformXml = require("./transform");

const app = express();
const port = 3000;

app.use(cors());

// Configure body parser middleware to parse plain text
app.use(bodyParser.text({ type: "*/*" })); // Accepts any content type as plain text

// Handle POST request
app.post("/", async (req, res) => {
  console.log("Received body:", req.body); // Logs the plain text body to the console
  let result = await transformXml(req.body, getXSLTScript());
  console.log("result", result);

  res.send("Here we are: " + result); // Echoes the received text back to the client
});

// Start the server
app.listen(port, () =>
  console.log(`Server is running and listening on http://localhost:${port}`)
);
