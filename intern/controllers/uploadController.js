const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const { load } = require('@pspdfkit/nodejs');
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
require('dotenv').config()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
     cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage })

const uploadFile = async (req, res) => {

  console.log(req.body);
  console.log(req.file);
  const docPath = path.join(__dirname, '../uploads', req.file.filename);
  const pdfPath = path.join(__dirname, '../uploads', `${Date.now()}.pdf`);

  try {
   const ext = 'pdf';
   const fileBuffer = await fs.readFileSync(docPath);
   let pdfBuffer = await libre.convertAsync(fileBuffer, ext, undefined);

    await fs.writeFileSync(pdfPath, pdfBuffer);

    res.json({ fileePath: pdfPath });

  } catch (error) {
    console.error('Error processing the file:', error);
    res.status(500).send('Error processing the file');
  }

};
module.exports = { uploadFile, upload };