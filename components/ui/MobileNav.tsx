'use client';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import Link from 'next/link';

export default function MobileNav({open,close,links}:{open:boolean;close:()=>void;links:string[][]}){
 const reduce=useReducedMotion();
 return <AnimatePresence>{open&&<motion.nav id="mobile-nav" aria-label="Mobile navigation" className="mobile-links" initial={{opacity:0,y:reduce?0:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>{links.map(([url,title])=><Link key={url} onClick={close} href={url}>{title}</Link>)}</motion.nav>}</AnimatePresence>;
}
