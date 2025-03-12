import { InhouseFormat } from "../types";
// abschläge

module.exports = function basicTransform(json: any) {
  console.log("---- transofmring back ----");

  let result = json.results.map((property: any) => {
    let obj = {
      id: property.propertyId,
      name: property.propertyInfo.name,
      rooms: [],
    };

    obj.rooms = property.rooms.map((room: any) => {
      return {
        name: room.roomName,
        test: "test",
      };
    });
    return obj;
  });

  return result;
};
