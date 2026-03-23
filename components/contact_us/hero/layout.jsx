import style from "./hero.module.css";
import Image from "next/image";

export default function Hero(){
    return(
        <div className={style.main}>
            <div className={style.sec1}>
                <Image 
                    src="/contacti.png" 
                    className={style.contactimg} 
                    width={1500} 
                    height={1500} 
                    alt='contact-img' 
                />

                <h1 className={`${style.sec1txt1} ${style.reveal} ${style.revealDelay1}`}>
                    <span>Let’s Connect & </span><br/>
                    Create Something Exceptional
                </h1>

                <p className={`${style.sec1txt2} ${style.reveal} ${style.revealDelay2}`}>
                    Whether you're looking to build powerful digital solutions, schedule a strategy call, or explore career opportunities at Deegenex, we’re just one message away.
                </p>

                <p className={`${style.sec1txt21} ${style.reveal} ${style.revealDelay3}`}>
                    We turn ideas into scalable, high-performing products — and it all starts with a conversation.
                </p>

                <div className={`${style.sec1txt3} ${style.reveal} ${style.revealDelay4}`}>
                    <a href="#book">Schedule a Meeting</a>
                </div>
            </div>
        </div>
    )
}