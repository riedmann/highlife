// Example usage
const transformJsonToTargetFormat = require("./src/transformJsonToTargetFormat");
const inetstorms = "./testdata/inhouse/input2.json";
const ihyper = "./testdata/inhouse/input1.json";
const sendRequest = require("./src/sendRequest");

const input = inetstorms;

const result = transformJsonToTargetFormat(input);
console.log("-------- Tranformed --------");
console.log(result);

sendRequest(result, (data) => {
  console.log("--------  Response -------");
  console.log(data);
});
