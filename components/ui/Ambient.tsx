'use client';
import dynamic from 'next/dynamic';
import {useEffect,useState} from 'react';
const MotionEffects=dynamic(()=>import('./MotionEffects'),{ssr:false});

export function Ambient(){
 const [active,setActive]=useState(false);
 useEffect(()=>{
  function start(){
   if(scrollY<12)return;
   setActive(true);window.removeEventListener('scroll',start);
  }
  start();window.addEventListener('scroll',start,{passive:true});
  return()=>window.removeEventListener('scroll',start);
 },[]);
 return <>
  <div className="ambient" aria-hidden="true">{Array.from({length:13},(_,i)=><span key={i} className="soap" style={{'--size':(11+(i*13)%39)+'px','--left':(i%2===0?1+(i*5)%13:84+(i*7)%14)+'%','--duration':(14+i%9*1.7)+'s','--delay':(-i*3.53)+'s','--drift':((i%2?1:-1)*(9+i*2))+'px'} as React.CSSProperties}/>)}</div>
  {active&&<MotionEffects/>}
 </>;
}
