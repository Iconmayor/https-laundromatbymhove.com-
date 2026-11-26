'use client';
import {useState} from 'react';
import Icon from '../ui/Icon';
import {constructionVideo} from '@/lib/serviceMedia';

export default function ConstructionVideo(){
 const [playing,setPlaying]=useState(false);
 return <section id="cleanup-video" className="section construction-video theme-ice"><div className="shell feature-layout">
   <div className="feature-copy" data-reveal><span className="eyebrow"><i/>Cleaning video</span><h2>See cleanup <em>in action.</em></h2><p className="lead">A cleaning clip from Pinterest.</p><a href={constructionVideo.pin} target="_blank" rel="noopener noreferrer" className="text-link">Watch on Pinterest <Icon name="forward" size={17}/></a></div>
   <div className="clip-frame">
     {playing?<iframe title="Cleaning video from Pinterest" src={constructionVideo.embed} allowFullScreen allow="fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin"/>:<button className="clip-cover" type="button" onClick={()=>setPlaying(true)}><img src="/images/construction.webp" alt="" loading="lazy"/><span><Icon name="play" size={23}/>Play cleaning video</span></button>}
   </div>
 </div></section>
}
