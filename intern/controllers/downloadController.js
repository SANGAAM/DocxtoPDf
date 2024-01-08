const downloadVideo = (req,res) => {
    const { fileePath }=req.query;
   const filePath=fileePath;
   res.download(filePath, (err) => {
    if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading the file');
    }
});
};
module.exports = { downloadVideo };
