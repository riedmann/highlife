const fsFunc = require("fs");

const transformJsonToTargetFormat = require("./src/transformJsonToTargetFormat");
const inetstorms = "./testdata/inhouse/input2.json";
const ihyper = "./testdata/inhouse/input1.json";
const sendRequestFunction = require("./src/sendRequest");

// setting input file for testing
const input = ihyper;

// reading file
const rawData = fsFunc.readFileSync(input, "utf-8");
const jsonData = JSON.parse(rawData);

// transforming file
const result = transformJsonToTargetFormat(jsonData);
// console.log("-------- Tranformed --------");
// console.log(result);

sendRequestFunction(result, (data) => {
  // console.log("--------  Response -------");
  console.log("Result is here");
});
