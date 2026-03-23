"use client"
import { useEffect, useRef } from "react"
import style from './Section1.module.css'

export default function Section() {

    const revealRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(style.show)
                    }
                })
            },
            { threshold: 0.2 }
        )

        revealRef.current.forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className={style.main}>

            {/* ===== SECTION 1 ===== */}
            <div className={style.sec1}>

                <h1
                    ref={(el) => (revealRef.current[0] = el)}
                    className={`${style.sec1txt1} ${style.hidden}`}
                    style={{ transitionDelay: "0s" }}
                >
                    We help businesses harness the power of AI, automation, and smart digital solutions to work smarter, grow faster, and build technology that truly performs.
                </h1>

                <div className={style.sec1txt2}>
                    {["Boost Growth", "Deliver Value", "Transform Businesses"].map((item, i) => (
                        <span
                            key={i}
                            ref={(el) => (revealRef.current[i + 1] = el)}
                            className={style.hidden}
                            style={{ transitionDelay: `${0.2 * (i + 1)}s` }}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <div
                    ref={(el) => (revealRef.current[4] = el)}
                    className={`${style.sec1btnGroup} ${style.hidden}`}
                    style={{ transitionDelay: "0.8s" }}
                >
                    <a href="/contact_us#book" className={style.primaryBtn}>
                        <span>Book a Free Consultation</span>
                    </a>
                    <a href="/services" className={style.secondaryBtn}>
                        <span>Explore Our Services</span>
                    </a>
                </div>

            </div>


            {/* ===== SECTION 2 ===== */}
            <div className={style.sec2}>

                <div
                    ref={(el) => (revealRef.current[5] = el)}
                    className={`${style.sec2tit} ${style.hidden}`}
                >
                    <h1 className={style.sec2txt1}>Innovators at Work</h1>
                    <h1 className={style.sec2txt2}>
                        Intentional innovation designed to transform complex challenges into scalable, future-ready solutions.
                    </h1>
                </div>

                <div className={style.sec2cd}>
                    {[1,2,3].map((num, i) => (
                        <div
                            key={i}
                            ref={(el) => (revealRef.current[i + 6] = el)}
                            className={`${style.sec2_1} ${style.hidden}`}
                            style={{ transitionDelay: `${i * 0.3}s` }}
                        >
                            <h1 className={style.sec2label}>{num}</h1>
                            <h1 className={style.sec2_1tit}>
                                {i === 0 && "Collaborative Thinking"}
                                {i === 1 && "Engineering with Purpose"}
                                {i === 2 && "Innovation in Every Detail"}
                            </h1>
                            <h1 className={style.sec2_1cont}>
                                {i === 0 && "Innovation is not accidental — it’s intentional. Our developers, designers, AI specialists, and growth strategists work together to analyze challenges and craft strategic solutions built for real business impact."}
                                {i === 1 && "We combine deep technical expertise with forward-thinking strategy to build solutions that are practical, scalable, and designed for long-term success."}
                                {i === 2 && "At DEEGENEX, innovation is built into every line of code and every design decision, ensuring performance, precision, and measurable growth."}
                            </h1>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}