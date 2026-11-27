'use client';
import type {MouseEvent, ReactNode} from 'react';
import {site,track} from '@/lib/siteConfig';

export default function BookAppLink({className,children,service}:{className:string;children:ReactNode;service?:string}){
 function openStore(event:MouseEvent<HTMLAnchorElement>){
  if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
  const ua=navigator.userAgent;
  const android=/Android/i.test(ua);
  const ios=/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints>1);
  if(!android && !ios){track('book_app_click',service||'desktop');return;}
  event.preventDefault();
  track('customer_app_download_click',android?'android':'apple');
  window.location.assign(android?site.customerAndroid:site.customerIOS);
 }
 return <a className={className} href="/download#customer-app" onClick={openStore}>{children}</a>;
}
