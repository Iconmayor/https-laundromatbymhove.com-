import Link from 'next/link';
import Stage from '../three/Stage';
import StoreLink from '../ui/StoreLink';
import {site} from '@/lib/siteConfig';

export function AppLinks({vendor=false}:{vendor?:boolean}){return <div className="store-links"><StoreLink kind="apple" role={vendor?'vendor':'customer'} href={vendor?site.vendorIOS:site.customerIOS}/><StoreLink kind="android" role={vendor?'vendor':'customer'} href={vendor?site.vendorAndroid:site.customerAndroid}/></div>}
export function AppShowcase({vendor=false,qr=false}:{vendor?:boolean;qr?:boolean}){return <section className={'section app-showcase theme-'+(vendor?'ice':'navy')} data-theme={vendor?'ice':'navy'}><div className="shell feature-layout">
 <div className="feature-art phone-art"><div className="art-orbit"/><Stage model={vendor?'vendor-phone':'customer-phone'} label={(vendor?'Vendor':'Customer')+' application on an animated smartphone'}/></div>
 <div className="feature-copy" data-reveal><span className="eyebrow"><i/>{vendor?'Vendor app':'Customer app'}</span><h2>{vendor?'Care for your business.':'Care at your'} <em>{vendor?'Reach more customers.':'fingertips.'}</em></h2><p className="lead">{vendor?'Use the vendor app to register your business and manage supported service requests.':'Discover available services and view your orders in the Laundromat customer app.'}</p><AppLinks vendor={vendor}/>{qr?<div className="qr-row"><img src={'/brand/'+(vendor?'vendor':'customer')+'-qr.png'} width="91" height="91" loading="lazy" alt={'Scan to open the '+(vendor?'vendor':'customer')+' iPhone listing'}/><p>Scan with an iPhone to open the App Store listing.</p></div>:<Link className="text-link" href={vendor?'/become-a-partner':'/download'}>{vendor?'Become a partner':'Explore the apps'}</Link>}</div>
 </div></section>}
