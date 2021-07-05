const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fileType = require("file-type");

const upload = multer({
  dest: "uploads/", // this saves your file into a directory called "uploads"
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// It's very crucial that the file name matches the name attribute in your html
app.get("/hello", (req, res) => {
  res.send("HELLO");
});
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.headers);
  console.log(req.body);

  const imageData = req.body.file.substr(23, req.body.file.length);

  console.log(`imageData = ${imageData}`);

  const buffer = Buffer.from(imageData, "base64");
  const fileInfo = await fileType.fromBuffer(buffer);
  console.log(`fileInfo = ${JSON.stringify(fileInfo)}`);
  const detectedExt = fileInfo.ext;
  const detectedMime = fileInfo.mime;

  res.send("OKAY");
});

app.listen(5000);
