import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const code = searchParams.get("code");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Callback component mounted");
    console.log("Current location:", location);
    console.log("Search params:", Object.fromEntries(searchParams.entries()));
  }, [location, searchParams]);

  useEffect(() => {
    console.log("Callback mounted, code:", code);
    if (code) {
      console.log("Sending code to backend...");
      // Send the code to your backend to exchange for a token
      console.log("Making request with code:", code);
      fetch("https://backend-992345001586.europe-west1.run.app/api/auth/fenix", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ code })
      })
      .then(async res => {
        console.log("Received response:", res.status);
        const text = await res.text();
        console.log("Response text:", text);
        
        if (!res.ok) {
          throw new Error(`Authentication failed with status ${res.status}: ${text}`);
        }
        
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error(`Invalid JSON response: ${text}`);
        }
      })
      .then(data => {
        console.log("Received data:", data);
        if (!data.access_token) {
          throw new Error('No access token received');
        }
        localStorage.setItem("fenix_token", data.access_token);
        localStorage.setItem("fenix_refresh_token", data.refresh_token);
        localStorage.setItem("fenix_token_expiry", (Date.now() + data.expires_in * 1000).toString());
        console.log("Token saved, redirecting...");
        window.location.replace("/");
      })
      .catch(err => {
        console.error('Authentication error:', err);
        setError(err.message);
      });
    }
  }, [code]);

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}. Please try again.</p>;
  }
  
  return <p>Authenticating...</p>;
}