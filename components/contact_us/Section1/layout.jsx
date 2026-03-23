import style from "./Section1.module.css";
import Image from 'next/image'
import Link from "next/link"

export default function Section() {
    return (
        <>
            <div className={style.main}>
                <div className={style.sec1} id="book">
                    <h1 className={style.sec1tit}>Schedule a Strategy Call</h1>
                    <div className={style.sec1cont}>
                        <div className={style.sec1_1}>
                            <h1 className={style.sec1tit1}>Book a one-on-one consultation with our team to:</h1>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Understand your business requirements</h1>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Discuss timelines and budget</h1>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Get technical guidance</h1>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Explore scalable solutions</h1>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Clarify project scope</h1>
                            <h1 className={style.sec1tit2}>We value your time — meetings are structured, focused, and result-driven.</h1>
                            <h1 className={style.sec1tit21}>Select a date and time that works best for you.</h1>
                            <h1 className={style.sec1btn}><Link href="/meeting">Book a Meeting</Link></h1>
                        </div>
                        <div className={style.sec1_2}>
                            <Image src="/meeting.png" className={style.meet} width={1500} height={1500} alt='Meet-img' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}