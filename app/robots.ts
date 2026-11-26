import type {MetadataRoute} from 'next';
import {site} from '@/lib/siteConfig';
export default function robots():MetadataRoute.Robots{const allow=process.env.INDEX_WEBSITE==='true';return {rules:{userAgent:'*',...(allow?{allow:'/'}:{disallow:'/'})},...(allow?{sitemap:site.url+'/sitemap.xml'}:{})}}
