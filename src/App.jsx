
import './App.css';
import {Route, Routes} from 'react-router-dom';
import FolderComponent from './Components/FolderComponent.jsx';
import { useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Callback from './Components/Callback.jsx';


export default function App() {

    const clientID = "1132965128045001";
    const redirectURL = "https://nmath-ist.github.io/RepositorioNMATH/#/auth/callback";
    const authUrl = `https://fenix.tecnico.ulisboa.pt/oauth/userdialog?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURL)}&response_type=code`;

    if (!sessionStorage.getItem("didRedirect")) {
    sessionStorage.setItem("didRedirect", "true");
    window.location.href = authUrl;
    }

    const token = localStorage.getItem("fenix_token");
    let dados = {};


    useEffect(() => {
    if (!token) return;
    fetch("https://backend-992345001586.europe-west1.run.app/api/fenix/person", {
        headers: {
        Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {dados = data; console.log(dados);})
        .catch(err => console.error(err));
    }, [token]);
 


    return(
    <>
        <Routes>
            <Route path = '/' element = {<FolderComponent name = {''} />}/>
            <Route path = '/folder/*' element = {<FolderComponent/>}/>
            <Route path = '/search/*' element = {<FolderComponent/>}/>
            <Route path = '/#/auth/callback/*' element = {<Callback/>}/>
        </Routes>
    </>
    );
}
