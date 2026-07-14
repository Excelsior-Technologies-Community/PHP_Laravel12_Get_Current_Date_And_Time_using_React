import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WorldClock() {

    const [clocks, setClocks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWorldClocks = () => {

        axios
            .get("/api/world-clocks")
            .then((response) => {

                setClocks(response.data.data);
                setLoading(false);

            })
            .catch((error) => {

                console.log(error);

            });

    };

    useEffect(() => {

        fetchWorldClocks();

        const interval = setInterval(() => {

            fetchWorldClocks();

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    const getBadgeColor = (isDay) => {

        return isDay ? "success" : "dark";

    };

    return (

        <div className="container my-5">

            <div className="text-center mb-5">

                <h2 className="fw-bold">

                    🌍 World Clock Dashboard

                </h2>

                <p className="text-muted">

                    Live Current Time Across Multiple Countries

                </p>

            </div>

            {
                loading ?

                    (

                        <div className="text-center">

                            <div className="spinner-border text-primary"></div>

                            <h5 className="mt-3">

                                Loading World Clocks...

                            </h5>

                        </div>

                    )

                    :

                    (

                        <div className="row g-4">

                            {clocks.map((clock, index) => (

                                <div
                                    className="col-lg-4 col-md-6"
                                    key={index}
                                >

                                    <div
                                        className="card border-0 shadow h-100"
                                        style={{
                                            borderRadius: "20px",
                                            transition: "0.3s",
                                        }}
                                    >

                                        <div className="card-body text-center p-4">

                                            <h2 className="mb-3">

                                                {clock.flag}

                                            </h2>

                                            <h4 className="fw-bold">

                                                {clock.city}

                                            </h4>

                                            <p className="text-muted">

                                                {clock.country}

                                            </p>

                                            <hr />

                                            <h1
                                                className="fw-bold text-primary"
                                                style={{
                                                    letterSpacing: "2px",
                                                }}
                                            >

                                                {clock.time24}

                                            </h1>

                                            <h5 className="text-secondary">

                                                {clock.date}

                                            </h5>

                                            <p className="mb-3">

                                                {clock.day}

                                            </p>

                                            <span
                                                className={
                                                    "badge bg-" +
                                                    getBadgeColor(clock.is_day)
                                                }
                                            >

                                                {clock.icon}

                                                {" "}

                                                {clock.is_day
                                                    ? "Day"
                                                    : "Night"}

                                            </span>

                                            <div className="mt-3">

                                                <small
                                                    className="text-muted"
                                                >

                                                    Timezone

                                                </small>

                                                <div className="fw-semibold">

                                                    {clock.timezone}

                                                </div>

                                            </div>

                                            <div className="mt-3">

                                                <small
                                                    className="text-muted"
                                                >

                                                    Difference From IST

                                                </small>

                                                <div
                                                    className="fw-bold text-success"
                                                >

                                                    {clock.offset_from_ist}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )

            }

            <div className="text-center mt-5">

                <div
                    className="card border-0 shadow-sm"
                    style={{
                        borderRadius: "18px",
                        background: "#f8f9fa",
                    }}
                >

                    <div className="card-body">

                        <h5 className="fw-bold mb-3">
                            🌐 World Time Information
                        </h5>

                        <p className="text-muted mb-2">
                            All clocks are refreshed automatically every second
                            using the Laravel World Clock API.
                        </p>

                        <span className="badge bg-primary me-2">
                            Live Updates
                        </span>

                        <span className="badge bg-success me-2">
                            Multiple Timezones
                        </span>

                        <span className="badge bg-warning text-dark me-2">
                            Day / Night
                        </span>

                        <span className="badge bg-info text-dark">
                            Responsive Dashboard
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}