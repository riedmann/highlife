const fsFunc = require("fs");

const transformJsonToTargetFormat = require("./src/transformJsonToTargetFormat");
const inetstorms = "./testdata/inhouse/input2.json";
const ihyper = "./testdata/inhouse/input1.json";
const sendRequestFunction = require("./src/sendRequest");
const convertXmlToJson = require("./src/xml2json");

// setting input file for testing
const input = inetstorms;

// reading file
const rawData = fsFunc.readFileSync(input, "utf-8");
const jsonData = JSON.parse(rawData);

// transforming file
const result = transformJsonToTargetFormat(jsonData);
// console.log("-------- Tranformed --------");
// console.log(result);

// sendRequestFunction(result, async (data) => {
//   // console.log("--------  Response -------");

//   if (result.bodytype == "xml") {
//     console.log("its xml");
//     const response = await convertXmlToJson(data);
//     console.log(JSON.stringify(response, null, 2));
//   } else {
//     console.log(data);
//   }
// });

doCall(result);

async function doCall(json) {
  try {
    // Call the sendRequest function and await the result
    const data = await sendRequestFunction(json);
    if (result.bodytype == "xml") {
      console.log("its xml");
      const response = await convertXmlToJson(data);
      console.log(JSON.stringify(response, null, 2));
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
