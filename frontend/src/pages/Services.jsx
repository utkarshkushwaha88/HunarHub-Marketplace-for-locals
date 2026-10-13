import { useEffect, useState } from "react";
import { serviceApi, apiErrorMessage } from "../lib/api";
import ServiceCard from "../components/service/ServiceCard";
import SearchBar from "../components/common/SearchBar";
import { motion } from "framer-motion";

const categories = ["All Categories", "Cobbler", "Potter", "Tailor", "Artisan", "Small Vendor"];
const mapService = (s) => ({ ...s, id: s._id, seller: s.entrepreneur?.businessName || "Local entrepreneur", rating: s.rating || 0, reviews: s.reviewCount || 0, emoji: "🛠️" });

export default function Services() {
  const [q, setQ] = useState(""); const [city,setCity]=useState(""); const [minPrice,setMinPrice]=useState(""); const [maxPrice,setMaxPrice]=useState(""); const [cat, setCat] = useState("All Categories");
  const [items, setItems] = useState([]); const [state, setState] = useState({loading:true,error:""});
  useEffect(() => {
    const timer = setTimeout(async () => {
      setState({loading:true,error:""});
      try {
        const {data}=await serviceApi.list({search:q||undefined,category:cat==="All Categories"?undefined:cat,city:city||undefined,minPrice:minPrice||undefined,maxPrice:maxPrice||undefined});
        const rows=(data.data.items||[]).map(mapService); setItems(rows); setState({loading:false,error:""});
      } catch(e) { setState({loading:false,error:apiErrorMessage(e,"Could not load services.")}); }
    },250); return ()=>clearTimeout(timer);
  },[q,cat,city,minPrice,maxPrice]);
  return <main className="bg-background dark:bg-slate-950"><div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="max-w-3xl"><span className="inline-flex rounded-full bg-accent-soft dark:bg-violet-950/40 px-3 py-1 text-xs font-extrabold tracking-wider text-accent">LOCAL SERVICES</span><h1 className="mt-4 text-4xl font-black tracking-tight text-primary dark:text-slate-100 sm:text-5xl">Skills you can rely on.</h1><p className="mt-4 text-lg leading-7 text-secondary dark:text-slate-400">Find skilled people ready to help with everyday work and specialist jobs.</p></motion.div>
    <div className="mt-9 grid gap-3 rounded-2xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 p-3 md:grid-cols-[minmax(0,1fr)_190px_140px_120px_120px]"><SearchBar value={q} onChange={e=>setQ(e.target.value)} placeholder="Search services..."/><input value={city} onChange={e=>setCity(e.target.value)} placeholder="City" className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold outline-none"/>
    <input value={minPrice} onChange={e=>setMinPrice(e.target.value)} type="number" min="0" placeholder="Min ₹" className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold outline-none"/>
    <input value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} type="number" min="0" placeholder="Max ₹" className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold outline-none"/>
    <select value={cat} onChange={e=>setCat(e.target.value)} className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold text-secondary dark:text-slate-400 outline-none"><option>{categories[0]}</option>{categories.slice(1).map(x=><option key={x}>{x}</option>)}</select></div>
    {state.error&&<p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-300">{state.error}</p>}
    <div className="mt-8 mb-4 text-sm font-semibold text-secondary dark:text-slate-400">{state.loading?"Loading services…":`${items.length} services found`}</div>
    {!state.loading&&!items.length?<div className="rounded-2xl border border-dashed border-secondary/30 bg-surface dark:bg-slate-900 p-12 text-center"><h3 className="font-extrabold">No services found.</h3><p className="mt-2 text-sm text-secondary dark:text-slate-400">Try another search or category.</p></div>:<div className="grid gap-5 md:grid-cols-2">{items.map(s=><ServiceCard key={s.id} s={s}/>)}</div>}
  </div></main>;
}
