import Hero from '@/components/about_us/hero/layout'
import Section1 from '@/components/about_us/Section1/layout'
import Section2 from '@/components/about_us/Section2/layout'
import Section4 from '@/components/about_us/Section4/layout'
import Section5 from '@/components/about_us/Section5/layout'
import Section6 from '@/components/about_us/Section6/layout'


export const metadata = {
  title: "About Deegenex | Leading IT Agency in Salem & Hosur",
  description: "Learn more about Deegenex. We are a team of expert developers and digital marketers dedicated to providing intelligence for a better future through custom software.",
  keywords: ["About Deegenex", "IT Agency Salem", "Software Company Hosur", "Deegenex Team"],
};

export default function about(){
  return(
    <>
    <Hero/>
    <Section1/>
    <Section2/>
    <Section4/>
    <Section5/>
    <Section6/>
    </>
  )
}