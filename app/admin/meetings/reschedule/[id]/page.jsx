"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import styles from "./reschedule.module.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function AdminReschedule() {
  const { id } = useParams()
  const router = useRouter()

  const [meeting, setMeeting] = useState({})
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false) 
  // NEW: Success state for in-page confirmation
  const [isSuccess, setIsSuccess] = useState(false) 

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client-meetings/${id}/`)
      .then(res => res.json())
      .then(data => setMeeting(data))
  }, [id])

  const reschedule = async () => {
    if (!date || !time) {
      alert("Please select both a new date and time.");
      return;
    }

    setLoading(true); 

    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client-meetings/${id}/admin-reschedule/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: formattedDate, time: formattedTime, message })
      });

      if (response.ok) {
        // FIXED: Removed alert popup, set in-page success state instead
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Reschedule failed", error);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        ← Back to Details
      </button>

      <div className={styles.formCard}>
        {/* IN-PAGE CONFIRMATION UI */}
        {isSuccess ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.title}>Meeting Rescheduled!</h2>
            <p className={styles.successText}>
              The client has been notified of the new schedule.
            </p>
            <button 
              className={styles.submitBtn} 
              onClick={() => router.push("/admin/meetings")}
            >
              Go to Meetings List
            </button>
          </div>
        ) : (
          /* ORIGINAL FORM LOGIC - ONLY VISIBLE IF NOT SUCCESSFUL */
          <>
            <h2 className={styles.title}>Reschedule Meeting</h2>

            <div className={styles.infoSection}>
              <p><strong>Client:</strong> {meeting.name}</p>
              <p><strong>Current:</strong> {meeting.meeting_date} at {meeting.meeting_time}</p>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>New Date</label>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                className={styles.inputField}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                minDate={new Date()}
                autoComplete="off"
                portalId="root-portal"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>New Time</label>
              <DatePicker
                selected={time}
                onChange={(t) => setTime(t)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select time"
                className={styles.inputField}
                autoComplete="off"
                portalId="root-portal"
                popperPlacement="bottom"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Reschedule Reason</label>
              <textarea
                className={styles.textareaField}
                placeholder="Type the reason for the client..."
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button 
              className={styles.submitBtn} 
              onClick={reschedule}
              disabled={loading}
            >
              {loading ? <div className={styles.spinner}></div> : "Confirm New Schedule"}
            </button>
          </>
        )}
      </div>
      
      <div id="root-portal"></div>
    </div>
  )
}