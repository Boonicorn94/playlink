"use client";

import { useMemo, useState } from "react";
import { Search, MapPin, CalendarDays, Users, ArrowUpRight, Plus, SlidersHorizontal, Heart, Trophy, Gamepad2, Camera, Utensils, Music2, Dumbbell, CircleUserRound, Wallet, Compass, MessageCircle, X, Check } from "lucide-react";

const activities = [
  {id:1,category:"Games",title:"Pool night at The Common",host:"Hosted by Jay",place:"Acton · 1.2 miles",time:"Tonight · 7:30 PM",spots:"3 spots left",price:"£8",tag:"Nearly full",image:"pool"},
  {id:2,category:"Sport",title:"5-a-side under the lights",host:"Hosted by Westside FC",place:"White City · 2.4 miles",time:"Tomorrow · 6:00 PM",spots:"5 spots left",price:"£7",tag:"Popular",image:"football"},
  {id:3,category:"Strategy",title:"Chess & coffee social",host:"Hosted by Mina",place:"Ealing · 2.1 miles",time:"Saturday · 11:00 AM",spots:"8 spots left",price:"Free",tag:"Beginner friendly",image:"chess"},
  {id:4,category:"Creative",title:"Street photography walk",host:"Hosted by Frame Club",place:"Notting Hill · 3.8 miles",time:"Sunday · 10:00 AM",spots:"6 spots left",price:"£5",tag:"New",image:"photo"},
  {id:5,category:"Gaming",title:"Mario Kart tournament",host:"Hosted by Pixel Social",place:"Shepherd’s Bush · 2.0 miles",time:"Saturday · 7:00 PM",spots:"12 spots left",price:"£10",tag:"Prize pot",image:"gaming"},
  {id:6,category:"Food",title:"Ramen cook-off",host:"Hosted by The Kitchen Table",place:"Chiswick · 3.1 miles",time:"Sunday · 4:00 PM",spots:"4 spots left",price:"£12",tag:"Small group",image:"food"},
];
const categories = [{name:"All",icon:Compass},{name:"Games",icon:Gamepad2},{name:"Sport",icon:Dumbbell},{name:"Creative",icon:Camera},{name:"Food",icon:Utensils},{name:"Gaming",icon:Gamepad2},{name:"Music",icon:Music2}];
const gradients:Record<string,string> = {pool:"pool",football:"football",chess:"chess",photo:"photo",gaming:"gaming",food:"food"};

export default function Home() {
  const [category,setCategory] = useState("All");
  const [query,setQuery] = useState("");
  const [saved,setSaved] = useState<number[]>([]);
  const [tab,setTab] = useState("Discover");
  const [showHost,setShowHost] = useState(false);
  const [joined,setJoined] = useState<number[]>([]);
  const visible = useMemo(()=>activities.filter(a=>(category==="All"||a.category===category)&& (a.title+" "+a.place+" "+a.category).toLowerCase().includes(query.toLowerCase())),[category,query]);
  const toggleSave=(id:number)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  return <main className="shell">
    <header className="topbar"><a className="brand" href="#"><span className="brand-mark">p.</span><span>PLAYLINK</span></a><button className="location"><MapPin size={15}/> West London <span className="chevron">⌄</span></button><button className="avatar">B</button></header>
    <section className="intro">
      <div className="eyebrow"><span className="live-dot"/> YOUR CITY IS YOUR PLAYGROUND</div>
      <h1>Find your<br/><em>next thing.</em></h1>
      <p>Good people. Great games. New stories.<br className="desktop"/> Get out there and make something happen.</p>
      <div className="search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="What are you in the mood for?"/><button aria-label="Filter"><SlidersHorizontal size={18}/></button></div>
      <div className="quick"><span><CalendarDays size={14}/> Today</span><span><MapPin size={14}/> Near me</span><span><Users size={14}/> Open spots</span></div>
    </section>
    <section className="category-row">{categories.map(c=>{const Icon=c.icon;return <button key={c.name} onClick={()=>setCategory(c.name)} className={category===c.name?"cat active":"cat"}><span><Icon size={17}/></span>{c.name}</button>})}</section>
    <section className="section-head"><div><div className="eyebrow">OUT THERE, RIGHT NOW</div><h2>Worth getting out for</h2></div><button className="text-link" onClick={()=>setCategory("All")}>See all <ArrowUpRight size={15}/></button></section>
    <section className="feature">
      <div className="feature-art"><div className="art-glow"/><span className="feature-stamp">TONIGHT<br/>IS YOURS</span><div className="feature-balls"><i/><i/><i/><i/><i/></div><span className="art-label">THE SOCIAL CLUB · ACTON</span></div>
      <div className="feature-copy"><span className="pill orange">FEATURED THIS WEEK</span><h3>Make a night<br/>of it.</h3><p>From friendly competition to new faces, your next favourite night starts here.</p><button className="dark-button" onClick={()=>setCategory("Games")}>Explore what's on <ArrowUpRight size={16}/></button></div>
    </section>
    <section className="section-head list-head"><div><div className="eyebrow">PICK YOUR PLANS</div><h2>{category==="All"?"Happening near you":category+" near you"}</h2></div><span className="result-count">{visible.length} ACTIVITIES</span></section>
    <section className="activity-grid">{visible.map(a=><article className="activity-card" key={a.id}><div className={"activity-art "+gradients[a.image]}><span className="pill art-pill">{a.tag}</span><button className={"save "+(saved.includes(a.id)?"saved":"")} onClick={()=>toggleSave(a.id)} aria-label="Save activity"><Heart size={17} fill={saved.includes(a.id)?"currentColor":"none"}/></button><div className="art-word">{a.category==="Sport"?"PLAY":a.category==="Creative"?"SEE":a.category==="Food"?"TASTE":a.category==="Gaming"?"LEVEL UP":a.category==="Strategy"?"THINK":"BREAK"}<small>OUT OF ROUTINE</small></div></div><div className="card-body"><div className="card-meta"><span>{a.category.toUpperCase()}</span><b>{a.price}</b></div><h3>{a.title}</h3><p className="host">{a.host}</p><div className="card-foot"><span><MapPin size={13}/>{a.place}</span><span><CalendarDays size={13}/>{a.time}</span></div><div className="card-action"><span className="spots">{a.spots}</span><button onClick={()=>setJoined(j=>j.includes(a.id)?j.filter(x=>x!==a.id):[...j,a.id])} className={joined.includes(a.id)?"joined":"join"}>{joined.includes(a.id)?<><Check size={14}/> Interested</>:"View activity"}</button></div></div></article>)}</section>
    {visible.length===0&&<div className="empty"><Search size={25}/><h3>No activities found</h3><p>Try another search or category.</p><button onClick={()=>{setQuery("");setCategory("All")}}>Clear filters</button></div>}
    <section className="host-banner"><div><span className="eyebrow">GOT SOMETHING IN MIND?</span><h2>Your people.<br/><em>Your rules.</em></h2><p>Bring people together. Host a game, a session, a challenge — make it yours.</p><button className="dark-button" onClick={()=>setShowHost(true)}>Start hosting <Plus size={17}/></button></div><div className="host-graphic"><div className="orbit o1"/><div className="orbit o2"/><span>HOST<br/>YOUR<br/>THING<span className="spark">✳</span></span></div></section>
    <footer><div className="brand"><span className="brand-mark">p.</span><span>PLAYLINK</span></div><p>More to play. More people to connect.</p><span className="copyright">© 2026 PLAYLINK · WEST LONDON</span></footer>
    <nav className="bottom-nav">{[{name:"Discover",icon:Compass},{name:"Play",icon:Trophy},{name:"Host",icon:Plus},{name:"Connect",icon:MessageCircle},{name:"Profile",icon:CircleUserRound}].map(n=>{const Icon=n.icon;return <button key={n.name} className={tab===n.name?"nav-item selected":"nav-item"} onClick={()=>n.name==="Host"?setShowHost(true):setTab(n.name)}><Icon size={19}/><span>{n.name}</span></button>})}</nav>
    {showHost&&<div className="modal-backdrop" onClick={()=>setShowHost(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowHost(false)}><X size={19}/></button><span className="eyebrow">BRING PEOPLE TOGETHER</span><h2>Host your first<br/><em>PLAYLINK.</em></h2><p>Create an activity, choose your venue and set the details. We'll help people find and join you.</p><label>What would you like to host?<input placeholder="e.g. Sunday five-a-side"/></label><label>Activity type<select defaultValue=""><option value="" disabled>Choose a category</option>{categories.slice(1).map(c=><option key={c.name}>{c.name}</option>)}</select></label><button className="dark-button full" onClick={()=>setShowHost(false)}>Save idea for later <ArrowUpRight size={16}/></button><small>This is a design preview. Hosting isn't published yet.</small></div></div>}
  </main>;
}