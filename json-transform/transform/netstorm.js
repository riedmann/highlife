module.exports = function anotherTransform(json) {
  return {
    url: "https://bridge.netstorming.net/kalima/call.php",
    header: {
      method: "POST",
    },
    body: {},
  };
};
