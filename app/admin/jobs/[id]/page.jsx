"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import "./editJob.css"

export default function EditJob() {
  const params = useParams()
  const router = useRouter()
  const id = params.id

  const [job, setJob] = useState(null)
  const [form, setForm] = useState({
    slug: "",
    title: "",
    subtitle: "",
    overview: "",
    description: "",
    responsibilities: "",
    qualifications: "",
    technical: "",
    experience: ""
  })

  const [image, setImage] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleImage(e) {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    async function loadJob() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}/`)
      const data = await res.json()

      setJob(data)

      setForm({
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle,
        overview: data.overview,
        description: data.description,
        responsibilities: data.responsibilities.join("\n"),
        qualifications: data.qualifications.join("\n"),
        technical: data.technical.join("\n"),
        experience: data.experience.join("\n")
      })
    }

    loadJob()
  }, [id])

  async function updateJob() {
    const token = localStorage.getItem('accessToken');
  
    const formData = new FormData()
    formData.append("slug", form.slug)
    formData.append("title", form.title)
    formData.append("subtitle", form.subtitle)
    formData.append("overview", form.overview)
    formData.append("description", form.description)

    formData.append("responsibilities", JSON.stringify(form.responsibilities.split("\n").map(i => i.trim()).filter(i => i !== "")))
    formData.append("qualifications", JSON.stringify(form.qualifications.split("\n").map(i => i.trim()).filter(i => i !== "")))
    formData.append("technical", JSON.stringify(form.technical.split("\n").map(i => i.trim()).filter(i => i !== "")))
    formData.append("experience", JSON.stringify(form.experience.split("\n").map(i => i.trim()).filter(i => i !== "")))

    if (image) {
      formData.append("image", image)
    }

    try {
      // FIX 1: URL matched to backend path "jobs/update/<int:id>/"
      // FIX 2: Added Authorization Header
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/update/${id}/`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
          // Note: Do NOT set 'Content-Type': 'application/json' when sending FormData
        },
        body: formData
      })

      if (res.ok) {
        router.push("/admin/jobs")
      } else {
        const errorData = await res.json()
        console.error("Update failed:", errorData)
        alert("Failed to save changes. Check console for details.")
      }
    } catch (error) {
      console.error("Network error:", error)
    }
  }

  if (!job) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Fetching Job Details...</p>
      </div>
    )
  }

  return (
    <div className="edit-job-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Edit Job Details</h1>
          <div className="page-breadcrumb">
  <span onClick={() => router.push("/admin")}>Dashboard</span>
  <span className="separator">/</span>
  <span onClick={() => router.push("/admin/jobs")}>Manage Jobs</span>
  <span className="separator">/</span>
  <span className="current-page">{form.title || 'Edit'}</span>
</div>
        </div>
        <div className="header-actions">
           <button className="cancel-btn" onClick={() => router.push("/admin/jobs")}>Discard Changes</button>
           <button className="update-btn" onClick={updateJob}>Save Changes</button>
        </div>
      </div>

      <div className="job-form-grid">
        {/* Left Column: Essential Info */}
        <div className="form-column main-info">
          <section className="form-card">
            <h2 className="section-title">General Information</h2>
            <div className="form-group">
              <label>Position Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior Backend Developer" />
            </div>
            
            <div className="input-row">
              <div className="form-group">
                <label>URL Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Subtitle (Max Four Words)</label>
                <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="e.g. Remote / New York" />
              </div>
            </div>
          </section>

          <section className="form-card">
            <h2 className="section-title">Job Narrative</h2>
            <div className="form-group">
              <label>Job Overview</label>
              <textarea name="overview" value={form.overview} onChange={handleChange} rows="3" placeholder="A brief hook for the job listing..." />
            </div>
            <div className="form-group">
              <label>Job Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="10" placeholder="Detailed job description..." />
            </div>
          </section>
        </div>

        {/* Right Column: Requirements & Media */}
        <div className="form-column side-info">
          <section className="form-card media-card">
            <h2 className="section-title">Visuals</h2>
            <div className="image-upload-zone">
              {job?.image && !image && (
                <div className="current-image-preview">
                  <img src={`${process.env.NEXT_PUBLIC_API_URL}${job.image}`} alt="Current" />
                  <span className="badge">Current Banner</span>
                </div>
              )}
              <input type="file" id="job-image" onChange={handleImage} className="hidden-input" />
              <label htmlFor="job-image" className="file-label">
                {image ? `Selected: ${image.name}` : "Upload New Banner Image"}
              </label>
            </div>
          </section>

          <section className="form-card lists-card">
            <h2 className="section-title">Requirements & Skills</h2>
            <div className="form-group">
              <label>Key Responsibilities <small>(One per line)</small></label>
              <textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} rows="4" />
            </div>
            <div className="form-group">
              <label>Qualifications <small>(One per line)</small></label>
              <textarea name="qualifications" value={form.qualifications} onChange={handleChange} rows="4" />
            </div>
            <div className="form-group">
              <label>Technical Requirements <small>(One per line)</small></label>
              <textarea name="technical" value={form.technical} onChange={handleChange} rows="4" />
            </div>
            <div className="form-group">
              <label>Experience <small>(One per line)</small></label>
              <textarea name="experience" value={form.experience} onChange={handleChange} rows="4" />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}