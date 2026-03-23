import style from './Section4.module.css'
import Image from 'next/image'
import { RiArrowRightDoubleFill } from "react-icons/ri";

export default function section() {
    return (
        <>
            <div className={style.sec4}>
                <div className={style.sec4_1}>
                    <div className={style.sec4img}>
                        <Image src="/our-team.png" className={style.sec4img1} width={1500} height={1500} alt='Team-Culture-img' />
                    </div>
                    <div className={style.sec4cont}>
                        <h1 className={style.sec4conttxt1}>Our Team and Culture</h1>
                        <h1 className={style.sec4conttxt2}>“We don’t just build technology — we build people, teams, and futures.”</h1>
                        <h1 className={style.sec4conttxt3}>At DEEGENEX, our team-first culture values collaboration, trust, and shared growth. We nurture talent, celebrate ideas, and support one another to build a workplace where people feel inspired to do their best work.</h1>
                        <a href='#section6'><div className={style.sec4logimg}>
                            <div className={style.sec4logrou}>
                                <Image src="/shamina.png" className={style.software_develop} width={1500} height={1500} alt='Software-Developer-img' />
                            </div>
                            <div className={style.sec4logrou1}>
                                <Image src="/karthi.png" className={style.software_develop} width={1500} height={1500} alt='UI-UX-Designer-img' />
                            </div>
                            <div className={style.sec4logrou1}>
                                <Image src="/jd.png" className={style.software_develop} width={1500} height={1500} alt='Full-Stack-Developer-img' />
                            </div>
                            <h1 className={style.sec4imgtxtarr}>More <RiArrowRightDoubleFill className={style.sec4imgtxtarr1}/></h1>
                        </div></a>
                    </div>
                </div>
            </div>
        </>
    )
}