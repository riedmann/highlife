const fsFunc = require("fs");

const transformJsonToTargetFormat = require("./src/transformJsonToTargetFormat");
const inetstorms = "./testdata/inhouse/input2.json";
const ihyper = "./testdata/inhouse/input1.json";
const sendRequestFunction = require("./src/sendRequest");

// setting input file for testing
const input = inetstorms;

// reading file
const rawData = fsFunc.readFileSync(input, "utf-8");
const jsonData = JSON.parse(rawData);

// transforming file
const result = transformJsonToTargetFormat(jsonData);
// console.log("-------- Tranformed --------");
// console.log(result);

sendRequestFunction(result, (data) => {
  // console.log("--------  Response -------");

  if (result.bodytype == "xml") {
    console.log("its xml");
  }
});
