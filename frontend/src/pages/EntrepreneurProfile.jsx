import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import { MapPin, ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { motion } from "framer-motion";
import { entrepreneurApi, serviceApi, apiErrorMessage } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import ServiceCard from "../components/service/ServiceCard";
import RatingStars from "../components/common/RatingStars";
import VerifiedBadge from "../components/common/VerifiedBadge";

export default function EntrepreneurProfile(){
 const {id}=useParams();
 const { user } = useAuth();
 const [e,setE]=useState(null); const [services,setServices]=useState([]); const [error,setError]=useState("");
 useEffect(()=>{(async()=>{try{const [a,b]=await Promise.all([entrepreneurApi.get(id),serviceApi.list({entrepreneur:id})]);setE(a.data.data);setServices(b.data.data.items||[]);}catch(err){setError(apiErrorMessage(err,"Entrepreneur not found."));}})()},[id]);
 if(error)return <main className="grid min-h-[60vh] place-items-center bg-background dark:bg-slate-950"><div className="text-center"><p className="font-semibold">{error}</p><Link className="mt-4 inline-block text-accent font-bold" to="/entrepreneurs">Back to entrepreneurs</Link></div></main>;
 if(!e)return <main className="grid min-h-[60vh] place-items-center bg-background dark:bg-slate-950"><p className="font-semibold">Loading entrepreneur…</p></main>;
 const loc=[e.location?.city,e.location?.state].filter(Boolean).join(", ");
 const image = e.avatarUrl || e.gallery?.[0] || e.user?.avatarUrl || "";
 return <main className="bg-background dark:bg-slate-950"><div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10 lg:py-16">
  <Link to="/entrepreneurs" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-secondary dark:text-slate-400 hover:text-accent"><ArrowLeft size={16}/> Back to entrepreneurs</Link>
  <motion.section initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="overflow-hidden rounded-3xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 shadow-card dark:shadow-none">
   <div className="grid gap-7 bg-accent-soft dark:bg-violet-950/40 p-7 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-12">
    <div className="relative grid h-28 w-28 place-items-center overflow-hidden rounded-3xl bg-surface dark:bg-slate-900 text-center shadow-sm ring-1 ring-slate-200">
      {image ? <img src={image} alt={e.businessName} className="h-full w-full object-cover" onError={(ev)=>{ev.currentTarget.style.display="none";ev.currentTarget.nextElementSibling?.classList.remove("hidden")}}/> : null}
      <span className={`${image ? "hidden" : ""} px-2 text-sm font-black leading-tight text-primary dark:text-slate-100`}>{e.businessName || "Entrepreneur"}</span>
    </div>
    <div>{e.isVerified&&<VerifiedBadge/>}<h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{e.businessName}</h1><p className="mt-1 text-secondary dark:text-slate-400">{e.ownerName} • {e.category}</p><div className="mt-4 flex flex-wrap gap-4 text-sm text-secondary dark:text-slate-400"><RatingStars value={e.rating||0}/><span>{e.reviewCount||0} reviews</span><span className="inline-flex items-center gap-1"><MapPin size={15}/>{loc||"Local"}</span></div></div>
    <Link to={user ? "/services" : "/login"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white hover:bg-primary"><BriefcaseBusiness size={17}/> Request a Service</Link>
   </div>
   <div className="flex gap-1 overflow-x-auto border-t border-border dark:border-slate-800 px-6 sm:px-10"><span className="border-b-2 border-accent px-4 py-4 text-sm font-bold text-accent">Overview</span></div>
  </motion.section>
  <section className="mt-10"><div className="max-w-3xl"><h2 className="text-2xl font-black">About</h2><p className="mt-3 leading-7 text-secondary dark:text-slate-400">{e.bio||`${e.businessName} is a local ${String(e.category).toLowerCase()} business serving the community with practical skills, transparent pricing and personal service.`}</p><h2 className="mt-10 text-2xl font-black">Skills</h2><div className="mt-4 flex flex-wrap gap-2">{(e.skills||[]).map(s=><span key={s} className="rounded-full border border-accent/20 bg-accent-soft dark:bg-violet-950/40 px-3 py-1.5 text-sm font-semibold text-accent">{s}</span>)}</div></div><h2 className="mt-12 text-2xl font-black">Services</h2><div className="mt-5 grid gap-5 md:grid-cols-2">{services.map(s=><ServiceCard key={s._id} s={{...s,id:s._id,seller:e.businessName,emoji:"🛠️"}}/>)}</div></section>
 </div></main>;
}
