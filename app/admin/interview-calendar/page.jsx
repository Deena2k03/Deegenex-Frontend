"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation" // Import useRouter
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"
import isSameDay from "date-fns/isSameDay"

import styles from "./calendar.module.css"
import candidateStyles from "../candidates/candidates.module.css"
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = { "en-US": enUS }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

export default function InterviewCalendar() {
  const router = useRouter() // Initialize router
  const [events, setEvents] = useState([])
  const [scheduledCandidates, setScheduledCandidates] = useState([])
  const [tableLoading, setTableLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
  const token = localStorage.getItem('accessToken');
  const fetchOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  // 1. Fetch Calendar Events (Fixed Endpoint & Added Auth)
  fetch(`${API_URL}/api/meetings/`, fetchOptions) // Use the correct prefix from core/urls.py
    .then(res => res.ok ? res.json() : [])
    .then(data => {
      // Safety: Ensure data is an array before mapping
      const interviewArray = Array.isArray(data) ? data : (data.results || []);
      const formatted = interviewArray.map(item => ({
        title: item.application_name,
        start: new Date(item.interview_date),
        end: new Date(new Date(item.interview_date).getTime() + 30 * 60000)
      }));
      setEvents(formatted);
    })
    .catch(err => console.error("Calendar fetch error:", err));

  // 2. Fetch Candidates (Added Auth & Format Safety)
  const fetchCandidates = async () => {
    try {
      const res = await fetch(`${API_URL}/api/applications/`, fetchOptions);
      
      if (res.status === 401) {
          router.push('/admin/login');
          return;
      }

      const data = await res.json();
      
      // CRITICAL FIX: Ensure allCandidates is always an array
      const allCandidates = Array.isArray(data) ? data : (data.results || []);
      
      const filtered = allCandidates.filter(c => c.meet_link && c.status !== "rejected");
      setScheduledCandidates(filtered);
    } catch (error) {
      console.error("Failed to fetch scheduled candidates:", error);
      setScheduledCandidates([]); // Reset to empty array on error
    } finally {
      setTableLoading(false);
    }
  };
  fetchCandidates();
}, [API_URL, router]);

  // Navigation helper
  const openProfile = (id) => router.push(`/admin/candidates/${id}`)

  const todaysInterviews = useMemo(() => {
    return events.filter(event => isSameDay(event.start, new Date()))
      .sort((a, b) => a.start - b.start)
  }, [events])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h2>Interview Schedule</h2>
          <p style={{ color: "#a3aed0", margin: "5px 0 0 0", fontSize: "14px" }}>
            Manage and monitor all candidate interviews
          </p>
        </div>
      </header>

      <div className={styles.mainLayout}>
        <div className={styles.calendarCard}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            views={['month', 'week', 'day', 'agenda']}
          />
        </div>

        <div className={styles.agendaCard}>
          <h3 className={styles.agendaTitle}>Today's Agenda</h3>
          {todaysInterviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#a3aed0' }}>
              <p>No interviews scheduled for today.</p>
            </div>
          ) : (
            todaysInterviews.map((event, idx) => (
              <div key={idx} className={styles.eventItem}>
                <h4>{event.title}</h4>
                <p>🕒 {format(event.start, "hh:mm aa")} - {format(event.end, "hh:mm aa")}</p>
              </div>
            ))
          )}
          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <div className={styles.eventItem} style={{ background: '#4318ff', border: 'none' }}>
              <h4 style={{ color: 'white' }}>Total Scheduled</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>{events.length} Interviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className={candidateStyles.container} style={{ marginTop: '30px', padding: '0' }}>
        <header className={candidateStyles.header}>
          <div className={candidateStyles.titleArea}>
            <h2>Scheduled Meetings</h2>
            <p>Active interview links for selected candidates</p>
          </div>
        </header>

        <div className={candidateStyles.card}>
          <div className={candidateStyles.tableWrapper}>
            <table className={candidateStyles.candidateTable}>
              <thead>
                <tr>
                  <th className={candidateStyles.colSno}>S.No</th>
                  <th className={candidateStyles.colDetails}>Candidate Details</th>
                  <th className={candidateStyles.colJob}>Job Title</th>
                  <th className={candidateStyles.colStatus}>Status</th>
                  <th className={candidateStyles.colMeet}>Meeting Link</th>
                </tr>
              </thead>
              <tbody>
                {tableLoading ? (
                  <tr><td colSpan="5" className={candidateStyles.noData}>Loading list...</td></tr>
                ) : scheduledCandidates.length > 0 ? (
                  scheduledCandidates.map((candidate, index) => (
                    <tr key={candidate.id} className={candidateStyles.tableRow}>
                      <td className={candidateStyles.snoCell}>{String(index + 1).padStart(2, '0')}</td>
                      {/* NEW: Clickable Candidate Details */}
                      <td 
                        onClick={() => openProfile(candidate.id)} 
                        style={{ cursor: 'pointer' }}
                      >
                        <div className={candidateStyles.infoCol}>
                          <span className={candidateStyles.nameCell}>{candidate.name}</span>
                          <span className={candidateStyles.emailSub}>{candidate.email}</span>
                        </div>
                      </td>
                      <td><span className={candidateStyles.jobBadge}>{candidate.job_title || "General"}</span></td>
                      <td className={candidateStyles.centerText}>
                        <span className={`${candidateStyles.statusBadge} ${candidateStyles['status_' + (candidate.status?.toLowerCase() || 'applied')]}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className={candidateStyles.centerText}>
                        <a href={candidate.meet_link} target="_blank" rel="noreferrer" className={candidateStyles.joinLink}>
                          Join Meet
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className={candidateStyles.noData}>No scheduled meetings found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}