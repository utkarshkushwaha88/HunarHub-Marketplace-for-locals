import { useEffect,useState } from "react";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import CategorySection from "../components/home/CategorySection";
import SectionHeader from "../components/common/SectionHeader";
import EntrepreneurCard from "../components/entrepreneur/EntrepreneurCard";
import ProductCard from "../components/product/ProductCard";
import { entrepreneurApi, productApi } from "../lib/api";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const mapE=e=>({...e,id:e._id,location:e.location?.city||"Local",rating:e.rating||0,reviews:e.reviewCount||0,price:0,emoji:"👨‍🎨"});
const mapP=p=>({...p,id:p._id,seller:p.entrepreneur?.businessName||"Local maker",rating:p.rating||0,emoji:"🧺"});

export default function Home(){
 const [entrepreneurs,setEntrepreneurs]=useState([]); const [products,setProducts]=useState([]);
 useEffect(()=>{Promise.allSettled([entrepreneurApi.list({limit:3}),productApi.list({limit:3})]).then(([a,b])=>{if(a.status==="fulfilled")setEntrepreneurs(a.value.data.data.items.map(mapE));if(b.status==="fulfilled")setProducts(b.value.data.data.items.map(mapP));});},[]);
 return <>
  <Hero/><Stats/><CategorySection/>
  <section className="mx-auto w-full max-w-[1680px] px-6 py-14 sm:px-8 lg:px-10 lg:py-16 2xl:px-12"><SectionHeader title="Meet trusted local makers" subtitle="People with real skills, real businesses, and a story worth discovering." action="Explore all" to="/entrepreneurs"/><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{entrepreneurs.map(e=><EntrepreneurCard key={e.id} e={e}/>)}</div></section>
  <section className="mx-auto w-full max-w-[1680px] px-6 py-14 sm:px-8 lg:px-10 lg:py-16 2xl:px-12"><SectionHeader title="Made by local hands" subtitle="Unique handmade products that bring local craft into everyday life." action="Shop products" to="/products"/><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map(p=><ProductCard key={p.id} p={p}/>)}</div></section>
  <section className="mx-auto w-full max-w-[1680px] px-6 pb-20 sm:px-8 lg:px-10 2xl:px-12"><motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="overflow-hidden rounded-3xl bg-primary px-6 py-12 text-white sm:px-12 md:flex md:items-center md:justify-between md:gap-8"><div><p className="text-xs font-extrabold tracking-[.16em] text-accent/20">FOR LOCAL ENTREPRENEURS</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Turn your skill into a digital business.</h2><p className="mt-3 max-w-xl text-accent-soft/80">Create your profile, showcase your work, receive service requests, and reach more customers.</p></div><Link to="/register" className="mt-7 inline-flex shrink-0 items-center gap-2 rounded-xl bg-surface dark:bg-slate-900 px-5 py-3 font-bold text-primary dark:text-slate-100 transition hover:-translate-y-0.5 hover:bg-accent-soft dark:bg-violet-950/40 md:mt-0">Join HunarHub <ArrowRight size={17}/></Link></motion.div></section>
 </>
}
