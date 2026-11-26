import type {Metadata} from 'next';
import Script from 'next/script';
import {site} from '@/lib/siteConfig';
import {Navigation,Footer,Utilities} from '@/components/ui/Chrome';
import {Ambient} from '@/components/ui/Ambient';
import Studio from '@/components/three/Studio';
import JsonLd from '@/components/ui/JsonLd';
import './globals.css';
const permitIndex=process.env.INDEX_WEBSITE==='true';
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:site.title,template:'%s | Laundromat by MHOVE'},description:site.description,robots:{index:permitIndex,follow:permitIndex},icons:{icon:'/brand/brand-blue.webp'},openGraph:{type:'website',siteName:site.name,images:[{url:'/images/social.webp',alt:'Laundromat by MHOVE cleaning studio'}]},twitter:{card:'summary_large_image'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-NG"><head><link rel="preload" as="font" href="/fonts/display.woff2" type="font/woff2" crossOrigin="anonymous"/></head><body><Navigation/><Studio/><main id="main" tabIndex={-1}>{children}</main><Footer/><Ambient/><Utilities/><JsonLd data={{'@context':'https://schema.org','@type':'LocalBusiness',name:site.name,url:site.original,logo:site.url+'/brand/brand-blue.webp',telephone:site.displayPhone,email:site.email,priceRange:undefined,...(site.areasServed.length?{areaServed:site.areasServed}:{}),...(site.openingHours.length?{openingHours:site.openingHours}:{}),hasOfferCatalog:{'@type':'OfferCatalog',name:'Laundry, cleaning and property care'}}}/>{process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN&&<Script src="https://plausible.io/js/script.js" data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} strategy="afterInteractive"/>}</body></html>}
