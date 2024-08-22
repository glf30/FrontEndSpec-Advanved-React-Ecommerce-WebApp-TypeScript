import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-orb6qbpfcycqhemk.us.auth0.com"
    clientId="Skdl7glW5Ad73W8wHUny9BD50EACFDpO"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation="localstorage" // was getting a cookie error that would expire add remove my authentication so i found this to add the token to local storage
  >
    <App />
  </Auth0Provider>
);
