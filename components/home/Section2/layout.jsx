"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import style from "./Section2.module.css"

const steps = [
    {
        number: "01",
        tag: "Strategy",
        title: "Idea Discovery",
        desc: "We analyze your vision, business challenges, and market opportunities to define a clear and strategic project direction."
    },
    {
        number: "02",
        tag: "Validation",
        title: "Research & Validation",
        desc: "Our team validates the concept with technical feasibility, user insights, and data-driven planning to ensure long-term success."
    },
    {
        number: "03",
        tag: "Architecture",
        title: "Strategic Design",
        desc: "We design scalable system architecture, user experience, and AI workflows built for performance and growth."
    },
    {
        number: "04",
        tag: "Engineering",
        title: "Intelligent Development",
        desc: "Our engineers develop secure, high-performance solutions using modern technologies and AI-driven optimization."
    },
    {
        number: "05",
        tag: "Optimization",
        title: "Testing & Optimization",
        desc: "We rigorously test, refine, and optimize to ensure reliability, accuracy, and measurable efficiency."
    },
    {
        number: "06",
        tag: "Impact",
        title: "Deployment & Impact",
        desc: "We launch with confidence and monitor performance to ensure your solution delivers real business results."
    }
]

export default function Section2() {
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <div className={style.main}>
            <motion.div 
    className={style.sec1}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, .8] }}
    viewport={{ once: true, amount: 0.6 }}
>
    <h1 className={style.sec1txt1}>From Idea to Impact</h1>
    <h1 className={style.sec1txt2}>
        Every successful solution begins with a powerful idea — but impact comes from execution. 
        At DEEGENEX, we transform concepts into intelligent, scalable systems designed to solve 
        real-world challenges and drive sustainable growth.
    </h1>
</motion.div>
        <div ref={containerRef} className={style.wrapper}>

            {/* Vertical Progress Line */}
            <div className={style.progressContainer}>
                <motion.div
                    style={{ scaleY }}
                    className={style.progressLine}
                />
            </div>

            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    className={style.section}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ amount: 0.5 }}
                >
                    {/* DOT */}
                    <motion.div
                        className={style.dot}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ amount: 0.5 }}
                    />

                    <div className={style.left}>
                        <h1>{step.number}</h1>
                    </div>

                    <div className={style.right}>
                        <span className={style.tag}>{step.tag}</span>
                        <h2>{step.title}</h2>
                        <p>{step.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div></div>
    )
}