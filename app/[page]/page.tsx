import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Intro,HowSteps,Coverage,ServicePhoto} from '@/components/sections/Editorial';
import FaqList from '@/components/sections/FaqList';
import EnquiryForm,{type EnquiryKind} from '@/components/sections/EnquiryForm';
import {AppShowcase,AppLinks} from '@/components/sections/Apps';
import {site,services,whatsappLink} from '@/lib/siteConfig';
import {faqGroups} from '@/lib/faq';
import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import terms from '@/lib/terms.json';
import privacy from '@/lib/privacy.json';

const pages={
 'how-it-works':['How it works','Arrange laundry or professional cleaning with Laundromat by MHOVE.'],
 about:['About Laundromat by MHOVE','One platform for professional care for clothes, households and facilities.'],
 download:['Download the Laundromat apps','Official iOS and Android links for the customer and vendor apps.'],
 vendors:['For service providers','Discover vendor onboarding and download the official Laundromat vendor app.'],
 'become-a-partner':['Become a partner','Contact Laundromat by MHOVE about joining the service provider network.'],
 businesses:['Commercial cleaning and business enquiries','Request a quote for office, hospitality and facility cleaning.'],
 faq:['Frequently asked questions','Find answers about services, bookings, payments and provider onboarding.'],
 support:['Customer and partner support','Ask Laundromat by MHOVE about services, orders and partnership.'],
 terms:['Terms and conditions','Read the Laundromat platform terms and conditions.'],
 privacy:['Privacy policy','Read how the Laundromat platform handles your information.']
} as const;
type PageKey=keyof typeof pages;
type Props={params:Promise<{page:string}>};
export function generateStaticParams(){return Object.keys(pages).map(page=>({page}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const key=(await params).page as PageKey;if(!Object.hasOwn(pages,key))return {};const [title,description]=pages[key];return{title,description,alternates:{canonical:site.url+'/'+key}}}

function ContactPanel({kind}:{kind:EnquiryKind}){return <section className="section theme-pearl"><div className="shell enquiry-layout"><div data-reveal><span className="eyebrow"><i/>Contact our team</span><h2>{kind==='Support'?'Tell us what':'Share your'} <em>{kind==='Support'?'you need.':'requirements.'}</em></h2><p className="lead">Add the service and a few details so the team can direct your enquiry.</p><div className="contact-list"><a href={'mailto:'+site.email}><Icon name="mail"/>{site.email}</a><a href={whatsappLink('Hello Laundromat by MHOVE, I have a '+kind.toLowerCase()+'.')} target="_blank" rel="noopener noreferrer"><Icon name="chat"/>{site.displayPhone}</a><Link href="/faq">Frequently asked questions <Icon name="forward" size={16}/></Link></div></div><EnquiryForm kind={kind}/></div></section>}
function Legal({doc}:{doc:typeof terms|typeof privacy}){return <><Intro title={doc.title} accent="" text={'Last updated '+doc.updated} eyebrow="Laundromat legal"/><section className="section theme-pearl"><article className="shell legal">{doc.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2>{s.blocks.map((b,i)=>b.type==='p'?<p key={i}>{b.text}</p>:<ul key={i}>{b.items?.map(item=><li key={item}>{item}</li>)}</ul>)}</section>)}<a className="text-link" href={doc.source}>View published policy<Icon name="forward" size={17}/></a></article></section></>}
function Route({name}:{name:PageKey}){
 switch(name){
  case 'how-it-works':return <><Intro title="Care that fits" accent="your day." text="From finding a service to arranging pickup, see how to get started." eyebrow="How it works" model="customer-phone" actions={<Link className="button ink" href="/book">Book a Pickup</Link>}/><HowSteps/><AppShowcase/></>;
  case 'download':return <><Intro title="Laundromat," accent="on your phone." text="Choose the customer app to explore available services or the vendor app to register and manage your business." eyebrow="Official apps" actions={<><Link className="button ink" href="#customer-app">Customer app</Link><Link className="button secondary" href="#vendor-app">Vendor app</Link></>}/><div id="customer-app"><AppShowcase qr/></div><div id="vendor-app"><AppShowcase vendor qr/></div></>;
  case 'vendors':return <><Intro title="You bring the expertise." accent="We help you connect." text="Grow your laundry, cleaning or facility care business by registering as a Laundromat service partner." eyebrow="For service providers" model="vendor-phone" actions={<><Link className="button ink" href="/become-a-partner">Become a Partner</Link><Link className="button secondary" href="#vendor-app">Download Vendor App</Link></>}/><section className="section theme-pearl"><div className="shell"><div className="editorial-head"><div><span className="eyebrow"><i/>Getting started</span><h2>Set up <em>your business.</em></h2></div><p className="lead">Register through the vendor app or contact the onboarding team with your questions.</p></div><div className="steps partner-steps">{[['Register','Enter your business details in the vendor app.'],['Complete verification','Follow the verification steps required for your services.'],['Set up services','Add your offering and availability where supported.'],['Manage requests','Use the vendor app to manage eligible bookings.']].map(([t,d],i)=><div key={t}><span>{String(i+1).padStart(2,'0')}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section><div id="vendor-app"><AppShowcase vendor/></div></>;
  case 'become-a-partner':return <><Intro title="Bring your business" accent="to Laundromat." text="Tell us about your services or start registration in the official vendor app." eyebrow="Partner onboarding" model="vendor-phone" actions={<AppLinks vendor/>}/><ContactPanel kind="Partner enquiry"/></>;
  case 'businesses':return <><Intro title="Cleaner spaces." accent="Better business." text="Arrange office cleaning and facility care for workplaces, hotels, retail spaces and managed properties." eyebrow="Commercial cleaning" model="scrubber" theme="navy" actions={<Link className="button primary" href="#quote">Request a Business Quote</Link>}/><div id="quote"><ContactPanel kind="Business quote"/></div></>;
  case 'about':return <><Intro title="Clean made" accent="effortless." text="Laundromat by MHOVE is a professional laundry, cleaning, hygiene and property-maintenance platform for individuals, households, businesses and organisations." eyebrow="About Laundromat" model="mop" actions={<Link className="button ink" href="/services">Explore Services</Link>}/><section className="section theme-pearl"><div className="shell feature-layout"><div className="detail-photo"><ServicePhoto service={services[1]}/></div><div className="feature-copy" data-reveal><h2>More time for <em>your day.</em></h2><p className="lead">From laundry and upholstery to offices and commercial properties, find the care you need and connect with a provider through one platform.</p></div></div></section><Coverage/></>;
  case 'faq':return <><Intro title="Frequently asked" accent="questions." text="Find practical answers about services, pickups, bookings and becoming a partner." eyebrow="Help centre"/><section className="section theme-pearl"><div className="shell"><FaqList/><div className="doc-actions"><Link href="/support" className="button ink">Contact Support</Link></div></div></section><JsonLd data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqGroups.flatMap(g=>g.items).map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}}/></>;
  case 'support':return <><Intro title="How can" accent="we help?" text="Contact us about orders, services and provider onboarding." eyebrow="Customer and partner support" model="customer-phone" actions={<Link className="button secondary" href="/faq">Browse FAQs</Link>}/><ContactPanel kind="Support"/></>;
  case 'terms':return <Legal doc={terms}/>;
  case 'privacy':return <Legal doc={privacy}/>;
 }
}
export default async function Page({params}:Props){const key=(await params).page as PageKey;if(!Object.hasOwn(pages,key))notFound();return <Route name={key}/>;}
