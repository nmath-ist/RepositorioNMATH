import './header.css'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


export default function Header(props) {

let path = '';
let path2 = '';

let location = useLocation();
  if (location.pathname.startsWith("/folder") || location.pathname === '/') {
        path2 = decodeURIComponent(location.pathname.replace(/^\/folder/, "").slice(1));
        path = "Repositório LMAC e MMAC" + (path2 ? "/" + path2 : "");
  }

//---------------- Código Referente à Funcionalidade de Upload -----------

const [file, setFile] = useState(null);


 const handleUpload = async (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
        alert("Não estás na pasta correta")
    }else{
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path); // send target folder

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Upload failed:", err);
    }}
  };



  return (
  <header className ='header' >
    <h1 className = 'titulo' onClick={props.clickFunction}> Repositório de Matemática </h1>
    <form onSubmit = {props.actionFunction}>
        <input className = 'pesquisar' type="text" placeholder="&#128270; Pesquisar Conteúdo..." name = "query" />
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