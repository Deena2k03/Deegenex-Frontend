"use client"

import { useState, useEffect } from "react"
import styles from "./MeetingPage.module.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function MeetingPage() {
  const [loading, setLoading] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    meeting_date: null,
    meeting_time: null,
    message: ""
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handles standard text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handles Date selection
  const handleDateChange = (date) => {
    setForm({ ...form, meeting_date: date })
  }

  // Handles Time selection
  const handleTimeChange = (time) => {
    setForm({ ...form, meeting_time: time })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!form.meeting_date || !form.meeting_time) {
      alert("Please select both date and time.")
      return
    }

    setLoading(true)

    // Manual formatting to ensure local date/time is sent
    const d = form.meeting_date
    const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    
    const formattedTime = form.meeting_time?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    })

    const payload = {
      ...form,
      meeting_date: formattedDate,
      meeting_time: formattedTime
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/client-meetings/schedule/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )

      if (res.ok) {
        setIsConfirmed(true)
      } else {
        const err = await res.json()
        console.error("Backend Error:", err)
        alert("Meeting Failed to Schedule. Please check your details.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className={styles.meetingContainer} suppressHydrationWarning>
      <div className={styles.mainCard}>
        
        {/* LEFT SIDE - BRANDING */}
        <div className={styles.leftSide}>
          <img src="/logo.png" alt="DEEGENEX" className={styles.companyLogo} />
          <h1 className={styles.companyName}>DEEGENEX</h1>
          <p className={styles.tagline}>Transforming Ideas into Reality</p>
        </div>

        {/* RIGHT SIDE - FORM CONTENT */}
        <div className={styles.rightSide}>
          {isConfirmed ? (
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.title}>Booking Confirmed!</h2>
              <p className={styles.successText}>
                Thanks <strong>{form.name}</strong>, your strategy session is locked in for 
                <strong> {form.meeting_date?.toLocaleDateString()}</strong> at <strong>{form.meeting_time?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>.
              </p>
              <button className={styles.submitBtn} onClick={() => window.location.reload()}>
                Return to Home
              </button>
            </div>
          ) : (
            <>
              <h2 className={styles.title}>Schedule a Strategy Call</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input className={styles.inputField} name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                  <input className={styles.inputField} type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                  <input className={styles.inputField} name="phone" placeholder="Mobile Number" value={form.phone} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                  <input className={styles.inputField} name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
                </div>

                <div className={styles.dateTimeRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Select Date</label>
                    <DatePicker
                      selected={form.meeting_date}
                      onChange={handleDateChange}
                      dateFormat="dd MMM yyyy"
                      placeholderText="Select Date"
                      className={styles.dateInput}
                      minDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      required
                    />
                  </div>
                  
                  <div className={styles.field}>
                    <label className={styles.label}>Select Time</label>
                    <DatePicker
                      selected={form.meeting_time}
                      onChange={handleTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      dateFormat="h:mm aa"
                      placeholderText="Select Time"
                      className={styles.dateInput}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <textarea className={styles.textareaField} name="message" placeholder="Tell us about your project..." rows="3" value={form.message} onChange={handleChange} />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? <div className={styles.loader}></div> : "Schedule Meeting"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}