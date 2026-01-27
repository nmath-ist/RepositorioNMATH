import './header.css'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


export default function Header(props) {

const [file, setFile] = useState(null);
const location = useLocation();

let path = '';
if (location.pathname.startsWith("/folder") || location.pathname === '/') {
    const path2 = decodeURIComponent(location.pathname.replace(/^\/folder/, "").slice(1));
    path = "Repositório LMAC e MMAC" + (path2 ? "/" + path2 : "");
}


const handleUpload = async (e) => {
  e.preventDefault();

  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("path", path);

  console.log("Uploading:", file.name, "to:", path);

  try {
    const res = await axios.post(
      "https://backend-992345001586.europe-west1.run.app/upload",
      formData
    );
    console.log("✅ Upload success:", res.data);
  } catch (err) {
    if (err.response) {
      console.error("Upload failed:", err.response.status, err.response.data);
    } else {
      console.error("Upload failed:", err.message);
    }
  }

  e.target.reset();
};



  return (
  <header className ='header' >
    <h1 className = 'titulo' onClick={props.clickFunction}> Repositório de Matemática </h1>
    <form onSubmit = {props.actionFunction}>
        <input className = 'pesquisar' type="text" placeholder="&#x1F50E;&#xFE0E;  Pesquisar Conteúdo..." name = "query" />
        <button type="submit" style = {{display: 'none'}}> </button>
    </form>
    <form onSubmit={handleUpload} className = 'uploadForm'>
        <input
          className = 'uploadInput'
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className = 'upload' type = "submit" > Upload </button>
    </form>
  </header>);
}