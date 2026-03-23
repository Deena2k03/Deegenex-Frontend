"use client"

import { use } from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import style from "@/app/career/career.module.css"

export default function Career(props){

  const params = use(props.params)   // ✅ unwrap params
  const slug = params.slug

  const [job,setJob] = useState(null)

  useEffect(()=>{

    async function fetchJob(){

      const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}/`,
      { cache: "no-store" }
      )

      const data = await res.json()

      setJob(data)

    }

    fetchJob()

  },[slug])


  useEffect(() => {

    const items = document.querySelectorAll(".eyeList li");

    items.forEach(li => {

      const pupil = document.createElement("span");

      li.appendChild(pupil);

      li.addEventListener("mousemove", (e) => {

        const rect = li.getBoundingClientRect();

        const centerX = rect.left + 9;
        const centerY = rect.top + 9;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const angle = Math.atan2(deltaY, deltaX);
        const radius = 4;

        const moveX = Math.cos(angle) * radius;
        const moveY = Math.sin(angle) * radius;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;

      });

      li.addEventListener("mouseleave", () => {
        pupil.style.transform = `translate(0,0)`
      });

    });

  }, [job]);


  if(!job){
    return <div style={{padding:"100px",textAlign:"center"}}>Loading...</div>
  }


  return (

    <div className={style.sec1}>

      <div className={style.heroWrapper}>
        <Image
          src="/career22.png"
          className={style.careerimg}
          width={1500}
          height={1500}
          alt='team-img'
        />
      </div>

      <div className={style.sec1_1}>
        <h1 className={style.sec1_1txt1}>Join Deegenex</h1>
        <h1 className={style.sec1_1txt2}>Build Your Career With Purpose</h1>
        <h1 className={style.sec1_1txt3}>
          Be part of a team that engineers intelligent digital solutions and builds technology that shapes tomorrow’s businesses.
        </h1>

        <h1 className={style.sec1_1txt4}>
          <a href="#job"><span>Im Interested</span></a>
          <a href="/career#opening"><span>Opening Roles</span></a>
        </h1>
      </div>


      <div className={style.sec1_2} id='job'>

        <h1 className={style.sec1_2txt1}>{job.title}</h1>

        <h1 className={style.sec1_2tit}>Job Overview</h1>
        <h1 className={style.sec1_2des}>{job.overview}</h1>

        <h1 className={style.sec1_2tit}>Job Description</h1>
        <h1 className={style.sec1_2des}>{job.description}</h1>

        <h1 className={style.sec1_2tit}>Key Responsibilities</h1>
        <ul className={`${style.sec1_2list} eyeList`}>
          {job.responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h1 className={style.sec1_2tit}>Qualifications</h1>
        <ul className={`${style.sec1_2list} eyeList`}>
          {job.qualifications.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h1 className={style.sec1_2tit}>Technical Requirements</h1>
        <ul className={`${style.sec1_2list} eyeList`}>
          {job.technical.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h1 className={style.sec1_2tit}>Experience</h1>
        <ul className={`${style.sec1_2list} eyeList`}>
          {job.experience.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h1 className={style.sec1_2apbtn}>
          <Link href={`/career/apply?job_id=${job.id}&job_title=${encodeURIComponent(job.title)}`}>
    Apply Now
  </Link>
        </h1>

      </div>

    </div>

  );

}