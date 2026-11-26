'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {timing} from '@/lib/easings';

gsap.registerPlugin(ScrollTrigger);

export default function MotionEffects(){
 const path=usePathname();
 useEffect(()=>{
  const pref=matchMedia('(prefers-reduced-motion: reduce)');
  let restore=()=>{};
  function install(){
   restore();
   const reduced=pref.matches||document.documentElement.dataset.motion==='paused';
   const pointer=matchMedia('(pointer:fine)').matches;
   const cleanup:(()=>void)[]=[];
   const ctx=gsap.context(()=>{
    const bar=document.querySelector('.read-progress');
    if(bar)gsap.to(bar,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});
    if(reduced)return;
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>{
     gsap.fromTo(el,{y:18,opacity:.62},{y:0,opacity:1,duration:.65,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 97%',once:true}});
    });
    gsap.utils.toArray<HTMLElement>('.photo-reveal img').forEach(el=>{
     gsap.fromTo(el,{scale:1.1,yPercent:-3},{scale:1,yPercent:3,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:timing.scrub}});
    });
    gsap.utils.toArray<HTMLElement>('[data-stage]:not([data-kind=hero]) .stage-poster').forEach(el=>{
     gsap.fromTo(el,{yPercent:5,rotate:-3},{yPercent:-5,rotate:2,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:timing.scrub}});
    });
    gsap.utils.toArray<HTMLElement>('[data-theme]').forEach(el=>{
     const tint=getComputedStyle(el).getPropertyValue('--section-tint').trim();
     if(tint)ScrollTrigger.create({trigger:el,start:'top 62%',end:'bottom 38%',onToggle:t=>{
      if(t.isActive)gsap.to(document.documentElement,{duration:timing.theme,'--motion-tint':tint,overwrite:true});
     }});
    });
    gsap.utils.toArray<HTMLElement>('.step-progress i').forEach(el=>{
     gsap.fromTo(el,{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top 81%',end:'top 42%',scrub:1}});
    });
   });
   if(pointer&&!reduced){
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(el=>{
     const ry=gsap.quickTo(el,'rotationY',{duration:.24,ease:'power2.out'});
     const rx=gsap.quickTo(el,'rotationX',{duration:.24,ease:'power2.out'});
     let bounds:DOMRect;
     const enter=()=>{bounds=el.getBoundingClientRect();};
     const move=(e:PointerEvent)=>{if(!bounds)return; ry((e.clientX-bounds.left)/bounds.width*12-6); rx(6-(e.clientY-bounds.top)/bounds.height*12);};
     const leave=()=>{ry(0);rx(0);};
     gsap.set(el,{transformPerspective:750});
     el.addEventListener('pointerenter',enter);el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
     cleanup.push(()=>{el.removeEventListener('pointerenter',enter);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);ry.tween.kill();rx.tween.kill();gsap.set(el,{clearProps:'transform'});});
    });
   }
   let lenis:Lenis|undefined;
   let tick:((t:number)=>void)|undefined;
   if(!reduced&&pointer){lenis=new Lenis({lerp:timing.lerp,wheelMultiplier:timing.wheel,anchors:true});lenis.on('scroll',ScrollTrigger.update);tick=t=>lenis?.raf(t*1000);gsap.ticker.add(tick);}
   const id=requestAnimationFrame(()=>ScrollTrigger.refresh());
   restore=()=>{cancelAnimationFrame(id);ctx.revert();cleanup.forEach(fn=>fn());if(tick)gsap.ticker.remove(tick);lenis?.destroy();};
  }
  install();pref.addEventListener('change',install);window.addEventListener('studio-motion',install);
  return()=>{restore();pref.removeEventListener('change',install);window.removeEventListener('studio-motion',install);};
 },[path]);
 return null;
}
