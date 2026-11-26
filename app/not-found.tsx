import Link from 'next/link';
import {Intro} from '@/components/sections/Editorial';
export default function NotFound(){return <Intro eyebrow="Page not found" title="This page is" accent="in the wash." text="Return home or explore our laundry and cleaning services." model="white-shirt" actions={<Link className="button ink" href="/">Return home</Link>}/>}
