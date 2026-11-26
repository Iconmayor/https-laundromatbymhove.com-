import type {Metadata} from 'next';
import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import {TrustStrip,ServiceIndex,ServiceChapter,WasherShowcase,HowSteps,Pricing,Testimonials,Coverage} from '@/components/sections/Editorial';
import {AppShowcase} from '@/components/sections/Apps';
import Compare from '@/components/sections/Compare';
import BookingForm from '@/components/sections/HomeBooking';
import {site,services} from '@/lib/siteConfig';

export const metadata:Metadata={alternates:{canonical:site.url}};
export default function Home(){return <>
 <Hero/><TrustStrip/><ServiceIndex/>
 {services.map((service,index)=><ServiceChapter key={service.slug} service={service} index={index}/>)}
 <WasherShowcase/><HowSteps/><Compare/><Pricing/><Testimonials/><AppShowcase/>
 <section className="partner-band theme-ice section" data-theme="ice"><div className="shell coverage-layout"><div data-reveal><span className="eyebrow"><i/>For service professionals</span><h2>Build your business <em>with us.</em></h2></div><Link className="button ink" href="/vendors">Explore vendor tools</Link></div></section>
 <Coverage/>
 <section id="book" className="section booking-section theme-navy" data-theme="navy"><div className="shell booking-layout"><div data-reveal><span className="eyebrow"><i/>Arrange a service</span><h2>Book a <em>pickup.</em></h2><p className="lead">Tell us what needs care. Your details open in WhatsApp so you can send the request and confirm a time with the team.</p></div><BookingForm/></div></section>
 </>}
