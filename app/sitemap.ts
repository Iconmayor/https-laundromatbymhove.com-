import type {MetadataRoute} from 'next';
import {services,site} from '@/lib/siteConfig';
export default function sitemap():MetadataRoute.Sitemap{return ['','/services','/book','/about','/how-it-works','/download','/vendors','/become-a-partner','/businesses','/faq','/support','/terms','/privacy',...services.map(s=>'/services/'+s.slug)].map(path=>({url:site.url+path}))}
