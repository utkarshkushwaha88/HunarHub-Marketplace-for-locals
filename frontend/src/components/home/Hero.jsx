import { Link } from "react-router-dom";
import { Search, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(#E2E8F0_1px,transparent_1px),linear-gradient(90deg,#E2E8F0_1px,transparent_1px)] [background-size:44px_44px] dark:opacity-20" />
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-accent-soft blur-3xl dark:bg-violet-950/40" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-soft blur-3xl dark:bg-violet-950/40" />

      <div className="relative mx-auto grid w-full max-w-[1680px] grid-cols-1 items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(500px,0.86fr)] lg:gap-16 lg:px-10 lg:py-20 xl:gap-20 2xl:px-12">
        <div className="min-w-0 lg:pr-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 text-xs font-extrabold tracking-wide text-accent-hover dark:bg-violet-950/40"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            LOCAL SKILLS • LOCAL OPPORTUNITIES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="max-w-[760px] text-balance text-[clamp(3.25rem,5.2vw,5.8rem)] font-black leading-[0.94] tracking-[-0.055em] text-primary dark:text-slate-100"
          >
            Discover <span className="text-accent">local talent.</span>
            <br />
            Support real <span className="text-accent">craft.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease }}
            className="mt-7 max-w-2xl text-base leading-7 text-secondary dark:text-slate-400 sm:text-lg sm:leading-8"
          >
            Find trusted artisans, skilled workers, services, and handmade products from your community — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.24, ease }}
            className="mt-8 flex w-full max-w-[720px] items-center rounded-2xl border border-border bg-surface p-2 shadow-card focus-within:border-accent/40 focus-within:ring-4 focus-within:ring-accent-soft dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
          >
            <Search className="ml-3 shrink-0 text-secondary dark:text-slate-500" size={20} />
            <input
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-primary outline-none placeholder:text-secondary dark:text-slate-100 dark:placeholder:text-slate-500"
              placeholder="Search artisans, services or products"
            />
            <Link
              to="/entrepreneurs"
              className="rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-accent-hover sm:px-6"
            >
              Search
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-secondary dark:text-slate-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={17} className="text-success" />
              Verified local makers
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={17} className="text-accent" />
              Near your community
            </span>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[680px] lg:mx-0 lg:ml-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="relative rounded-[2rem] border border-border bg-surface p-4 shadow-float dark:border-slate-800 dark:bg-slate-900 dark:shadow-2xl dark:shadow-black/30 sm:p-5"
          >
            <div className="grid aspect-[1/1.03] place-items-center overflow-hidden rounded-[1.5rem] bg-accent-soft dark:bg-violet-950/40">
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-[8rem] drop-shadow-xl sm:text-[10rem] lg:text-[11rem]"
              >
                🏺
              </motion.div>
            </div>

            <div className="absolute left-8 top-8 rounded-2xl border border-border bg-surface px-4 py-3 shadow-card dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:left-9 sm:top-9">
              <p className="text-xs font-bold text-secondary dark:text-slate-400">Featured maker</p>
              <p className="mt-1 font-extrabold text-primary dark:text-slate-100">Traditional Pottery</p>
            </div>

            <div className="absolute bottom-8 right-8 flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-card dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:bottom-9 sm:right-9">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-warning">★</span>
              <div>
                <p className="font-extrabold text-primary dark:text-slate-100">4.9 / 5</p>
                <p className="text-xs text-secondary dark:text-slate-400">Community rated</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}