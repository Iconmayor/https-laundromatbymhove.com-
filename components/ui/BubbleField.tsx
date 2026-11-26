'use client';
import {useEffect,useRef} from 'react';

export default function BubbleField(){
 const field=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=field.current;
  if(!el)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let next=0;
  const bubbles=Array.from(el.children) as HTMLElement[];
  const hit=(event:Event)=>{
   if(motion.matches||document.documentElement.dataset.motion==='paused'||performance.now()<next)return;
   const {x,y}=(event as CustomEvent<{x:number;y:number}>).detail;
   const box=el.getBoundingClientRect();
   if(x<box.left||x>box.right||y<box.top||y>box.bottom)return;
   for(const b of bubbles){
    const r=b.getBoundingClientRect();
    if(!r.width||Math.hypot(x-r.x-r.width*.5,y-r.y-r.height*.5)>55)continue;
    next=performance.now()+180;
    b.animate([{opacity:.78,scale:1},{opacity:.96,scale:1.44,offset:.24},{opacity:0,scale:.1}],{duration:380,easing:'ease-out'});
    break;
   }
  };
  window.addEventListener('studio-brush',hit);
  return()=>window.removeEventListener('studio-brush',hit);
 },[]);
 return <div ref={field} className="studio-bubbles" aria-hidden="true">{Array.from({length:8},(_,i)=><i key={i} className="studio-bubble" style={{'--x':(8+i*11)+'%','--y':(20+(i*13)%62)+'%','--d':(10+i%3*2.9)+'s','--delay':(-1.7*i)+'s','--size':(14+(i*11)%32)+'px','--shift':(i%2?19:-15)+'px'} as React.CSSProperties}/>)}</div>;
}
