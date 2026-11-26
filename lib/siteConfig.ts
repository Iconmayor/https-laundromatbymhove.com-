export const site = {
  name: 'Laundromat by MHOVE',
  title: 'Laundromat by MHOVE | Laundry, Dry Cleaning, Home & Office Cleaning, Fumigation',
  description: 'Explore laundry pickup, garment care, home cleaning, office janitorial and pest control in Nigeria. Ask for a quote or arrange a pickup on WhatsApp.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://laundromat-by-mhove.vercel.app',
  original: 'https://laundromatbymhove.com',
  displayPhone: '+234 812 904 4751',
  email: 'support@laundromat.ng',
  customerIOS:'https://apps.apple.com/ng/app/laudromat/id6826253623',
  customerAndroid:'https://play.google.com/store/apps/details?id=com.mhoveappltd.laundromat',
  vendorIOS:'https://apps.apple.com/ng/app/laudromat-vendor/id6826253908',
  vendorAndroid:'https://play.google.com/store/apps/details?id=com.mhoveappltd.laundromat_vendor',
  agency:'https://www.abledigital.site/',
  // TODO: publish only owner-confirmed address, hours, operational coverage and social profiles.
  streetAddress: '', openingHours: [] as string[], areasServed: [] as string[], socials: [] as {name:string;url:string}[],
  // TODO: add approved quotes and consented customer names here.
  testimonials: [] as {quote:string; name:string}[],
};
export const brandLogos = {
  light: '/brand/laundromat-logo-light.png',
  blue: '/brand/laundromat-logo-blue.png',
} as const;
export const whatsappLink = (message: string) => `https://wa.me/${site.displayPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
export const stages = {
  'home-cleaning': {name:'Home', scene:'mop', title:['Fresh clothes.','Spotless spaces.'], theme:'#142c45', action:'Book Home Cleaning', description:'From wash-and-fold to deep home cleaning, office janitorial and fumigation, we collect, clean and deliver, so you get your time back.'},
  laundry: {name:'Laundry', scene:'white-shirt', title:['Beautifully washed.','Freshly pressed.'], theme:'#173f65', action:'Book a Pickup', description:'From a favourite shirt to a full week of laundry, arrange pickup and ask for the finish your fabrics need.'},
  'office-cleaning': {name:'Office', scene:'scrubber', title:['Clear desks.','Spotless workspaces.'], theme:'#101d34', action:'Get a Quote', description:'Arrange professional janitorial care for reception areas, meeting rooms and the floors that see everyone through the day.'},
  fumigation: {name:'Fumigation', scene:'sprayer', title:['Professional care.','Protected spaces.'], theme:'#113c3b', action:'Get a Quote', description:'Speak with a professional about pest management for your home or workplace and the preparation your property needs.'},
} as const;
export type Variant = keyof typeof stages;
export const variantOrder: Variant[] = ['laundry','home-cleaning','office-cleaning','fumigation'];
export type Service = {slug:string;name:string;short:string;title:[string,string];summary:string;audience:string;items:string[];model:string;photo:string;alt:string;theme:string;steps:string[];faq:[string,string][]};
export const services: Service[] = [
  {slug:'laundry',name:'Laundry & Dry Cleaning',short:'Garment care',title:['Premium','laundry care.'],summary:'From the white shirt you wear to work to the native attire you save for occasions, choose the care each piece needs.',audience:'Individuals, families and businesses',items:['Wash and fold','Wash and iron','Dry cleaning and steam pressing','Shirts, suits and trousers','Native and traditional attire','Delicate fabric care','Bedsheets, bedding and curtains','Laundry pickup and delivery'],model:'towels',photo:'laundry',alt:'Woman folding a towel at home',theme:'ice',steps:['Tell us which garments need care.','Agree collection details and flag delicate items.','Confirm your preferred finish and return arrangements.'],faq:[['Can I send native attire or delicate fabrics?','Yes. Describe the fabric and any care-label instructions when arranging your order.'],['How is pickup arranged?','Send your address and preferred collection time. The team confirms availability before collection.']]},
  {slug:'home-cleaning',name:'Residential & Deep Cleaning',short:'Home cleaning',title:['A home that','feels new.'],summary:'Choose the rooms and surfaces that need attention, from a lived-in kitchen to an entire move-in clean.',audience:'Residents, landlords and property managers',items:['General home and apartment cleaning','Residential deep cleaning','Kitchen and bathroom cleaning','Bedroom and living room care','Move-in and move-out cleaning','Comprehensive household cleaning'],model:'mop',photo:'home',alt:'Woman wearing gloves and wiping a kitchen worktop',theme:'pearl',steps:['Share your property size and priorities.','Confirm the rooms, materials and service scope.','Agree timing, access and the handover.'],faq:[['Can I request a move-in clean?','Yes. Include the property size, location and target move-in date.'],['Do I supply the equipment?','Confirm equipment, materials and access with the team before the appointment.']]},
  {slug:'office-cleaning',name:'Commercial & Office Janitorial',short:'Office cleaning',title:['Spotless','workspaces.'],summary:'Give reception, meeting rooms and busy shared spaces the right cleaning routine, with a scope that fits your working hours.',audience:'Offices, hotels, schools, retail and facilities teams',items:['Corporate offices and commercial properties','Workspace maintenance','Scheduled janitorial work','Office deep cleaning','Restroom and floor cleaning','Regular workplace hygiene'],model:'scrubber',photo:'office',alt:'A modern workplace with a polished floor',theme:'navy',steps:['Outline the building and access hours.','Agree a one-off or recurring service.','Confirm the quote and site handover.'],faq:[['Can cleaning be scheduled regularly?','Request a recurring plan with your preferred days and frequency.'],['How is a commercial quote prepared?','Share the location, floor area, service frequency and access requirements.']]},
  {slug:'fumigation',name:'Fumigation & Pest Control',short:'Pest control',title:['Safe, professional','pest control.'],summary:'Request professional pest management for your home or commercial property. The provider can advise on the appropriate assessment and treatment.',audience:'Households and commercial properties',items:['Residential pest management enquiries','Commercial pest management enquiries'],model:'sprayer',photo:'fumigation',alt:'Technician wearing protective equipment in a furnished room',theme:'teal',steps:['Describe the issue and property.','Discuss assessment and treatment options.','Follow the provider’s preparation and re-entry instructions.'],faq:[['What should I include in my enquiry?','Tell us the location, type of property and what you have observed.'],['How do I prepare for a visit?','Request instructions for the proposed treatment directly from the provider.']]},
  {slug:'upholstery-cleaning',name:'Upholstery & Carpet Care',short:'Fabric interiors',title:['A fresh start','for furnishings.'],summary:'Arrange care for the sofas, mattresses, rugs and carpets you use every day.',audience:'Homes, offices and hospitality',items:['Sofa and mattress cleaning','Rug and carpet care','Upholstery treatment','Steam cleaning where suitable'],model:'extractor',photo:'upholstery',alt:'Upholstery nozzle cleaning the cushion of a sofa',theme:'pearl',steps:['Describe the fabric and the item.','Discuss care-label requirements.','Agree the treatment and visit.'],faq:[['Can I enquire about a rug or sofa?','Yes. Include its size, material and any areas needing attention.']]},
  {slug:'post-construction-cleaning',name:'Post-Construction Cleaning',short:'After renovation',title:['From renovation','to ready.'],summary:'Ask about removing construction dust, residue and debris before you settle into a completed property.',audience:'Renovators, owners and facility managers',items:['Construction dust removal','Renovation cleanup','Residue removal','New property preparation'],model:'construction-vacuum',photo:'construction',alt:'Industrial vacuum in a room undergoing renovation',theme:'ice',steps:['Share your project scope.','Discuss residues, surfaces and access.','Agree the quote and inspection.'],faq:[['When should I arrange a clean?','Contact the team with your anticipated completion and handover dates.']]}
];
// TODO: the owner will supply the detailed fumigation and pest-control list.
export const packages = [
 ['Wash & fold','Everyday laundry, washed, dried and neatly folded.','laundry'],
 ['Wash & iron','Shirts and daily wear, pressed and ready for the wardrobe.','laundry'],
 ['Dry cleaning','Care for suits, native attire and delicate garments.','laundry'],
 ['Home deep clean','A room-by-room clean tailored to your property.','home-cleaning'],
 ['Office plan','Janitorial care matched to your team’s schedule.','office-cleaning'],
 ['Fumigation','Property assessment and treatment enquiries.','fumigation']
].map(([name,detail,service])=>({name,detail,service,from:null as number|null})); // TODO: approved naira prices.
export const journey = [['Book online','Choose your service and send your preferred time.'],['We pick up','Arrange laundry collection or access for an on-site service.'],['We clean','Your provider follows the agreed garment or property care instructions.'],['We deliver','Arrange the return of your clothes or the handover of your space.']];
export const track = (name:string,detail?:string)=>{ if(typeof window==='undefined')return; window.dispatchEvent(new CustomEvent('mhove:analytics',{detail:{event:name,service:detail}})); const w=window as Window & {plausible?:(name:string,options?:unknown)=>void}; w.plausible?.(name,detail?{props:{service:detail}}:undefined); };
