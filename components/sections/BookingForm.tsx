'use client';
import {Suspense,useCallback,useEffect,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {bookingSchema,bookingSummary,localDate,type Booking} from '@/lib/booking';
import {services,site,track,whatsappLink} from '@/lib/siteConfig';
import Icon from '../ui/Icon';

function InitialService({onService}:{onService:(value:string)=>void}){
 const service=useSearchParams().get('service');
 useEffect(()=>{
  if(service&&services.some(entry=>entry.slug===service))onService(service);
 },[service,onService]);
 return null;
}

export function BookingForm({readService=false,saveEnabled=false}:{readService?:boolean;saveEnabled?:boolean}){
 const {register,handleSubmit,resetField,getFieldState,formState:{errors}}=useForm<Booking>({resolver:zodResolver(bookingSchema),defaultValues:{name:'',phone:'',service:'',address:'',date:'',time:'Flexible',notes:''}});
 const preselect=useCallback((value:string)=>{if(!getFieldState('service').isDirty)resetField('service',{defaultValue:value});},[getFieldState,resetField]);
 const [minimumDate,setMinimumDate]=useState('');
 useEffect(()=>setMinimumDate(localDate()),[]);
 const [ready,setReady]=useState<{href:string;summary:string}|null>(null);
 const [store,setStore]=useState(false),[status,setStatus]=useState('');
 function submit(value:Booking){
  const summary=bookingSummary(value),href=whatsappLink(summary);
  setReady({href,summary});track('whatsapp_click',value.service);
  window.open(href,'_blank','noopener,noreferrer');
  if(saveEnabled&&store){setStatus('Saving a copy…');void fetch('/api/bookings',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(value)}).then(response=>setStatus(response.ok?'A copy was saved.':'The online copy could not be saved. Your WhatsApp draft is ready.')).catch(()=>setStatus('The online copy could not be saved. Your WhatsApp draft is ready.'))}
 }
 const error=(name:keyof Booking)=>errors[name]?.message?<span id={'err-'+name} className="field-error">{errors[name]?.message}</span>:null;
 const desc=(name:keyof Booking)=>errors[name]?'err-'+name:undefined;
 return <form className="conversion-form" onSubmit={handleSubmit(submit)} noValidate>
    {readService&&<Suspense fallback={null}><InitialService onService={preselect}/></Suspense>}
    <div className="form-grid">
    <label>Full name<input {...register('name')} autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={desc('name')}/>{error('name')}</label>
    <label>Phone number<input {...register('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 080…" aria-invalid={!!errors.phone} aria-describedby={desc('phone')}/>{error('phone')}</label>
    <label className="full">Service<select {...register('service')} aria-invalid={!!errors.service} aria-describedby={desc('service')}><option value="">Choose a service</option>{services.map(s=><option key={s.slug} value={s.slug}>{s.name}</option>)}</select>{error('service')}</label>
    <label className="full">Service or pickup address<input {...register('address')} autoComplete="street-address" placeholder="Street and area" aria-invalid={!!errors.address} aria-describedby={desc('address')}/>{error('address')}</label>
    <label>Preferred date<input {...register('date')} type="date" min={minimumDate||undefined} aria-invalid={!!errors.date} aria-describedby={desc('date')}/>{error('date')}</label>
    <label>Preferred time<select {...register('time')}><option>Flexible</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
    <label className="full">Notes <small>(optional)</small><textarea {...register('notes')} rows={2} placeholder="Anything we should know?" aria-invalid={!!errors.notes} aria-describedby={desc('notes')}/>{error('notes')}</label>
    </div>
    {saveEnabled&&<label className="save-option"><input type="checkbox" checked={store} onChange={e=>setStore(e.currentTarget.checked)}/>Save a copy of my request on the website.</label>}
    <button type="submit" className="button primary"><Icon name="chat" size={19}/>Continue to WhatsApp</button>
    <p className="form-helper">Send the draft in WhatsApp to request a time. <Link href="/privacy">Privacy policy</Link></p>
    {ready&&<div className="form-ready" role="status"><div className="confirmation-bubbles" aria-hidden="true"><i/><i/><i/><i/></div><strong><Icon name="check" size={18}/> Your WhatsApp draft is ready.</strong><p>{status||'Review your details, then tap Send. The team will confirm availability.'}</p><a href={ready.href} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a> <span aria-hidden="true">·</span> <a href={'mailto:'+site.email+'?subject=Service%20request&body='+encodeURIComponent(ready.summary)}>Use email</a></div>}
 </form>
}
