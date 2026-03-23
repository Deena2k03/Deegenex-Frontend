import style from './footnote.module.css'
import { FiInstagram } from "react-icons/fi";
import { TbBrandLinkedin } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";
import Image from 'next/image'
import { IoMailOpenOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";

export default function footnote() {
    return (
        <>
            <div className={style.main}>
                <div className={style.fn}>
                    <div className={style.sec1}>
                        <div className={style.sec1gif}>
                            <Image src="/ftimg copy.png" className={style.gif} width={1500} height={1500} alt='Gif-img' />
                        </div>
                        <div className={style.sec1content}>
                            <div className={style.sec1log}>
                                <Image src="/logo.png" className={style.cmplogo} width={1500} height={1500} alt='Logo-img' />
                            </div>
                            <div className={style.sec12cpy}>
                                <h1 className={style.sec12copy}>&bull; Privacy Policy &nbsp;&bull; Terms of Service<br />© {new Date().getFullYear()} DEEGENEX. All Copyrights Reserved.</h1>
                            </div>
                        </div>
                    </div>
                    <div className={style.sec2}>
                        <div className={style.sec2_1}>
                            <h1 className={style.sec12copy1ico}><IoMailOpenOutline /></h1>
                            <h1 className={style.sec12copy1}><a href="mailto:info@deegenex.com">info@deegenex.com</a></h1>
                            <h1 className={style.sec12copy1ico}><FiPhoneCall /></h1>
                            <h1 className={style.sec12copy11}><a href="tel:+919500905154">+91 95009 05154</a></h1>
                        </div>
                        <div className={style.sec2_2}>
                            <h1 className={style.sec1navbtn}><a href="/"> Home</a></h1>
                            <h1 className={style.sec1navbtn}><a href="/about_us"> About Us</a></h1>
                            <h1 className={style.sec1navbtn}><a href="/services"> Services</a></h1>
                            <h1 className={style.sec1navbtn}><a href="/career"> Career</a></h1>
                            <h1 className={style.sec1navbtn}><a href="/contact_us"> Contact Us</a></h1>
                        </div>
                        <div className={style.sec2_3}>
                            <div className={style.sec2_31}>
                                <div className={style.sec1link}>
                                    <div className={style.sec1link1}>
                                        <h1 className={style.sec1linklog}><TbBrandLinkedin /></h1>
                                        <h1 className={style.sec1linktxt1}><a href='https://www.linkedin.com/company/110296280/admin/dashboard/' className={style.sec1linkAnchor}>Linkedin <span className={style.sec1linklog1}><MdArrowOutward /></span></a></h1>
                                    </div>
                                    <div className={style.sec1link1}>
                                        <h1 className={style.sec1linklog}><FiInstagram /></h1>
                                        <h1 className={style.sec1linktxt1}><a href='https://www.instagram.com/deegenex/' className={style.sec1linkAnchor}>Instagram <span className={style.sec1linklog1}><MdArrowOutward /></span></a></h1>
                                    </div>
                                </div>
                                <h1 className={style.sec1conttxt1}>4/55,33, First Cross, NGGOS Colony, Bagalur Road, <br/>Hosur - 635 109</h1>
                            </div>
                            <div className={style.sec2_32}>
                                 <div className={style.sec1contmap}>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d124530.51672827108!2d77.82529157689169!3d12.740887907352956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s4%2F55%2C33%2C%20First%20Cross%20NGGOS%20Colony%2C%20Bagalur%20Road%2C%20Hosur%20-%20635%20109!5e0!3m2!1sen!2sin!4v1769946671500!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={style.footerMap}></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.mobile}>
                <div className={style.msec1}>
                    <div className={style.msec1log}>
                        <Image src="/logo.png" className={style.mcmplogo} width={1500} height={1500} alt='Logo-img' />
                    </div>
                    <div className={style.mnav1}>
                        <h1 className={style.sec1mnavbtn}><a href="/"> Home</a></h1>
                        <h1 className={style.sec1mnavbtn}><a href="/about_us"> About Us</a></h1>
                        <h1 className={style.sec1mnavbtn}><a href="/services"> Services</a></h1>
                        <h1 className={style.sec1mnavbtn}><a href="/career"> Career</a></h1>
                        <h1 className={style.sec1mnavbtn}><a href="/contact_us"> Contact Us</a></h1>
                    </div>
                    <div className={style.msec2_1}>
                        <h1 className={style.msec12copy1ico}><IoMailOpenOutline className={style.mailIcon}/></h1>
                        <h1 className={style.msec12copy1}><a href="mailto:info@deegenex.com">info@deegenex.com</a></h1>
                        <h1 className={style.msec12copy1ico}><FiPhoneCall className={style.mailIcon}/></h1>
                        <h1 className={style.msec12copy11}><a href="tel:+919500905154">+91 95009 05154</a></h1>
                    </div>
                    <div className={style.msec2}>
                        <div className={style.card}>
                            <TbBrandLinkedin className={style.logo} />
                            <a href="https://www.linkedin.com/company/110296280/admin/dashboard/" className={style.linkRow} >
                                <span>Linkedin</span>
                                <MdArrowOutward className={style.arrow} />
                            </a>
                        </div>
                        <div className={style.card}>
                            <FiInstagram className={style.logo} />
                            <a href="https://www.instagram.com/deegenex/" className={style.linkRow} >
                                <span>Instagram</span>
                                <MdArrowOutward className={style.arrow} />
                            </a>
                        </div>
                    </div>
                    <div className={style.msec3}>
                        <h1 className={style.msec1conttxt1}>4/55,33, First Cross, NGGOS Colony, Bagalur Road, <br/>Hosur - 635 109</h1>
                        <div className={style.msec1contmap}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d124530.51672827108!2d77.82529157689169!3d12.740887907352956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s4%2F55%2C33%2C%20First%20Cross%20NGGOS%20Colony%2C%20Bagalur%20Road%2C%20Hosur%20-%20635%20109!5e0!3m2!1sen!2sin!4v1769946671500!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={style.mfooterMap}></iframe>
                        </div>
                    </div>
                    <div className={style.msec12cpy}>
                        <h1 className={style.msec12copy}>&bull; Privacy Policy &nbsp;&bull; Terms of Service<br />© {new Date().getFullYear()} DEEGENEX. All Copyrights Reserved.</h1>
                    </div>
                </div>
            </div>
        </>
    )
}