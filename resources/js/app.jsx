import "./bootstrap";

import React from "react";
import ReactDOM from "react-dom/client";

import DateTimeDisplay from "./components/DateTimeDisplay";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
    <React.StrictMode>
        <DateTimeDisplay />
    </React.StrictMode>
);