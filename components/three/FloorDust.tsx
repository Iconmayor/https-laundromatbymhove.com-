'use client';
import {useEffect,useRef} from 'react';

export default function FloorDust({hero=false}:{hero?:boolean}){
 const dust=useRef<HTMLCanvasElement>(null),sparkles=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  const canvas=dust.current;
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  if(!ctx)return;
  const sink=sparkles.current;
  const slots=Array.from(sink?.children||[]) as HTMLElement[];
  const floor=new Image();
  floor.src=hero?'/images/studio-dusty.webp':'/images/marble-before.webp';
  let rect={left:0,top:0,width:1,height:1},frame=0,first=0,particle=0,stampTime=0;
  const allowed=()=>!matchMedia('(prefers-reduced-motion: reduce)').matches&&document.documentElement.dataset.motion!=='paused';
  const stamp=(x:number,y:number,withSpark:boolean)=>{
   if(x<0||x>rect.width||y<rect.height*.48||y>rect.height)return;
   const a=x/rect.width*canvas.width,b=y/rect.height*canvas.height,r=Math.max(37,canvas.width*(hero?.091:.138));
   ctx.save();ctx.translate(a,b);ctx.scale(1,hero?.42:.58);
   const grad=ctx.createRadialGradient(0,0,0,0,0,r);
   grad.addColorStop(0,'rgba(0,0,0,1)');grad.addColorStop(.61,'rgba(0,0,0,.94)');grad.addColorStop(1,'rgba(0,0,0,0)');
   ctx.fillStyle=grad;ctx.globalCompositeOperation='destination-out';ctx.fillRect(-r,-r,2*r,2*r);ctx.restore();
   if(withSpark&&slots.length&&performance.now()-stampTime>133){stampTime=performance.now();const star=slots[particle++%slots.length];star.getAnimations().forEach(a=>a.cancel());star.style.transform='translate('+x+'px,'+(y-9)+'px)';star.animate([{opacity:0,scale:.3},{opacity:.92,scale:1,offset:.25},{opacity:0,scale:.2}],{duration:480,easing:'ease-out'});}
  };
  const paint=()=>{
   const {width,height}=canvas,ratio=Math.max(width/floor.naturalWidth,height/floor.naturalHeight);
   if(!allowed()||!floor.naturalWidth)return;
   const w=floor.naturalWidth*ratio,h=floor.naturalHeight*ratio;
   ctx.save();ctx.clearRect(0,0,width,height);ctx.beginPath();ctx.rect(0,hero?height*.47:0,width,hero?height*.53:height);ctx.clip();
   ctx.globalAlpha=hero?.72:.86;ctx.drawImage(floor,(width-w)*.5,(height-h)*(hero?.55:.5),w,h);ctx.restore();
  };
  const measure=()=>{const r=canvas.getBoundingClientRect();rect={left:r.left,top:r.top+scrollY,width:r.width||1,height:r.height||1};
   const width=Math.max(2,Math.round(rect.width*.56)),height=Math.max(2,Math.round(rect.height*.56));if(canvas.width===width&&canvas.height===height)return;
   canvas.width=width;canvas.height=height;paint();
  };
  const onBrush=(e:Event)=>{if(!allowed())return;const data=(e as CustomEvent<{x:number;y:number}>).detail;stamp(data.x-rect.left,data.y+scrollY-rect.top,true)};
  const fallback=(t:number)=>{if(!first)first=t;const p=Math.min(1,(t-first)/3200);if(document.documentElement.dataset.studio==='fallback'&&allowed())stamp(rect.width*(.88-.64*Math.sin(p*Math.PI)),rect.height*(.78+.075*Math.sin(p*Math.PI*2)),true);if(p<1)frame=requestAnimationFrame(fallback)};
  const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){io.disconnect();frame=requestAnimationFrame(fallback)}},{threshold:.27});io.observe(canvas);
  const observer=new ResizeObserver(measure);observer.observe(canvas);measure();floor.onload=paint;
  const motion=()=>{if(!allowed())ctx.clearRect(0,0,canvas.width,canvas.height);else paint()};
  window.addEventListener('studio-brush',onBrush);window.addEventListener('studio-motion',motion);
  return()=>{observer.disconnect();io.disconnect();window.removeEventListener('studio-brush',onBrush);window.removeEventListener('studio-motion',motion);cancelAnimationFrame(frame);floor.onload=null};
 },[hero]);
 return <><canvas className="floor-dust" ref={dust} aria-hidden="true"/><span className="sweep-sparkles" ref={sparkles} aria-hidden="true">{Array.from({length:12},(_,i)=><i className="sweep-spark" key={i}/>)}</span></>
}
