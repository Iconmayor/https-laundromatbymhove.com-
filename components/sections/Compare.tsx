'use client';
import {useEffect,useRef,useState} from 'react';
import Icon from '../ui/Icon';
const surfaces=[{id:'marble',label:'Marble floor'},{id:'linen',label:'Linen'},{id:'kitchen',label:'Kitchen'}];
export default function Compare(){
 const [active,setActive]=useState(0),[value,setValue]=useState(50);
 const ref=useRef<HTMLDivElement>(null);const touched=useRef(false);
 useEffect(()=>{const el=ref.current;if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  let frame=0,start=0;const o=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)return;o.disconnect();const tick=(t:number)=>{if(touched.current||document.documentElement.dataset.motion==='paused')return;if(!start)start=t;const progress=Math.min(1,(t-start)/1150);setValue(Math.round(50+19*Math.sin(progress*Math.PI)));if(progress<1)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick)},{threshold:.6});o.observe(el);return()=>{o.disconnect();cancelAnimationFrame(frame)}
 },[]);
 const current=surfaces[active];
 return <section className="section compare theme-navy" data-theme="navy"><div className="shell">
   <div className="editorial-head" data-reveal><div><span className="eyebrow"><i/>See the difference</span><h2>From dull <em>to gleaming.</em></h2></div><p className="lead">Move the divider to explore how a finish can change across three surfaces.</p></div>
   <div className="surface-picker" aria-label="Choose a surface">{surfaces.map((s,i)=><button key={s.id} type="button" aria-pressed={active===i} onClick={()=>{touched.current=true;setActive(i);setValue(50)}}>{s.label}</button>)}</div>
   <div ref={ref} className="comparison" style={{'--split':value+'%'} as React.CSSProperties}>
      <img src={'/images/'+current.id+'-after.webp'} loading="lazy" alt={current.label+' after the illustrative treatment'}/>
      <img className="comparison-before" src={'/images/'+current.id+'-before.webp'} loading="lazy" alt={current.label+' before the illustrative treatment'}/>
      <span className="before-chip">Before</span><span className="after-chip">After</span>
      <span className="comparison-handle" aria-hidden="true"><i><Icon name="switch" size={21}/></i></span>
      <input type="range" aria-label={'Reveal before and after for '+current.label} min="0" max="100" value={value} onChange={e=>{touched.current=true;setValue(e.currentTarget.valueAsNumber)}}/>
   </div><p className="comparison-note">Illustrative surface studies.</p>
 </div></section>
}
