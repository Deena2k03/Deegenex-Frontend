import style from "./Section3.module.css";
import Image from "next/image";

export default function Section3() {
  return (
    <section className={style.section}>
        <div className={style.sec1}>
                <h1 className={style.sec1txt1}>Tech That Scales</h1>
                <h1 className={style.sec1txt2}>Growth isn’t just about expansion — it’s about building systems that adapt, perform, and evolve. We create scalable digital ecosystems designed to handle complexity, accelerate innovation, and power long-term success without rebuilding from scratch.</h1>
            </div>
      <div className={style.container}>

        {/* LEFT SIDE */}
        <div className={style.left}>
  {[
    {
      title: "Vision Mapping",
      desc: "We translate your long-term business goals into a scalable technology roadmap, aligning infrastructure decisions with measurable growth milestones."
    },
    {
      title: "Intelligent Architecture",
      desc: "Our team engineers modular, cloud-native systems built for flexibility — allowing your platform to scale effortlessly as demand increases."
    },
    {
      title: "Experience Engineering",
      desc: "We craft high-performance user experiences optimized for speed, accessibility, and seamless engagement across devices and platforms."
    },
    {
      title: "Advanced Integration",
      desc: "From AI automation to third-party systems, we integrate powerful technologies that expand capabilities without increasing operational friction."
    },
    {
      title: "Performance Evolution",
      desc: "We continuously monitor, optimize, and enhance your systems to ensure stability, security, and peak efficiency at every growth stage."
    }
  ].map((item, i) => (
    <div key={i} className={style.card}>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      
    </div>
  ))}
</div>

        {/* RIGHT SIDE (Sticky Image) */}
        <div className={style.right}>
          <div className={style.imageWrapper}>
            <Image
              src="/tech-that-scale.png"
              alt="tech-that-scale"
              fill
              className={style.image}
            />
          </div>
        </div>

      </div>
    </section>
  );
}