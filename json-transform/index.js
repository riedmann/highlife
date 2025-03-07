// Example usage
const transformJsonToTargetFormat = require("./transformJsonToTargetFormat");
const inputFilePath = "input2.json";
const sendRequest = require("./sendRequest");

const result = transformJsonToTargetFormat(inputFilePath);

sendRequest(result, (data) => {
  console.log("Done", data);
});
console.log("result", result);
