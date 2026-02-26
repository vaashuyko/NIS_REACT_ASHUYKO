import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App.tsx";
import { AppProviders } from "./app/providers/AppProviders.tsx";
import "./shared/config/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppProviders>
            <App />
        </AppProviders>
    </React.StrictMode>
);