"use client";
import style from './hero.module.css'
import { useRef, useEffect, useState } from "react";
import Image from "next/image";


export default function hero() {

    const [messages, setMessages] = useState([]);
    const [typedText, setTypedText] = useState("");
    const [typingBotText, setTypingBotText] = useState("");
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    const conversation = [
        {
            user: "I want to build a scalable web platform and automate my business processes.",
            bot: "Great choice! We develop high-performance web applications with secure backend systems and API integrations."
        },
        {
            user: "Can you also integrate AI to handle customer support and workflow automation?",
            bot: "Absolutely. We build AI chatbots, sales bots, and intelligent workflow automation tailored to your business."
        },
        {
            user: "That sounds good. How will I track performance and growth?",
            bot: "We provide real-time dashboards, KPI reporting, and data-driven marketing strategies to ensure measurable growth."
        }
    ];

    useEffect(() => {
        startConversation(0);
    }, []);

    const typeUserMessage = (text, callback) => {
        let i = 0;

        const interval = setInterval(() => {
            i++;
            setTypedText(text.slice(0, i));

            if (i >= text.length) {
                clearInterval(interval);
                setTimeout(callback, 500);
            }
        }, 35);
    };

    const typeBotMessage = (text, callback) => {
        let i = 0;
        setIsBotTyping(true);

        const interval = setInterval(() => {
            i++;
            setTypingBotText(text.slice(0, i));

            if (i >= text.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsBotTyping(false);
                    callback();
                }, 300);
            }
        }, 35);
    };

    const startConversation = (index) => {
        if (index >= conversation.length) {
            setShowPlaceholder(true);

            setTimeout(() => {
                setMessages([]);
                setTypedText("");
                setTypingBotText("");
                setIsBotTyping(false);
                setShowPlaceholder(false);
                startConversation(0);
            }, 5000);

            return;
        }

        // USER TYPES
        typeUserMessage(conversation[index].user, () => {
            setMessages(prev => [
                ...prev,
                {
                    text: conversation[index].user,
                    type: "user",
                    avatar: "/aiuser.png"
                }
            ]);

            setTypedText("");

            // Show placeholder briefly
            setShowPlaceholder(true);
            setTimeout(() => {
                setShowPlaceholder(false);
            }, 800);

            // BOT REPLY
            setTimeout(() => {
                typeBotMessage(conversation[index].bot, () => {
                    setMessages(prev => [
                        ...prev,
                        {
                            text: conversation[index].bot,
                            type: "bot",
                            avatar: "/bot.png"
                        }
                    ]);

                    setTypingBotText("");

                    setTimeout(() => {
                        startConversation(index + 1);
                    }, 1000);
                });
            }, 800);
        });
    };


    const videoRef1 = useRef(null);

    useEffect(() => {
        if (videoRef1.current) {
            videoRef1.current.playbackRate = .6;
        }
    }, []);



    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2;
        }
    }, []);


    return (
        <>
            <div className={style.main}>
                <div className={style.videobg}>
                    <video ref={videoRef1} src="/servicebg.mp4" autoPlay muted loop playsInline className={style.video} />
                    <div className={style.overlay}></div>
                    <div className={style.sec1}>
                        <h1 className={style.navtxt}><a href='/' className={style.navbtn}>Home</a> / Services</h1>
                        <h1 className={style.sec1txt1}>Our Services</h1>
                        <div className={style.sec1txt}>
                            <h1 className={style.sec1txt2}> {"Smart Solutions. Scalable Growth. Intelligent Innovation.".split(" ").map((word, wordIndex) => (<span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}> {word.split("").map((char, charIndex) => (<span key={charIndex} className={style.letter} style={{ animationDelay: `${(wordIndex * 10 + charIndex) * 0.03}s` }} > {char} </span>))} &nbsp; </span>))} </h1>
                            <h1 className={style.sec1txt3}>At DEEGENEX, we don’t just deliver services — we build intelligent ecosystems that help businesses scale, automate, and lead in the digital era. From powerful development to AI-driven automation, we transform ideas into impactful digital experiences.</h1>
                        </div>
                        <div className={style.sec1btn}>
                            <h1 className={style.sec1btn1}><a href='#work'>Get Start</a></h1>
                        </div>
                        <div className={style.sec2}>
                            <div className={style.sec2vid}>
                                <video ref={videoRef} className={style.bgVideo} src="/85590-590014592.mp4" autoPlay muted loop playsInline />
                                <div className={style.sec2Overlay}></div>
                            </div>
                            <div className={style.chatContainer}>
                                <div className={style.chatBox}>
                                    {messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`${style.messageRow} ${msg.type === "user" ? style.userRow : style.botRow
                                                }`}
                                        >{/*BOT IMAGE */}
                                            {msg.type === "bot" && (
                                                <Image src="/bot.jpg" width={40} height={40} alt="bot" className={style.avatar} />
                                            )}{/*USER IMAGE */}

                                            <div className={`${style.bubble} ${style[msg.type]} ${style.show}`}>
                                                {msg.text}
                                            </div>

                                            {msg.type === "user" && (
                                                <Image src="/aiuser.png" width={40} height={40} alt="user" className={style.avatar} />
                                            )}{/*BOT IMAGE */}
                                        </div>
                                    ))}

                                    {isBotTyping && (
                                        <div className={`${style.messageRow} ${style.botRow}`}>
                                            <Image src="/bot.jpg" width={40} height={40} alt="bot" className={style.avatar} />
                                            <div className={`${style.bubble} ${style.bot} ${style.show}`}>
                                                {typingBotText}
                                                <span className={style.cursor}></span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={style.inputContainer}>
                                    <div className={style.inputBox}>
                                        {typedText ? (
                                            <>
                                                {typedText}
                                                <span className={style.cursor}></span>
                                            </>
                                        ) : (
                                            <>
                                                <span className={style.placeholder}>
                                                    Start your message....
                                                </span>
                                                {!isBotTyping && <span className={style.cursor}></span>}
                                            </>
                                        )}
                                    </div>
                                    <div className={style.sendBtn}>➤</div>
                                </div>
                            </div>
                            <div className={style.sec2text}>
                                <h1 className={style.sec2text1}>Engineered for Performance. Designed to Evolve.</h1>
                                <h1 className={style.sec2text2}>We build scalable web platforms that don’t just function — they adapt, optimize, and grow with your business.<br />Behind every seamless experience lies intelligent architecture built for the future.</h1>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}