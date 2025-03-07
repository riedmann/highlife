const fs = require("fs");
const path = require("path");
const sendRequest = require("./sendRequest");

// Load available transformations dynamically
const transformations = {};
const transformDir = path.join(__dirname, "transform");
fs.readdirSync(transformDir).forEach((file) => {
  if (file.endsWith(".js")) {
    const transformName = path.basename(file, ".js");
    transformations[transformName] = require(path.join(transformDir, file));
  }
});

function transformJson(inputFilePath) {
  // Read JSON file
  const rawData = fs.readFileSync(inputFilePath, "utf-8");
  const jsonData = JSON.parse(rawData);

  // Get transformation type from input JSON
  const transformType = jsonData.header.target;

  if (!transformations[transformType]) {
    console.error(`❌ Error: Transformation '${transformType}' not found.`);
    process.exit(1);
  }

  // Apply selected transformation
  const transformedData = transformations[transformType](jsonData);

  // Save output
  //fs.writeFileSync(outputFilePath, JSON.stringify(transformedData, null, 2));
  console.log(`✅ Transformation '${transformType}' applied! `);
  return transformedData;
}

// Example usage
const inputFilePath = "input1.json";

const result = transformJson(inputFilePath);
sendRequest(result, (data) => {
  console.log("Done", data);
});
console.log("result", result);
