import React, { useState } from "react";
import axios from "axios";

export default function DateDifference() {

    const [selectedDate, setSelectedDate] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculateDifference = () => {

        if (!selectedDate) {

            alert("Please select a date.");

            return;
        }

        setLoading(true);

        axios
            .post("/api/date-difference", {
                date: selectedDate,
            })
            .then((response) => {

                setResult(response.data);

            })
            .catch((error) => {

                console.error(error);

                alert("Unable to calculate date difference.");

            })
            .finally(() => {

                setLoading(false);

            });

    };

    return (

        <div className="container my-5">

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">

                        📅 Date Difference Calculator

                    </h3>

                </div>

                <div className="card-body">

                    <div className="row align-items-end">

                        <div className="col-md-8">

                            <label className="form-label fw-bold">

                                Select Date

                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                            />

                        </div>

                        <div className="col-md-4">

                            <button
                                className="btn btn-success w-100"
                                onClick={calculateDifference}
                                disabled={loading}
                            >

                                {loading
                                    ? "Calculating..."
                                    : "Calculate"}

                            </button>

                        </div>

                    </div>

                    {
                        result && (

                            <>
                                <div className="mt-5">

                                    <div
                                        className="alert alert-info text-center"
                                        role="alert"
                                    >

                                        <h5 className="fw-bold mb-2">

                                            {result.message}

                                        </h5>

                                        <p className="mb-0">

                                            Selected Date:{" "}

                                            <strong>
                                                {result.selected_date}
                                            </strong>

                                            {" | "}

                                            Day:{" "}

                                            <strong>
                                                {result.day}
                                            </strong>

                                        </p>

                                    </div>


                                    <div className="row g-4 mt-3">


                                        <div className="col-md-3">

                                            <div
                                                className="card border-0 shadow-sm text-center h-100"
                                                style={{
                                                    borderRadius: "15px",
                                                }}
                                            >

                                                <div className="card-body">

                                                    <i className="bi bi-calendar3 display-5 text-primary"></i>

                                                    <h6 className="mt-3 text-muted">

                                                        Years

                                                    </h6>

                                                    <h2 className="fw-bold">

                                                        {result.difference.years}

                                                    </h2>

                                                </div>

                                            </div>

                                        </div>



                                        <div className="col-md-3">

                                            <div
                                                className="card border-0 shadow-sm text-center h-100"
                                                style={{
                                                    borderRadius: "15px",
                                                }}
                                            >

                                                <div className="card-body">

                                                   <i className="bi bi-calendar3 display-5 text-success"></i>

                                                    <h6 className="mt-3 text-muted">

                                                        Months

                                                    </h6>

                                                    <h2 className="fw-bold">

                                                        {result.difference.months}

                                                    </h2>

                                                </div>

                                            </div>

                                        </div>



                                        <div className="col-md-3">

                                            <div
                                                className="card border-0 shadow-sm text-center h-100"
                                                style={{
                                                    borderRadius: "15px",
                                                }}
                                            >

                                                <div className="card-body">

                                                   <i className="bi bi-calendar-event display-5 text-warning"></i>

                                                    <h6 className="mt-3 text-muted">

                                                        Days

                                                    </h6>

                                                    <h2 className="fw-bold">

                                                        {result.difference.days}

                                                    </h2>

                                                </div>

                                            </div>

                                        </div>



                                        <div className="col-md-3">

                                            <div
                                                className="card border-0 shadow-sm text-center h-100"
                                                style={{
                                                    borderRadius: "15px",
                                                }}
                                            >

                                                <div className="card-body">

                                                    <i className="bi bi-clock-history display-5 text-danger"></i>

                                                    <h6 className="mt-3 text-muted">

                                                        Total Days

                                                    </h6>

                                                    <h2 className="fw-bold">

                                                        {result.difference.total_days}

                                                    </h2>

                                                </div>

                                            </div>

                                        </div>


                                    </div>


                                    <div className="row mt-4">


                                        <div className="col-md-6">

                                            <div className="card border-0 shadow-sm">

                                                <div className="card-body text-center">

                                                    <h5 className="fw-bold">

                                                        📊 Total Weeks

                                                    </h5>

                                                    <h2 className="text-primary">

                                                        {result.difference.total_weeks}

                                                    </h2>

                                                </div>

                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <div className="card border-0 shadow-sm">

                                                <div className="card-body text-center">

                                                    <h5 className="fw-bold">

                                                        📌 Status

                                                    </h5>


                                                    <span
                                                        className={
                                                            result.status === "Upcoming"
                                                                ? "badge bg-success fs-5"
                                                                : result.status === "Past"
                                                                    ? "badge bg-danger fs-5"
                                                                    : "badge bg-primary fs-5"
                                                        }
                                                    >

                                                        {result.status}

                                                    </span>

                                                </div>

                                            </div>

                                        </div>


                                    </div>


                                </div>

                            </>

                        )

                    }


                </div>

            </div>

        </div>

    );

}
