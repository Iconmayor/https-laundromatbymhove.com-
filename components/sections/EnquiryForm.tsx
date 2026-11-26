'use client';
import {useState} from 'react';
import Link from 'next/link';
import Icon from '../ui/Icon';
import {services,site,track,whatsappLink} from '@/lib/siteConfig';

export type EnquiryKind='Support'|'Business quote'|'Partner enquiry';
export default function EnquiryForm({kind}:{kind:EnquiryKind}){
 const [draft,setDraft]=useState<{email:string;whatsapp:string}|null>(null);
 const extra=kind!=='Support';
 const partner=kind==='Partner enquiry';
 function send(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  const fields=new FormData(e.currentTarget);
  const body=Array.from(fields.entries()).filter(([,value])=>String(value).trim()).map(([k,v])=>k+': '+String(v).trim()).join('\n');
  const email='mailto:'+site.email+'?subject='+encodeURIComponent(kind)+'&body='+encodeURIComponent(body);
  setDraft({email,whatsapp:whatsappLink('Hello Laundromat by MHOVE, I have a '+kind.toLowerCase()+'.\n\n'+body)});track('enquiry_draft',kind);
  window.location.assign(email);
 }
 return <form className="conversion-form" onSubmit={send}>
     <div className="form-grid">
     <label>Full name<input name="Name" autoComplete="name" required maxLength={100}/></label>
     <label>Email address<input name="Email" type="email" autoComplete="email" required maxLength={150}/></label>
     {extra&&<><label>Business name<input name="Business" autoComplete="organization" required maxLength={140}/></label><label>Phone number<input name="Phone" type="tel" autoComplete="tel" required maxLength={26}/></label></>}
     {partner&&<><label>State<input name="State" required maxLength={80}/></label><label>City<input name="City" required maxLength={80}/></label><label className="full">Business address<input name="Business address" autoComplete="street-address" required maxLength={200}/></label><label>Years in business<input name="Years in business" type="number" min={0} max={120}/></label></>}
     {kind==='Business quote'&&<><label>Property location<input name="Location" required maxLength={180}/></label><label>Cleaning frequency<select name="Frequency"><option>One-time</option><option>Weekly</option><option>Monthly</option><option>Other</option></select></label></>}
     <label>Service<select name="Service"><option>General enquiry</option>{services.map(s=><option key={s.slug}>{s.name}</option>)}</select></label>
     {!extra&&<label>Booking reference <small>(optional)</small><input name="Booking reference" maxLength={40}/></label>}
     <label className="full">Message<textarea name="Message" rows={4} required maxLength={800}/></label>
     </div>
     <label className="save-option"><input type="checkbox" required/>I agree to use my details for this enquiry. <Link href="/privacy">Privacy policy</Link></label>
     <button className="button ink" type="submit"><Icon name="mail" size={17}/>Open email draft</button>
     <p className="form-helper">Your email app opens with the draft ready for you to send.</p>
     {draft&&<div className="form-ready" role="status"><strong>Draft prepared.</strong><p><a href={draft.email}>Open email again</a> or <a href={draft.whatsapp} target="_blank" rel="noopener noreferrer">continue in WhatsApp</a>.</p></div>}
 </form>
}
