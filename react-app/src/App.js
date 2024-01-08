import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
function App() {

  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    setLoading(true); 
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http://localhost:3001/upload`, formData);
      const {fileePath}= response.data;
      setFilePath(fileePath);
      console.log(' path received:', fileePath);
    } catch (error) {
      console.error('Error:', error);
    }finally {
      setLoading(false); 
    }
  };

  const downloadVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/download`, {
        params: { fileePath: filePath },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'final.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading video:', error.response);
    } finally {
      setLoading(false); 
    }
  };


  return (
    <div className="container">
      <h1>PDF to DOCX Converter</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="button"  onClick={uploadFile}>upload</button>
      {filePath && !loading && (
        <div>
        <button className="button" onClick={downloadVideo}>
          Download PDF File
        </button>
        </div>
      )}
      {loading && (
        <ClipLoader
          color={'#D0021B'}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
}

export default App;
