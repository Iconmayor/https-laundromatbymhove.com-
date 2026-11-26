import type {Metadata} from 'next';
import {site} from '@/lib/siteConfig';
import BookingPageForm from '@/components/sections/BookingPageForm';
import {Intro} from '@/components/sections/Editorial';

export const metadata:Metadata={title:'Book a pickup',description:'Request laundry pickup or professional cleaning with Laundromat by MHOVE. Arrange your preferred date on WhatsApp.',alternates:{canonical:site.url+'/book'}};
export default function Book(){return <>
  <Intro title="Book a" accent="pickup." text="Arrange laundry pickup or ask about cleaning at your address. The team confirms the scope, quote and timing in WhatsApp." eyebrow="Arrange a service" model="bucket"/>
  <section className="section theme-pearl"><div className="shell booking-layout"><div data-reveal><h2>Tell us what <em>needs care.</em></h2><p className="lead">Fill in your address and preferred time, then review your draft in WhatsApp.</p></div><BookingPageForm saveEnabled={!!(process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY)}/></div></section>
 </>}
