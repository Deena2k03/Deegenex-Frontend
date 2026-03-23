import style from './Section3.module.css'
import Image from 'next/image'

export default function Section(){
    return(
        <>
        <div className={style.main}>
            <div className={style.cont}>
                <div className={style.sec1}>
                    <div className={style.sec1img}>
                    </div>
                    <div className={style.content}>
                        <div className={style.content1}>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Ownership Mindset</h1>
                            <h1 className={style.contxt1}>At Deegenex, every team member takes responsibility beyond their role. We don’t just complete tasks — we build solutions that create impact.</h1>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Growth-Driven Environment</h1>
                            <h1 className={style.contxt1}>We encourage continuous learning, experimentation, and skill development. Your growth is directly linked to the value you create.</h1>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Collaboration Over Competition</h1>
                            <h1 className={style.contxt1}>We believe strong teams build strong companies. Open communication, mutual respect, and shared success define our culture.</h1>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Innovation First</h1>
                            <h1 className={style.contxt1}>We work with modern technologies, AI systems, and scalable digital platforms. If there’s a smarter way to build it — we build it.</h1>
                            <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Performance Over Titles</h1>
                            <h1 className={style.contxt1}>Impact matters more than designation. At Deegenex, growth is earned through contribution, ownership, and results.</h1>
                        </div>
                    </div>
                </div>
                <div className={style.sec2}>
                    <h1 className={style.sec2txt1}>OUR TEAM & CULTURE</h1>
                    <h1 className={style.sec2txt2}>We Build Technology With Ownership, Innovation and Purpose</h1>
                    <h1 className={style.sec2txt3}>Join a team where ideas matter, execution wins, and growth is constant.</h1>
                    <h1 className={style.sec2btn}><a href='#opening'>JOIN OUR TEAM</a></h1>
                </div>
            </div>
        </div>
        </>
    )
}