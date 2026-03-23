import style from './Section2.module.css'
import CircularProgress from "@/components/services/Section2/CircularProgress";
import Image from "next/image";
import departments from "./Servicesdata";

export default function Section() {
    return (
        <>
            <div className={style.main} id='work'>
                <div className={style.service}>
                    <div className={style.sec1}>
                        {/*Development Services*/}
                        <div className={style.section}>
                            {departments.map((dept, deptIndex) => (
                                <div key={deptIndex}>
                                    {/* Department Title */}
                                    <div className={` ${style.sticky_title} ${deptIndex > 0 ? style.smallTitle : ""} ${deptIndex % 2 === 0 ? style.blueTitle : style.darkBlueTitle} `} >
                                        <h1 className={style.sticky_title1}> {dept.departmentName} </h1> </div>
                                    <div className={style.cards}>
                                        {dept.services.map((service, serviceIndex) => (
                                        <div key={serviceIndex} className={`${style.card} ${ deptIndex === 1 ? style.specialTop : "" }`} >
                                                <div className={style.cardsec1}>
                                                    <h1 className={style.conttit}> {service.title} </h1>
                                                </div>
                                                <div className={style.cardsec2}>
                                                    <div className={style.cardcont}>
                                                        {/* Description */}
                                                        <div className={style.contsec1}>
                                                            <h1 className={style.contsec1cont1}>What We Do</h1>
                                                            <h1 className={style.contsec1cont}> {service.description} </h1>
                                                        </div>
                                                        {/* Highlights */}
                                                        <div className={style.contsec2}>
                                                            <h1 className={style.contsec1cont11}>
                                                                {deptIndex === departments.length - 1
                                                                    ? "Our Program Highlights"
                                                                    : "Our Project Highlights"}
                                                            </h1>
                                                            <div className={style.grid}>
                                                                {service.highlights.map((item, i) => (
                                                                    <h1 key={i} className={style.cardpoint}> <span className={style.tick}></span> {item} </h1>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {/* Metrics */}
                                                        <div className={style.contsec3}>
                                                            <h1 className={style.contsec1cont11}> Performance & Trust Metrics </h1>
                                                            <div className={style.grid1}>
                                                                {service.metrics.map((metric, i) => (
                                                                    <div key={i} className={style.propoin}>
                                                                        <CircularProgress percentage={metric.percentage} size={45} />
                                                                        <div className={style.contsec3pro1}>
                                                                            <h1 className={style.contsec3pro}> {metric.title} </h1>
                                                                            <h1 className={style.contsec3protxt}> {metric.text} </h1>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={style.cardimg}>
                                                        <Image src={service.image} className={style.serviceimg} width={1500} height={1500} alt={service.title} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}