"use client";
import style from "./hero.module.css";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";


const fullText = "Future With Us";

export default function hero() {


    const [typedText, setTypedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [restartKey, setRestartKey] = useState(0);

    useEffect(() => {
        let typingInterval;
        let restartTimeout;

        const startTyping = () => {
            let index = 0;
            setTypedText("");
            setShowCursor(true);

            typingInterval = setInterval(() => {
                setTypedText(fullText.slice(0, index + 1));
                index++;

                if (index === fullText.length) {
                    clearInterval(typingInterval);
                    setShowCursor(false);

                    restartTimeout = setTimeout(() => {
                        setRestartKey(prev => prev + 1);
                    }, 8000); // restart every 3s
                }
            }, 70);
        };

        startTyping();

        return () => {
            clearInterval(typingInterval);
            clearTimeout(restartTimeout);
        };
    }, [restartKey]);


    /* ---------------- INITIAL BG VIDEO ---------------- */
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2;
            videoRef.current.play();
        }
    }, []);



    return (
        <>
            <div className={style.main}>
                <div className={style.sec1}>
                    <div className={style.sec1vid1}>
                        <video
                            ref={videoRef}
                            src="/87789-602074264 (1).mp4"
                            autoPlay muted loop playsInline
                            className={style.bgVideo}
                        />
                    </div>
                    <div className={style.sec2Overlay}></div>
                    <div className={style.bottomBlur}></div>

                    <div className={style.seccont}>
                        <div className={style.seccont1}>
                            <div className={style.boyWrapper}>
                                <Image src="/career.png" className={style.carboy} width={1500} height={1500} alt='boy-img' />
                            </div>
                        </div>
                        <div className={style.seccont2}>
                            <h1 key={restartKey} className={`${style.sec2txt1} ${style.reveal}`}>
                                Join Deegenex
                                <br />
                                Build The{" "}
                                <span className={style.typing}>
                                    {typedText}
                                    {showCursor && <span className={style.cursor}>|</span>}
                                </span>
                            </h1>

                            <div key={`p1-${restartKey}`} className={`${style.sec2txt2} ${style.reveal} ${style.delay1}`}>
                                At Deegenex, we don’t just build websites or AI solutions.
                                <br />
                                We engineer digital ecosystems that power tomorrow’s businesses.
                            </div>

                            <div key={`p2-${restartKey}`} className={`${style.sec2txt21} ${style.reveal} ${style.delay2}`}>
                                We are building the next-generation tech company — and we want builders, thinkers, and creators on our team.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}