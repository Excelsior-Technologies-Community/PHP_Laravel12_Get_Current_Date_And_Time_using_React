import "./bootstrap";

import React from "react";
import ReactDOM from "react-dom/client";

import DateTimeDisplay from "./components/DateTimeDisplay";
import WorldClock from "./components/WorldClock";
import DateDifference from "./components/DateDifference";

const root = ReactDOM.createRoot(
    document.getElementById("app")
);

root.render(

    <React.StrictMode>

        <DateTimeDisplay />

        <WorldClock />

        <DateDifference />

    </React.StrictMode>

);