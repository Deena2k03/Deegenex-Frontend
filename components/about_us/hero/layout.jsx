"use client";
import style from './hero.module.css'
import { useRef, useEffect } from "react";
import Image from "next/image";




export default function hero() {

    const videoRef1 = useRef(null);

    useEffect(() => {
        if (videoRef1.current) {
            videoRef1.current.playbackRate = .8;
        }
    }, []);



    return (
        <>
        <div className={style.bg_video}>
        <video ref={videoRef1} autoPlay loop muted playsInline className={style.bgvideo} >
            <source src="/25320-349634237.mp4" type="video/mp4" />
        </video>
        <div className={style.overlay}></div>
        </div>
            <div className={style.hero}>
                <div className={style.cont}>
                    <div className={style.cblk1}>
                        <h1 className={style.mtxt2}>DEEGENEX</h1>
                        <h1 className={style.mtxt3}>INTELLIGENCE FOR A BETTER FUTURE</h1>
                        <h1 className={style.mpara1}>We build intelligent digital systems, AI-powered platforms, and transformative experiences that unlock growth, efficiency, and real business impact.</h1>
                        <h1 className={style.mpara1}>At DEEGENEX, innovation isn’t just what we do — it’s who we are.</h1>
                        <h1 className={style.navtxt}><a href='/' className={style.navbtn}>Home</a> / About Us</h1>
                    </div>
                    <div className={style.cblk2}>
                        <Image src="/about.png" className={style.bgimg1} width={1500} height={1500} alt='Bg-img'/>
                    </div>
                </div>
            </div>
            <div className={style.card_container}>
                <div id={style.card1} className={style.content}>
                    <div className={style.cardblk1}>
                        <h1 className={style.cardtxt1}>OUR VISION</h1>
                    </div>
                    <div className={style.cardblk2}>
                        <div className={style.cardblk2sec1}>
                            <h1 className={style.cardtxtv1}>"To lead the world into a smarter future by redefining industries through intelligent technology that elevates human potential and makes businesses future-ready."</h1>
                        </div>
                        <div className={style.cardblk2sec2}>
                            <Image src="/vision.png" className={style.vsnimg} width={1500} height={1500} alt='Vision-img' />
                        </div>
                    </div>
                </div>
                <div id={style.card2} className={style.content}>
                    <div className={style.cardblk1}>
                        <h1 className={style.cardtxt1}>OUR MISSION</h1>
                    </div>
                    <div className={style.cardblk2}>
                        <div className={style.cardblk2sec1}>
                            <h1 className={style.cardtxtv1}>"To architect cutting-edge digital solutions using artificial intelligence, data insights, and automation, enabling organizations to innovate faster, operate smarter, and lead with confidence."</h1>
                        </div>
                        <div className={style.cardblk2sec2}>
                            <Image src="/mission.png" className={style.msnimg} width={1500} height={1500} alt='mission-img' />
                        </div>
                    </div>
                </div>
                <div id={style.card3} className={style.content}>
                    <div className={style.cardblk1}>
                        <h1 className={style.cardtxt1}>CORE VALUES</h1>
                    </div>
                    <div className={style.cardblk2}>
                        <div className={style.cardblk2sec11}>
                            <h1 className={style.cardtxtv11}>Leadership Through Innovation</h1>
                            <h1 className={style.cardtxtv12}>We don’t just build for today — we build for tomorrow.</h1>
                            <h1 className={style.cardtxtv11}>Relentless Excellence</h1>
                            <h1 className={style.cardtxtv12}>We deliver quality and performance without compromise.</h1>
                            <h1 className={style.cardtxtv11}>Customer Impact at Scale</h1>
                            <h1 className={style.cardtxtv12}>Success for us means measurable results for you.</h1>
                            <h1 className={style.cardtxtv11}>Ethical Intelligence</h1>
                            <h1 className={style.cardtxtv12}>Powerful technology must be responsible technology.</h1>
                            <h1 className={style.cardtxtv11}>Continuous Advancement</h1>
                            <h1 className={style.cardtxtv12}>Learning, evolving, and improving is part of our DNA.</h1>
                        </div>
                        <div className={style.cardblk2sec21}>
                            <Image src="/values.png" className={style.vlsimg} width={1500} height={1500} alt='value-img' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}