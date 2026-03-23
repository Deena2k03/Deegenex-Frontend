"use client";
import style from "./nav.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [show, setShow] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    const lastScrollY = useRef(0);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY.current) {
                setShow(true);
            } else {
                setShow(false);
                setMenuOpen(false); // close menu on scroll
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", controlNavbar, { passive: true });
        return () => window.removeEventListener("scroll", controlNavbar);
    }, []);



    return (

        <div className={`${style.nav} ${show ? style.show : style.hide}`}>
            <div className={style.nav1}>
                {/* LOGO */}
                <div className={style.cmpimg}>
                    <div className={style.cmpimg1}>
                        <a href="#" ><Image src="/logo.png" alt="Logo" className={style.logo} width={150} height={150} /></a>
                    </div>
                    <div className={style.cmpname0}>
                        <a href="/" ><h1 className={style.cmpname}>DEEGENEX</h1>
                        <h1 className={style.cmpname1}>INTELLIGENCE FOR A BETTER FUTURE</h1> </a>
                    </div>
                </div>

                {/* MENU */}
                <div className={`${style.nav2} ${menuOpen ? style.active : ""}`}>
                    <a href="/" >Home</a>
                    <a href="/about_us">About Us</a>
                    <a href="/services">Services</a>
                    <a href="/career">Career</a>
                    <a href="/contact_us" className={style.ctnbtn}> Contact Us</a>
                </div>

                {/* DESKTOP BUTTON */}
                <div className={style.started}>
                    <button className={style.started1} onClick={() => router.push("/contact_us")}>Contact Us</button>
                </div>

                {/* HAMBURGER (MOBILE) */}
                <div  className={`${style.menuBtn} ${menuOpen ? style.open : ""}`} suppressHydrationWarning onClick={() => setMenuOpen(!menuOpen)} >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}