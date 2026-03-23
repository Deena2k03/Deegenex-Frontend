"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./apply.module.css"

const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false })

function ApplyForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false) // NEW: Loading state
  
  const jobId = searchParams.get("job_id") || ""
  const jobTitle = searchParams.get("job_title") || "General Application"

  const [form, setForm] = useState({
    name: "", dob: "", gender: "", experience: "",
    phone: "", email: "", location: "", qualification: "",
    institution: "", year: "", cgpa: "", skills: "", 
    job: "" // Start empty
  })

  // Sync the job ID from URL to state once searchParams are ready
  useEffect(() => {
    if (jobId) {
      setForm(prev => ({ ...prev, job: jobId }));
    }
  }, [jobId]);

  const [resume, setResume] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length <= 10) {
        setForm({ ...form, [e.target.name]: value });
      }
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (form.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true) // Start loading

    try {
      const formData = new FormData()
      Object.keys(form).forEach(key => {
        if (key === "dob" && form.dob) {
          const formattedDate = new Date(form.dob).toISOString().split("T")[0]
          formData.append("dob", formattedDate)
        } else {
          formData.append(key, form[key])
        }
      })
      formData.append("resume", resume)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/apply-job/`, {
        method: "POST",
        body: formData
      })

      if (res.ok) {
        router.push("/career/success")
      } else {
        alert("Submission failed. Please check your details.")
        setLoading(false) // Stop loading on error
      }
    } catch (err) {
      console.error(err)
      alert("An error occurred. Please try again.")
      setLoading(false) // Stop loading on crash
    }
  }

  if (!mounted) return null;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.splitCard}>
        
        <div className={styles.leftPane}>
          <div className={styles.brandContent}>
            <div className={styles.logoContainer}>
              <Image src="/logo.png" alt="Deegenex Logo" width={100} height={100} priority />
            </div>
            <h1 className={styles.brandName}>DEEGENEX</h1>
            <p className={styles.brandTagline}>Innovating the Future of Technology</p>
            <div className={styles.footerInfo}>
              <span>Careers Portal v2.0</span>
            </div>
          </div>
        </div>

        <div className={styles.rightPane}>
          <div className={styles.formHeader}>
            <div className={styles.headerTxt}>
              <h2>Join Our Team</h2>
              <p>Fill the details to start your journey</p>
            </div>
            <div className={styles.jobBadge}>{jobTitle}</div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input type="hidden" name="job" value={form.job} />

            <div className={styles.sectionHeading}>Contact Details</div>
            <div className={styles.inputGrid}>
              <div className={styles.inputBox}>
                <input className={styles.input} name="name" placeholder=" " onChange={handleChange} required />
                <label>Full Name *</label>
              </div>
              <div className={styles.inputBox}>
                <input className={styles.input} type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} required />
                <label>Email Address *</label>
              </div>
              <div className={styles.inputBox}>
                <input className={styles.input} type="tel" name="phone" placeholder=" " value={form.phone} onChange={handleChange} required />
                <label>Mobile Number *</label>
              </div>
              <div className={styles.inputBox}>
                <input className={styles.input} name="location" placeholder=" " onChange={handleChange} required />
                <label>Current Location *</label>
              </div>
            </div>

            <div className={styles.sectionHeading}>Education</div>
            <div className={styles.inputGrid}>
              <div className={styles.inputBox}>
                <input className={styles.input} name="qualification" placeholder=" " onChange={handleChange} />
                <label>Highest Qualification</label>
              </div>
              <div className={styles.inputBox}>
                <input className={styles.input} name="institution" placeholder=" " onChange={handleChange} />
                <label>College/University</label>
              </div>
              <div className={styles.inputBox}>
                <input className={styles.input} name="year" placeholder=" " onChange={handleChange} />
                <label>Passing Year</label>
              </div>
              <div className={styles.inputBox}>
                <input className={styles.input} name="cgpa" placeholder=" " onChange={handleChange} />
                <label>CGPA / Percentage</label>
              </div>
            </div>

            <div className={styles.sectionHeading}>Preferences</div>
            <div className={styles.preferenceGrid}>
              <div className={styles.dateWrapper}>
                <DatePicker
                  selected={form.dob ? new Date(form.dob) : null}
                  onChange={(date) => setForm({ ...form, dob: date })}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date of Birth"
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className={styles.customDate}
                  calendarClassName={styles.modernCalendar}
                />
              </div>
              <select className={styles.select} name="gender" value={form.gender} onChange={handleChange} required>
                <option value="" disabled>Select Gender *</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select className={styles.select} name="experience" value={form.experience} onChange={handleChange} required>
                <option value="" disabled>Experience *</option>
                <option value="Fresher">Fresher</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>

            <div className={styles.sectionHeading}>Technical Skill</div>
            <textarea className={styles.textarea} name="skills" placeholder="Tell us about your technical expertise..." onChange={handleChange} />
            
            <div className={styles.fileCard}>
              <p>Resume Upload (PDF/DOC) *</p>
              <input type="file" onChange={(e) => setResume(e.target.files[0])} required />
            </div>

            {/* UPDATED BUTTON: Added loading check */}
            <button 
                type="submit" 
                className={loading ? styles.submitBtnLoading : styles.submitBtn} 
                disabled={loading}
            >
              {loading ? (
                <div className={styles.loaderBox}>
                  <div className={styles.spinner}></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className={styles.loader}>Loading...</div>}>
      <ApplyForm />
    </Suspense>
  )
}