import { useEffect, useState } from "react";
import { entrepreneurApi, apiErrorMessage } from "../lib/api";
import EntrepreneurCard from "../components/entrepreneur/EntrepreneurCard";
import SearchBar from "../components/common/SearchBar";
import { motion } from "framer-motion";

const categories=["All","Cobbler","Potter","Tailor","Artisan","Small Vendor"];
const mapEntrepreneur=(e)=>({...e,id:e._id,location:e.location?.city||"Local",rating:e.rating||0,reviews:e.reviewCount||0,price:e.price||0,avatarUrl:e.avatarUrl||"",gallery:e.gallery||[]});

export default function Entrepreneurs(){
 const [q,setQ]=useState(""); const [city,setCity]=useState(""); const [cat,setCat]=useState("All"); const [items,setItems]=useState([]); const [state,setState]=useState({loading:true,error:""});
 useEffect(()=>{const t=setTimeout(async()=>{setState({loading:true,error:""});try{const {data}=await entrepreneurApi.list({search:q||undefined,category:cat==="All"?undefined:cat,city:city||undefined});setItems((data.data.items||[]).map(mapEntrepreneur));setState({loading:false,error:""});}catch(e){setState({loading:false,error:apiErrorMessage(e,"Could not load entrepreneurs.")});}},250);return()=>clearTimeout(t)},[q,cat,city]);
 return <main className="bg-background dark:bg-slate-950"><div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
  <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="max-w-3xl"><span className="inline-flex rounded-full bg-accent-soft dark:bg-violet-950/40 px-3 py-1 text-xs font-extrabold tracking-wider text-accent">DISCOVER LOCAL TALENT</span><h1 className="mt-4 text-4xl font-black tracking-tight text-primary dark:text-slate-100 sm:text-5xl">Find your local expert.</h1><p className="mt-4 text-lg leading-7 text-secondary dark:text-slate-400">Browse trusted entrepreneurs by skill, category, and location.</p></motion.div>
  <div className="mt-9 grid gap-3 rounded-2xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 p-3 md:grid-cols-[minmax(0,1fr)_160px_150px]"><SearchBar value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by skill or name..."/><input value={city} onChange={e=>setCity(e.target.value)} placeholder="City / location" className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold outline-none"/><select value={cat} onChange={e=>setCat(e.target.value)} className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold text-secondary dark:text-slate-400 outline-none"><option>All</option>{categories.slice(1).map(x=><option key={x}>{x}</option>)}</select></div>
  {state.error&&<p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-300">{state.error}</p>}
  <div className="mt-8 mb-4 text-sm font-semibold text-secondary dark:text-slate-400">{state.loading?"Loading entrepreneurs…":`${items.length} entrepreneurs found`}</div>
  {!state.loading&&!items.length?<div className="rounded-2xl border border-dashed border-secondary/30 bg-surface dark:bg-slate-900 p-12 text-center"><h3 className="font-extrabold">No local entrepreneurs found.</h3><p className="mt-2 text-sm text-secondary dark:text-slate-400">Try changing your category or search.</p></div>:<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(e=><EntrepreneurCard key={e.id} e={e}/>)}</div>}
 </div></main>
}
