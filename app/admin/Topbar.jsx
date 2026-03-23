"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Bell, LogOut, UserCircle, Briefcase, Users, Clock, Mail, X, CheckCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./topbar.module.css";

export default function Topbar() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFullNotifications, setShowFullNotifications] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // New loading state
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- SECURE LOGOUT LOGIC ---
  const handleLogout = async () => {
    setIsLoggingOut(true);
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/admin-logout/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ refresh: refreshToken }) // Body must match backend expect
      });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.clear();
      router.push("/admin/login");
    }
  };

  const notifications = [
    { id: 1, title: "Candidate Applied", desc: "Software Engineer Position", time: "2m ago", icon: <Users size={18}/> },
    { id: 2, title: "System Alert", desc: "Server response time is high", time: "1h ago", icon: <Briefcase size={18}/> },
    { id: 3, title: "Message Received", desc: "From HR Dept", time: "3h ago", icon: <Mail size={18}/> },
    { id: 4, title: "Interview Scheduled", desc: "Technical round with Sarah", time: "5h ago", icon: <Clock size={18}/> },
  ];

  return (
    <header className={styles.topBar}>
      <div className={styles.topBarRight} ref={popupRef}>
        
        {/* Notification Bell */}
        <div className={styles.notificationWrapper}>
          <button 
            className={`${styles.iconButton} ${showNotifications ? styles.activeBtn : ""}`} 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={22} strokeWidth={1.5} />
            <span className={styles.notificationDot}></span>
          </button>

          {/* Mini Popup */}
          {showNotifications && (
            <div className={styles.notificationPopup}>
              <div className={styles.popupHeader}>
                <h3>Notifications</h3>
                <button className={styles.markReadBtn}><CheckCheck size={14}/> Mark all</button>
              </div>
              <div className={styles.popupList}>
                {notifications.slice(0, 3).map((n) => (
                  <div key={n.id} className={styles.notificationItem}>
                    <div className={styles.itemIcon}>{n.icon}</div>
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeader}>
                        <p className={styles.itemTitle}>{n.title}</p>
                        <span className={styles.itemTime}>{n.time}</span>
                      </div>
                      <p className={styles.itemDesc}>{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.viewAll} onClick={() => {setShowFullNotifications(true); setShowNotifications(false)}}>
                View All Notifications
              </button>
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin</span>
            <span className={styles.userRole}>SUPER ADMIN</span>
          </div>
          <UserCircle size={35} strokeWidth={1.5} className={styles.userIcon} />
        </div>

        {/* Logout Button with Loading State */}
        <button 
          className={`${styles.iconButton} ${styles.logoutBtn}`} 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? <Loader2 size={22} className={styles.spin} /> : <LogOut size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Full Screen Modal */}
      {showFullNotifications && (
        <div className={styles.fullScreenOverlay}>
          <div className={styles.fullScreenContent}>
            <div className={styles.fullHeader}>
              <h2>All Notifications</h2>
              <button className={styles.closeModal} onClick={() => setShowFullNotifications(false)}>
                <X size={24} />
              </button>
            </div>
            <div className={styles.fullList}>
              {notifications.map((n) => (
                <div key={n.id} className={styles.fullNotificationItem}>
                  <div className={styles.itemIconLarge}>{n.icon}</div>
                  <div className={styles.fullItemText}>
                    <div className={styles.itemHeader}>
                      <h4>{n.title}</h4>
                      <span className={styles.fullItemTime}>{n.time}</span>
                    </div>
                    <p>{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}