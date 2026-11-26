import {NextResponse} from 'next/server';
import {bookingSchema} from '@/lib/booking';

export async function POST(request:Request){
 const url=process.env.SUPABASE_URL;
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return NextResponse.json({error:'Website storage is unavailable.'},{status:503});
 if(request.headers.get('origin')!==new URL(request.url).origin)return NextResponse.json({error:'Invalid origin.'},{status:403});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return NextResponse.json({error:'Expected JSON.'},{status:415});
 try{
  const body=await request.text();
  if(body.length>4800)return NextResponse.json({error:'Request too large.'},{status:413});
  const result=bookingSchema.safeParse(JSON.parse(body));
  if(!result.success)return NextResponse.json({error:'Check the booking details.'},{status:400});
  const response=await fetch(new URL('/rest/v1/website_bookings',url),{method:'POST',headers:{apikey:key,Authorization:'Bearer '+key,'content-type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(result.data),signal:AbortSignal.timeout(5000)});
  return response.ok?NextResponse.json({saved:true},{status:201}):NextResponse.json({error:'Could not save this request.'},{status:502});
 }catch{return NextResponse.json({error:'Could not save this request.'},{status:400});}
}
