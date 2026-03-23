"use client"
import style from './Section6.module.css'
import { useState, useEffect, useRef } from "react";
import Image from 'next/image'



const reviews = [
  {
    name: "Karthick N",
    role: "– HR Manager",
    image: "/karthi.png",
    text: "“DEEGENEX provides an environment where learning and innovation go hand in hand. Every project helps me grow technically and professionally.”",
  },
  {
    name: "Shamina P",
    role: "– Project Manager",
    image: "/shamina.png",
    text: "“Working at DEEGENEX has strengthened my problem-solving skills. The focus on scalable and clean architecture is excellent.”",
  },
  {
    name: "Siva Shanmugam J",
    role: "– Python Developer",
    image: "/jd.png",
    text: "“Clear communication, strong teamwork, and transparency define the culture at DEEGENEX. It’s a great place to lead projects.”",
  },
  {
    name: "Harini R",
    role: "– UI/UX Designer",
    image: "/harini.png",
    text: "“Performance and user experience are top priorities at DEEGENEX. I enjoy building modern, responsive interfaces here.”",
  },
  {
    name: "Aravind P",
    role: "– DevOps Engineer",
    image: "/aravindh.png",
    text: "“Quality is never compromised. DEEGENEX believes in delivering reliable and well-tested solutions.”",
  },
  {
    name: "Arun M",
    role: "– QA Engineer",
    image: "/arun.png",
    text: "“The DevOps culture at DEEGENEX is strong. Automation, cloud scalability, and security are always a priority.”",
  },
];




export default function section() {



  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const totalSlides = Math.ceil(reviews.length / itemsPerSlide);

  /* 🔁 CONTINUOUS AUTO SLIDE */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 7000);

    return () => clearInterval(intervalRef.current);
  }, [totalSlides]);

  /* 🔄 Restart auto slide after dot click */
  const handleDotClick = (i) => {
    setIndex(i);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
  };

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setItemsPerSlide(1); // 📱 mobile
    } else {
      setItemsPerSlide(2); // 💻 desktop
    }
  };

  handleResize(); // run on first load
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);


  return (
    <>
      <div className={style.sec6} id='section6'>
        <div className={style.sec6_1}>
          <div className={style.sec6cont}>
            <div className={style.sec6conttxt1}>Our Team</div>
            <div className={style.sec6conttxt2}>Behind every successful solution at DEEGENEX is a passionate team of innovators and problem-solvers. Here’s what our team members say about working, learning, and growing together.</div>
          </div>
          <div className={style.sec6slide}>
            <div className={style.sliderWrapper}>
              <div className={style.slider} style={{ transform: `translateX(-${index * 100}%)` }} >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div className={style.slide} key={slideIndex}>
                    {reviews
                      .slice(
                        slideIndex * itemsPerSlide,
                        slideIndex * itemsPerSlide + itemsPerSlide
                      )
                      .map((item, i) => (
                        <div className={style.reviewWrapper} key={i}>
                          <div className={style.card}>
                            <div className={style.stars}>★★★★★</div>
                            <p className={style.reviewText}>{item.text}</p>


                            <div className={style.userBox}>
                              <Image src={item.image} alt={item.name} width={1000} height={1000} className={style.avatar} />
                              <div>
                                <h4 className={style.userName}>{item.name}</h4>
                                <span className={style.userRole}>{item.role}</span>
                              </div>
                            </div></div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
            {/* DOTS */}
            <div className={style.dots}>
              {Array.from({ length: totalSlides }).map((_, i) => (
                <span key={i} className={`${style.dot} ${index === i ? style.active : ""}`} onClick={() => handleDotClick(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}