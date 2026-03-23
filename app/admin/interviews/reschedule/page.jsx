"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Calendar as CalIcon, ArrowLeft, Clock, User, MessageSquare } from "lucide-react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from "./reschedule.module.css"

function RescheduleContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const application_id = searchParams.get("application_id")
    const candidateName = searchParams.get("name")

    const [currentInterview, setCurrentInterview] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState("")
    const [reason, setReason] = useState("")
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (!application_id) return
        const token = localStorage.getItem('accessToken')
        const API_URL = process.env.NEXT_PUBLIC_API_URL

        fetch(`${API_URL}/api/candidate-interviews/${application_id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                setCurrentInterview(data[0])
            }
        })
        .catch(err => console.error("Error fetching interview:", err))
    }, [application_id])

    const timeSlots = [];
    for (let i = 9; i < 21; i++) { // Filtered to Business Hours 9AM - 9PM
        for (let j = 0; j < 60; j += 30) {
            const hour = i % 12 || 12;
            const ampm = i < 12 ? "AM" : "PM";
            const minute = j === 0 ? "00" : j;
            const time24 = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
            timeSlots.push({ label: `${hour}:${minute} ${ampm}`, value: time24 });
        }
    }

    const handleConfirm = async () => {
        if (!selectedDate || !selectedTime) return
        setLoading(true)
        const token = localStorage.getItem('accessToken')
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const dateStr = selectedDate.toLocaleDateString('en-CA'); 
        const scheduledDateTime = `${dateStr}T${selectedTime}:00`

        try {
            const res = await fetch(`${API_URL}/api/meetings/admin-reschedule-interview/${application_id}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ interview_date: scheduledDateTime, reason })
            })
            if (res.ok) setIsSuccess(true)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className={styles.container}>
                <div className={styles.successWrapper}>
                    <div className={styles.successCircle}>
                        <CheckCircle size={80} strokeWidth={1.5} />
                    </div>
                    <h2 className={styles.successTitle}>Interview Rescheduled</h2>
                    <p className={styles.successText}>Emails have been sent to <strong>{candidateName}</strong> and the HR panel.</p>
                    <button className={styles.primaryBtn} onClick={() => router.push(`/admin/candidates/${application_id}`)}>
                        Return to Profile
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.glassWrapper}>
                <header className={styles.header}>
                    <button onClick={() => router.back()} className={styles.iconBtn}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className={styles.headerContent}>
                        <h1>Reschedule Interview</h1>
                        <p>Adjust the time slot for {candidateName}</p>
                    </div>
                </header>

                <div className={styles.summaryBar}>
                    <div className={styles.summaryItem}>
                        <div className={styles.avatar}>{candidateName?.charAt(0)}</div>
                        <div>
                            <span className={styles.microLabel}>CANDIDATE</span>
                            <p className={styles.summaryValue}>{candidateName}</p>
                        </div>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.summaryItem}>
                        <CalIcon size={18} className={styles.accentIcon} />
                        <div>
                            <span className={styles.microLabel}>CURRENTLY SET FOR</span>
                            <p className={styles.summaryValue}>
                                {currentInterview ? new Date(currentInterview.date).toLocaleString('en-GB', {
                                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC'
                                }) : "Not Scheduled"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.gridContainer}>
                    <section className={styles.dateSection}>
                        <label className={styles.sectionTitle}><CalIcon size={16} /> Select New Date</label>
                        <Calendar 
                            onChange={setSelectedDate} 
                            value={selectedDate}
                            className={styles.modernCalendar}
                            minDate={new Date()}
                        />
                    </section>

                    <section className={styles.timeSection}>
                        <label className={styles.sectionTitle}><Clock size={16} /> Available Slots</label>
                        <div className={styles.timeScroll}>
                            {timeSlots.map((slot) => (
                                <button 
                                    key={slot.value}
                                    className={`${styles.timeChip} ${selectedTime === slot.value ? styles.activeChip : ""}`}
                                    onClick={() => setSelectedTime(slot.value)}
                                >
                                    {slot.label}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                <section className={styles.reasonSection}>
                    <label className={styles.sectionTitle}><MessageSquare size={16} /> Reason for Change</label>
                    <textarea 
                        className={styles.modernTextarea}
                        placeholder="Add a note for the candidate..."
                        value={reason} 
                        onChange={(e) => setReason(e.target.value)}
                    />
                </section>

                <footer className={styles.footer}>
                    <button 
                        className={styles.primaryBtn} 
                        onClick={handleConfirm}
                        disabled={loading || !selectedTime}
                    >
                        {loading ? "Processing..." : "Confirm New Schedule"}
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default function ReschedulePage() {
    return (
        <Suspense fallback={<div className={styles.loader}>Loading...</div>}>
            <RescheduleContent />
        </Suspense>
    )
}