import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import RatingStars from "../common/RatingStars";
import VerifiedBadge from "../common/VerifiedBadge";

export default function EntrepreneurCard({ e }) {
  const image = e.avatarUrl || e.gallery?.[0] || e.user?.avatarUrl || "";

  return (
    <motion.div
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
    >
      <Link
        to={"/entrepreneurs/" + e.id}
        className="group block overflow-hidden rounded-2xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 shadow-sm transition hover:border-accent/20 hover:shadow-card dark:shadow-none"
      >
        <div className="relative h-52 overflow-hidden bg-accent-soft dark:bg-violet-950/30">
          {image ? (
            <motion.img
              src={image}
              alt={e.businessName || "Local entrepreneur"}
              loading="lazy"
              onError={(ev) => {
                ev.currentTarget.style.display = "none";
                ev.currentTarget.nextElementSibling?.classList.remove("hidden");
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
              {e.businessName || "Entrepreneur"}
            </span>
          </div>

          <span className="absolute left-4 top-4 rounded-full bg-surface/90 dark:bg-slate-900/90 px-2.5 py-1 text-[10px] font-black tracking-wider text-accent shadow-sm">
            LOCAL MAKER
          </span>
          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl bg-surface/90 dark:bg-slate-900/90 text-accent opacity-0 shadow-sm transition group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-primary dark:text-slate-100">
                {e.businessName}
              </h3>
              <p className="mt-1 text-sm text-secondary dark:text-slate-400">
                {e.ownerName} • {e.category}
              </p>
            </div>
            {e.isVerified !== false && <VerifiedBadge />}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-secondary dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} />
              {e.location}
            </span>
            <RatingStars value={e.rating} />
            <span>{e.reviews} reviews</span>
          </div>

          <div className="mt-4 border-t border-border dark:border-slate-800 pt-4 text-sm text-secondary dark:text-slate-400">
            Starting from{" "}
            <b className="ml-1 text-lg text-accent">₹{e.price}</b>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
