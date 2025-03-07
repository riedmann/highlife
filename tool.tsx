const data1 = require("./format/inhouse_sample_hyperguest.json");
const data = require("./format/inhouse_sample_netstorm.json");

// You can now use sampleData in your code

if (data.header.target === "hyperguest") {
  console.log("This is a hyperguest request");
}

if (data.header.target === "netstorming") {
  console.log("This is a netstorming request");
}
