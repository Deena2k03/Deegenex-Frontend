"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import styles from "./meetingDetail.module.css"

export default function MeetingDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [meeting, setMeeting] = useState(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client-meetings/${id}/`)
      .then(res => res.json())
      .then(data => setMeeting(data))
  }, [id])

  const cancelMeeting = async () => {
    const confirmCancel = confirm("Are you sure you want to cancel this meeting?")
    if (!confirmCancel) return

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client-meetings/${id}/cancel/`, {
      method: "POST"
    })
    alert("Meeting cancelled successfully")
    router.push("/admin/meetings")
  }

  if (!meeting) return <div className={styles.container}>Loading details...</div>

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        ← Back to Meetings
      </button>

      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Meeting Information</h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Client Name</span>
            <span className={styles.value}>{meeting.name}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Email Address</span>
            <span className={styles.value}>{meeting.email}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Phone Number</span>
            <span className={styles.value}>{meeting.phone || "N/A"}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Company</span>
            <span className={styles.value}>{meeting.company || "Not Specified"}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Scheduled Date</span>
            <span className={styles.value}>{meeting.meeting_date}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Scheduled Time</span>
            <span className={styles.value}>{meeting.meeting_time}</span>
          </div>
        </div>

        <div className={styles.infoGroup}>
          <span className={styles.label}>Client Message</span>
          <div className={styles.messageBox}>
            {meeting.message ? meeting.message : "No additional message provided by the client."}
          </div>
        </div>

        <div className={styles.actions}>
          <a href={meeting.meet_link} target="_blank" rel="noreferrer">
            <button className={styles.btnPrimary}>Join Meeting</button>
          </a>

          <button 
            className={styles.btnSecondary}
            onClick={() => router.push(`/admin/meetings/reschedule/${id}`)}
          >
            Reschedule
          </button>

          <button 
            className={styles.btnDanger}
            onClick={cancelMeeting}
          >
            Cancel Meeting
          </button>
        </div>
      </div>
    </div>
  )
}