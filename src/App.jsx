
import './App.css';
import {Route, Routes} from 'react-router-dom';
import FolderComponent from './Components/FolderComponent.jsx';
import {useEffect, useState} from 'react';
import Callback from './Components/Callback.jsx';


export default function App() {
    const clientID = "1132965128045001";
    const redirectURL = "https://repositorio.nmath.pt/auth/callback";
    const authUrl = `https://fenix.tecnico.ulisboa.pt/oauth/userdialog?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURL)}&response_type=code`;
    const [userData, setUserData] = useState(null);

useEffect(() => {
  const checkAndRedirectIfExpired = () => {
    const token = localStorage.getItem("fenix_token");
    const expiry = localStorage.getItem("fenix_token_expiry");
    const isExpired = !expiry || Date.now() > parseInt(expiry);

    if (window.location.pathname.includes("/auth/callback")) return;

    if (token && !isExpired) {
      return; // token ainda válido, nada a fazer
    }

    // Token ausente ou expirado: redireciona para o Fénix.
    // Como a sessão CAS costuma continuar ativa, isto normalmente
    // acontece sem pedir login outra vez ao utilizador.
    localStorage.removeItem("fenix_token");
    localStorage.removeItem("fenix_refresh_token");
    localStorage.removeItem("fenix_token_expiry");
    window.location.href = authUrl;
  };

  // Verifica logo ao carregar a página
  checkAndRedirectIfExpired();

  // E depois verifica periodicamente (a cada 5 minutos),
  // para apanhar expirações mesmo sem o utilizador navegar/recarregar
  const interval = setInterval(checkAndRedirectIfExpired, 5 * 60 * 1000);
  return () => clearInterval(interval);
}, [authUrl]);

useEffect(() => {
  const token = localStorage.getItem("fenix_token");
  if (!token) return;
  
  fetch("https://backend-992345001586.europe-west1.run.app/api/fenix/person", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      setUserData(data);
      console.log("User data:", data);
    })
    .catch(err => console.error("Error fetching user data:", err));
}, []);

    return(
    <>
        <Routes>
            <Route path = '/auth/callback' element = {<Callback/>}/>
            <Route path = '/' element = {<FolderComponent name = {''} userData = {userData} />}/>
            <Route path = '/folder/*' element = {<FolderComponent userData = {userData}/>}/>
            <Route path = '/search/*' element = {<FolderComponent userData = {userData}/>}/>
        </Routes>
    </>
    );
}
