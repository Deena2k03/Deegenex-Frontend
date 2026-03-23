"use client"
import style from './Section5.module.css'
import { useState } from "react";



const faqs = [
  {
    q: "What does DEEGENEX do?",
    a: "DEEGENEX provides intelligent digital solutions including web development, software systems, AI automation, data solutions, and scalable technology platforms for businesses."
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes. We actively support startups and small businesses with flexible, scalable, and cost-effective solutions."
  },
  {
    q: "What technologies does DEEGENEX specialize in?",
    a: "We specialize in modern web frameworks, backend systems, cloud platforms, AI/ML, automation tools, and data analytics technologies."
  },
  {
    q: "Do you provide custom software development?",
    a: "Absolutely. All our solutions are tailored to meet your specific business requirements and goals."
  },
  {
    q: "How do you ensure project quality?",
    a: "We follow structured development processes, rigorous testing, code reviews, and continuous client feedback throughout the project lifecycle."
  },
  {
    q: "Do you offer UI/UX design services?",
    a: "Yes. Our design team focuses on user-centric, intuitive, and visually appealing interfaces that enhance user experience."
  },
  {
    q: "Do you provide training or internship programs?",
    a: "Yes. We offer training and internship programs in areas like full-stack development, Python, and automation."
  }
];


export default function section() {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className={style.sec5}>
        <div className={style.sec5_1}>
          <div className={style.sec5cont}>
            <h1 className={style.sec5conttxt1}>"Frequently Asked Questions"</h1>
            <h1 className={style.sec5conttxt2}>Transparency matters to us. Explore answers to frequently asked questions about DEEGENEX and our solutions. We’re here to make your journey simple and clear.</h1>
          </div>
          <ul className={style.sec5faq}>
            {faqs.map((faq, i) => (
              <li key={i}>
                <div className={style.sec5q} onClick={() => toggleFAQ(i)} >
                  <span className={`${style.sec5arrow} ${openIndex === i ? style.sec5arrowRotated : ""}`} ></span>
                  <span className={style.sec5qtxt1}>{faq.q}</span>
                </div>
                <div className={`${style.sec5a} ${openIndex === i ? style.sec5aOpened : ""}`} >
                  <h1 className={style.sec5atxt1}>{faq.a}</h1>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}