"use client";
import { useEffect, useRef } from "react";
import style from './Section3.module.css'
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
            <div className={style.sec1}>
                <div className={`${style.content} ${style.revealZoom}`}>
                    <div className={style.title}>
                        <h1 className={style.titlebadge}>OUR COMMITMENT</h1>
                        <h1 className={style.titletxt}>Client-Centric Commitment at DEEGENEX</h1>
                        <h1 className={style.titletxt2}>We build long-term technology partnerships focused on performance, transparency, and measurable business growth.</h1>
                    </div>
                    <div className={style.design}>
                        <div className={style.blk1}>
                            <div className={style.blkesec1}>
                                <Image src="/optim-system.png" className={style.blksec1img} width={1500} height={1500} alt="Client-img-1" />
                                <h1 className={style.blkesec1txt1}>Strategic Understanding</h1>
                                <h1 className={style.blkesec1txt2}>We deeply analyze your business goals before designing solutions.</h1>
                            </div>
                            <div className={style.blkesec1}>
                                <Image src="/future-ready.png" className={style.blksec1img} width={1500} height={1500} alt="Client-img-1" />
                                <h1 className={style.blkesec1txt1}>Tailored Digital Solutions</h1>
                                <h1 className={style.blkesec1txt2}>Every web, software, or AI system is customized to your needs.</h1>
                            </div>
                            <div className={style.blkesec1}>
                                <Image src="/servf.png" className={style.blksec1img} width={1500} height={1500} alt="Client-img-1" />
                                <h1 className={style.blkesec1txt1}>Agile & Transparent Execution</h1>
                                <h1 className={style.blkesec1txt2}>Clear timelines, structured workflows, and consistent updates.</h1>
                            </div>
                        </div>
                        <div className={style.blk2}>
                            <Image src="/Client-Centric Commitment.png" className={style.blk2mg} width={1500} height={1500} alt="Client-Centric-Commitment" />
                            <div className={style.btn}>
                                <h1 className={style.btn1}><a href='/about_us'>Know More</a></h1>
                                <h1 className={style.btn1}><a href='/contact_us#book'>Book a Meeting</a></h1>
                            </div>
                        </div>
                        <div className={style.blk1}>
                            <div className={style.blkesec1}>
                                <Image src="/longtermp.png" className={style.blksec1img} width={1500} height={1500} alt="Client-img-1" />
                                <h1 className={style.blkesec1txt1}>Long-Term Partnership</h1>
                                <h1 className={style.blkesec1txt2}>We support and optimize your systems beyond deployment.</h1>
                            </div>
                            <div className={style.blkesec1}>
                                <Image src="/ai-int.png" className={style.blksec1img} width={1500} height={1500} alt="Client-img-1" />
                                <h1 className={style.blkesec1txt1}>Secure & Reliable Architecture</h1>
                                <h1 className={style.blkesec1txt2}>Built with stability, scalability, and data protection at the core.</h1>
                            </div>
                            <div className={style.blkesec1}>
                                <Image src="/gromar.png" className={style.blksec1img} width={1500} height={1500} alt="Client-img-1" />
                                <h1 className={style.blkesec1txt1}>Continuous Growth Focus</h1>
                                <h1 className={style.blkesec1txt2}>We refine and evolve your systems as your business scales.</h1>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}