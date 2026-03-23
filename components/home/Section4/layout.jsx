import style from "./Section4.module.css";
import Image from "next/image";

const row1Logos = [
  "/ngnix.webp",
  "/postgresql.png",
  "/django.webp",
  "/python.png",
  "/AWS.png",
  "/fluter.png",
  "/kotlin.png",
];

const row2Logos = [
  "/linux.png",
  "/sql.png",
  "/react.png",
  "/java.png",
  "/figma.png",
  "/openaii.png",
  "/git.png",
];

export default function Hero() {
  
  return (
    <section className={style.hero}>
        <div className={style.sec1}>
                <h1 className={style.sec1txt1}>Built on the Future Stack</h1>
                <h1 className={style.sec1txt2}>We engineer solutions using a modern, high-performance tech ecosystem designed for speed, scalability, and seamless integration. Every tool in our stack is chosen to power innovation, accelerate growth, and keep your business ahead of the curve.</h1>
            </div>

      {/* ROW 1 */}
      <div className={style.marquee}>
        <div className={`${style.track} ${style.leftToRight}`}>
          {[...row1Logos, ...row1Logos, ...row1Logos].map((logo, i) => (
            <div key={i} className={style.card}>
              <Image
                src={logo}
                alt="tech logo"
                fill
                className={style.cardImg}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className={`${style.marquee} ${style.secondRow}`}>
        <div className={`${style.track} ${style.rightToLeft}`}>
          {[...row2Logos, ...row2Logos, ...row2Logos].map((logo, i) => (
            <div key={i} className={style.card}>
              <Image
                src={logo}
                alt="tech logo"
                fill
                className={style.cardImg}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CENTER LOGO */}
      <div className={style.centerLogo}>
        <Image
          src="/web1 copy.png"
          alt="DEEGENEX"
          width={250}
          height={250}
          className={style.centerLogoimg}
        />
      </div>

    </section>
  );
}