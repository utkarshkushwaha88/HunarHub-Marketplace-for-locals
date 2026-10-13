import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import RatingStars from "../common/RatingStars";

export default function ServiceCard({s}){
 return <motion.div whileHover={{y:-7}} whileTap={{scale:.99}} transition={{type:"spring",stiffness:350,damping:24}}>
  <Link to={"/services/"+s.id} className="group flex h-full overflow-hidden rounded-2xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 shadow-sm transition hover:border-accent/20 hover:shadow-card dark:shadow-none">
   <div className="grid w-28 shrink-0 place-items-center bg-accent-soft dark:bg-violet-950/40 text-5xl sm:w-32"><motion.span whileHover={{scale:1.08,rotate:3}}>{s.emoji}</motion.span></div>
   <div className="flex min-w-0 flex-1 flex-col p-5"><div className="flex justify-between gap-3"><h3 className="font-extrabold text-primary dark:text-slate-100">{s.title}</h3><ArrowUpRight size={17} className="shrink-0 text-accent opacity-0 transition group-hover:opacity-100"/></div><p className="mt-1 text-sm text-secondary dark:text-slate-400">{s.seller}</p><div className="mt-auto pt-4"><RatingStars value={s.rating}/><p className="mt-2 text-sm text-secondary dark:text-slate-400">From <b className="text-lg text-accent">₹{s.price}</b></p></div></div>
  </Link>
 </motion.div>
}