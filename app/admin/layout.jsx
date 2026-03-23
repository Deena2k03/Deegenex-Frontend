"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  CalendarRange, 
  Video, 
  ShieldCheck, 
  Briefcase,
  Fingerprint 
} from "lucide-react"
import Topbar from "./Topbar"
import AdminGuard from "@/components/AdminGuard" // Ensure this path matches where you saved the guard
import styles from "./admin-layout.module.css"

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  
  // 1. Don't apply layout or security guard to the login page itself
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const isSelected = (path) => pathname === path;

  const NavItem = ({ href, icon: Icon, label }) => (
    <Link 
      href={href} 
      className={`${styles.navLink} ${isSelected(href) ? styles.activeLink : ""}`}
    >
      <div className={styles.iconWrapper}>
        <Icon size={20} />
      </div>
      <span>{label}</span>
    </Link>
  );

  return (
    <AdminGuard>
      <div className={styles.layoutContainer}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.brandContainer}>
            <span className={styles.brandName}>Deegenex</span>
            <div className={styles.logoWrapper}>
              <img src="/logo.png" alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.divider}></div>
          </div>

          <nav className={styles.navScroll}>
            <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" />
            
            <div className={styles.navSection}>
              <p className={styles.sectionHeader}>CAREERS</p>
              <NavItem href="/admin/candidates" icon={Users} label="Candidates" />
              <NavItem href="/admin/jobs" icon={Briefcase} label="Manage Jobs" />
              <NavItem href="/admin/interview-calendar" icon={CalendarRange} label="Interviews" />
            </div>

            <div className={styles.navSection}>
              <p className={styles.sectionHeader}>MEETINGS</p>
              <NavItem href="/admin/meetings" icon={Video} label="Client Meetings" />
            </div>
          </nav>
        </aside>

        {/* MAIN AREA */}
        <div className={styles.contentWrapper}>
          <Topbar /> 
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  )
}