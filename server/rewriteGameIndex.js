const fs = require("fs");
const ANIMATION_FOLDER = "./hypeAnimation2/nebula_derby.html";

function errorHandler(err) {
  console.log("There was an error", err);
}
function getData(fileName, type) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, type, (err, data) => {
      err ? reject(errorHandler(err)) : resolve(data);
    });
  });
}

module.exports = function () {
  console.log("Rewriter");
  getData(ANIMATION_FOLDER)
    .then(data => {
      console.log("data", data.toString('utf8'));
    });
};
