import Main from './Main.jsx';
import { useState } from 'react';
import Header from './header.jsx';
import Navbar from './Navbar.jsx';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";
import { useEffect } from 'react';
import WelcomeBox from './WelcomeBox.jsx';

export default function FolderComponent(props) {
    const [items, setItems] = useState([]);
    let path2 = ''
    let path = ''


    //Define o path atual
    let location = useLocation();
    let correctLocationPath = location.pathname.startsWith("/auth")? '' : location.pathname;
    if (location.pathname.startsWith("/folder") || location.pathname === '/') {
        path2 = decodeURIComponent(location.pathname.replace(/^\/folder/, "").slice(1));
        path = "Repositório LMAC e MMAC" + (path2 ? "/" + path2 : "");
    }
    const navigate = useNavigate();

    //Define o clickFunction associada ao Navbar
    const handleClick = function(name) {
        navigate(`/folder/${name}`);
    };

    //Define o clickFunction associada ao Main para pastas
    const handleClick2 = function(name,pathInput) {
    if (location.pathname.startsWith("/folder") || location.pathname === '/') {
        navigate(`/folder/${path2 ? path2 + "/" : ""}${name}`)
    }
    if (location.pathname.startsWith("/search")){
        navigate(`/folder/${pathInput}`)
    };
    }


    //Devolve os items da pasta atual
    useEffect(() => {
        if (location.pathname.startsWith("/folder") || location.pathname === '/'){
            if (path === "Repositório LMAC e MMAC") {return setItems([])}
            else{
                axios.get("https://repositorionmath.uw.r.appspot.com/list", {
            params: { path: (path) }
            }).then(res => setItems(res.data));
            }}

        if (location.pathname.startsWith("/search")){
            let value = decodeURIComponent(location.pathname.replace(/^\/search/, "").slice(1));
            if (value === '') return;
            else{
            axios.get("http://localhost:5000/search", {params: {q: (value) } }).then(res => setItems(res.data));}
        }
        },[correctLocationPath]);




//---------------- Código Referente à Funcionalidade de Pesquisa ---------
    const [query, setQuery] = useState("");

    //Função que é executada sempre que o utilizador efetua uma pesquisa
    const submitFunction = function(event){
        event.preventDefault();
        const formEl = event.currentTarget;
        const formData = new FormData(formEl);
        setQuery(formData.get("query"));
        navigate(`/search/${query}`);
        event.target.reset();
    }

    useEffect(() => {
        if (query !== "") {
        navigate(`/search/${query}`)};
    },[query]);


//---------------------------------------------------------------------

    //Define a clickFunction associada ao Main para ficheiros
    const handleClick3 = function(name, pathInput) {
    
     if (location.pathname.startsWith("/folder") || location.pathname === '/') {
        const filePath = path ? `${path}/${name}` : name;
        const url = `http://localhost:5000/download?path=${encodeURIComponent(filePath)}`;
        window.open(url, "_blank"); // open in new tab
    }
    if (location.pathname.startsWith("/search")){
        const pathSearch = "Repositório LMAC e MMAC" + '/' + pathInput;
        const url = `http://localhost:5000/download?path=${encodeURIComponent(pathSearch)}`;
        window.open(url, "_blank"); // open in new tab
    } };

    //Define a Click Function que se executa quando se carrega no título
    const headerClickFunction = function() {
        navigate(`/`);
    };



  if ( location.pathname === '/'){

    return (
        <>
            <Header clickFunction={headerClickFunction} actionFunction={submitFunction} />
            <Navbar clickFunction={handleClick} />
            <WelcomeBox name = {props.name}/>
        </>
    )
  }
  
  else{
    return (
        <>
            <Header clickFunction={headerClickFunction} actionFunction={submitFunction} />
            <Navbar clickFunction={handleClick} />
            <Main filhos={items} clickFunction={handleClick2} clickFunction2={handleClick3} />
        </>
    )};
}