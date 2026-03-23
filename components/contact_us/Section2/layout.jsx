import style from "./Section2.module.css";
import Image from 'next/image'

export default function Section(){
    return(
        <>
        <div className={style.main}>
            <div className={style.sec1}>
                <h1 className={style.sec1tit}>Join Our Growing Team</h1>
                <h1 className={style.sec1tit2}>We’re always looking for passionate developers, designers, and problem-solvers who want to build impactful digital products.</h1>
                <div className={style.sec1cont}>
                    <div className={style.sec1_2}>
                    <Image src="/car.png" className={style.meet} width={1500} height={1500} alt='Meet-img' />
                    </div>

                    <div className={style.sec1_1}>
                        <h1 className={style.sec1tit1}>At Deegenex, you’ll get:</h1>
                        <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>A collaborative work environment</h1>
                        <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Real-world challenging projects</h1>
                        <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Growth-focused culture</h1>
                        <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Opportunities to innovate</h1>
                        <h1 className={style.sec2blk1parapoint}><span className={style.tick}></span>Career advancement support</h1>
                        <h1 className={style.sec1tit21}>Think you’re a great fit?</h1>
                        <h1 className={style.sec1btn}><a href="/career#opening">View Open Roles</a></h1>
                    </div>
                
                </div>
            </div>
        </div>
        </>
    )
}