'use client';
import dynamic from 'next/dynamic';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
const InlineBooking=dynamic(()=>import('./InlineBooking'),{ssr:false});

export default function HomeBooking(){
 const [ready,setReady]=useState(false);
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const panel=ref.current;
  if(!panel)return;
  const io=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setReady(true);io.disconnect();}},{rootMargin:'500px'});
  io.observe(panel);return()=>io.disconnect();
 },[]);
 return <div ref={ref}>{ready?<InlineBooking/>:<Link href="/book" className="button primary">Open the booking form</Link>}</div>;
}
