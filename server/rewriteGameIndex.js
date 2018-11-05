const fs = require("fs");
const ip = require("ip");
const path = require('path');
const rootDir = path.join(__dirname, '..');

const ANIMATION_FOLDER = "hypeAnimation3";
const EXPORT_NAME = "nebula_derby.hyperesources";
const BETTER_EXPORT_NAME = "nebula_derby_hyperesources";

const initialFileStruct = `${rootDir}/${ANIMATION_FOLDER}/${EXPORT_NAME}`;
const newFileStruct = `${rootDir}/${ANIMATION_FOLDER}/${BETTER_EXPORT_NAME}`;

const initHypeFile = 'nebula_derby.html';
const newHypeFile = 'index.html';

const ANIMATION_FILE = `./${ANIMATION_FOLDER}/${newHypeFile}`;

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

function renamer(oldName, newName) {
  console.log('Renamer');
  if (fs.existsSync(oldName)) {
    fs.renameSync(oldName, newName);
  } else if (fs.existsSync(`${rootDir}/${ANIMATION_FOLDER}/${initHypeFile}`)) {
    renamer(`${rootDir}/${ANIMATION_FOLDER}/${initHypeFile}`, `${rootDir}/${ANIMATION_FOLDER}/${newHypeFile}`);
  } else {
    console.log(`Renamer target ${oldName} not found`);
  }
}

module.exports = function () {
  renamer(initialFileStruct, newFileStruct);

  getData(ANIMATION_FILE)
    .then(data => {
      const string = data.toString('utf8');
      const replacement = `nebula_derby_hyperesources`;
      const m = string.replace(/nebula_derby.hyperesources/g, replacement);
      fs.writeFileSync(ANIMATION_FILE, m, (err) => {
        if (err) throw err;
        console.log('Replaced!');
      });
    });
};
