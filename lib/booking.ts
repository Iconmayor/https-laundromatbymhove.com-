import {z} from 'zod';
import {services} from './siteConfig';
export function localDate(){const parts=new Intl.DateTimeFormat('en',{timeZone:'Africa/Lagos',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());return ['year','month','day'].map(name=>parts.find(part=>part.type===name)?.value).join('-');}
export const bookingSchema = z.object({
  name:z.string().trim().min(2,'Enter your name.').max(100),
  phone:z.string().trim().min(7,'Enter a contact number.').max(26).regex(/^\+?[\d\s()\-]{7,26}$/,'Enter a valid phone number.'),
  service:z.string().refine(s=>services.some(v=>v.slug===s),'Choose a service.'),
  address:z.string().trim().min(5,'Enter the service or collection address.').max(300),
  date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/,'Choose a date.').refine(s=>{const value=new Date(s+'T00:00:00Z');return Number.isFinite(value.getTime())&&value.toISOString().slice(0,10)===s},'Choose a valid date.').refine(s=>s>=localDate(),'Choose today or a future date.'),
  time:z.enum(['Morning','Afternoon','Evening','Flexible']),
  notes:z.string().trim().max(600,'Keep notes under 600 characters.').optional()
});
export type Booking = z.infer<typeof bookingSchema>;
export const bookingSummary=(b:Booking)=>['Hello Laundromat by MHOVE, I would like to arrange '+services.find(s=>s.slug===b.service)?.name+'.','Name: '+b.name,'Phone: '+b.phone,'Address: '+b.address,'Preferred: '+b.date+' ('+b.time+', WAT)',b.notes?'Notes: '+b.notes:''].filter(Boolean).join('\n');
