'use client';
import React,{useMemo,useEffect,useRef,useState,useLayoutEffect,Suspense} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {PerformanceMonitor} from '@react-three/drei';
import {usePathname} from 'next/navigation';
import * as T from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {sweepPath,servicePath} from '@/lib/scrollTimeline';
import {timing} from '@/lib/easings';
gsap.registerPlugin(ScrollTrigger);
type Slot={el:HTMLElement;model:string;kind:string;x:number;y:number;w:number;h:number};
function useSlots(){const [slot,setSlot]=useState<Slot|null>(null);const path=usePathname();
 useEffect(()=>{let all:Slot[]=[];let raf=0;let prior:Slot|null=null;
 function choose(){raf=0;const mid=window.innerHeight*.52;let score=-1;let best:Slot|null=null;
  for(const s of all){const y=s.y-scrollY;const visible=Math.max(0,Math.min(innerHeight,y+s.h)-Math.max(0,y));if(visible<Math.min(80,s.h*.26))continue;const value=visible/Math.min(innerHeight,s.h)*2-Math.abs(y+s.h*.5-mid)/innerHeight;if(value>score){score=value;best=s}}
  if(best!==prior){if(prior)delete prior.el.dataset.live;prior=best;setSlot(best)}
 }
 function measure(){all=Array.from(document.querySelectorAll<HTMLElement>('[data-stage]')).map(el=>{const box=el.getBoundingClientRect();return{el,model:el.dataset.stage!,kind:el.dataset.kind||'product',x:box.x,y:box.y+scrollY,w:box.width,h:box.height}}).filter(s=>s.w>3&&s.h>3);choose()}
 const schedule=()=>{if(!raf)raf=requestAnimationFrame(choose)};const observer=new ResizeObserver(measure);observer.observe(document.body);const mut=new MutationObserver(measure);mut.observe(document.body,{subtree:true,attributes:true,attributeFilter:['data-stage']});window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',measure);window.addEventListener('studio-layout',measure);document.fonts?.ready.then(measure);
 measure();return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',measure);window.removeEventListener('studio-layout',measure);window.removeEventListener('scroll',schedule);mut.disconnect();observer.disconnect();if(prior)delete prior.el.dataset.live}},[path]);return slot;}
const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const models=new Map<string,Promise<T.Group>>();
function getModel(id:string){let p=models.get(id);if(!p){p=loader.loadAsync('/models/'+id+'.glb').then(g=>g.scene);models.set(id,p);p.catch(()=>models.delete(id))}return p}
function makeModel(source:T.Group){const obj=source.clone(true);const box=new T.Box3().setFromObject(obj);const center=box.getCenter(new T.Vector3());const size=box.getSize(new T.Vector3());const g=new T.Group();obj.position.sub(center);g.add(obj);g.scale.setScalar(1/Math.max(size.y,size.x*.85,size.z*.7,.001));return g}
function Lighting(){const {gl,scene}=useThree();useEffect(()=>{const factory=new T.PMREMGenerator(gl);const room=new RoomEnvironment();const env=factory.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.78;factory.dispose();room.dispose();return()=>{scene.environment=null;env.dispose()}},[gl,scene]);return <><hemisphereLight args={['#f3f7ff','#a9a5b2',1.05]}/><directionalLight position={[-3,5,4]} intensity={2.8} color="#fff3e4"/><directionalLight position={[4,1,-2]} intensity={2.4} color="#9ccfff"/><directionalLight position={[0,-2,3]} intensity={.42}/></>}
const dustEvent={x:0,y:0};
function Actor({slot}:{slot:Slot}){const holder=useRef<T.Group>(null);const accessories=useRef<T.Group>(null);const [model,setModel]=useState<T.Group|null>(null);const [extra,setExtra]=useState<T.Group[]>([]);const start=useRef(-1);const story=useRef({p:0});const pointer=useRef({x:0,y:0});const pathPoint=useMemo(()=>new T.Vector3(),[]);const head=useMemo(()=>new T.Vector3(),[]);const {size,gl,viewport,camera}=useThree();const anchor=useMemo(()=>new T.Vector3(),[]);const previously=useRef({x:0,y:0});
 const parts=useMemo(()=>model?{cords:model.getObjectByName('Cords'),drum:model.getObjectByName('Drum'),handle:model.getObjectByName('Handle'),cloth:model.getObjectByName('Cloth')}:null,[model]);
 useLayoutEffect(()=>{let active=true;setModel(null);setExtra([]);start.current=-1;const el=slot.el;delete el.dataset.live;
 getModel(slot.model).then(source=>{if(active)setModel(makeModel(source))}).catch(()=>{if(active)delete el.dataset.live});
 const ids=slot.kind==='hero'?({mop:['cloth','bottle','towels'],'white-shirt':['iron'],scrubber:['bucket'],sprayer:['bottle']}[slot.model]||[]):slot.kind==='laundry'?['cloth']:slot.kind==='washer'?['white-shirt']:slot.kind==='bucket'?['bucket']:[];
 Promise.all(ids.map(getModel)).then(arr=>{if(active)setExtra(arr.map(makeModel))}).catch(()=>{});
 const trigger=ScrollTrigger.create({trigger:el,start:'top bottom',end:'bottom top',onUpdate:self=>{story.current.p=self.progress}});story.current.p=trigger.progress;
 const move=(e:PointerEvent)=>{if(e.pointerType!=='mouse')return;pointer.current.x=(e.clientX/window.innerWidth-.5)*2;pointer.current.y=(e.clientY/window.innerHeight-.5)*2};window.addEventListener('pointermove',move,{passive:true});return()=>{active=false;delete el.dataset.live;trigger.kill();window.removeEventListener('pointermove',move)}},[slot.el,slot.model,slot.kind]);
 const last=useRef(0);
 useFrame((state,delta)=>{const root=holder.current;if(!root||!model||document.hidden)return;
 const t=state.clock.elapsedTime;if(start.current<0)start.current=t;const age=t-start.current;const p=story.current.p;const hero=slot.kind==='hero';const intro=hero&&slot.model==='mop'&&!slot.el.dataset.entered;const f=Math.min(1,age/timing.sweep);const frame=viewport.getCurrentViewport(camera,anchor);const wy=frame.height/size.height;const wx=frame.width/size.width;
 const relTop=slot.y-scrollY;const cx=slot.x+slot.w*.5;const cy=relTop+slot.h*.49;const fit=Math.min(slot.h*.86,slot.w*(slot.model==='mop'?1.2:1.05));let x=0,y=Math.sin(t*Math.PI*.5)*Math.min(11,slot.h*.02),z=0;const phone=slot.model.includes('phone');let tilt=phone?-.075:slot.model==='mop'?-.105:0;
 if(intro&&f<1){sweepPath.getPointAt(gsap.parseEase('power3.inOut')(f),pathPoint);x=pathPoint.x*Math.min(slot.w*.64,innerWidth*.26);y-=pathPoint.y*slot.h*.43;z=pathPoint.z*.35;tilt+=Math.sin(f*Math.PI*2)*.22}
 else {if(hero)slot.el.dataset.entered='true';servicePath.getPointAt(p,pathPoint);if(!hero){x+=pathPoint.x*slot.w*.32;y-=pathPoint.y*slot.h*.22;}if(slot.kind==='home'){x+=Math.sin(t*.9)*slot.w*.13;y+=Math.cos(t*1.8)*5;tilt+=Math.sin(t*.9)*.13}if(slot.kind==='office')x+=Math.sin(p*Math.PI*2)*slot.w*.14;}
 root.position.set((cx+x-size.width*.5)*wx,(size.height*.5-cy-y)*wy,z);
 const scalar=fit*wy*(intro?.84+.16*Math.min(1,f*2):1);
 root.scale.setScalar(scalar);
 root.rotation.y=T.MathUtils.damp(root.rotation.y,(phone?.07:slot.model==='scrubber'?.37:slot.model==='washer'?.20:-.13)+Math.sin(t*.52)*.095+pointer.current.x*.13+(p-.5)*.18,5,delta);
 root.rotation.z=T.MathUtils.damp(root.rotation.z,tilt+Math.sin(t*.63)*.028+pointer.current.x*.028,5,delta);root.rotation.x=T.MathUtils.damp(root.rotation.x,.045+pointer.current.y*.06,5,delta);
 if(parts?.cords){parts.cords.rotation.z=T.MathUtils.damp(parts.cords.rotation.z,Math.sin(t*1.6)*.044+(x-previously.current.x)*.004+pointer.current.x*.018,7,delta);parts.cords.rotation.x=Math.sin(t*1.22)*.025;}previously.current.x=x;
 if(parts?.drum)parts.drum.rotation.z=t*.77; model.traverse(o=>{const m=o as T.Mesh;if(m.morphTargetInfluences?.length)m.morphTargetInfluences[0]=.33+.28*Math.sin(t*1.43+p)});
 if(accessories.current)accessories.current.children.forEach((child,i)=>{const angle=t*.37+i*2.2;if(slot.kind==='laundry'){child.position.set(-.09+.16*Math.sin(p*Math.PI),.51+(1-p)*.8+.05*Math.sin(t),.14);child.rotation.z=(1-p)*.48;child.scale.setScalar(.59)}else if(slot.kind==='washer'){child.position.set(-.55+.44*p,.55-.48*p,.32);child.scale.setScalar(.36*(1-p)+.04)}else if(slot.kind==='bucket'){child.position.set(-.04,-.32,.03);child.scale.setScalar(.42)}else{child.position.set((i===0?-.35:.32)*(1+.12*Math.sin(angle)),(i===0?.16:i===1?-.15:.36)+.044*Math.sin(angle),-.15+.18*Math.sin(angle));child.rotation.set(.14*Math.sin(angle),-.3+.29*Math.cos(angle),-.21+.13*Math.sin(angle));child.scale.setScalar(i===2?.20:.29)}});
 if((intro||slot.kind==='home')&&t-last.current>.045){root.updateMatrixWorld();head.set(-.09,-.43,.03).applyMatrix4(root.matrixWorld).project(camera);dustEvent.x=(head.x+1)*size.width*.5;dustEvent.y=(-head.y+1)*size.height*.5;window.dispatchEvent(new CustomEvent('studio-brush',{detail:dustEvent}));last.current=t}
 if(age>.065&&slot.el.dataset.live!=='true')slot.el.dataset.live='true';
 // Clip the fixed renderer to the active art area while the same camera follows the next stop.
 gl.setScissorTest(false);gl.clear(true,true,true);const left=hero?Math.max(0,slot.x-(intro?slot.w*.6:0)):Math.max(0,slot.x);gl.setScissor(left,Math.max(0,size.height-(relTop+slot.h)),Math.min(size.width-left,slot.w+(intro?slot.w*.6:0)),Math.max(0,Math.min(size.height,relTop+slot.h)-Math.max(0,relTop)));gl.setScissorTest(true);
 });
 return <group ref={holder}>{model&&<primitive object={model}/>}<group ref={accessories}>{extra.map((o,i)=><group key={o.uuid}><primitive object={o} name={'Accessory'+i}/></group>)}</group>{model&&<Particles variant={slot.model} mobile={size.width<760}/>}</group>
}
function Particles({variant,mobile}:{variant:string;mobile:boolean}){const m=useRef<T.InstancedMesh>(null);const mist=useRef<T.Points>(null);const temp=useMemo(()=>new T.Object3D(),[]);const count=mobile?20:64;const seed=useMemo(()=>Array.from({length:count},(_,i)=>({x:Math.sin(i*78.1)*.46,y:((i*137)%101)/100,z:Math.cos(i*1.79)*.21,r:.003+(i%7)*.0019})),[count]);const points=useMemo(()=>{const a=new Float32Array(100*3);for(let i=0;i<100;i++){const q=(i+1)/100;a[i*3]=-.13-q*.6;a[i*3+1]=.37+(Math.sin(i*32)*.15-.04)*q;a[i*3+2]=.1+Math.cos(i)*q*.14}return a},[]);
 useFrame(({clock})=>{if(!m.current)return;const t=clock.elapsedTime;seed.forEach((s,i)=>{const life=(s.y+t*(.054+i%3*.009))%1;temp.position.set(s.x+Math.sin(t*.6+i)*.035,life*.92-.44,s.z+.07);const r=s.r*Math.min(1,life*12,(1-life)*15);temp.scale.setScalar(r);temp.updateMatrix();m.current!.setMatrixAt(i,temp.matrix)});m.current.instanceMatrix.needsUpdate=true;if(mist.current){mist.current.scale.setScalar(.83+Math.sin(t*1.7)*.15);(mist.current.material as T.PointsMaterial).opacity=.16+.12*Math.sin(t*1.7)}});
 return <><instancedMesh ref={m} args={[undefined,undefined,count]} frustumCulled={false}><sphereGeometry args={[1,mobile?8:14,8]}/><meshPhysicalMaterial color="#d9edff" metalness={.22} roughness={.09} iridescence={1} iridescenceIOR={1.37} clearcoat={1} thickness={.015} transparent opacity={.54} depthWrite={false}/></instancedMesh>{variant==='sprayer'&&<points ref={mist}><bufferGeometry><bufferAttribute attach="attributes-position" args={[points,3]}/></bufferGeometry><pointsMaterial size={.018} color="#e8fffc" transparent opacity={.21} depthWrite={false}/></points>}</>
}
class Boundary extends React.Component<{children:React.ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(){window.dispatchEvent(new Event('studio-fallback'))}render(){return this.state.failed?null:this.props.children}}
export default function Scene(){const slot=useSlots();const [dpr,setDpr]=useState(1.25);const [shown,setShown]=useState(true);useEffect(()=>{const fn=()=>setShown(!document.hidden);document.addEventListener('visibilitychange',fn);return()=>document.removeEventListener('visibilitychange',fn)},[]);return <div className="live-canvas" aria-hidden="true" style={{visibility:slot&&shown?'visible':'hidden'}}><Boundary><Canvas camera={{position:[0,0,7],fov:35,near:.1,far:40}} dpr={dpr} frameloop={slot&&shown?'always':'demand'} gl={{alpha:true,antialias:true,powerPreference:'high-performance',toneMapping:T.ACESFilmicToneMapping,outputColorSpace:T.SRGBColorSpace}} onCreated={({gl})=>{window.dispatchEvent(new Event('studio-webgl-ready'));gl.setClearColor(0,0);gl.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();window.dispatchEvent(new Event('studio-fallback'))},{once:true})}}><Lighting/><PerformanceMonitor iterations={5} bounds={()=>[26,53]} onDecline={()=>setDpr(1)} onFallback={()=>window.dispatchEvent(new Event('studio-fallback'))}/><Suspense fallback={null}>{slot&&<Actor slot={slot}/>}</Suspense></Canvas></Boundary></div>}
