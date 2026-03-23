import style from './Section2.module.css'
import Image from 'next/image'

export default function section() {
    return (
        <>
            <div className={style.sec2}>
                <div className={style.sec2blk1}>
                    <h1 className={style.sec1blk1txt1}>Why We’re Different</h1>
                    <h1 className={style.sec2blk1para1}>We believe technology should work for people — not the other way around. That’s why we focus on:</h1>
                    <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Future-ready AI and automation</h1>
                    <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Scalable, user-centric digital platforms</h1>
                    <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Results-driven strategies</h1>
                    <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Responsible, transparent practices</h1>
                </div>
                <div className={style.sec2blk2}>
                    <Image src="/why-diff.png" className={style.sec2blk2vid1} width={1500} height={1500} alt='Why-Different-img' />
                </div>
            </div>
        </>
    )
}