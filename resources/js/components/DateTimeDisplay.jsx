import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function DateTimeDisplay() {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [timezone, setTimezone] = useState("Asia/Kolkata");
    const [is24Hour, setIs24Hour] = useState(true);

    const fetchDateTime = () => {
        axios
            .get("/api/current-datetime?timezone=" + timezone)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDateTime();

        const interval = setInterval(fetchDateTime, 1000);

        return () => clearInterval(interval);
    }, [timezone]);

    const copyDateTime = () => {
        navigator.clipboard.writeText(data.datetime);
        alert("Date & Time Copied Successfully!");
    };

    const greeting = () => {

        if (!data.time24) return "";

        const hour = parseInt(data.time24.split(":")[0]);

        if (hour >= 5 && hour < 12) {
            return "Good Morning ☀️";
        }

        if (hour >= 12 && hour < 17) {
            return "Good Afternoon 🌤️";
        }

        if (hour >= 17 && hour < 21) {
            return "Good Evening 🌇";
        }

        return "Good Night 🌙";
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#4F46E5,#2563EB,#06B6D4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px",
            }}
        >

            <div
                className="card border-0 shadow-lg"
                style={{
                    width: "900px",
                    borderRadius: "25px",
                    overflow: "hidden",
                }}
            >

                {/* Header */}

                <div
                    style={{
                        background:
                            "linear-gradient(90deg,#1E3A8A,#2563EB)",
                        color: "#fff",
                        padding: "35px",
                        textAlign: "center",
                    }}
                >

                    <h1 className="fw-bold mb-2">
                        <i className="bi bi-globe2 me-2"></i>
                        World Clock Dashboard
                    </h1>

                    <p className="mb-2">
                        Laravel 12 + React | Live Date & Time
                    </p>

                    <h2 className="fw-bold display-4">
                        {is24Hour ? data.time24 : data.time12}
                    </h2>

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

                        <div className="col-md-6">

                            <label className="fw-bold mb-2">
                                Select Timezone
                            </label>

                            <select
                                className="form-select shadow-sm"
                                value={timezone}
                                onChange={(e) =>
                                    setTimezone(e.target.value)
                                }
                            >

                                <option>Asia/Kolkata</option>
                                <option>Europe/London</option>
                                <option>America/New_York</option>
                                <option>Asia/Dubai</option>
                                <option>Asia/Tokyo</option>

                            </select>

                        </div>

                        <div className="col-md-6 d-flex align-items-end">

                            <button
                                className="btn btn-primary me-2"
                                onClick={() =>
                                    setIs24Hour(!is24Hour)
                                }
                            >
                                <i className="bi bi-clock-history me-2"></i>

                                {is24Hour
                                    ? "12 Hour"
                                    : "24 Hour"}

                            </button>

                            <button
                                className="btn btn-success"
                                onClick={copyDateTime}
                            >

                                <i className="bi bi-clipboard me-2"></i>

                                Copy

                            </button>

                        </div>

                    </div>

                    {loading ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                            <h5 className="mt-3">
                                Loading...
                            </h5>

                        </div>

                    ) : (

                        <>


                            < div className="row g-4">

                                <div className="col-md-4">
                                    <div
                                        className="card border-0 shadow-sm h-100"
                                        style={{ borderRadius: "15px" }}
                                    >
                                        <div className="card-body text-center">
                                            <i className="bi bi-calendar-date display-5 text-primary"></i>

                                            <h6 className="mt-3 text-secondary">
                                                Current Date
                                            </h6>

                                            <h4 className="fw-bold">
                                                {data.date}
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div
                                        className="card border-0 shadow-sm h-100"
                                        style={{ borderRadius: "15px" }}
                                    >
                                        <div className="card-body text-center">
                                            <i className="bi bi-calendar-week display-5 text-success"></i>

                                            <h6 className="mt-3 text-secondary">
                                                Day
                                            </h6>

                                            <h4 className="fw-bold">
                                                {data.day}
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div
                                        className="card border-0 shadow-sm h-100"
                                        style={{ borderRadius: "15px" }}
                                    >
                                        <div className="card-body text-center">
                                            <i className="bi bi-calendar3 display-5 text-warning"></i>

                                            <h6 className="mt-3 text-secondary">
                                                Month
                                            </h6>

                                            <h4 className="fw-bold">
                                                {data.month}
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div
                                        className="card border-0 shadow-sm h-100"
                                        style={{ borderRadius: "15px" }}
                                    >
                                        <div className="card-body text-center">
                                            <i className="bi bi-123 display-5 text-danger"></i>

                                            <h6 className="mt-3 text-secondary">
                                                Year
                                            </h6>

                                            <h4 className="fw-bold">
                                                {data.year}
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div
                                        className="card border-0 shadow-sm h-100"
                                        style={{ borderRadius: "15px" }}
                                    >
                                        <div className="card-body text-center">
                                            <i className="bi bi-globe display-5 text-info"></i>

                                            <h6 className="mt-3 text-secondary">
                                                Timezone
                                            </h6>

                                            <h5 className="fw-bold">
                                                {data.timezone}
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div
                                        className="card border-0 shadow-sm h-100"
                                        style={{ borderRadius: "15px" }}
                                    >
                                        <div className="card-body text-center">
                                            <i className="bi bi-clock display-5 text-dark"></i>

                                            <h6 className="mt-3 text-secondary">
                                                Timestamp
                                            </h6>

                                            <h6 className="fw-bold">
                                                {data.timestamp}
                                            </h6>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="text-center mt-5">

                                <button
                                    className="btn btn-outline-primary me-2"
                                    onClick={fetchDateTime}
                                >
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    Refresh
                                </button>

                                <button
                                    className="btn btn-outline-success"
                                    onClick={copyDateTime}
                                >
                                    <i className="bi bi-clipboard-check me-2"></i>
                                    Copy Date & Time
                                </button>

                            </div>

                            <hr className="my-4" />

                            <div className="text-center text-muted">

                                <i className="bi bi-lightning-charge-fill text-warning"></i>

                                <p className="mb-0 mt-2">

                                    Live Date & Time updates every second using
                                    Laravel API + React.

                                </p>

                            </div>

                        </>

                    )}

                </div>

            </div >

        </div >

    );

}