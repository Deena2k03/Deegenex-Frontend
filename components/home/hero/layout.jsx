"use client";
import style from "./hero.module.css";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

// 🔵 Dataset 1: Specifically for the Phase 1 Orbit Animation
const orbitLogos = [
  "/react.png",
  "/html.png",
  "/js.png",
  "/css.png",
  "/java.png",
  "/nodejs.png",
  "/python.png"
];

// 🔵 Dataset 2: Specifically for Phase 2 Ripple Animation
const logoData = [
  { src: "/Enterprise-Grade Security.png", title: "Enterprise-Grade Security", btn1: "Vulnerable Systems", btn2: "Protected Infrastructure" },
  { src: "/Precision Engineering.png", title: "Precision Engineering", btn1: "Approximate Code", btn2: "Engineered Systems" },
  { src: "/Future-Ready Solutions.png", title: "Future-Ready Solutions", btn1: "Short-Term Fixes", btn2: "Long-Term Architecture" },
  { src: "/Intelligent Infrastructure.png", title: "Intelligent Infrastructure", btn1: "Static Systems", btn2: "Adaptive Intelligence" },
  { src: "/Seamless Integration.png", title: "Seamless Integration", btn1: "Fragmented Tools", btn2: "Unified Ecosystem" },
  { src: "/Next-Gen Innovation.png", title: "Next-Gen Innovation", btn1: "Outdated Technology", btn2: "Next-Gen Systems" },
];

export default function Hero() {
  /* ---------------- STATES ---------------- */
  const [currentPhase, setCurrentPhase] = useState(1); // 1: Cube Phase, 2: Ripple Phase
  const [showLoader, setShowLoader] = useState(true);
  const [loaderExit, setLoaderExit] = useState(false);
  const [showOrbit, setShowOrbit] = useState(false);
  const [showRipples, setShowRipples] = useState(false);
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);
  const [rippleCount, setRippleCount] = useState(0);

  /* ---------------- REFS ---------------- */
  const videoRef = useRef(null);  // Background Video
  const videoRef1 = useRef(null); // Center Cube Video

  /* ---------------- INITIAL BG VIDEO ---------------- */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
      videoRef.current.play();
    }
  }, []);

  /* ---------------- MAIN SEQUENCE LOGIC ---------------- */
useEffect(() => {
  const cubeVideo = videoRef1.current;
  if (!cubeVideo) return;

  const startSequence = async () => {
    setShowLoader(true);
    setLoaderExit(false);
    setShowOrbit(false);
    setShowRipples(false);

    await new Promise((resolve) => setTimeout(resolve, 2400));
    setLoaderExit(true); 

    await new Promise((resolve) => setTimeout(resolve, 600));
    setShowLoader(false);
    setLoaderExit(false);

    if (currentPhase === 1) {
      cubeVideo.currentTime = 0;
      // 🟢 FIX: Wrap in try/catch to handle AbortError
      try {
        await cubeVideo.play();
        setShowOrbit(true);
      } catch (err) {
        console.log("Video play interrupted or blocked:", err);
        // Fallback: show the orbit anyway so the UI doesn't break
        setShowOrbit(true); 
      }
    } else {
      setRippleCount(0);
      setActiveLogoIndex(0);
      setShowRipples(true);
    }
  };

  startSequence();

  const onVideoEnded = () => {
    handlePhaseEnd();
  };

  cubeVideo.addEventListener("ended", onVideoEnded);
  return () => cubeVideo.removeEventListener("ended", onVideoEnded);
}, [currentPhase]);

  /* ---------------- RIPPLE LOGO ROTATION LOGIC ---------------- */
  useEffect(() => {
    let rippleTimer;
    if (showRipples) {
      rippleTimer = setTimeout(() => {
        if (rippleCount < logoData.length - 1) {
          setActiveLogoIndex((prev) => prev + 1);
          setRippleCount((prev) => prev + 1);
        } else {
          handlePhaseEnd();
        }
      }, 8000);
    }
    return () => clearTimeout(rippleTimer);
  }, [showRipples, rippleCount]);

  /* ---------------- PHASE TRANSITION HELPER ---------------- */
  const handlePhaseEnd = () => {
    setShowOrbit(false);
    setShowRipples(false);
    setTimeout(() => {
      setCurrentPhase((prev) => (prev === 1 ? 2 : 1));
    }, 600);
  };

  return (
    <div className={style.main}>
      <div className={style.sec1}>
        <div className={style.sec1vid1}>
          
          <video
            ref={videoRef}
            src="/9f3YOJWd8t3cibP1iqPDR1mCMro.mp4"
            autoPlay muted loop playsInline
            className={style.bgVideo}
          />

          <h1 className={style.sec1title}>
            {["INTELLIGENCE FOR A", "BETTER FUTURE"].map((line, lineIndex) => (
              <div key={lineIndex}>
                {line.split("").map((letter, index) => (
                  <span
                    key={index}
                    className={style.letter}
                    style={{ animationDelay: `${1.5 + (lineIndex * 20 + index) * 0.05}s` }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </div>
            ))}
          </h1>

          {showLoader && (
            <div className={`${style.loaderOverlay} ${loaderExit ? style.loaderZoomOut : ""}`}>
              <div className={style.loaderCircle}></div>
            </div>
          )}

          {/* 🔵 Phase 1: Orbiting Logos - Using orbitLogos dataset */}
          <div className={`${style.wrapper} ${showOrbit ? style.show : style.hide}`}>
            <div className={style.orbitRing}></div>
            {orbitLogos.map((src, index) => {
              const angle = (360 / orbitLogos.length) * index;
              return (
                <div
                  key={index}
                  className={style.logo}
                  style={{ "--angle": `${angle}deg` }}
                >
                  <div className={style.inner}>
                    <Image src={src} alt="tech" width={40} height={40} className={style.minner}/>
                  </div>
                </div>
              );
            })}
          </div>

          <video
            ref={videoRef1}
            src="/fbg.webm"
            muted playsInline
            className={`${style.bgVideo1} ${showOrbit ? style.show : style.hide}`}
          />

          {/* 🔵 Phase 2: Ripple Animation - Using logoData dataset */}
          <div className={`${style.sec222} ${showRipples ? style.show : style.hide}`}>
            {showRipples && (
              <div key={activeLogoIndex} className={`${style.illusionWrapper} ${style.zoomTransition}`}>
                <div className={`${style.multiRing} ${style.r1}`} />
                <div className={`${style.multiRing} ${style.r2}`} />
                <div className={`${style.multiRing} ${style.r3}`} />
                <div className={`${style.multiRing} ${style.r4}`} />
                <div className={`${style.multiRing} ${style.r5}`} />

                <div className={style.centerContentWrapper}>
                  <div className={style.centerlogo1}>
                    <Image
                      src={logoData[activeLogoIndex].src}
                      alt="tech"
                      width={90} height={90}
                      className={`${style.centerLogo} ${style.logoEntrance}`}
                    />
                  </div>

                  <div className={`${style.logoTitle} ${style.logoEntrance}`}>
                    {logoData[activeLogoIndex].title}
                  </div>

                  <div className={`${style.buttonContainer} ${style.logoEntrance}`}>
                    <button className={`${style.btn} ${style.btnRed}`}>
                      <span className={style.btnIcon}>✕</span>
                      <span className={style.btnText}>{logoData[activeLogoIndex].btn1}</span>
                    </button>
                    <button className={`${style.btn} ${style.btnBlue}`}>
                      <span className={style.btnIcon}>✓</span>
                      <span className={style.btnText}>{logoData[activeLogoIndex].btn2}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={style.sec2Overlay}></div>
        </div>
      </div>
      <h1 className={style.txtfvd}>Your Growth Partner in the Digital World</h1>
    </div>
  );
}