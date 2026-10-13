import { Link } from "react-router-dom";
import { Search, UserPlus, ShoppingBag, CalendarCheck, Star } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create an account", text: "Register as a customer or entrepreneur and build your HunarHub profile." },
  { icon: Search, title: "Discover local talent", text: "Search entrepreneurs, products and services by skill, category and location." },
  { icon: CalendarCheck, title: "Request a service", text: "Choose a service, select your preferred date and time, and send your request." },
  { icon: ShoppingBag, title: "Buy handmade products", text: "Add products to your cart, provide your delivery details and complete checkout." },
  { icon: Star, title: "Share your feedback", text: "After your order or service, leave a rating and review to support local entrepreneurs." },
];

export default function HowItWorks(){
  return <main className="bg-background dark:bg-slate-950">
    <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">HunarHub</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">How it works</h1>
        <p className="mt-5 text-lg leading-8 text-secondary dark:text-slate-400">A simple marketplace connecting customers with local micro-entrepreneurs, handmade products and trusted services.</p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {steps.map(({icon: Icon,title,text}, index)=><div key={title} className="rounded-3xl border border-border bg-surface p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon size={22}/></div><span className="text-sm font-black text-secondary dark:text-slate-500">0{index+1}</span></div>
          <h2 className="mt-6 text-xl font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-secondary dark:text-slate-400">{text}</p>
        </div>)}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/entrepreneurs" className="rounded-xl bg-accent px-5 py-3 font-bold text-white">Explore entrepreneurs</Link>
        <Link to="/products" className="rounded-xl border border-border px-5 py-3 font-bold dark:border-slate-700">Browse products</Link>
      </div>
    </div>
  </main>;
}
