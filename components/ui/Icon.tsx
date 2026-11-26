export type IconName='spark'|'bag'|'forward'|'down'|'phone'|'menu'|'close'|'check'|'chat'|'play'|'pause'|'cloth'|'home'|'office'|'spray'|'switch'|'chevron'|'apple'|'android'|'mail'|'plus'|'grid'|'clock';
const paths:Record<IconName,React.ReactNode>={
 spark:<><path d="M12 2c.9 5.9 3.6 8.7 9.5 10-5.9 1.1-8.6 4-9.5 10-1.2-6-3.7-9-9.5-10C8.3 10.7 10.8 7.9 12 2Z"/></>,
 bag:<><rect x="4" y="7" width="16" height="14" rx="3"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></>,
 forward:<><path d="M5 12h14m-6-6 6 6-6 6"/></>,down:<><path d="M12 3v17m-6-6 6 6 6-6"/></>,
 phone:<><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/></>,menu:<path d="M3 7h18M3 16h18"/>,close:<path d="m5 5 14 14M19 5 5 19"/>,
 check:<path d="m4 12 5 5L20 6"/>,chat:<><path d="M21 11a9 9 0 0 1-13 8l-5 1 1-5a9 9 0 1 1 17-4Z"/><path d="M9 8c.4 3.3 2.7 5.8 6 6l1-1.3-2.1-1.1-.7.8a6.2 6.2 0 0 1-2.5-2.6l.7-.7-1.1-2Z"/></>,
 play:<path d="m8 5 11 7-11 7Z"/>,pause:<><path d="M8 5v14m8-14v14" strokeWidth="2.8"/></>,
 cloth:<path d="m8 3-6 4 3 5 3-1v10h8V11l3 1 3-5-6-4c-1 3-7 3-8 0Z"/>,
 home:<><path d="m2 11 10-8 10 8m-17 0v10h14V11m-9 10v-6h4v6"/></>,
 office:<><path d="M4 21V3h11v18m0-13h5v13M2 21h20M7.5 7h1m2 0h1m-4 4h1m2 0h1m-4 4h1m2 0h1"/></>,
 spray:<><rect x="5" y="11" width="10" height="10" rx="2"/><path d="m7 11 1-5h5l1 5m-6-5V3h8m1 2 4-1m-4 4 3 1"/></>,
 switch:<><path d="m7 7-5 5 5 5m10-10 5 5-5 5"/></>,chevron:<path d="m6 9 6 6 6-6"/>,
 apple:<><path fill="currentColor" stroke="none" d="M16.3 1.5c.3 2-1.3 4.3-3.5 4.4-.3-1.9 1.7-4.1 3.5-4.4ZM20.5 16.4c-.6 1.5-2.3 5.2-4.3 5.2-1.2 0-1.7-.8-3.4-.8-1.5 0-2.1.8-3.3.8-1.8.1-5.7-5.5-5.7-9.8 0-3.5 2.3-5.7 4.8-5.7 1.6 0 2.6.9 3.8.9 1.2 0 2.4-1 4.1-1 1.7 0 3.2.8 4 2.1-3.4 1.8-3.5 6.4 0 8.3Z"/></>,
 android:<path d="m4 3 15 9-15 9V3Zm0 0 10 13M4 21l10-13"/>,mail:<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></>,
 plus:<path d="M12 5v14M5 12h14"/>,grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,clock:<><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>
};
export default function Icon({name,size=19}:{name:IconName,size?:number}){return <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>}
