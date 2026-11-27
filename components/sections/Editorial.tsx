import Image from 'next/image';
import Link from 'next/link';
import Stage from '../three/Stage';
import PhoneVisual from '../ui/PhoneVisual';
import Icon, {type IconName} from '../ui/Icon';
import {site,services,packages,journey,type Service} from '@/lib/siteConfig';
import FloorDust from '../three/FloorDust';
import {featuredMedia} from '@/lib/serviceMedia';
import BubbleField from '../ui/BubbleField';

export function ServicePhoto({service,priority=false}:{service:Service;priority?:boolean}){
 return <div className="photo-reveal">
   <Image src={'/images/'+service.photo+'.webp'} alt={service.alt} fill priority={priority} sizes="(min-width: 1200px) 520px, (min-width: 768px) 46vw, 92vw"/>
 </div>
}

export function FeaturedPhoto({service,preview=false}:{service:Service;preview?:boolean}){
 const media=featuredMedia[service.slug];
 if(!media)return null;
 const src='/images/featured/'+media.file+'.webp';
 return <figure className={preview?'featured-inset':'featured-photo'}>
   <Image src={src} alt={media.alt} fill sizes={preview?'(min-width: 768px) 180px, 110px':'(min-width: 768px) 320px, 42vw'} style={{objectPosition:media.position}}/>
   {!preview&&(service.slug==='office-cleaning'||service.slug==='upholstery-cleaning'||service.slug==='fumigation')&&<figcaption>Service illustration</figcaption>}
 </figure>;
}

export function Intro({title,accent,text,eyebrow,model,label,actions,theme='ice'}:{title:string;accent:string;text:string;eyebrow:string;model?:string;label?:string;actions?:React.ReactNode;theme?:string}){
 return <section className={'page-intro section theme-'+theme} data-theme={theme}><div className={'shell intro-grid'+(model?' has-product':'')}>
   <div className="intro-copy"><span className="eyebrow"><i/>{eyebrow}</span><h1>{title} <em>{accent}</em></h1><p className="lead">{text}</p>{actions&&<div className="actions">{actions}</div>}</div>
   {model&&<div className="intro-art"><div className="art-orbit"/>{model==='customer-phone'||model==='vendor-phone'||model==='tracking-phone'?<PhoneVisual variant={model==='tracking-phone'?'tracking':'welcome'} caption={model==='vendor-phone'?'Customer app preview — vendor app interface differs.':undefined} priority/>:<Stage kind="intro" model={model} label={label||eyebrow+' 3D visual'}/>}</div>}
 </div></section>
}

export function TrustStrip(){
 const items:[IconName,string,string][]=[['bag','Pickup & delivery','Schedule garment care'],['home','Homes & offices','Find the right service'],['chat','WhatsApp booking','Confirm directly with the team']];
 return <section className="trust" aria-label="Service highlights"><div className="shell trust-grid">{items.map(([icon,title,detail])=><div key={title}><span className="trust-icon"><Icon name={icon} size={22}/></span><span><strong>{title}</strong><small>{detail}</small></span></div>)}</div></section>
}

export function ServiceIndex(){
 return <section id="services" className="section service-index theme-pearl" data-theme="pearl"><div className="shell" data-reveal>
   <div className="editorial-head"><div><span className="eyebrow"><i/>Explore our services</span><h2>Good care changes <em>everything.</em></h2></div><p className="lead">From your favourite shirt to the spaces you share, choose professional care that fits your day.</p></div>
   <div className="service-index-grid">{services.map(s=><Link key={s.slug} href={'#'+s.slug} className="index-card"><span>{s.short}</span><Icon name="down" size={15}/></Link>)}</div>
 </div></section>
}

const stageKind:Record<string,string>={laundry:'laundry','home-cleaning':'home','office-cleaning':'office',fumigation:'mist'};
export function ServiceChapter({service,index}:{service:Service;index:number}){
 const floor=service.slug==='home-cleaning';
 return <section id={service.slug} tabIndex={-1} aria-label={service.name} className={'section chapter theme-'+service.theme+(index%2?' chapter-swap':'')} data-theme={service.theme}>
   <div className="shell chapter-grid">
     <div className="chapter-copy" data-reveal><span className="eyebrow"><i/>{service.name}</span><h2>{service.title[0]} <em>{service.title[1]}</em></h2><p className="lead">{service.summary}</p><ul className="detail-list">{service.items.slice(0,4).map(item=><li key={item}><Icon name="check" size={15}/>{item}</li>)}</ul><Link className="button ink" href={'/services/'+service.slug}>Explore {service.short.toLowerCase()}<Icon name="forward" size={18}/></Link></div>
     <div className={'chapter-art '+(floor?'chapter-floor':'')}>
       {floor?<><div className="chapter-marble"/><FloorDust/><span className="photo-caption">Illustrative floor study</span></>:<ServicePhoto service={service}/>}
       <div className="art-scrim"/><Stage kind={stageKind[service.slug]||'product'} model={service.model} label={'3D demonstration for '+service.name}/>{(floor||service.slug==='laundry')&&<BubbleField/>}<FeaturedPhoto service={service} preview/>{service.slug==='post-construction-cleaning'&&<Link className="chapter-clip" href="/services/post-construction-cleaning#cleanup-video"><Icon name="play" size={16}/>Watch cleaning video</Link>}
     </div>
   </div>
 </section>
}

export function WasherShowcase(){
 return <section className="section washer-band theme-ice" data-theme="ice"><div className="shell feature-layout">
   <div className="feature-art"><div className="art-orbit"/><Stage model="washer" kind="washer" label="Animated front-loading washer with garments inside"/></div>
   <div className="feature-copy" data-reveal><span className="eyebrow"><i/>Garment care</span><h2>From the wash <em>to the wardrobe.</em></h2><p className="lead">Choose wash and fold, ironing or dry cleaning. Tell us about care labels, delicate fabrics and any items that need special attention when you arrange collection.</p><Link className="text-link" href="/services/laundry">See laundry options <Icon name="forward" size={18}/></Link></div>
 </div></section>
}

export function HowSteps(){return <section className="section how-section theme-pearl" data-theme="pearl"><div className="shell">
 <div className="editorial-head" data-reveal><div><span className="eyebrow"><i/>How it works</span><h2>Pickup. Clean. <em>Deliver. Done.</em></h2></div><p className="lead">Pick a service, tell us where you need it and agree a time with the team.</p></div>
 <div className="step-progress" aria-hidden="true"><i/></div>
 <ol className="steps">{journey.map(([label,text],i)=><li key={label}><span>{String(i+1).padStart(2,'0')}</span><h3>{label}</h3><p>{text}</p></li>)}</ol>
 </div></section>}

export function Pricing(){return <section id="pricing" className="section pricing theme-ice" data-theme="ice"><div className="shell"><div className="editorial-head" data-reveal>
 <div><span className="eyebrow"><i/>Packages</span><h2>Find the right <em>fit.</em></h2></div><p className="lead">Share a few details about your garments or property and request a quote.</p></div>
 <div className="pricing-grid">{packages.map(p=><article key={p.name} className="price-card" data-tilt><h3>{p.name}</h3><p>{p.detail}</p><Link className="text-link" href={'/book?service='+p.service}>{p.from===null?'Request a quote':'From ₦'+p.from.toLocaleString('en-NG')} <Icon name="forward" size={16}/></Link></article>)}</div>
 </div></section>}

export function Coverage(){return <section className="section coverage theme-pearl" data-theme="pearl"><div className="shell coverage-layout"><div data-reveal><span className="eyebrow"><i/>Service availability</span><h2>Professional care, <em>closer to you.</em></h2><p className="lead">Tell us your area and the service you need. The team can confirm current availability for your address.</p></div><Link className="button ink" href="/book">Check your area <Icon name="forward" size={17}/></Link></div></section>}

export function Testimonials(){if(!site.testimonials.length)return null;return <section className="section theme-pearl"><div className="shell"><h2>From our <em>customers.</em></h2><div className="pricing-grid">{site.testimonials.map(t=><blockquote key={t.name+t.quote} className="price-card"><p>{t.quote}</p><cite>{t.name}</cite></blockquote>)}</div></div></section>}
