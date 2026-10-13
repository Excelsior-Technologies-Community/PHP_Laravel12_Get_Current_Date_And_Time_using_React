import React, { useState } from "react";

export default function MeetingPlanner() {
    // Current hour index (0 to 23)
    const [selectedHour, setSelectedHour] = useState(14); // 2:00 PM default

    // Configured Cities with UTC offset hours
    const CITIES = [
        { name: "New Delhi (IST)", flag: "🇮🇳", offset: 5.5, tz: "Asia/Kolkata" },
        { name: "London (BST/GMT)", flag: "🇬🇧", offset: 1.0, tz: "Europe/London" },
        { name: "New York (EDT)", flag: "🇺🇸", offset: -4.0, tz: "America/New_York" },
        { name: "Tokyo (JST)", flag: "🇯🇵", offset: 9.0, tz: "Asia/Tokyo" },
        { name: "Sydney (AEST)", flag: "🇦🇺", offset: 10.0, tz: "Australia/Sydney" },
    ];

    // Reference city is IST (offset 5.5)
    const refOffset = 5.5;

    // Calculate hour in another city based on reference city's hour
    const getCityHour = (cityOffset, refHour) => {
        const diff = cityOffset - refOffset;
        let hour = (refHour + diff) % 24;
        if (hour < 0) hour += 24;
        return hour;
    };

    // Format decimal hour to 12-hour string (e.g. 14.5 -> 2:30 PM)
    const formatHourString = (hourDecimal) => {
        const h = Math.floor(hourDecimal);
        const m = Math.round((hourDecimal - h) * 60);
        const period = h >= 12 ? "PM" : "AM";
        const displayH = h % 12 === 0 ? 12 : h % 12;
        return `${displayH}:${String(m).padStart(2, "0")} ${period}`;
    };

    // Work-hours status: Green (9 AM to 6 PM), Yellow (7-9 AM / 6-9 PM), Dark (Night)
    const getSlotStatus = (hourDecimal) => {
        const h = Math.floor(hourDecimal);
        if (h >= 9 && h < 18) {
            return { label: "Work Hours", bg: "#10b981", color: "#fff", icon: "☀️" }; // Work hours
        } else if ((h >= 7 && h < 9) || (h >= 18 && h < 22)) {
            return { label: "Border Hours", bg: "#f59e0b", color: "#fff", icon: "🌤️" }; // Feasible
        }
        return { label: "Night Time", bg: "#374151", color: "#9ca3af", icon: "🌙" }; // Sleeping
    };

    return (
        <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: "20px", overflow: "hidden" }}>
            <div className="card-header bg-gradient bg-primary text-white p-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-light text-primary p-2 fs-6">🌏</span>
                    <div>
                        <h5 className="fw-bold mb-0">Cross-Timezone Meeting Planner & Overlap Matrix</h5>
                        <small className="text-white-50">Find optimal international meeting slots across continents</small>
                    </div>
                </div>
                <span className="badge bg-warning text-dark px-3 py-2 fw-semibold">
                    Interactive Time Slider
                </span>
            </div>

            <div className="card-body p-4">
                {/* Visual Hour Slider */}
                <div className="bg-light p-3 rounded-4 mb-4 border">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="fw-bold text-dark">
                            <i className="bi bi-sliders me-1 text-primary"></i> Drag to adjust Reference Time (India IST):
                        </label>
                        <span className="badge bg-primary fs-6 px-3 py-2">
                            {formatHourString(selectedHour)} IST
                        </span>
                    </div>
                    <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="23"
                        step="0.5"
                        value={selectedHour}
                        onChange={(e) => setSelectedHour(parseFloat(e.target.value))}
                    />
                    <div className="d-flex justify-content-between text-muted small px-1">
                        <span>12 AM</span>
                        <span>6 AM</span>
                        <span>12 PM (Noon)</span>
                        <span>6 PM</span>
                        <span>11:30 PM</span>
                    </div>
                </div>

                {/* Overlap Matrix Grid */}
                <div className="row g-3">
                    {CITIES.map((city, idx) => {
                        const cityHour = getCityHour(city.offset, selectedHour);
                        const status = getSlotStatus(cityHour);

                        return (
                            <div className="col-md-6 col-lg-4" key={idx}>
                                <div
                                    className="card h-100 border-0 shadow-sm transition-all"
                                    style={{
                                        borderRadius: "16px",
                                        borderLeft: `5px solid ${status.bg}`,
                                        background: "#fff",
                                    }}
                                >
                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <span className="fs-4">{city.flag}</span>
                                            <span
                                                className="badge"
                                                style={{
                                                    backgroundColor: status.bg,
                                                    color: status.color,
                                                    fontSize: "0.75rem",
                                                }}
                                            >
                                                {status.icon} {status.label}
                                            </span>
                                        </div>

                                        <h6 className="fw-bold mb-1 text-dark">{city.name}</h6>
                                        <h3 className="fw-bold text-primary mb-1" style={{ fontFamily: "monospace" }}>
                                            {formatHourString(cityHour)}
                                        </h3>
                                        <small className="text-muted">
                                            UTC {city.offset >= 0 ? `+${city.offset}` : city.offset} hrs
                                        </small>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Overlap Recommendation Banner */}
                <div className="alert alert-info mt-4 mb-0 rounded-3 d-flex align-items-center gap-3">
                    <i className="bi bi-info-circle-fill fs-3 text-info"></i>
                    <div>
                        <strong>Pro Tip for International Collaborations:</strong>{" "}
                        The sweet spot for meetings between India (IST), UK (London), and US East Coast is typically{" "}
                        <strong>4:30 PM - 7:30 PM IST</strong> (12:00 PM - 3:00 PM London & 7:00 AM - 10:00 AM New York).
                    </div>
                </div>
            </div>
        </div>
    );
}
