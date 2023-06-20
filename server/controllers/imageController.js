const fs = require("fs");
const path = require("path");
const { imagesPath } = require("../utils/imageUtils");

const readImage = (filename) =>
  fs.readFileSync(path.join(imagesPath, filename));

const addFileToCollector = (filename, retention) => {
  console.log("filename", filename);
  console.log("retention", retention);
  setTimeout(() => {
    fs.unlink(path.join(imagesPath, filename), (err) => {
      if (err) throw err;
      console.log("file was deleted");
    });
  }, retention);
};

module.exports = {
  addFileToCollector,
  readImage,
};
