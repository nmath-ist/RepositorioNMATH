import Main from './Main.jsx';
import { useState, useEffect } from 'react';
import Header from './header.jsx';
import Navbar from './Navbar.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import WelcomeBox from './WelcomeBox.jsx';
import Footer from './Footer.jsx';


export default function FolderComponent(props) {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Compute path and path2 only when needed
    let path2 = '';
    let path = '';
    if (location.pathname.startsWith("/folder") || location.pathname === '/') {
        path2 = decodeURIComponent(location.pathname.replace(/^\/folder/, "").slice(1));
        path = "Repositório LMAC e MMAC" + (path2 ? "/" + path2 : "");
    }

    // Navbar click handler
    const handleClick = (name) => {
        navigate(`/folder/${name}`);
    };

    // Main folder click handler
    const handleClick2 = (name, pathInput) => {
        if (location.pathname.startsWith("/folder") || location.pathname === '/') {
            navigate(`/folder/${path2 ? path2 + "/" : ""}${name}`);
        } else if (location.pathname.startsWith("/search")) {
            navigate(`/folder/${pathInput}`);
        }
    };

// Main file click handler
const handleClick3 = (name, pathInput) => {
    let url = "";
    const encodedName = encodeURIComponent(name);

    if (location.pathname.startsWith("/folder") || location.pathname === '/') {
        const filePath = path ? `${path}/${name}` : name;
        url = `https://backend-992345001586.europe-west1.run.app/download/${encodedName}?path=${encodeURIComponent(filePath)}`;
    } else if (location.pathname.startsWith("/search")) {
        const pathSearch = "Repositório LMAC e MMAC" + '/' + pathInput;
        url = `https://backend-992345001586.europe-west1.run.app/download/${encodedName}?path=${encodeURIComponent(pathSearch)}`;
    }

    const pdfWindow = window.open("", "_blank");

    if (pdfWindow) {
        pdfWindow.document.write(`
            <html>
                <head><title>${name}</title></head>
                <body style="margin:0;padding:0;overflow:hidden;">
                    <iframe src="${url}" width="100%" height="100%" style="border:none;position:fixed;top:0;left:0;"></iframe>
                </body>
            </html>
        `);
        pdfWindow.document.close();
    } else {
        alert("O browser bloqueou a janela. Permite pop-ups para este site.");
    }
};

// Title click handler
    const headerClickFunction = () => {
        navigate(`/`);
    };

    // Fetch items for folder or search
    useEffect(() => {
        if (location.pathname.startsWith("/folder") || location.pathname === '/') {
            if (path === "Repositório LMAC e MMAC") {
                setItems([]);
            } else {
                axios.get("https://backend-992345001586.europe-west1.run.app/list", { params: { path } })
                    .then(res => setItems(res.data))
                    .catch(() => setItems([]));
            }
        } else if (location.pathname.startsWith("/search")) {
            let value = decodeURIComponent(location.pathname.replace(/^\/search/, "").slice(1));
            if (value === '') return;
            axios.get("https://backend-992345001586.europe-west1.run.app/search", { params: { q: value } })
                .then(res => setItems(res.data))
                .catch(() => setItems([]));
        }
    }, [location.pathname, path]);

    // Search submit handler
    const submitFunction = (event) => {
        event.preventDefault();
        const formEl = event.currentTarget;
        const formData = new FormData(formEl);
        const searchQuery = formData.get("query");
        navigate(`/search/${searchQuery}`);
        event.target.reset();
    };

    // Render
    if (location.pathname === '/') {
        return (
            <>
                <Header clickFunction={headerClickFunction} actionFunction={submitFunction} />
                <Navbar clickFunction={handleClick} />
                <WelcomeBox name={props.name} userData={props.userData} />
                <Footer />
            </>
        );
    } else {
        return (
            <>
                <Header clickFunction={headerClickFunction} actionFunction={submitFunction} />
                <Navbar clickFunction={handleClick} />
                <Main filhos={items} clickFunction={handleClick2} clickFunction2={handleClick3} />
                <Footer />
            </>
        );
    }
}