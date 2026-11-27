import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Intro,ServicePhoto,FeaturedPhoto,WasherShowcase} from '@/components/sections/Editorial';
import {Questions} from '@/components/sections/FaqList';
import GarmentPicker from '@/components/sections/GarmentPicker';
import ConstructionVideo from '@/components/sections/ConstructionVideo';
import {featuredMedia} from '@/lib/serviceMedia';
import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import BookAppLink from '@/components/ui/BookAppLink';
import {services,site} from '@/lib/siteConfig';

type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const s=services.find(v=>v.slug===slug);if(!s)return {};return {title:s.name,description:s.summary,alternates:{canonical:site.url+'/services/'+slug}}}
export default async function ServiceDetail({params}:Props){
 const {slug}=await params;const s=services.find(v=>v.slug===slug);if(!s)notFound();
 const quote=['office-cleaning','fumigation','post-construction-cleaning'].includes(s.slug);
 const href='/book?service='+slug;
 return <><Intro title={s.title[0]} accent={s.title[1]} text={s.summary} eyebrow={s.name} model={s.slug==='laundry'?'white-shirt':s.model} theme={s.theme} actions={<>{quote ? <Link className="button primary" href={href}>Get a Quote <Icon name="forward" size={18}/></Link> : <BookAppLink className="button primary" service={slug}>Arrange a Service <Icon name="forward" size={18}/></BookAppLink>}<Link className="button secondary" href="/services">All services</Link></>}/>
  <section className="section detail-section theme-pearl"><div className="shell feature-layout"><div className={featuredMedia[slug]?"detail-photo photo-pair":"detail-photo"}><ServicePhoto service={s}/><FeaturedPhoto service={s}/></div><div className="feature-copy" data-reveal><span className="eyebrow"><i/>{s.audience}</span><h2>What you can <em>request.</em></h2><ul className="detail-list">{s.items.map(t=><li key={t}><Icon name="check" size={16}/>{t}</li>)}</ul></div></div></section>
  {s.slug==='post-construction-cleaning'&&<ConstructionVideo/>}
  {s.slug==='laundry'&&<><GarmentPicker/><WasherShowcase/></>}
  <section className="section theme-ice"><div className="shell service-process"><div><span className="eyebrow"><i/>How to arrange it</span><h2>From request <em>to service.</em></h2><ol className="process-list">{s.steps.map((t,i)=><li key={t}><span>{String(i+1).padStart(2,'0')}</span>{t}</li>)}</ol></div><div><h2>Common <em>questions.</em></h2><Questions items={s.faq}/></div></div></section>
  <section className="section theme-navy"><div className="shell coverage-layout"><div><span className="eyebrow"><i/>{s.short}</span><h2>Tell us what <em>needs care.</em></h2></div>{quote ? <Link className="button primary" href={href}>Get a Quote<Icon name="bag" size={18}/></Link> : <BookAppLink className="button primary" service={slug}>Arrange a Service<Icon name="bag" size={18}/></BookAppLink>}</div></section>
  <JsonLd data={{'@context':'https://schema.org','@graph':[
   {'@type':'Service',name:s.name,description:s.summary,url:site.url+'/services/'+slug,provider:{'@type':'Organization',name:site.name,url:site.original}},
   {'@type':'FAQPage',mainEntity:s.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))},
   {'@type':'BreadcrumbList',itemListElement:[['Home',''],['Services','/services'],[s.name,'/services/'+slug]].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site.url+path}))}
  ]}}/>
 </>
}
