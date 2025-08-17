import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarSection = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("Day");

  return (
    <div>
      <div className="card-head d-flex justify-content-between align-items-center mb-2">
        <div className="month-pill">September 2021</div>
        <div className="segment">
          <button
            className={`seg-btn ${view === "Day" ? "active" : ""}`}
            onClick={()=>setView("Day")}
          >
            Day
          </button>
          <button
            className={`seg-btn ${view === "Week" ? "active" : ""}`}
            onClick={()=>setView("Week")}
          >
            Week
          </button>
        </div>
      </div>

      <div className="soft-card p-0">
        <Calendar value={date} onChange={setDate}/>
      </div>
    </div>
  );
};

export default CalendarSection;
