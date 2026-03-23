
import style from './Section1.module.css'
import Image from 'next/image'




export default function section() {
    return (
        <>
            <div className={style.sec1}>
                <div className={style.sec1blk1}>
                    <h1 className={style.sec1blk1txt1}>What We Do</h1>
                    <h1 className={style.sec1blk1para1}>DEEGENEX focuses on delivering solutions that help organizations unlock their full potential:</h1>
                    <h1 className={style.sec1blk1btn}><a href='/services' >More Services <span>&#9679;</span></a></h1>
                </div>
                <div className={style.sec1blk2}>
                    <Image src="/developlogo.png" className={style.develimg} width={1500} height={1500} alt='Developer-logo-img' />
                    <h1 className={style.sec1blk1sec1txt1}>Development Services</h1>
                    <h1 className={style.sec1blk1sec1para}>Web, mobile, and backend systems built to scale.</h1>
                </div>
                <div className={style.sec1blk2}>
                    <Image src="/uiuxlogo.png" className={style.develimg1} width={1500} height={1500} alt='UIUX-logo-img' />
                    <h1 className={style.sec1blk1sec1txt1}>Design & Experience</h1>
                    <h1 className={style.sec1blk1sec1para}>Human-centered UI/UX and brand identity design.</h1>
                </div>
                <div className={style.sec1blk2}>
                    <Image src="/gromar.png" className={style.develimg} width={1500} height={1500} alt='Growth&Market-logo-img' />
                    <h1 className={style.sec1blk1sec1txt1}>Growth & Marketing</h1>
                    <h1 className={style.sec1blk1sec1para}>SEO, digital strategy, performance ads, and social campaigns.</h1>
                </div>
                <div className={style.sec1blk2}>
                    <Image src="/ailogo.png" className={style.develimg} width={1500} height={1500} alt='AI-logo-img' />
                    <h1 className={style.sec1blk1sec1txt1}>AI & Data Intelligence</h1>
                    <h1 className={style.sec1blk1sec1para}>Smart automation, predictive analytics, and AI assistants.</h1>
                </div>
                <div className={style.sec1blk2}>
                    <Image src="/interntrain.png" className={style.develimg1} width={1500} height={1500} alt='Internship-logo-img' />
                    <h1 className={style.sec1blk1sec1txt1}>Training & Internships</h1>
                    <h1 className={style.sec1blk1sec1para}>Skill-building programs with real-world project experience.</h1>
                </div>
            </div>
        </>
    )
}