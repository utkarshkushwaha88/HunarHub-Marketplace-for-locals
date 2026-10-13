import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import RatingStars from "../common/RatingStars";

export default function ProductCard({ p }) {
  const image = p.images?.[0] || p.image || "";

  return (
    <motion.div
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
    >
      <Link
        to={"/products/" + p.id}
        className="group block overflow-hidden rounded-2xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 shadow-sm transition hover:border-accent/20 hover:shadow-card dark:shadow-none"
      >
        <div className="relative h-56 overflow-hidden bg-accent-soft dark:bg-violet-950/30">
          {image ? (
            <motion.img
              src={image}
              alt={p.title || "Product"}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.35 }}
              className="h-full w-full object-cover"
            />
          ) : null}

          <div
            className={`${image ? "hidden" : ""} absolute inset-0 grid place-items-center px-6 text-center`}
          >
            <span className="text-2xl font-black tracking-tight text-primary dark:text-slate-100 sm:text-3xl">
              {p.title || "Product"}
            </span>
          </div>

          <span className="absolute left-4 top-4 rounded-full bg-surface/90 dark:bg-slate-900/90 px-2.5 py-1 text-[10px] font-black tracking-wider text-accent shadow-sm">
            HANDMADE
          </span>
          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl bg-surface/90 dark:bg-slate-900/90 text-accent opacity-0 shadow-sm transition group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-extrabold text-primary dark:text-slate-100">
            {p.title}
          </h3>
          <p className="mt-1 text-sm text-secondary dark:text-slate-400">
            {p.seller}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <RatingStars value={p.rating} />
            <span className="inline-flex items-center gap-1 font-extrabold text-accent">
              <ShoppingBag size={15} /> ₹{p.price}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
