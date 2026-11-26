'use client';
import Icon from './Icon';
import {track} from '@/lib/siteConfig';
export default function StoreLink({kind,role,href}:{kind:'apple'|'android';role:'customer'|'vendor';href:string}){const store=kind==='apple'?'App Store':'Google Play';return <a href={href} aria-label={'Download '+role+' app on '+store} className="store-link" target="_blank" rel="noopener noreferrer" onClick={()=>track(role+'_app_download_click',kind)}><Icon name={kind} size={23}/><span><small>{role==='vendor'?'Vendor app':'Customer app'}</small>{store}</span></a>}
