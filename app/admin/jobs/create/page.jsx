"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import "./createJob.css"

export default function CreateJob() {
  const router = useRouter()

  const [loading, setLoading] = useState(false) // Added loading state
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
  const [preview, setPreview] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleImage(e) {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
    }
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  async function createJob() {
    setLoading(true) // Start loading
    // 1. Retrieve the token from localStorage
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/create/`, {
        method: "POST",
        headers: {
          // 2. Add the Authorization header
          "Authorization": `Bearer ${token}`
          // Note: Do NOT set Content-Type; the browser handles it for FormData
        },
        body: formData
      });

      if (res.ok) {
        router.push("/admin/jobs");
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        alert("Failed to create job. Please check if you are logged in.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      setLoading(false);
    }
  }

  return (
    <div className="create-job-container">
      <header className="page-header">
        <div className="header-content">
          <h1 className="page-title">Create Job Opening</h1>
          <div className="page-breadcrumb">
            <span onClick={() => router.push("/admin")}>Dashboard</span>
            <span className="separator">/</span>
            <span onClick={() => router.push("/admin/jobs")}>Manage Jobs</span>
            <span className="separator">/</span>
            <span className="current-page">New Opening</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="cancel-btn" onClick={() => router.push("/admin/jobs")}>Cancel</button>
          {/* Updated Button with Loading Logic */}
          <button className="create-btn" onClick={createJob} disabled={loading}>
            {loading ? <div className="spinner"></div> : "Publish Job"}
          </button>
        </div>
      </header>

      <div className="job-form-grid">
        <div className="form-column">
          <section className="form-card">
            <h2 className="section-title">Job Identification</h2>
            <div className="form-group">
              <label>Job Title</label>
              <input name="title" placeholder="e.g. Lead UI Designer" onChange={handleChange} />
            </div>
            <div className="input-row">
              <div className="form-group">
                <label>URL-Slug</label>
                <input name="slug" placeholder="lead-ui-designer" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Subtitle (Max Four Words)</label>
                <input name="subtitle" placeholder="e.g. Remote / London" onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="form-card">
            <h2 className="section-title">Content & Details</h2>
            <div className="form-group">
              <label>Job Overview</label>
              <textarea name="overview" placeholder="Short hook for the job card..." onChange={handleChange} rows="3" />
            </div>
            <div className="form-group">
              <label>Job Description</label>
              <textarea name="description" placeholder="Full job description..." onChange={handleChange} rows="10" />
            </div>
          </section>
        </div>

        <div className="form-column">
          <section className="form-card media-card">
            <h2 className="section-title">Banner Media</h2>
            <div className="image-upload-zone">
              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="image-preview" />
                  <button className="remove-img" onClick={() => {setImage(null); setPreview(null)}}>×</button>
                </div>
              ) : (
                <div className="upload-placeholder">
                   <p>No image selected</p>
                </div>
              )}

              <input type="file" id="job-image" onChange={handleImage} className="hidden-input" accept="image/*" />
              <label htmlFor="job-image" className="file-label">
                {image ? "Change Image" : "Upload Banner Image"}
              </label>
              {image && <p className="file-hint">{image.name}</p>}
            </div>
          </section>

          <section className="form-card">
            <h2 className="section-title">Key Requirements</h2>
            <div className="form-group">
              <label>Responsibilities <small>(One per line)</small></label>
              <textarea name="responsibilities" placeholder="Enter one responsibility per line" onChange={handleChange} rows="4" />
            </div>
            <div className="form-group">
              <label>Qualifications <small>(One per line)</small></label>
              <textarea name="qualifications" placeholder="Enter one qualification per line" onChange={handleChange} rows="4" />
            </div>
            <div className="form-group">
              <label>Technical Requirements <small>(One per line)</small></label>
              <textarea name="technical" placeholder="Enter one technical skill per line" onChange={handleChange} rows="4" />
            </div>
            <div className="form-group">
              <label>Experience <small>(One per line)</small></label>
              <textarea name="experience" placeholder="Enter experience requirements per line" onChange={handleChange} rows="4" />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}