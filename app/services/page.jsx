import Hero from '@/components/services/hero/layout'
import Section1 from '@/components/services/Section1/layout'
import Section2 from '@/components/services/Section2/layout'
import Section3 from '@/components/services/Section3/layout'


export const metadata = {
  title: "Our Services | Web & Mobile App Development | Deegenex",
  description: "Deegenex offers top-tier IT services in Salem & Hosur, including Fullstack Web Development, Mobile App Development, E-commerce solutions, and Digital Marketing.",
  keywords: [
    "Web Development Salem",
    "Mobile App Development Hosur",
    "Digital Marketing Services",
    "Fullstack Development India",
    "E-commerce Site Development",
    "Software Development Deegenex"
  ],
};

export default function services(){
    return(
        <>
        <Hero/>
        <Section1/>
        <Section2/>
        <Section3/>
        </>
    )
}