import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { productApi, apiErrorMessage } from "../lib/api";
import { addToCart } from "./Cart";
import RatingStars from "../components/common/RatingStars";
import VerifiedBadge from "../components/common/VerifiedBadge";

export default function ProductDetails(){
 const {id}=useParams(); const navigate=useNavigate(); const [p,setP]=useState(null); const [state,setState]=useState({loading:true,error:""});
 useEffect(()=>{(async()=>{try{const {data}=await productApi.get(id);setP(data.data);setState({loading:false,error:""});}catch(e){setState({loading:false,error:apiErrorMessage(e,"Product not found.")});}})()},[id]);
 if(state.loading)return <main className="grid min-h-[60vh] place-items-center bg-background dark:bg-slate-950"><p className="font-semibold">Loading product…</p></main>;
 if(state.error||!p)return <main className="grid min-h-[60vh] place-items-center bg-background dark:bg-slate-950"><div className="text-center"><p className="font-semibold">{state.error||"Product not found."}</p><Link className="mt-4 inline-block text-accent font-bold" to="/products">Back to products</Link></div></main>;
 const image=p.images?.[0] || "";
 return <main className="bg-background dark:bg-slate-950"><div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10 lg:py-16">
  <Link to="/products" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-secondary dark:text-slate-400 hover:text-accent"><ArrowLeft size={16}/> Back to products</Link>
  <div className="grid overflow-hidden rounded-3xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 shadow-card dark:shadow-none lg:grid-cols-2">
   <motion.div initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} className="relative grid min-h-[430px] place-items-center bg-accent-soft dark:bg-violet-950/40 p-10">
    {image ? <img src={image} alt={p.title} className="h-full max-h-[430px] w-full object-cover" onError={(e)=>{e.currentTarget.style.display="none";e.currentTarget.nextElementSibling?.classList.remove("hidden")}}/> : null}
    <div className={`${image ? "hidden" : ""} absolute inset-0 grid place-items-center px-8 text-center`}>
      <span className="text-4xl font-black tracking-tight text-primary dark:text-slate-100">{p.title || "Product"}</span>
    </div>
   </motion.div>
   <div className="p-7 sm:p-10 lg:p-14"><span className="inline-flex rounded-full bg-accent-soft dark:bg-violet-950/40 px-3 py-1 text-[10px] font-black tracking-[.14em] text-accent">HANDMADE PRODUCT</span><h1 className="mt-5 text-3xl font-black tracking-tight text-primary dark:text-slate-100 sm:text-4xl">{p.title}</h1><p className="mt-2 font-semibold text-secondary dark:text-slate-400">{p.entrepreneur?.businessName||"Local maker"}</p><div className="mt-5"><RatingStars value={p.rating||0}/></div><p className="mt-6 text-3xl font-black text-accent">₹{p.price}</p><p className="mt-5 leading-7 text-secondary dark:text-slate-400">{p.description}</p>
    <div className="mt-7 flex flex-wrap gap-3"><button onClick={()=>{addToCart(p); navigate("/cart")}} className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition hover:bg-primary"><ShoppingCart size={18}/> Add to Cart</button></div>
    <div className="mt-7 space-y-3 rounded-2xl bg-background dark:bg-slate-950 p-4 text-sm text-secondary dark:text-slate-400"><div className="flex items-center gap-2 font-semibold"><VerifiedBadge/> Verified marketplace listing</div><div className="flex items-center gap-2"><Truck size={17} className="text-accent"/> Local delivery / pickup options</div><div className="flex items-center gap-2"><ShieldCheck size={17} className="text-accent"/> Direct support for the maker</div></div>
   </div>
  </div>
 </div></main>;
}
