'use client';
import dynamic from 'next/dynamic';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
const Scene=dynamic(()=>import('./Scene'),{ssr:false});
let deviceCanRender:boolean|undefined;
function canUseWebGL(){
 if(deviceCanRender!==undefined)return deviceCanRender;
 try{
  const probe=document.createElement('canvas');
  const context=probe.getContext('webgl2',{antialias:false,alpha:true});
  const debug=context?.getExtension('WEBGL_debug_renderer_info');
  const renderer=debug?String(context?.getParameter(debug.UNMASKED_RENDERER_WEBGL)):'';
  deviceCanRender=!!context&&!/SwiftShader|llvmpipe|softpipe|Software Rasterizer/i.test(renderer);
  context?.getExtension('WEBGL_lose_context')?.loseContext();
 }catch{deviceCanRender=false;}
 return deviceCanRender;
}

export default function Studio(){
 const [live,setLive]=useState(false);
 const path=usePathname();
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const compact=matchMedia('(max-width: 767px) and (pointer: coarse)');
  const saveData=(navigator as Navigator&{connection?:{saveData:boolean}}).connection?.saveData;
  let handle=0,startup=0,rendererReady=false;
  function set(enabled:boolean,reason:string){
   setLive(enabled);
   document.documentElement.dataset.studio=enabled?'webgl':'fallback';
   document.documentElement.dataset.studioReason=reason;
   window.dispatchEvent(new Event('studio-mode'));
  }
  function check(){
   clearTimeout(handle);clearTimeout(startup);
   if(!document.querySelector('[data-stage]')){set(false,'no-scene');return;}
   if(reduced.matches||document.documentElement.dataset.motion==='paused'){set(false,'reduced-motion');return;}
   if(saveData||(compact.matches&&(navigator.hardwareConcurrency||8)<=4)){set(false,'low-power');return;}
   if(sessionStorage.getItem('studio-light')==='1'){set(false,'device-fallback');return;}
   handle=window.setTimeout(()=>{if(!canUseWebGL()){set(false,'webgl-unavailable');return;}set(true,'enabled');if(!rendererReady)startup=window.setTimeout(()=>{if(!rendererReady)set(false,'startup-timeout')},4500);},620);
  }
  const ready=()=>{rendererReady=true;clearTimeout(startup)};
  const fail=()=>{rendererReady=false;clearTimeout(startup);sessionStorage.setItem('studio-light','1');set(false,'webgl-unavailable')};
  check();
  window.addEventListener('studio-webgl-ready',ready);window.addEventListener('studio-motion',check);window.addEventListener('studio-fallback',fail);
  reduced.addEventListener('change',check);compact.addEventListener('change',check);
  return()=>{clearTimeout(handle);clearTimeout(startup);window.removeEventListener('studio-webgl-ready',ready);window.removeEventListener('studio-motion',check);window.removeEventListener('studio-fallback',fail);reduced.removeEventListener('change',check);compact.removeEventListener('change',check);};
 },[path]);
 return live?<Scene key={path}/>:null;
}
