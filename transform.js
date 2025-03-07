const { Xslt, XmlParser } = require("xslt-processor");

async function transformXml(xmlString, xsltString) {
  const xslt = new Xslt();
  const xmlParser = new XmlParser();

  // Using async/await
  const outXmlString = await xslt.xsltProcess(
    xmlParser.xmlParse(xmlString),
    xmlParser.xmlParse(xsltString)
  );

  return outXmlString; // Optionally return the result
}

// Export the function
module.exports = transformXml;

// Example usage within this file (for testing purposes)
if (require.main === module) {
  const xmlString = `<root><data>Example</data></root>`;
  const xsltString = `
  <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
      <result><xsl:value-of select="/root/data"/></result>
    </xsl:template>
  </xsl:stylesheet>
  `;

  transformXml(xmlString, xsltString).then((result) => {
    console.log("Transformed XML:", result);
  });
}
