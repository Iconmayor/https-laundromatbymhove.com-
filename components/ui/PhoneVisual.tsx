import Image from 'next/image';
const descriptions={overview:'Laundromat customer app home, vendors, orders and account on floating phones',welcome:'Laundromat customer app sign-in, home and account on floating phones',tracking:'Laundromat customer app orders and delivery tracking on floating phones'} as const;
type Variant=keyof typeof descriptions;
export default function PhoneVisual({variant='overview',caption,priority=false}:{variant?:Variant;caption?:string;priority?:boolean}){
 return <figure className={'phone-visual'+(caption?' has-caption':'')}><Image className="phone-visual-image" src={'/images/app/mockup-'+variant+'.png'} width={1122} height={1402} alt={descriptions[variant]} sizes="(min-width:1200px) 600px, (min-width:768px) 48vw, 92vw" priority={priority}/>{caption&&<figcaption>{caption}</figcaption>}</figure>;
}
const screens=[['login','Sign in'],['home','Discover services'],['vendors','Find nearby vendors'],['orders','My orders'],['tracking','Track your order'],['completed','Completed order'],['profile','Profile and account']];
export function AppScreenGallery(){
 return <section className="section theme-pearl app-screen-gallery"><div className="shell"><span className="eyebrow"><i/>Inside the customer app</span><h2>See the app <em>in action.</em></h2><p className="lead">Explore the actual Laundromat customer app screens, from sign-in and service discovery to tracking your orders.</p><div className="app-screen-track" tabIndex={0} aria-label="Scroll to explore the seven customer app screenshots">{screens.map(([key,label])=><figure key={key} className="app-screen-card"><div className="app-screen-frame"><Image src={'/images/app/'+key+'.png'} alt={label+' in the Laundromat customer app'} width={314} height={683} sizes="(min-width:768px) 230px, 48vw"/></div><figcaption>{label}</figcaption></figure>)}</div></div></section>;
}
