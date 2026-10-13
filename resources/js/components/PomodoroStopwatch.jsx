import React, { useState, useEffect, useRef } from "react";

export default function PomodoroStopwatch() {
    // Mode: 'pomodoro' | 'stopwatch'
    const [activeTab, setActiveTab] = useState("pomodoro");

    // --- Pomodoro States ---
    const POMO_MODES = {
        focus: { name: "Focus Time", minutes: 25, color: "#6366f1" },
        shortBreak: { name: "Short Break", minutes: 5, color: "#10b981" },
        longBreak: { name: "Long Break", minutes: 15, color: "#f59e0b" },
    };

    const [pomoMode, setPomoMode] = useState("focus");
    const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
    const [pomoRunning, setPomoRunning] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);

    // Audio Beep generator using Web Audio API (No external file needed)
    const playNotificationSound = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            osc.start();
            osc.stop(ctx.currentTime + 0.6);
        } catch (e) {
            console.log("Audio not supported or blocked");
        }
    };

    // Pomodoro Timer Effect
    useEffect(() => {
        let interval = null;
        if (pomoRunning) {
            interval = setInterval(() => {
                setPomoSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setPomoRunning(false);
                        playNotificationSound();

                        if (pomoMode === "focus") {
                            setSessionsCompleted((c) => c + 1);
                            alert("🎉 Focus session completed! Great job! Take a well-deserved break.");
                            setPomoMode("shortBreak");
                            return 5 * 60;
                        } else {
                            alert("⏰ Break time is over! Ready for the next focus sprint?");
                            setPomoMode("focus");
                            return 25 * 60;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [pomoRunning, pomoMode]);

    const handlePomoModeChange = (mode) => {
        setPomoRunning(false);
        setPomoMode(mode);
        setPomoSeconds(POMO_MODES[mode].minutes * 60);
    };

    const formatPomoTime = () => {
        const m = Math.floor(pomoSeconds / 60);
        const s = pomoSeconds % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const pomoTotalSeconds = POMO_MODES[pomoMode].minutes * 60;
    const pomoProgress = ((pomoTotalSeconds - pomoSeconds) / pomoTotalSeconds) * 100;

    // --- Stopwatch States ---
    const [stopwatchTime, setStopwatchTime] = useState(0); // in ms
    const [stopwatchRunning, setStopwatchRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const swRef = useRef(null);

    useEffect(() => {
        if (stopwatchRunning) {
            const startTime = Date.now() - stopwatchTime;
            swRef.current = setInterval(() => {
                setStopwatchTime(Date.now() - startTime);
            }, 10);
        } else {
            clearInterval(swRef.current);
        }
        return () => clearInterval(swRef.current);
    }, [stopwatchRunning]);

    const formatStopwatch = (timeMs) => {
        const ms = Math.floor((timeMs % 1000) / 10);
        const sec = Math.floor((timeMs / 1000) % 60);
        const min = Math.floor((timeMs / (1000 * 60)) % 60);
        const hr = Math.floor(timeMs / (1000 * 60 * 60));

        if (hr > 0) {
            return `${String(hr).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
        }
        return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
    };

    const handleLap = () => {
        if (stopwatchTime > 0) {
            setLaps([{ id: laps.length + 1, time: stopwatchTime, formatted: formatStopwatch(stopwatchTime) }, ...laps]);
        }
    };

    const handleResetStopwatch = () => {
        setStopwatchRunning(false);
        setStopwatchTime(0);
        setLaps([]);
    };

    return (
        <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: "20px", overflow: "hidden" }}>
            <div className="card-header bg-dark text-white p-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-danger p-2 fs-6">⏱️</span>
                    <div>
                        <h5 className="fw-bold mb-0">Focus Pomodoro & Precision Stopwatch Studio</h5>
                        <small className="text-white-50">Boost focus and track exact time milestones</small>
                    </div>
                </div>
                <div className="btn-group">
                    <button
                        className={`btn btn-sm ${activeTab === "pomodoro" ? "btn-primary" : "btn-outline-light"}`}
                        onClick={() => setActiveTab("pomodoro")}
                    >
                        <i className="bi bi-hourglass-split me-1"></i> Pomodoro
                    </button>
                    <button
                        className={`btn btn-sm ${activeTab === "stopwatch" ? "btn-primary" : "btn-outline-light"}`}
                        onClick={() => setActiveTab("stopwatch")}
                    >
                        <i className="bi bi-stopwatch me-1"></i> Stopwatch
                    </button>
                </div>
            </div>

            <div className="card-body p-4 text-center">
                {activeTab === "pomodoro" ? (
                    <div>
                        {/* Mode Selectors */}
                        <div className="d-flex justify-content-center gap-2 mb-4">
                            <button
                                className={`btn btn-sm px-3 rounded-pill fw-semibold ${pomoMode === "focus" ? "btn-primary" : "btn-outline-secondary"}`}
                                onClick={() => handlePomoModeChange("focus")}
                            >
                                🎯 Focus (25m)
                            </button>
                            <button
                                className={`btn btn-sm px-3 rounded-pill fw-semibold ${pomoMode === "shortBreak" ? "btn-success" : "btn-outline-secondary"}`}
                                onClick={() => handlePomoModeChange("shortBreak")}
                            >
                                ☕ Short Break (5m)
                            </button>
                            <button
                                className={`btn btn-sm px-3 rounded-pill fw-semibold ${pomoMode === "longBreak" ? "btn-warning" : "btn-outline-secondary"}`}
                                onClick={() => handlePomoModeChange("longBreak")}
                            >
                                🛋️ Long Break (15m)
                            </button>
                        </div>

                        {/* Circular progress bar / Big Digital Counter */}
                        <div className="my-3 py-2">
                            <h1
                                className="fw-bold display-1 tracking-tight"
                                style={{
                                    fontFamily: "monospace",
                                    color: POMO_MODES[pomoMode].color,
                                    textShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                }}
                            >
                                {formatPomoTime()}
                            </h1>
                            <div className="progress mt-3 mx-auto" style={{ height: "8px", maxWidth: "400px" }}>
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    style={{
                                        width: `${pomoProgress}%`,
                                        backgroundColor: POMO_MODES[pomoMode].color,
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <button
                                className={`btn btn-lg px-4 fw-bold ${pomoRunning ? "btn-warning" : "btn-primary"}`}
                                style={{ borderRadius: "12px", minWidth: "140px" }}
                                onClick={() => setPomoRunning(!pomoRunning)}
                            >
                                <i className={`bi ${pomoRunning ? "bi-pause-fill" : "bi-play-fill"} me-1`}></i>
                                {pomoRunning ? "Pause" : "Start"}
                            </button>
                            <button
                                className="btn btn-lg btn-outline-secondary px-3"
                                style={{ borderRadius: "12px" }}
                                onClick={() => handlePomoModeChange(pomoMode)}
                            >
                                <i className="bi bi-arrow-counterclockwise me-1"></i> Reset
                            </button>
                        </div>

                        <div className="mt-4 pt-2 text-muted small">
                            <span className="badge bg-light text-dark border me-2">
                                🔥 Sprints Completed: <strong>{sessionsCompleted}</strong>
                            </span>
                            Auto audio beep plays on interval expiry.
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Precision Stopwatch */}
                        <div className="my-3 py-2">
                            <h1
                                className="fw-bold display-2"
                                style={{
                                    fontFamily: "monospace",
                                    color: "#2563eb",
                                    letterSpacing: "2px",
                                }}
                            >
                                {formatStopwatch(stopwatchTime)}
                            </h1>
                            <small className="text-muted text-uppercase fw-semibold">Hours : Minutes : Seconds . Milliseconds</small>
                        </div>

                        {/* Controls */}
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <button
                                className={`btn btn-lg px-4 fw-bold ${stopwatchRunning ? "btn-danger" : "btn-success"}`}
                                style={{ borderRadius: "12px", minWidth: "140px" }}
                                onClick={() => setStopwatchRunning(!stopwatchRunning)}
                            >
                                <i className={`bi ${stopwatchRunning ? "bi-pause-fill" : "bi-play-fill"} me-1`}></i>
                                {stopwatchRunning ? "Stop" : "Start"}
                            </button>
                            <button
                                className="btn btn-lg btn-outline-primary px-3"
                                style={{ borderRadius: "12px" }}
                                disabled={!stopwatchRunning}
                                onClick={handleLap}
                            >
                                <i className="bi bi-flag-fill me-1"></i> Record Lap
                            </button>
                            <button
                                className="btn btn-lg btn-outline-secondary px-3"
                                style={{ borderRadius: "12px" }}
                                onClick={handleResetStopwatch}
                            >
                                <i className="bi bi-arrow-counterclockwise me-1"></i> Reset
                            </button>
                        </div>

                        {/* Lap Table */}
                        {laps.length > 0 && (
                            <div className="mt-4 mx-auto" style={{ maxWidth: "500px" }}>
                                <h6 className="fw-bold text-start mb-2">Recorded Laps ({laps.length})</h6>
                                <div className="table-responsive border rounded-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                    <table className="table table-sm table-hover mb-0 text-start align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th># Lap</th>
                                                <th>Split Timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {laps.map((lap) => (
                                                <tr key={lap.id}>
                                                    <td className="fw-bold text-primary">Lap #{lap.id}</td>
                                                    <td style={{ fontFamily: "monospace" }}>{lap.formatted}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
