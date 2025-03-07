import { parseStringPromise } from "xml2js";

module.exports = async function convertXmlToJson(xml: string): Promise<any> {
  try {
    const result = await parseStringPromise(xml, {
      explicitArray: false,
      attrkey: "@",
    });
    return result;
  } catch (err) {
    console.error("Error parsing XML:", err);
    throw err;
  }
};
