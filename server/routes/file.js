const express = require("express");
const multer = require("multer");
const { imagesPath } = require("../utils/imageUtils");
const {
  addFileToCollector,
  readImage,
} = require("../controllers/imageController");
// const upload = multer({ dest: 'uploads/' })

const upload = multer({
  storage: multer.diskStorage({
    destination: imagesPath,
    // filename: (req, file, cb) => cb(null, file.originalname)
  }),
});
const router = express.Router();

router.get("/:url", (req, res) => {
  const { url } = req.params;
  const requestedFile = readImage(url);
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  return res.end(requestedFile);
});

router.put("/file", upload.single("image"), (req, res) => {
  const { retention } = req.body;
  const file = req.file;
  addFileToCollector(file.filename, retention);
  return res.send(file.filename);
});

module.exports = router;
