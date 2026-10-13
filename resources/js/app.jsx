import "./bootstrap";

import React from "react";
import ReactDOM from "react-dom/client";

import DateTimeDisplay from "./components/DateTimeDisplay";
import PomodoroStopwatch from "./components/PomodoroStopwatch";
import MeetingPlanner from "./components/MeetingPlanner";
import WorldClock from "./components/WorldClock";
import DateDifference from "./components/DateDifference";

const root = ReactDOM.createRoot(
    document.getElementById("app")
);

root.render(
    <React.StrictMode>
        {/* Core Date & Time with Theme Studio & Analog/Digital Faces */}
        <DateTimeDisplay />

        {/* Studio Modules Container */}
        <div className="container" style={{ maxWidth: "960px", marginTop: "-30px" }}>
            {/* Feature 1: Focus Pomodoro & Precision Stopwatch Studio */}
            <PomodoroStopwatch />

            {/* Feature 5: Cross-Timezone Meeting Planner & Overlap Matrix */}
            <MeetingPlanner />

            {/* Existing World Clock Grid */}
            <WorldClock />

            {/* Existing Date Difference Calculator */}
            <DateDifference />
        </div>
    </React.StrictMode>
);