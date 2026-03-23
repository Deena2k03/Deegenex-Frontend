"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./candidates.module.css"

export default function Candidates() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewType, setViewType] = useState("active") 
  const itemsPerPage = 10 
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchCandidates = async () => {
      const token = localStorage.getItem('accessToken'); // Get the token
      
      try {
        const res = await fetch(`${API_URL}/api/applications/`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass token in header
            'Content-Type': 'application/json'
          }
        });
        
        if (res.status === 401) router.push('/admin/login'); // Redirect if session expired
        
        const data = await res.json();
        setCandidates(data.results || data || []);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
}, [API_URL, router]);

  const filteredCandidates = candidates.filter(c => 
    viewType === "active" ? c.status !== "rejected" : c.status === "rejected"
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredCandidates.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage)

  const openProfile = (id) => router.push(`/admin/candidates/${id}`)

  const handleSchedule = (candidate) => {
    router.push(`/admin/interviews?application_id=${candidate.id}&name=${encodeURIComponent(candidate.name)}&role=${encodeURIComponent(candidate.job_title || "General Application")}`)
  }

  if (loading) return <div className={styles.loadingState}>Loading Candidates...</div>

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h2>{viewType === "active" ? "Candidates List" : "Rejected Candidates"}</h2>
          <p>Review and manage applications</p>
        </div>
        <button 
          className={viewType === "active" ? styles.viewRejectedBtn : styles.viewActiveBtn}
          onClick={() => {setViewType(viewType === "active" ? "rejected" : "active"); setCurrentPage(1);}}
        >
          {viewType === "active" ? "View Rejected Candidates" : "← Back to Active List"}
        </button>
      </header>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.candidateTable}>
            <thead>
  <tr>{[
    <th key="1" className={styles.colSno}>S.No</th>,
    <th key="2" className={styles.colDetails}>Candidate Details</th>,
    <th key="3" className={styles.colJob}>Job Title</th>,
    <th key="4" className={styles.colDate}>Applied Date</th>,
    <th key="5" className={styles.colStatus}>Status</th>,
    <th key="6" className={styles.colMeet}>Meeting Link</th>,
    <th key="7" className={styles.colActions}>Actions</th>
  ]}</tr>
</thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((candidate, index) => (
                  <tr key={candidate.id} className={styles.tableRow}>
                    <td className={styles.snoCell}>{String(indexOfFirstItem + index + 1).padStart(2, '0')}</td>
                    <td onClick={() => openProfile(candidate.id)} style={{cursor: 'pointer'}}>
                      <div className={styles.infoCol}>
                        <span className={styles.nameCell}>{candidate.name}</span>
                        <span className={styles.emailSub}>{candidate.email}</span>
                      </div>
                    </td>
                    <td><span className={styles.jobBadge}>{candidate.job_title || "General"}</span></td>
                    <td>
                      <span className={styles.dateCell}>
                        {candidate.created_at ? new Date(candidate.created_at).toLocaleDateString() : "N/A"}
                      </span>
                    </td>
                    <td className={styles.centerText}>
                      <span className={`${styles.statusBadge} ${styles['status_' + (candidate.status?.toLowerCase() || 'applied')]}`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className={styles.centerText}>
                      <span className={styles.meetStatus}>
                        {candidate.meet_link ? (
                           <a href={candidate.meet_link} target="_blank" className={styles.joinLink}>Join Meet</a>
                        ) : "Not Generated"}
                      </span>
                    </td>
                    <td className={styles.centerText}>
                      {/* OLD LOGIC: Schedule toggles to Scheduled. View Profile removed. */}
                      {candidate.status === 'rejected' ? (
                        <span className={styles.rejectedLabel}>N/A</span>
                      ) : candidate.meet_link || candidate.status === 'interview' ? (
                        <button className={styles.scheduledBtn} disabled>Scheduled</button>
                      ) : (
                        <button 
                          onClick={() => handleSchedule(candidate)} 
                          className={styles.scheduleBtn}
                        >
                          Schedule
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className={styles.noData}>No {viewType} candidates found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredCandidates.length > itemsPerPage && (
          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className={styles.pageBtn}>Previous</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i+1} onClick={() => setCurrentPage(i+1)} className={`${styles.pageNumber} ${currentPage === i+1 ? styles.activePage : ""}`}>{i+1}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={styles.pageBtn}>Next</button>
          </div>
        )}
      </div>
    </div>
  )
}