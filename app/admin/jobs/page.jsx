"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import "./jobsAdmin.css"

export default function JobsAdmin() {
  const [jobs, setJobs] = useState([])
  const router = useRouter()

  async function loadJobs() {
    const token = localStorage.getItem('accessToken');
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 401) router.push('/admin/login');
    
    if (res.ok) {
      const data = await res.json()
      setJobs(data)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [])

  async function deleteJob(id) {
    if (!confirm("Are you sure?")) return
    
    const token = localStorage.getItem('accessToken');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/delete/${id}/`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${token}` }
    })

    loadJobs()
  }

  return (
    <div className="jobs-admin-container">
      <header className="admin-header">
        <div className="header-text">
          <h1>Job Openings</h1>
          <p>Manage and monitor your active career listings</p>
        </div>
        <Link href="/admin/jobs/create">
          <button className="create-btn">
            <span className="plus-icon">+</span> Create New Opening
          </button>
        </Link>
      </header>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">Total Listings:</span>
          <span className="stat-value">{jobs.length}</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="jobs-table">
          <thead>
            <tr>
              <th className="col-sn">S.No</th>
              <th className="col-title">Position Title</th>
              <th className="col-date">Date Posted</th>
              <th className="col-status">Status</th>
              <th className="col-actions text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id}>
                <td className="col-sn">{index + 1}</td>
                <td className="col-title">
                  <Link href={`/admin/jobs/${job.id}`} className="title-link">
                    {job.title}
                  </Link>
                  <span className="subtitle-hint">{job.subtitle || "Tech Team"}</span>
                </td>
                <td className="col-date">
                  {new Date(job.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td className="col-status">
                  <span className="status-pill">Active</span>
                </td>
                <td className="col-actions text-center"> {/* Added text-center here */}
  <div className="action-group">
    <Link href={`/admin/jobs/${job.id}`}>
      <button className="action-btn edit-btn">Edit</button>
    </Link>
    <button 
      className="action-btn delete-btn" 
      onClick={() => deleteJob(job.id)}
    >
      Delete
    </button>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && (
          <div className="empty-state">
            <p>No job openings found. Start by creating one!</p>
          </div>
        )}
      </div>
    </div>
  )
}