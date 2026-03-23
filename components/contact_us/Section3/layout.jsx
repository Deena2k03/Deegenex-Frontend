"use client"

import { useState } from "react";
import style from "./Section3.module.css";
import Image from "next/image";

export default function Section2() {
    // 1. State for form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    // 2. State for UI feedback
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // 3. Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 4. Specifically handle phone numeric input
    const handlePhoneInput = (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        setFormData((prev) => ({
            ...prev,
            phone: val
        }));
    };

    // 5. Submit logic to Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("Sending your message...");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact-us/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("Success! We will contact you shortly.");
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });
            } else {
                setStatus(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setStatus("Server error. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={style.main}>
            <div className={style.container}>
                {/* LEFT SIDE: BRANDING & IMAGE */}
                <div className={style.left}>
                    <h1 className={style.heading}>
                        Let’s discuss <br /> 
                        on something <span>cool</span> <br /> 
                        together 
                    </h1>
                    <div className={style.imageWrapper}>
                        <Image 
                            src="/contactpn.png" 
                            className={style.meet} 
                            width={1500} 
                            height={1500} 
                            alt='Contact-form-img' 
                            priority
                        />
                    </div>
                </div>

                {/* RIGHT SIDE: CONTACT FORM */}
                <div className={style.right}>
                    <div className={style.formCard}>
                        <h3 className={style.formTitle}>Get In Touch</h3>
                        
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.field}>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Full Name" 
                                    className={style.input} 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            
                            <div className={style.field}>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email Address" 
                                    className={style.input} 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className={style.field}>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder="Phone Number"
                                    className={style.input}
                                    value={formData.phone}
                                    pattern="[0-9]{10}" 
                                    maxLength={10} 
                                    inputMode="numeric"
                                    required
                                    onChange={handlePhoneInput}
                                />
                            </div>

                            <div className={style.field}>
                                <input 
                                    type="text" 
                                    name="subject"
                                    placeholder="Subject" 
                                    className={style.input} 
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className={style.field}>
                                <textarea 
                                    name="message"
                                    placeholder="Message" 
                                    rows="4" 
                                    className={style.textarea} 
                                    value={formData.message}
                                    onChange={handleChange}
                                    required 
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className={style.submit} 
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Send Message"}
                            </button>

                            {/* Status Message Display */}
                            {status && (
                                <p style={{ 
                                    marginTop: "15px", 
                                    fontSize: "14px", 
                                    color: status.includes("Success") ? "#0b5cff" : "#ff4d4d",
                                    fontWeight: "600"
                                }}>
                                    {status}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}