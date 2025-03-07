const fs = require("fs");
const path = require("path");

// Load available transformations dynamically
const transformations: any = {};
const transformDir = path.join(__dirname, "transformers");
fs.readdirSync(transformDir).forEach((file: any) => {
  if (file.endsWith(".ts")) {
    const transformName = path.basename(file, ".ts");
    transformations[transformName] = require(path.join(transformDir, file));
  }
});

module.exports = function transformJsonToTargetFormat(jsonData: any) {
  // Read JSON file

  console.log("inside transform", jsonData);

  // Get transformation type from input JSON
  const transformType = jsonData.header.target;

  if (!transformations[transformType]) {
    console.error(`❌ Error: Transformation '${transformType}' not found.`);
    process.exit(1);
  }

  console.log("json", jsonData);

  // Apply selected transformation
  const transformedData = transformations[transformType](jsonData);

  // Save output
  //fs.writeFileSync(outputFilePath, JSON.stringify(transformedData, null, 2));
  console.log(`✅ Transformation '${transformType}' applied! `);
  return transformedData;
};
