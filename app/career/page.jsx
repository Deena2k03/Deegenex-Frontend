import Hero from '@/components/career/hero/layout'
import Section1 from '@/components/career/Section1/layout'
import Section2 from '@/components/career/Section2/layout'
import Section3 from '@/components/career/Section3/layout'



export const metadata = {
  title: "Careers at Deegenex | Software Jobs in Salem & Hosur",
  description: "Join Deegenex. We are looking for talented Fullstack Developers, UI/UX Designers, and Digital Marketers to join our team in Salem and Hosur.",
  keywords: ["Software Jobs Salem", "IT Careers Hosur", "Fullstack Developer Openings", "Work at Deegenex"],
};



export default function Career(){
    return(
        <>
        <Hero/>
        <Section1/>
        <Section2/>
        <Section3/>
        </>
    )
}