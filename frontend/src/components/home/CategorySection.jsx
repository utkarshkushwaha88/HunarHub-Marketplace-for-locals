import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader";

const categories=[
 ["Cobbler","Shoe repair & leather work","👞"],
 ["Potter","Traditional pottery & clay craft","🏺"],
 ["Tailor","Custom stitching & alterations","🧵"],
 ["Artisan","Handcrafted art & decor","🎨"],
 ["Small Vendor","Local products & services","🛍️"]
];

export default function CategorySection(){
 return <section className="mx-auto w-full max-w-[1680px] px-6 py-14 sm:px-8 lg:px-10 lg:py-16 2xl:px-12">
  <SectionHeader title="Explore local skills" subtitle="Find the right person for the job — or discover something handmade." action="View all" to="/entrepreneurs"/>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
   {categories.map((c,i)=><motion.div key={c[0]} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{delay:i*.06,duration:.45}} whileHover={{y:-6}}>
    <Link to="/entrepreneurs" className="group block h-full rounded-2xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 p-5 shadow-sm transition hover:border-accent/20 hover:shadow-card dark:shadow-none">
      <motion.div whileHover={{scale:1.08,rotate:-4}} className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft dark:bg-violet-950/40 text-3xl">{c[2]}</motion.div>
      <h3 className="font-extrabold text-primary dark:text-slate-100">{c[0]}</h3>
      <p className="mt-2 text-sm leading-6 text-secondary dark:text-slate-400">{c[1]}</p>
      <ArrowRight className="mt-5 text-accent transition group-hover:translate-x-1" size={18}/>
    </Link>
   </motion.div>)}
  </div>
 </section>
}