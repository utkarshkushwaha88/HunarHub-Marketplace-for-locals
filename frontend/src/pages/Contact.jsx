import { Mail, MessageCircle, Phone } from "lucide-react";

export default function Contact(){
  return <main className="bg-background dark:bg-slate-950"><div className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8 lg:py-20">
    <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">Support</p>
    <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Contact HunarHub</h1>
    <p className="mt-5 max-w-2xl text-lg leading-8 text-secondary dark:text-slate-400">Have a question about an order, service request, account or entrepreneur profile? Get in touch with us.</p>
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      <a href="mailto:support@hunarhub.local" className="rounded-3xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-accent dark:border-slate-800 dark:bg-slate-900"><Mail className="text-accent"/><h2 className="mt-5 font-black">Email</h2><p className="mt-2 text-sm text-secondary dark:text-slate-400">support@hunarhub.local</p></a>
      <a href="tel:+910000000000" className="rounded-3xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-accent dark:border-slate-800 dark:bg-slate-900"><Phone className="text-accent"/><h2 className="mt-5 font-black">Phone</h2><p className="mt-2 text-sm text-secondary dark:text-slate-400">+91 00000 00000</p></a>
      <a href="mailto:support@hunarhub.local?subject=HunarHub%20Support" className="rounded-3xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-accent dark:border-slate-800 dark:bg-slate-900"><MessageCircle className="text-accent"/><h2 className="mt-5 font-black">Support request</h2><p className="mt-2 text-sm text-secondary dark:text-slate-400">Open your email client with a pre-filled subject.</p></a>
    </div>
  </div></main>;
}
