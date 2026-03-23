"use client"

import { useState, useEffect } from "react"
import Link from "next/link" // Added for redirection
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from "chart.js"
import { Doughnut, Line } from "react-chartjs-2"
import { User, ChevronRight } from "lucide-react" // Modern icons
import styles from "./dashboard.module.css"

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, PointElement, LineElement, Filler
)

export default function AdminDashboard() {
  const [meetingChart, setMeetingChart] = useState(null)
  const [stats, setStats] = useState(null)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    fetch(`${API_URL}/api/dashboard-stats/`, fetchOptions)
      .then(res => {
        if (res.status === 401) {
          localStorage.clear();
          window.location.href = "/admin/login";
        }
        return res.json();
      })
      .then(data => setStats(data))
      .catch(err => console.error("Stats fetch error:", err));

    fetch(`${API_URL}/api/client-meetings/meetings-chart/`, fetchOptions)
      .then(res => res.json())
      .then(data => setMeetingChart(data))
      .catch(err => console.error("Chart fetch error:", err));
  }, [API_URL]);

  if (!stats) return <div className={styles.loader}>Loading Dashboard Content...</div>

  // --- CHART LOGIC ---
  const last7DaysLabels = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  });

  // --- CHART 1: APPLICATION FUNNEL (Doughnut) ---
  const funnelData = {
    labels: ["Applied", "Interview", "Selected", "Rejected"],
    datasets: [{
      data: [stats.applied, stats.interview, stats.selected, stats.rejected],
      backgroundColor: ["#4318ff", "#ffcc00", "#01b510", "#ff0000"],
      hoverOffset: 4,
      borderWidth: 0,
    }]
  }

  // --- CHART 2: MEETINGS OVERVIEW (Line) ---
  const meetingLineData = {
    labels: (meetingChart && meetingChart.labels.length > 1) 
            ? meetingChart.labels 
            : last7DaysLabels,
    datasets: [{
      label: "Meetings",
      // MOCK DATA: [2, 5, 3, 8, 4, 9, stats.total_meetings || 0] 
      // This creates the "Up and Down" shape you want
      data: (meetingChart && meetingChart.data.length > 1) 
            ? meetingChart.data 
            : [2, 5, 3, 8, 4, 9, stats.total_meetings || 0],
      borderColor: "#4318ff",
      backgroundColor: "rgba(67, 24, 255, 0.1)",
      fill: true,
      tension: 0.4, // Keep this for smooth curves
      pointRadius: 6,
      pointBackgroundColor: "#4318ff",
      borderWidth: 3,
    }]
  };

  // --- CHART 3: CANDIDATE STATUS WAVE (Smooth Wave) ---
  const waveChartData = {
    labels: (meetingChart && meetingChart.labels.length > 1) 
            ? meetingChart.labels 
            : last7DaysLabels,
    datasets: [
      {
        label: "Selected",
        data: (meetingChart && meetingChart.data.length > 1) 
              ? meetingChart.data.map(val => Math.floor(val * 0.4)) 
              : [0, 0, 1, 1, 2, 3, stats.selected || 0], 
        borderColor: "#2e9100",
        backgroundColor: "rgba(1, 181, 116, 0.2)",
        fill: true,
        tension: 0.5, // High tension for wave look
        cubicInterpolationMode: 'monotone', // Smooth curve
        pointRadius: 5,
        borderWidth: 4,
      },
      {
        label: "Rejected",
        data: (meetingChart && meetingChart.data.length > 1) 
              ? meetingChart.data.map(val => Math.floor(val * 0.2)) 
              : [0, 1, 1, 2, 3, 5, stats.rejected || 0],
        borderColor: "#ff4838",
        backgroundColor: "rgba(238, 93, 80, 0.1)",
        fill: true,
        tension: 0.5,
        cubicInterpolationMode: 'monotone',
        pointRadius: 5,
        borderWidth: 4,
      }
    ]
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Recruitment and Security Status for Deegenex</p>
      </header>

      <div className={styles.statsGrid}>
        <StatCard title="Total Applications" value={stats.total_applications} color="#4318ff" />
        <StatCard title="Total Interviews" value={stats.total_interviews} color="#ffb547" />
        <StatCard title="Selected" value={stats.selected} color="#01b574" />
        <StatCard title="Rejected Candidates" value={stats.rejected} color="#ee5d50" />
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Application Funnel</h3>
          <div className={styles.canvasWrapper}>
            <Doughnut data={funnelData} options={{ maintainAspectRatio: false, cutout: '70%' }} />
          </div>
        </div>

        <div className={styles.chartContainer}>
  <h3 className={styles.chartTitle}>Meetings Overview</h3>
  <div className={styles.canvasWrapper}>
    {meetingLineData && (
      <Line 
  data={meetingLineData} 
  options={{ 
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false } // Hiding legend for a cleaner look
    },
    scales: {
      y: { 
        beginAtZero: true,
        border: { display: false },
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: {
          stepSize: 2, // Changes axis to 0, 2, 4, 6...
          precision: 0  // Removes decimals (no more 1.2, 1.4)
        }
      },
      x: {
        border: { display: false },
        grid: { display: false },
        offset: true // Adds padding so the dots don't touch the edges
      }
    }
  }} 
/>
    )}
  </div>
</div>
      </div>

      <div className={styles.fullWidthChart}>
        <h3 className={styles.chartTitle}>Candidate Status Wave</h3>
        <div className={styles.waveCanvasWrapper}>
  <Line 
    data={waveChartData} 
    options={{ 
      maintainAspectRatio: false, 
      plugins: {
        legend: { 
          display: true,
          position: 'top',
          labels: { usePointStyle: true, boxWidth: 6 }
        }
      },
      scales: { 
        y: { 
          beginAtZero: true, 
          suggestedMax: Math.max(stats.selected, stats.rejected) + 2, // Adds space above waves
          grid: { color: "rgba(0,0,0,0.03)", drawBorder: false },
          ticks: { stepSize: 1 }
        },
        x: { 
          offset: true,
          grid: { display: false } 
        } 
      },
      elements: {
        line: {
          capBezierPoints: true // Smoothes the start and end of the wave
        }
      }
    }} 
  />
</div>
      </div>

      {/* REFRESHED RECENT CANDIDATES UI */}
<div className={styles.activitySection}>
  <div className={styles.activityHeader}>
    <h3 className={styles.chartTitle}>Recent Candidates</h3>
    <Link href="/admin/candidates" className={styles.viewAllBtn}>View All</Link>
  </div>
  <div className={styles.candidateList}>
    {/* Use || [] to prevent the 'map' error if data hasn't loaded yet */}
    {(stats.recent_activity || []).map((c, idx) => (
      <Link href={`/admin/candidates/${c.id}`} key={c.id || idx} className={styles.candidateRow}>
        <div className={styles.candidateInfo}>
          <div className={styles.userAvatar}>
            <User size={20} color="#4318ff" />
          </div>
          <div>
            <p className={styles.candName}>{c.name}</p>
            <p className={styles.candStatus}>New Application</p>
          </div>
        </div>
        <div className={styles.candidateMeta}>
          <span className={styles.candDate}>
            {c.created_at ? new Date(c.created_at).toLocaleDateString() : "N/A"}
          </span>
          <ChevronRight size={18} color="#a3aed0" />
        </div>
      </Link>
    ))}
  </div>
</div>
    </div>
  )
}

function StatCard({ title, value, color }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardAccent} style={{ backgroundColor: color }}></div>
      <span className={styles.cardLabel}>{title}</span>
      <h2 className={styles.cardValue}>{value || 0}</h2>
    </div>
  )
}