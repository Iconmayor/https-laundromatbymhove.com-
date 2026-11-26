'use client';
import {useState} from 'react';
import Icon from '../ui/Icon';
import {faqGroups} from '@/lib/faq';

export function Questions({items}:{items:[string,string][]}){return <div className="questions">{items.map(([q,a])=><details key={q}><summary>{q}<Icon name="plus" size={17}/></summary><p>{a}</p></details>)}</div>}
export default function FaqList(){const [search,query]=useState(''),[active,setActive]=useState('All');
 const q=search.trim().toLowerCase();
 const data=faqGroups.filter(g=>active==='All'||g.name===active).map(g=>({...g,items:g.items.filter(([title,text])=>!q||(title+' '+text).toLowerCase().includes(q))})).filter(g=>g.items.length);
 return <div className="faq-ui"><label className="faq-search">Search questions <input type="search" value={search} placeholder="Try “pickup” or “cleaning”" onChange={e=>query(e.currentTarget.value)}/></label><div className="surface-picker" aria-label="Filter questions">{['All',...faqGroups.map(g=>g.name)].map(g=><button key={g} type="button" aria-pressed={g===active} onClick={()=>setActive(g)}>{g}</button>)}</div>
 {data.map(g=><section key={g.name} className="faq-group"><h2>{g.name}</h2><Questions items={g.items}/></section>)}{!data.length&&<p role="status">No questions match that search. Try another term or choose All.</p>}
 </div>
}
