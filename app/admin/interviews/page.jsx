"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import styles from "./schedule.module.css"
import "react-datepicker/dist/react-datepicker.css"

const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

function ScheduleContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const applicationId = searchParams.get("application_id") || ""
  const candidateName = searchParams.get("name") || ""
  const isReschedule = searchParams.get("reschedule") === "true"

  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [message, setMessage] = useState("")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  async function scheduleInterview() {
    setError("")
    setResult(null)

    if (!date || !time) {
      setError("Please select both a date and a time")
      return
    }

    setLoading(true)

    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(time.getHours()).padStart(2, '0');
      const minutes = String(time.getMinutes()).padStart(2, '0');

      const datetime = `${year}-${month}-${day}T${hours}:${minutes}:00`;

      const endpoint = isReschedule 
        ? `${API_URL}/api/admin-reschedule-interview/${applicationId}/` 
        : `${API_URL}/api/schedule-interview/`;

      const token = localStorage.getItem("token") || localStorage.getItem("access");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "" 
        },
        body: JSON.stringify({
          application_id: applicationId,
          interview_date: datetime,
          reason: message,
          reschedule: isReschedule 
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(res.status === 401 ? "Session expired. Please log in again." : (data.error || "Failed to process request"))
      } else {
        setResult(data)
        setTimeout(() => {
          router.push(`/admin/candidates/${applicationId}`)
        }, 3000)
      }
    } catch (err) {
      setError("Server error: Could not reach the backend")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isReschedule ? "Reschedule Interview" : "Schedule Interview"}</h2>
      <div className={styles.card}>
        <div className={styles.field}>
          <label className={styles.label}>Candidate Name</label>
          <input className={styles.input} value={candidateName} disabled />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{isReschedule ? "New Date" : "Interview Date"}</label>
          <DatePicker selected={date} onChange={(d) => setDate(d)} className={styles.input} dateFormat="dd/MM/yyyy" minDate={new Date()} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{isReschedule ? "New Time" : "Interview Time"}</label>
          <DatePicker selected={time} onChange={(t) => setTime(t)} showTimeSelect showTimeSelectOnly timeIntervals={15} dateFormat="h:mm aa" className={styles.input} />
        </div>

        {isReschedule && (
          <div className={styles.field}>
            <label className={styles.label}>Reschedule Reason</label>
            <textarea 
              className={styles.input} 
              style={{ height: '80px', paddingTop: '10px' }} 
              placeholder="Why are you rescheduling?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        )}

        <button onClick={scheduleInterview} className={styles.button} disabled={loading}>
          {loading ? "Processing..." : isReschedule ? "Confirm Reschedule" : "Confirm Interview"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
        {result && (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>✓</div>
            <p>Interview Updated Successfully!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ScheduleInterview() {
  return <Suspense fallback={<div>Loading form...</div>}><ScheduleContent /></Suspense>
}