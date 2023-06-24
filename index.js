const express = require("express");
const con = require("./config");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();

const port = 4000;

app.use(express.json({ limit: "10mb" }));

app.post("/uploads", (req, resp) => {
    try {
        const upload = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "upload");
                },
                filename: function (req, file, cb) {
                    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
                }
            })
        })//.single("user_file");
        .array("user_file", 10 );

        upload(req, resp, function (err) {
            if (err) {
                console.error(err);
                resp.status(500).json({ error: "File upload failed." });
            } else {
                resp.send("File uploaded successfully.");
            }
        });
    } catch (err) {
        console.error(err);
        resp.status(500).json({ error: "An error occurred during file upload." });
    }
});


app.post("/uploads_64", (req, res) => {
    try {
      const {image} = req.body;
  
      if (!image) {
        throw new Error("No image data provided.");
      }
      const filename = Date.now() + ".jpg";
  
      const imagePath = path.join("upload", filename);

     // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
     const base64Data = image.replace(/^data:image\/\w+;base64,/, "");


      const imageBuffer = Buffer.from(base64Data, "base64");
  
    
      fs.writeFileSync(imagePath, imageBuffer);
  
    
      res.send("Image uploaded successfully.");
    } catch (err) {
      
      console.error(err);
      res.status(500).json({ error: "An error occurred during image upload." });
    }
  });


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});