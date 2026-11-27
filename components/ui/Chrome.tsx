'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {brandLogos,site,services,track,whatsappLink} from '@/lib/siteConfig';
import Icon from './Icon';
import BookAppLink from './BookAppLink';
export function Brand({light = false}: {light?: boolean}) {
  return (
    <Link className="brand" href="/" aria-label="Laundromat by MHOVE home">
      <img src={light ? brandLogos.light : brandLogos.blue} width="38" height="38" alt="" />
      <span>Laundromat<small>BY MHOVE</small></span>
    </Link>
  );
}
const MobileNav=dynamic(()=>import('./MobileNav'),{ssr:false});
const nav=[['/services','Services'],['/how-it-works','How it works'],['/vendors','For partners'],['/support','Support']];
export function Navigation(){const pathname=usePathname(); const [open,setOpen]=useState(false);const [visited,setVisited]=useState(false);
 useEffect(()=>{setOpen(false);let prev=scrollY; const scroll=()=>{const y=window.scrollY; document.documentElement.classList.toggle('hide-nav',y>125&&y>prev+1);prev=y;};const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);};window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('keydown',escape);return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('keydown',escape);document.documentElement.classList.remove('hide-nav')}},[pathname]);
 return <><a className="skip" href="#main">Skip to content</a><div className="read-progress" aria-hidden="true"/><header className={'topbar'+(open?' expanded':'')}><div className="nav-glass"><Brand light/><nav className="wide-nav" aria-label="Main navigation">{nav.map(([u,t])=><Link key={u} href={u} aria-current={pathname===u?'page':undefined}>{t}</Link>)}</nav><div className="nav-actions"><BookAppLink className="nav-book">Book now <Icon name="bag" size={16}/></BookAppLink><button type="button" className="mobile-menu icon-btn" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>{setVisited(true);setOpen(!open)}}><Icon name={open?'close':'menu'}/></button></div></div>{visited&&<MobileNav open={open} close={()=>setOpen(false)} links={[...nav,['/download','Download the apps'],['/faq','Frequently asked questions']]}/> }</header></>}
export function Utilities(){const path=usePathname();return <><a className="chat" href={whatsappLink('Hello Laundromat by MHOVE, I have a service enquiry.')} target="_blank" rel="noopener noreferrer" aria-label="Chat with Laundromat by MHOVE on WhatsApp" onClick={()=>track('whatsapp_click','chat')}><Icon name="chat" size={24}/></a>{path!=='/book'&&<BookAppLink className="mobile-book"><Icon name="bag" size={17}/>Book a pickup</BookAppLink>}</>}
export function Footer(){return <footer className="footer"><div className="shell"><div className="footer-head"><div><Brand/><h2>Clean made <em>effortless.</em></h2></div><BookAppLink className="button pale">Book a Pickup<Icon name="bag" size={17}/></BookAppLink></div><div className="footer-links"><div><h3>Our services</h3>{services.map(s=><Link key={s.slug} href={'/services/'+s.slug}>{s.name}</Link>)}</div><div><h3>Explore</h3>{[['/about','About us'],['/how-it-works','How it works'],['/businesses','For businesses'],['/vendors','For service partners'],['/become-a-partner','Become a partner'],['/download','Download the apps']].map(([u,t])=><Link key={u} href={u}>{t}</Link>)}</div><div><h3>Help & contact</h3><Link href="/faq">Frequently asked questions</Link><Link href="/support">Contact support</Link><a href={'mailto:'+site.email}>{site.email}</a><a href={whatsappLink('Hello, I have a Laundromat enquiry.')} target="_blank" rel="noreferrer">{site.displayPhone}</a><Link href="/terms">Terms & conditions</Link><Link href="/privacy">Privacy policy</Link></div></div><div className="footer-base"><span>© 2026 Laundromat by MHOVE</span><span>Designed &amp; Developed by <a href={site.agency} target="_blank" rel="noopener noreferrer">Able Digital</a></span></div></div></footer>}
