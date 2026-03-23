"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Calendar from 'react-calendar' 
import 'react-calendar/dist/Calendar.css' 
import styles from "./reschedule.module.css"

export default function ReschedulePage() {
  const { id } = useParams()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dateStr, setDateStr] = useState("") 
  const [time, setTime] = useState("")
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  
  // New States
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    setDateStr(`${yyyy}-${mm}-${dd}`);
    setShowCalendarModal(false);
  };

  const handleTimeSelect = (slot) => {
    setTime(slot);
    setShowTimeModal(false);
  };

  const reschedule = async () => {
    if (!dateStr || !time) return alert("Please select date and time");

    const [rawTime, modifier] = time.split(' ');
    let [hours, minutes] = rawTime.split(':');
    let h = parseInt(hours, 10);

    if (modifier === 'PM' && h < 12) h += 12;
    else if (modifier === 'AM' && h === 12) h = 0;
    
    const time24 = `${h.toString().padStart(2, '0')}:${minutes}`;

    setIsLoading(true); // Start Loading

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client-meetings/${id}/reschedule/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateStr, time: time24 })
      });
      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true); // Show Tick instead of Alert
      } else {
        alert("Error: " + (data.error || "Failed to reschedule"));
      }
    } catch (err) {
      alert("Server connection failed");
    } finally {
      setIsLoading(false); // Stop Loading
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>📅</div>
        <h2 className={styles.title}>Reschedule Meeting</h2>
        
        {!isSuccess ? (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>New Date</label>
              <div className={`${styles.input} ${styles.timeDisplayInput}`} onClick={() => setShowCalendarModal(true)}>
                <span>{dateStr ? selectedDate.toLocaleDateString('en-GB') : "Select Date"}</span>
                <span style={{color: '#a3aed0'}}>📅</span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Select Time</label>
              <div className={`${styles.input} ${styles.timeDisplayInput}`} onClick={() => setShowTimeModal(true)}>
                <span>{time || "Choose a time"}</span>
                <span style={{color: '#a3aed0'}}>🕒</span>
              </div>
            </div>

            <button 
              className={styles.button} 
              onClick={reschedule}
              disabled={isLoading}
            >
              {isLoading ? <div className={styles.spinner}></div> : "Confirm Reschedule"}
            </button>
          </>
        ) : (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>✓</div>
            <h3 style={{color: '#2b3674'}}>Rescheduled Successfully!</h3>
            <p style={{color: '#a3aed0', fontSize: '14px'}}>
              Your meeting has been updated for {selectedDate.toLocaleDateString('en-GB')} at {time}.
            </p>
          </div>
        )}
      </div>

      {/* CALENDAR POPUP */}
      {showCalendarModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCalendarModal(false)}>
          <div className={`${styles.modalContent} ${styles.calendarModalContent}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Select Date</h3>
              <button className={styles.closeBtn} onClick={() => setShowCalendarModal(false)}>&times;</button>
            </div>
            <div className={styles.calendarWrapper}>
              <Calendar 
                onChange={handleDateChange} 
                value={selectedDate} 
                minDate={new Date()} 
              />
            </div>
          </div>
        </div>
      )}

      {/* TIME POPUP */}
      {showTimeModal && (
        <div className={styles.modalOverlay} onClick={() => setShowTimeModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Select Time Slot</h3>
              <button className={styles.closeBtn} onClick={() => setShowTimeModal(false)}>&times;</button>
            </div>
            <div className={styles.timeGrid}>
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`${styles.timeSlot} ${time === slot ? styles.selectedTime : ""}`}
                  onClick={() => handleTimeSelect(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}