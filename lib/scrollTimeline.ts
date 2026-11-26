'use client';
import {CatmullRomCurve3,Vector3} from 'three';
export const sweepPath = new CatmullRomCurve3([new Vector3(.92,.79,.24),new Vector3(.60,-.22,.16),new Vector3(-.71,-.27,.08),new Vector3(-.28,-.58,.12),new Vector3(.34,-.41,.2),new Vector3(.1,.0,0)]);
export const servicePath = new CatmullRomCurve3([new Vector3(-.3,.23,0),new Vector3(.19,.07,.07),new Vector3(-.12,-.04,.11),new Vector3(.1,-.05,0)]);
