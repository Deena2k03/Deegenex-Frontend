"use client";
import { useEffect, useRef } from "react";
import style from './Section1.module.css'
import Image from "next/image";


export default function Section(){

useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.active);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const elements = document.querySelectorAll(`.${style.revealZoom}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
    
    return(
        <>
        <div className={style.main}>
            <div className={`${style.sec1} ${style.revealZoom}`}>
                <div className={style.sec1title}>
                    <h1 className={style.sec1txt1}>DIGITAL SERVICES & INNOVATION</h1>
                    <h1 className={style.sec1txt2}>Smarter Platforms. Stronger Growth.</h1>
                    <h1 className={style.sec1txt3}>We design and develop scalable web platforms, powerful backend systems, and growth-driven digital experiences. <br/>Built with intelligent architecture that adapts, optimizes, and evolves with your business.</h1>
                </div>
                <div className={style.sec1_1}>
                    <div className={style.sec1_1cont}>
                        <h1 className={style.sec1_1conttit}>What We Deliver</h1>
                        <h1 className={style.sec1_1contsubtit}>Scalable Web Development</h1>
                        <h1 className={style.sec1_1contpara}>High-performance websites and web applications built with modern frameworks, secure architecture, and seamless user experiences.</h1>
                        <h1 className={style.sec1_1contsubtit}>Secure Backend & API Systems</h1>
                        <h1 className={style.sec1_1contpara}>Robust backend infrastructure with clean architecture, secure authentication, and scalable API integrations.</h1>
                        <h1 className={style.sec1_1contsubtit}>AI-Powered Automation</h1>
                        <h1 className={style.sec1_1contpara}>Smart systems that streamline workflows, automate repetitive tasks, and enhance operational efficiency.</h1>
                        <h1 className={style.sec1_1contsubtit}>Data & Performance Intelligence</h1>
                        <h1 className={style.sec1_1contpara}>Real-time dashboards, KPI tracking, and actionable insights that support faster, smarter decisions.</h1>
                    </div>
                    <div className={style.sec1_1img}>
                        <Image src="/seviceimg1.png" className={style.sec1img1} width={1500} height={1500} alt='What-we-deliver-img' />
                    </div>
                </div>
                <div className={`${style.sec1_2} ${style.revealZoom}`}>
                    <div className={style.sec1_21}>
                        <h1 className={style.sec1_21txt1}>Why Businesses Choose Us</h1>
                        <div className={style.sec1_212}>
                            <div className={style.sec1_212img}>
                            <Image src="/future-ready.png" className={style.sec1_212img1} width={1500} height={1500} alt='future-ready-img' />
                            </div>
                            <h1 className={style.sec1_21txt2}>Future-ready architecture</h1>
                        </div>
                        <div className={style.sec1_212}>
                            <div className={style.sec1_212img}>
                            <Image src="/optim-system.png" className={style.sec1_212img11} width={1500} height={1500} alt='optim-system-img' />
                            </div>
                            <h1 className={style.sec1_21txt2}>Performance-optimized systems</h1>
                        </div>
                        <div className={style.sec1_212}>
                            <div className={style.sec1_212img}>
                            <Image src="/ai-int.png" className={style.sec1_212img111} width={1500} height={1500} alt='ai-int-img' />
                            </div>
                            <h1 className={style.sec1_21txt2}>Seamless AI integration</h1>
                        </div>
                        <div className={style.sec1_212}>
                            <div className={style.sec1_212img}>
                            <Image src="/growth-focused.png" className={style.sec1_212img111} width={1500} height={1500} alt='growth-focused-img' />
                            </div>
                            <h1 className={style.sec1_21txt2}>Growth-focused strategy</h1>
                        </div>
                        <div className={style.sec1_212}>
                            <div className={style.sec1_212img}>
                            <Image src="/end-to-end.png" className={style.sec1_212img111} width={1500} height={1500} alt='end-to-end-img' />
                            </div>
                            <h1 className={style.sec1_21txt2}>End-to-end technical support</h1>
                        </div>
                    </div>
                    <div className={style.sec1_22}>
                        <h1 className={style.sec1_21txt1}>Our Approach</h1>
                        <h1 className={style.sec1_1contsubtit1}>Discover & Strategize</h1>
                        <h1 className={style.sec1_1contpara1}>We understand your business goals and design a scalable digital roadmap.</h1>
                        <h1 className={style.sec1_1contsubtit1}>Build & Integrate</h1>
                        <h1 className={style.sec1_1contpara1}>We develop powerful web systems with secure backend and intelligent integrations.</h1>
                        <h1 className={style.sec1_1contsubtit1}>Optimize & Scale</h1>
                        <h1 className={style.sec1_1contpara1}>We continuously refine performance, automate workflows, and support sustainable growth.</h1>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}