import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function DateTimeDisplay() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [timezone, setTimezone] = useState("Asia/Kolkata");
    const [is24Hour, setIs24Hour] = useState(true);

    // --- Feature 4: Theme & Clock Face States ---
    // Themes: 'classic' | 'cyberpunk' | 'glassmorphism' | 'dark'
    const [theme, setTheme] = useState("glassmorphism");
    // Clock Face: 'digital' | 'analog'
    const [clockFace, setClockFace] = useState("digital");

    const fetchDateTime = () => {
        axios
            .get("/api/current-datetime?timezone=" + timezone)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDateTime();
        const interval = setInterval(fetchDateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    const copyDateTime = () => {
        if (data.datetime) {
            navigator.clipboard.writeText(data.datetime);
            alert("Date & Time Copied Successfully!");
        }
    };

    const greeting = () => {
        if (!data.time24) return "";
        const hour = parseInt(data.time24.split(":")[0]);
        if (hour >= 5 && hour < 12) return "Good Morning ☀️";
        if (hour >= 12 && hour < 17) return "Good Afternoon 🌤️";
        if (hour >= 17 && hour < 21) return "Good Evening 🌇";
        return "Good Night 🌙";
    };

    // --- Dynamic Themes Palette Configuration ---
    const THEME_STYLES = {
        classic: {
            containerBg: "linear-gradient(135deg, #4F46E5, #2563EB, #06B6D4)",
            cardBg: "#ffffff",
            headerBg: "linear-gradient(90deg, #1E3A8A, #2563EB)",
            textColor: "#1f2937",
            cardBorder: "none",
            statCardBg: "#f8fafc",
            accentColor: "#2563eb",
            fontFamily: "inherit",
        },
        cyberpunk: {
            containerBg: "#090a0f",
            cardBg: "#12131c",
            headerBg: "linear-gradient(90deg, #ff007f, #7928ca)",
            textColor: "#00f0ff",
            cardBorder: "1px solid #00f0ff",
            statCardBg: "#1a1c29",
            accentColor: "#ff007f",
            fontFamily: "'Courier New', Courier, monospace",
        },
        glassmorphism: {
            containerBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            cardBg: "rgba(255, 255, 255, 0.88)",
            headerBg: "linear-gradient(135deg, #4338ca, #6366f1)",
            textColor: "#1e1b4b",
            cardBorder: "1px solid rgba(255, 255, 255, 0.4)",
            statCardBg: "rgba(243, 244, 246, 0.9)",
            accentColor: "#6366f1",
            fontFamily: "inherit",
        },
        dark: {
            containerBg: "#18181b",
            cardBg: "#27272a",
            headerBg: "linear-gradient(90deg, #3f3f46, #52525b)",
            textColor: "#fafafa",
            cardBorder: "1px solid #3f3f46",
            statCardBg: "#3f3f46",
            accentColor: "#38bdf8",
            fontFamily: "inherit",
        },
    };

    const currentStyle = THEME_STYLES[theme];

    // Compute Analog Clock Angles from time24
    let hoursAngle = 0;
    let minutesAngle = 0;
    let secondsAngle = 0;

    if (data.time24) {
        const parts = data.time24.split(":");
        const h = parseInt(parts[0]) % 12;
        const m = parseInt(parts[1]);
        const s = parseInt(parts[2]);

        secondsAngle = s * 6; // 360 / 60
        minutesAngle = m * 6 + s * 0.1;
        hoursAngle = h * 30 + m * 0.5; // 360 / 12
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: currentStyle.containerBg,
                transition: "all 0.4s ease",
                padding: "30px 15px",
            }}
        >
            <div className="container" style={{ maxWidth: "960px" }}>
                
                {/* Theme & Clock Face Studio Header Bar */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-sm bg-white bg-opacity-75">
                    <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
                        <span className="badge bg-dark p-2 fs-6">🌓</span>
                        <div>
                            <strong className="d-block text-dark">Theme & Face Studio</strong>
                            <small className="text-muted">Choose your favorite UI aesthetic</small>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap align-items-center gap-2">
                        {/* Theme Switcher Pills */}
                        <div className="btn-group btn-group-sm">
                            <button
                                className={`btn ${theme === "glassmorphism" ? "btn-primary" : "btn-outline-dark"}`}
                                onClick={() => setTheme("glassmorphism")}
                            >
                                🔮 Glass
                            </button>
                            <button
                                className={`btn ${theme === "cyberpunk" ? "btn-danger" : "btn-outline-dark"}`}
                                onClick={() => setTheme("cyberpunk")}
                            >
                                ⚡ Cyberpunk
                            </button>
                            <button
                                className={`btn ${theme === "dark" ? "btn-dark" : "btn-outline-dark"}`}
                                onClick={() => setTheme("dark")}
                            >
                                🌙 Dark
                            </button>
                            <button
                                className={`btn ${theme === "classic" ? "btn-info text-white" : "btn-outline-dark"}`}
                                onClick={() => setTheme("classic")}
                            >
                                ☀️ Light
                            </button>
                        </div>

                        {/* Clock Face Toggle */}
                        <div className="btn-group btn-group-sm ms-md-2">
                            <button
                                className={`btn ${clockFace === "digital" ? "btn-secondary" : "btn-outline-secondary"}`}
                                onClick={() => setClockFace("digital")}
                            >
                                <i className="bi bi-display me-1"></i> Digital
                            </button>
                            <button
                                className={`btn ${clockFace === "analog" ? "btn-secondary" : "btn-outline-secondary"}`}
                                onClick={() => setClockFace("analog")}
                            >
                                <i className="bi bi-clock me-1"></i> Analog
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div
                    className="card border-0 shadow-lg mb-5"
                    style={{
                        borderRadius: "25px",
                        overflow: "hidden",
                        background: currentStyle.cardBg,
                        color: currentStyle.textColor,
                        border: currentStyle.cardBorder,
                        fontFamily: currentStyle.fontFamily,
                        transition: "all 0.3s ease",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            background: currentStyle.headerBg,
                            color: "#fff",
                            padding: "35px",
                            textAlign: "center",
                        }}
                    >
                        <h1 className="fw-bold mb-2">
                            <i className="bi bi-globe2 me-2"></i>
                            World Clock & Real-time Studio
                        </h1>

                        <p className="mb-2 text-white-50">
                            Laravel 12 + React | Live Precision Date & Time
                        </p>

                        {/* Display Face: Digital vs Analog */}
                        {clockFace === "digital" ? (
                            <h2
                                className="fw-bold display-3 my-2"
                                style={{
                                    letterSpacing: "2px",
                                    fontFamily: theme === "cyberpunk" ? "'Courier New', Courier, monospace" : "inherit",
                                    textShadow: theme === "cyberpunk" ? "0 0 10px #00f0ff" : "none",
                                }}
                            >
                                {is24Hour ? data.time24 : data.time12}
                            </h2>
                        ) : (
                            /* SVG Analog Clock */
                            <div className="d-flex justify-content-center my-3">
                                <svg width="180" height="180" viewBox="0 0 200 200" style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))" }}>
                                    <circle cx="100" cy="100" r="95" fill="#1e1e2f" stroke="#ffffff" strokeWidth="4" />
                                    {/* Hour tick marks */}
                                    {[...Array(12)].map((_, i) => {
                                        const angle = (i * 30 * Math.PI) / 180;
                                        const x1 = 100 + 80 * Math.sin(angle);
                                        const y1 = 100 - 80 * Math.cos(angle);
                                        const x2 = 100 + 90 * Math.sin(angle);
                                        const y2 = 100 - 90 * Math.cos(angle);
                                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="3" />;
                                    })}
                                    {/* Hour Hand */}
                                    <line
                                        x1="100"
                                        y1="100"
                                        x2="100"
                                        y2="45"
                                        stroke="#ffffff"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        transform={`rotate(${hoursAngle} 100 100)`}
                                    />
                                    {/* Minute Hand */}
                                    <line
                                        x1="100"
                                        y1="100"
                                        x2="100"
                                        y2="30"
                                        stroke="#38bdf8"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        transform={`rotate(${minutesAngle} 100 100)`}
                                    />
                                    {/* Second Hand */}
                                    <line
                                        x1="100"
                                        y1="110"
                                        x2="100"
                                        y2="20"
                                        stroke="#f43f5e"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        transform={`rotate(${secondsAngle} 100 100)`}
                                    />
                                    <circle cx="100" cy="100" r="5" fill="#f43f5e" />
                                </svg>
                            </div>
                        )}

                        <h5>
                            {data.day}, {data.date}
                        </h5>

                        <span className="badge bg-warning text-dark px-3 py-2 mt-2">
                            {greeting()}
                        </span>
                    </div>

                    {/* Body */}
                    <div className="card-body p-4">
                        <div className="row mb-4">
                            <div className="col-md-6 mb-2 mb-md-0">
                                <label className="fw-bold mb-2">Select Timezone</label>
                                <select
                                    className="form-select shadow-sm"
                                    value={timezone}
                                    onChange={(e) => setTimezone(e.target.value)}
                                >
                                    <option>Asia/Kolkata</option>
                                    <option>Europe/London</option>
                                    <option>America/New_York</option>
                                    <option>Asia/Dubai</option>
                                    <option>Asia/Tokyo</option>
                                    <option>Australia/Sydney</option>
                                </select>
                            </div>

                            <div className="col-md-6 d-flex align-items-end">
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => setIs24Hour(!is24Hour)}
                                >
                                    <i className="bi bi-clock-history me-2"></i>
                                    {is24Hour ? "12 Hour" : "24 Hour"}
                                </button>

                                <button className="btn btn-success" onClick={copyDateTime}>
                                    <i className="bi bi-clipboard me-2"></i>
                                    Copy
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                                <h5 className="mt-3">Loading...</h5>
                            </div>
                        ) : (
                            <>
                                <div className="row g-4">
                                    <div className="col-md-4">
                                        <div
                                            className="card border-0 shadow-sm h-100"
                                            style={{ borderRadius: "15px", background: currentStyle.statCardBg, color: currentStyle.textColor }}
                                        >
                                            <div className="card-body text-center">
                                                <i className="bi bi-calendar-date display-5 text-primary"></i>
                                                <h6 className="mt-3 text-muted">Current Date</h6>
                                                <h4 className="fw-bold">{data.date}</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div
                                            className="card border-0 shadow-sm h-100"
                                            style={{ borderRadius: "15px", background: currentStyle.statCardBg, color: currentStyle.textColor }}
                                        >
                                            <div className="card-body text-center">
                                                <i className="bi bi-calendar-week display-5 text-success"></i>
                                                <h6 className="mt-3 text-muted">Day</h6>
                                                <h4 className="fw-bold">{data.day}</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div
                                            className="card border-0 shadow-sm h-100"
                                            style={{ borderRadius: "15px", background: currentStyle.statCardBg, color: currentStyle.textColor }}
                                        >
                                            <div className="card-body text-center">
                                                <i className="bi bi-calendar3 display-5 text-warning"></i>
                                                <h6 className="mt-3 text-muted">Month</h6>
                                                <h4 className="fw-bold">{data.month}</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div
                                            className="card border-0 shadow-sm h-100"
                                            style={{ borderRadius: "15px", background: currentStyle.statCardBg, color: currentStyle.textColor }}
                                        >
                                            <div className="card-body text-center">
                                                <i className="bi bi-123 display-5 text-danger"></i>
                                                <h6 className="mt-3 text-muted">Year</h6>
                                                <h4 className="fw-bold">{data.year}</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div
                                            className="card border-0 shadow-sm h-100"
                                            style={{ borderRadius: "15px", background: currentStyle.statCardBg, color: currentStyle.textColor }}
                                        >
                                            <div className="card-body text-center">
                                                <i className="bi bi-globe display-5 text-info"></i>
                                                <h6 className="mt-3 text-muted">Timezone</h6>
                                                <h5 className="fw-bold">{data.timezone}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div
                                            className="card border-0 shadow-sm h-100"
                                            style={{ borderRadius: "15px", background: currentStyle.statCardBg, color: currentStyle.textColor }}
                                        >
                                            <div className="card-body text-center">
                                                <i className="bi bi-clock display-5 text-secondary"></i>
                                                <h6 className="mt-3 text-muted">Timestamp</h6>
                                                <h6 className="fw-bold">{data.timestamp}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-4">
                                    <button className="btn btn-outline-primary me-2" onClick={fetchDateTime}>
                                        <i className="bi bi-arrow-clockwise me-2"></i> Refresh
                                    </button>
                                    <button className="btn btn-outline-success" onClick={copyDateTime}>
                                        <i className="bi bi-clipboard-check me-2"></i> Copy Date & Time
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}