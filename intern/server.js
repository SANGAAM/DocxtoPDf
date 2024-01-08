const express = require('express');
;const path = require('path');
const cors = require('cors');
const app = express();
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
const uploadController = require('./controllers/uploadController');
const downloadController = require('./controllers/downloadController');

require('dotenv').config()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', uploadController.upload.single('file'), uploadController.uploadFile);
app.get('/download', downloadController.downloadVideo);

const PORT=process.env.PORT||3000;
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});

