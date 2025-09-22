import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      // Send the code to your backend to exchange for a token
      fetch("http://localhost:5000/api/auth/fenix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("fenix_token", data.access_token);
      });
      window.location.href = "/";}
  }, [code]);

  return <p>Authenticating...</p>;
}