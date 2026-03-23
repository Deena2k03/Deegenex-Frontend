"use client"

import { usePathname } from "next/navigation"
import Nav from "@/nav/layout"
import Foot from "@/footnote/layout"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

  const pathname = usePathname()

  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/career/apply") ||
    pathname.startsWith("/meeting")||
    pathname.startsWith("/reschedule")||
    pathname.startsWith("/career/success")

  return (
    <>
      {!hideLayout && <Nav />}
      {children}
      {!hideLayout && <Foot />}
    </>
  )
}