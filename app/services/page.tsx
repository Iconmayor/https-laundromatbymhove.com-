import type {Metadata} from 'next';
import Link from 'next/link';
import {Intro,ServicePhoto,FeaturedPhoto} from '@/components/sections/Editorial';
import {services,site} from '@/lib/siteConfig';
import Icon from '@/components/ui/Icon';
import BookAppLink from '@/components/ui/BookAppLink';
export const metadata:Metadata={title:'Laundry and cleaning services',description:'Explore laundry and dry cleaning, residential cleaning, office janitorial, pest control, upholstery and post-construction cleaning.',alternates:{canonical:site.url+'/services'}};
export default function Services(){return <><Intro title="Professional care," accent="at your service." text="Six ways to care for the clothes, homes and workplaces in your day." eyebrow="Laundromat services" model="washer" actions={<BookAppLink className="button ink">Arrange a Service <Icon name="bag" size={18}/></BookAppLink>}/><section className="section theme-pearl"><div className="shell service-gallery">{services.map(s=><article className="gallery-card" key={s.slug} data-tilt><Link href={'/services/'+s.slug} className="card-photo"><ServicePhoto service={s}/><FeaturedPhoto service={s} preview/><img className="card-object" src={'/posters/'+s.model+'.webp'} alt="" loading="lazy"/></Link><div><h2><Link href={'/services/'+s.slug}>{s.name}</Link></h2><p>{s.summary}</p><Link className="text-link" href={'/services/'+s.slug}>Explore {s.short.toLowerCase()} <Icon name="forward" size={17}/></Link></div></article>)}</div></section></>}
