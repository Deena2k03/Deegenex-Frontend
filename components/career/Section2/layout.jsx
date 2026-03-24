"use client"

import style from './Section2.module.css'
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Section() {

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    async function fetchJobs(){
      try{
        const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/`,
  { cache: "no-store" }
)
        const data = await res.json()
        setJobs(data)
      }catch(err){
        console.error("Error fetching jobs:",err)
      }
    }
    fetchJobs()
  },[])

  return (
    <>
      <div className={style.main}>
        <div className={style.sec1} id='opening'>
          <div className={style.sec1_1}>

            <div className={style.sec1_1txt}>
              {jobs.length > 0 ? (
                <h1 className={style.sec1_1txt1}>We are Hiring !</h1>
              ) : (
                /* Wrapper with added margin and background */
                <div className={style.noJobsHeadingWrapper}>
                  <div className={style.noJobsIcon}>💼</div>
                  <h1 className={style.sec1_1txt1}>No Opening Jobs</h1>
                  <div className={style.glowBackground}></div>
                </div>
              )}
            </div>

            <div className={style.sec1card}>
              {jobs.map((job) => (
                <div key={job.slug} className={style.card}>
                  <div className={style.cardsec1}>
                    <div className={style.cardsec1round}>
                      <img
  src={job.image}
  alt={job.title}
  className={style.cardimg}
/>
                    </div>
                  </div>
                  <div className={style.cardsec2}>
                    <h1 className={style.sec1_1txt2}>{job.title}</h1>
                    <h1 className={style.sec1_1txt3}>{job.subtitle}</h1>
                    <Link href={`/career/${job.slug}`} className={style.sec1_1btn}>
    Apply
  </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
