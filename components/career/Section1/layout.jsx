import style from './Section1.module.css'
import Image from 'next/image'

export default function section() {
    return (
        <>
        <div className={style.main}>
            <div className={style.sec1}>
                <div className={style.sec1con}>
                    <div className={style.sec1img}>
                        <Image src="/img2222.png" className={style.carimg} width={1500} height={1500} alt='career-img' />
                    </div>
                    <div className={style.sec1content}>
                        <h1 className={style.sec1txt1}>About Deegenex</h1>
                        <h1 className={style.sec1txt2}>Engineering The Future of Digital Innovation</h1>
                        <h1 className={style.sec1txt3}>Deegenex is a next-generation technology company focused on building intelligent digital solutions for modern businesses.</h1>
                        <h1 className={style.sec1txt3}>From custom web platforms to AI-powered systems, we design and develop scalable, secure, and future-ready ecosystems that help businesses grow faster in a digital-first world.</h1>
                        <h1 className={style.sec1txt3}>We don’t just create software.</h1>
                        <h1 className={style.sec1txt3}>We create impact.</h1>
                        <h1 className={style.sec1btn1}><a href='/about_us'>Learn More</a></h1>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}