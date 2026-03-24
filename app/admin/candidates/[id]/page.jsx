"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
// FIXED: Added ALL icons you are using in the code to prevent "is not defined" errors
import { 
  User, Mail, Phone, Calendar as CalIcon, MapPin, 
  Briefcase, GraduationCap, FileText, Trash2, 
  CheckCircle, XCircle, ChevronRight 
} from "lucide-react"
import styles from "./candidateProfile.module.css"

export default function CandidateProfile() {
  const { id } = useParams()
  const router = useRouter()
  const [candidate, setCandidate] = useState(null)
  const [interviews, setInterviews] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  // Fix Hydration Error
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const token = localStorage.getItem('accessToken');
    const fetchOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    fetch(`${API_URL}/api/applications/${id}/`, fetchOptions)
      .then(res => res.json())
      .then(data => setCandidate(data))
    
    fetch(`${API_URL}/api/candidate-interviews/${id}/`, fetchOptions)
      .then(res => res.json())
      .then(data => {
        // Safety check to prevent .map crash if data is not an array
        if (Array.isArray(data)) {
          setInterviews(data);
        } else {
          setInterviews([]);
        }
      })
      .catch(() => setInterviews([]))
  }, [id, API_URL, mounted])

  const handleStatusUpdate = async (newStatus) => {
    if (newStatus === "rejected") {
      const confirmReject = confirm("Are you sure you want to reject this candidate? This will move them to the Rejected list.")
      if (!confirmReject) return
    }

    setIsUpdating(true)
    const token = localStorage.getItem('accessToken');
    try {
      const res = await fetch(`${API_URL}/api/update-application-status/${id}/`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (res.ok) {
        setCandidate({ ...candidate, status: newStatus })
        if (newStatus === "rejected") {
          alert("Candidate has been moved to the Rejected list.")
          router.push("/admin/candidates") 
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  // FIXED: Re-added the missing scheduleInterview function used by your button
  const scheduleInterview = () => {
    const jobTitle = candidate.job_title || "Unknown Role"
    router.push(`/admin/interviews?application_id=${candidate.id}&name=${encodeURIComponent(candidate.name)}&role=${encodeURIComponent(jobTitle)}`)
  }

  // FIXED: Re-added the missing handleReschedule function used in your map
  const handleReschedule = (interviewId) => {
    router.push(`/admin/interviews/reschedule?application_id=${candidate.id}&name=${encodeURIComponent(candidate.name)}&interview_id=${interviewId}`);
  }

  async function deleteCandidate() {
    if (!confirm("Are you sure you want to permanently delete this candidate?")) return
    const token = localStorage.getItem('accessToken');
    await fetch(`${API_URL}/api/applications/${id}/delete/`, { 
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    })
    router.push("/admin/candidates")
  }

  if (!mounted || !candidate) return <div className={styles.loading}>Loading Profile...</div>

  return (
    <div className={styles.container}>
      <button onClick={() => router.push("/admin/candidates")} className={styles.backButton}>
        ← Back to Candidates
      </button>

      <div className={styles.card}>
        <div className={styles.profileHeader}>
          <div className={styles.nameInfo}>
            <h2 className={styles.candidateName}>{candidate.name}</h2>
            <div className={styles.badgeRow}>
              <span className={`${styles.statusBadge} ${styles['status_' + (candidate.status?.toLowerCase() || 'applied')]}`}>
                {candidate.status}
              </span>
              <span className={styles.appliedFor}>
                Applied for: <b>{candidate.job_title || "General Application"}</b>
              </span>
            </div>
          </div>
          <div className={styles.aiScoreCard}>
            <span className={styles.aiLabel}>AI SCORE</span>
            <span className={styles.aiScoreValue}>{candidate.score}</span>
          </div>
        </div>

        <div className={styles.sectionTitle}>Contact Information</div>
        <div className={styles.infoGrid}>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Email Address</span>
            <span className={styles.value}>{candidate.email}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Phone Number</span>
            <span className={styles.value}>{candidate.phone}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Date of Birth</span>
            <span className={styles.value}>{candidate.dob || "N/A"}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Gender</span>
            <span className={styles.value}>{candidate.gender || "N/A"}</span>
          </div>
        </div>

        <div className={styles.sectionTitle}>Academic & Professional Details</div>
        <div className={styles.infoGrid}>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Target Role</span>
            <span className={`${styles.value} ${styles.highlight}`}>{candidate.job_title || "N/A"}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}>{candidate.location || "N/A"}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Experience</span>
            <span className={styles.value}>{candidate.experience || "Fresher"}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Qualification</span>
            <span className={styles.value}>{candidate.qualification || "N/A"}</span>
          </div>
        </div>

        <div className={styles.sectionTitle}>Skills & Documents</div>
        <div className={styles.fullWidthGroup}>
          <span className={styles.label}>Candidate Skills (Input)</span>
          <span className={styles.value}>{candidate.skills || "No skills detected"}</span>
        </div>
        <div className={styles.fullWidthGroup}>
          <span className={styles.label}>AI Extracted Skills</span>
          <span className={`${styles.value} ${styles.aiText}`}>{candidate.ai_extracted_skills || "No matching skills found"}</span>
        </div>
        <div className={styles.fullWidthGroup}>
           <a href={candidate.resume} target="_blank" rel="noreferrer" className={styles.resumeLink}>
             📄 View Full Resume
           </a>
        </div>

        <div className={styles.sectionTitle}>📅 Interview Schedule</div>
        <div className={styles.interviewContainer}>
          {interviews.map((interview) => {
            const dateObj = new Date(interview.date);
            const options = {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: 'UTC' 
            };
            const formattedDisplay = dateObj.toLocaleString('en-GB', options);

            return (
              <div key={interview.id || `int-${interview.date}`} className={styles.interviewCard}>
                <div className={styles.interviewData}>
                  <span className={styles.label}>Scheduled Date</span>
                  <span className={styles.value}>{formattedDisplay}</span>
                </div>
                <div className={styles.interviewData}>
                  <a href={interview.meet_link} target="_blank" rel="noreferrer" className={styles.joinBtn}>Join Meet</a>
                </div>
                <div className={styles.interviewData}>
                  <button onClick={() => handleReschedule(interview.id)} className={styles.rescheduleBtn}>Reschedule</button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.actionFooter}>
          <div className={styles.statusActions}>
            <button 
              disabled={isUpdating}
              onClick={() => handleStatusUpdate('selected')} 
              className={`${styles.btnSelect} ${candidate.status === 'selected' ? styles.btnSelectedActive : ''}`}
            >
              {candidate.status === 'selected' ? "✓ Selected" : "Select Candidate"}
            </button>
            <button 
              disabled={isUpdating}
              onClick={() => handleStatusUpdate('rejected')} 
              className={styles.btnReject}
            >
              Reject Candidate
            </button>
          </div>

          <div className={styles.managementActions}>
            {interviews.length === 0 && candidate.status !== 'rejected' && (
              <button onClick={scheduleInterview} className={styles.btnMain}>Schedule Interview</button>
            )}
            <button onClick={deleteCandidate} className={styles.btnDanger}>Delete Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}
