import { Link } from "react-router-dom";
import { HelpCircle, ShieldCheck, ShoppingBag, UserRound } from "lucide-react";

const faqs = [
  { icon: UserRound, q: "How do I become an entrepreneur?", a: "Choose the entrepreneur option while registering, then complete your business profile from the dashboard." },
  { icon: ShoppingBag, q: "How do I buy a product?", a: "Open a product, add it to your cart, enter your delivery details and complete the configured checkout." },
  { icon: HelpCircle, q: "How do I request a service?", a: "Open a service, choose your preferred date and time, add a message and submit the service request." },
  { icon: ShieldCheck, q: "How are entrepreneurs verified?", a: "Administrators can review entrepreneur profiles and approve their verification status from the admin dashboard." },
];

export default function HelpCenter(){
  return <main className="bg-background dark:bg-slate-950"><div className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8 lg:py-20">
    <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">Support</p>
    <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Help Center</h1>
    <p className="mt-5 max-w-2xl text-lg leading-8 text-secondary dark:text-slate-400">Quick answers for customers and local entrepreneurs using HunarHub.</p>
    <div className="mt-10 grid gap-4">{faqs.map(({icon:Icon,q,a})=><details key={q} className="group rounded-2xl border border-border bg-surface p-5 dark:border-slate-800 dark:bg-slate-900"><summary className="flex cursor-pointer list-none items-center gap-3 font-black"><Icon size={20} className="text-accent"/>{q}<span className="ml-auto text-accent">+</span></summary><p className="mt-4 pl-8 text-sm leading-6 text-secondary dark:text-slate-400">{a}</p></details>)}</div>
    <div className="mt-10 rounded-3xl border border-border bg-surface p-6 dark:border-slate-800 dark:bg-slate-900"><h2 className="text-xl font-black">Still need help?</h2><p className="mt-2 text-sm text-secondary dark:text-slate-400">Contact the HunarHub support team for account, order or service-request assistance.</p><Link to="/contact" className="mt-5 inline-flex rounded-xl bg-accent px-5 py-3 font-bold text-white">Contact support</Link></div>
  </div></main>;
}
