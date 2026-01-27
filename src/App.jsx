
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
  console.log("Current path:", window.location.pathname);
  const token = localStorage.getItem("fenix_token");
  const lastAuthTime = sessionStorage.getItem("lastAuthTime");
  const oneHourInMs = 60 * 60 * 1000;
  
  // Check if one hour has passed since last authentication
  const shouldReAuth = lastAuthTime && (Date.now() - parseInt(lastAuthTime)) > oneHourInMs;
  
  if (shouldReAuth) {
    // Clear old authentication data
    sessionStorage.removeItem("didRedirect");
    sessionStorage.removeItem("lastAuthTime");
    localStorage.removeItem("fenix_token");
  }
  
  if (!token && !sessionStorage.getItem("didRedirect") && !window.location.pathname.includes("/auth/callback")) {
    console.log("Initiating Fenix authentication...");
    sessionStorage.setItem("didRedirect", "true");
    sessionStorage.setItem("lastAuthTime", Date.now().toString());
    window.location.href = authUrl;
  }
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
