import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './BookingModal.css';

// Example Indian holidays (could be extended)
const indianHolidays = [
  "2025-01-26",
  "2025-08-15",
  "2025-10-02",
  "2025-12-25"
];

const BookingModal = ({ provider, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(60); // minutes
  const [bufferTime, setBufferTime] = useState(15); // minutes
  const [workingDays, setWorkingDays] = useState([1,2,3,4,5]); // Mon-Fri
  const [policyAccepted, setPolicyAccepted] = useState(false);

  // Disable non-working days
  const isDisabled = (date) => {
    const day = date.getDay(); // 0 = Sunday
    const dateStr = date.toISOString().split('T')[0];
    return !workingDays.includes(day) || indianHolidays.includes(dateStr);
  };

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    if (!policyAccepted) {
      alert("Please accept the cancellation policy");
      return;
    }

    // Mock booking action
    alert(`Booked ${provider.name} on ${selectedDate.toDateString()}!`);
    onClose();
  };

  return (
    <div className="booking-modal-backdrop">
      <div className="booking-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Book {provider.name}</h2>
        <p>Session Duration: {sessionDuration} min | Buffer: {bufferTime} min</p>

        <div className="calendar-container">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={({ date }) => isDisabled(date)}
          />
        </div>

        <div className="session-settings">
          <label>
            Session Duration (min):
            <input
              type="number"
              value={sessionDuration}
              onChange={(e) => setSessionDuration(Number(e.target.value))}
              min={15}
              max={240}
            />
          </label>

          <label>
            Buffer Time (min):
            <input
              type="number"
              value={bufferTime}
              onChange={(e) => setBufferTime(Number(e.target.value))}
              min={5}
              max={60}
            />
          </label>
        </div>

        <div className="cancellation-policy">
          <h3>Cancellation Policy</h3>
          <p>
            Cancellations must be made at least 24 hours before the session.
            Late cancellations or no-shows may be charged for the full session.
          </p>
          <label>
            <input
              type="checkbox"
              checked={policyAccepted}
              onChange={() => setPolicyAccepted(!policyAccepted)}
            />
            I accept the cancellation policy
          </label>
        </div>

        <button className="confirm-btn" onClick={handleBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
