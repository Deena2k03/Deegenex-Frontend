"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"
import styles from "./meetings.module.css"

const locales = { "en-US": enUS }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function MeetingsAdmin() {
  const [stats, setStats] = useState({
    completed_meetings: 0,
    this_month_meetings: 0,
    last_month_meetings: 0
  })
  const [meetings, setMeetings] = useState([])
  const [events, setEvents] = useState([])
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    // Safety check for token
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    // 1. Fetch Stats
    fetch(`${API_URL}/api/client-meetings/stats/`, fetchOptions)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Stats fetch error:", err));

    // 2. Fetch Meetings
    fetch(`${API_URL}/api/client-meetings/list/`, fetchOptions)
      .then(res => {
        if (res.status === 401) router.push('/admin/login');
        return res.json();
      })
      .then(data => {
        // Ensure data is an array
        const meetingsArray = Array.isArray(data) ? data : (data.results || []);

        const sortedData = meetingsArray.sort((a, b) => {
          const dateA = new Date(`${a.meeting_date}T${a.meeting_time}`);
          const dateB = new Date(`${b.meeting_date}T${b.meeting_time}`);
          return dateA - dateB;
        });

        setMeetings(sortedData);

        const calendarEvents = sortedData.map(m => {
          const start = new Date(`${m.meeting_date}T${m.meeting_time}`);
          return {
            title: m.name,
            start: start,
            end: new Date(start.getTime() + 30 * 60000), // Added 30 mins duration
            resource: m.id
          }
        });
        setEvents(calendarEvents);
      })
      .catch(err => console.error("Meetings fetch error:", err));
  }, [API_URL, router]);

  const cancelMeeting = async (id) => {
    if (!confirm("Are you sure you want to cancel this meeting?")) return;
    const token = localStorage.getItem('accessToken');
    await fetch(`${API_URL}/api/client-meetings/${id}/cancel/`, {
      method: "POST",
      headers: { 'Authorization': `Bearer ${token}` }
    })
    setMeetings(meetings.filter(m => m.id !== id))
    alert("Meeting successfully cancelled")
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Client Meetings Dashboard</h1>
        <p className={styles.subtitle}>Overview of your upcoming and past consultations</p>
      </header>

      {/* Stats Cards Row */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{background: '#eef2ff', color: '#4318ff'}}>✓</div>
          <div className={styles.statInfo}>
            <h3>Completed</h3>
            <h2>{stats.completed_meetings}</h2>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{background: '#fff7ed', color: '#f59e0b'}}>📅</div>
          <div className={styles.statInfo}>
            <h3>This Month</h3>
            <h2>{stats.this_month_meetings}</h2>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{background: '#fdf2f2', color: '#ef4444'}}>📉</div>
          <div className={styles.statInfo}>
            <h3>Last Month</h3>
            <h2>{stats.last_month_meetings}</h2>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Meetings Schedule</h2>
        <div className={styles.calendarWrapper}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={['month', 'week', 'day', 'agenda']}
            style={{ height: "100%" }}
            onSelectEvent={(event) => router.push(`/admin/meetings/${event.resource}`)}
          />
        </div>
      </div>

      {/* Meetings Table Section */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Upcoming Meetings List</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.meetingTable}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Client Name</th>
                <th>Email Address</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
                <th className={styles.textCenter}>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((m, index) => (
                <tr key={m.id}>
                  <td>{index + 1}</td>
                  <td>
                    <span 
                      className={styles.clientLink}
                      onClick={() => router.push(`/admin/meetings/${m.id}`)}
                    >
                      {m.name}
                    </span>
                  </td>
                  <td className={styles.emailText} title={m.email}>{m.email}</td>
                  <td className={styles.dateText}>{m.meeting_date}</td>
                  <td className={styles.timeText}>
  {format(parse(m.meeting_time, 'HH:mm:ss', new Date()), 'hh:mm a')}
</td>
                  <td>
                    <a href={m.meet_link} target="_blank" rel="noreferrer">
                      <button className={styles.joinBtn}>Join Now</button>
                    </a>
                  </td>
                  <td className={styles.textCenter}>
                    <button
                      onClick={() => cancelMeeting(m.id)}
                      className={styles.cancelBtn}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {meetings.length === 0 && <p className={styles.emptyState}>No upcoming meetings scheduled.</p>}
        </div>
      </div>
    </div>
  )
}