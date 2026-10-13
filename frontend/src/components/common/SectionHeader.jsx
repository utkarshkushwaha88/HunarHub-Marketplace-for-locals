import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SectionHeader({title,subtitle,action,to}){
 return <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.45}} className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
  <div><h2 className="text-3xl font-black tracking-tight text-primary dark:text-slate-100 sm:text-4xl">{title}</h2><p className="mt-2 max-w-2xl text-secondary dark:text-slate-400">{subtitle}</p></div>
  {action&&<Link to={to} className="inline-flex items-center gap-1.5 font-bold text-accent hover:text-primary dark:hover:text-white dark:text-slate-100">{action}<ArrowRight size={16}/></Link>}
 </motion.div>
}