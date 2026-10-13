import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Menu, X, ArrowRight, Bell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "../common/ThemeToggle";
import { useAuth } from "../../lib/AuthContext";
import { notificationApi } from "../../lib/api";

const links = [
  ["/entrepreneurs", "Explore"],
  ["/services", "Services"],
  ["/products", "Products"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    let timer;
    const load = async () => { if (!user) { setUnread(0); return; } try { const { data } = await notificationApi.list(1); setUnread(data.data.unreadCount || 0); } catch {} };
    load();
    if (user) timer = setInterval(load, 30000);
    return () => timer && clearInterval(timer);
  }, [user]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center gap-7 px-5 sm:px-8 lg:px-10">
        <Link to="/" onClick={closeMenu} className="mr-auto flex items-center gap-2.5">
          <motion.span whileHover={{ rotate: -5, scale: 1.05 }} className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-lg font-black text-white">H</motion.span>
          <span className="text-[21px] font-black tracking-tight text-primary dark:text-slate-100">Hunar<span className="text-accent">Hub</span></span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className="relative py-7 text-[15px] font-semibold text-secondary transition hover:text-primary dark:text-slate-400 dark:hover:text-white">
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  {isActive && (
                    <motion.span layoutId="nav-active" className="absolute bottom-4 left-0 right-0 h-0.5 rounded-full bg-accent" transition={{ type: "spring", stiffness: 420, damping: 30 }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/entrepreneurs" aria-label="Search" className="grid h-10 w-10 place-items-center rounded-xl text-secondary transition hover:bg-accent-soft hover:text-accent dark:text-slate-400 dark:hover:bg-violet-950/40">
            <Search size={19} />
          </Link>
          <Link to="/cart" className="px-3 text-[15px] font-bold text-secondary hover:text-accent dark:text-slate-400">Cart</Link>
          <ThemeToggle />

          {!loading && user && <Link to="/notifications" aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl text-secondary transition hover:bg-accent-soft hover:text-accent dark:text-slate-400 dark:hover:bg-violet-950/40"><Bell size={19}/>{unread>0&&<span className="absolute right-1 top-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-black text-white">{unread>9?"9+":unread}</span>}</Link>}

          {!loading && user ? (
            <>
              <Link to="/dashboard" className="max-w-28 truncate px-2 text-sm font-bold text-primary hover:text-accent dark:text-slate-100">{user.name}</Link>
              <Link to="/dashboard" className="px-3 text-[15px] font-bold text-secondary hover:text-accent dark:text-slate-400">Dashboard</Link>
              <button type="button" onClick={logout} className="px-3 text-[15px] font-bold text-secondary hover:text-primary dark:text-slate-400 dark:hover:text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 text-[15px] font-bold text-secondary hover:text-primary dark:text-slate-400 dark:hover:text-white">Login</Link>
              <Link to="/register" className="rounded-xl bg-accent px-5 py-2.5 text-[15px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md">Get started</Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-xl p-2 text-primary hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 md:hidden" aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border bg-surface dark:border-slate-800 dark:bg-slate-900 md:hidden">
            <div className="mx-auto max-w-[1440px] space-y-1 px-5 py-4 sm:px-8">
              {links.map(([to, label]) => (
                <Link key={to} to={to} onClick={closeMenu} className="block rounded-xl px-3 py-3 font-semibold text-secondary hover:bg-accent-soft hover:text-primary dark:text-slate-400 dark:hover:bg-violet-950/40 dark:hover:text-white">
                  {label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link to="/notifications" onClick={closeMenu} className="block rounded-xl px-3 py-3 font-semibold text-secondary hover:bg-accent-soft hover:text-primary dark:text-slate-400 dark:hover:bg-violet-950/40">Notifications {unread>0?`(${unread})`:""}</Link>
                  <Link to="/dashboard" onClick={closeMenu} className="block rounded-xl px-3 py-3 font-semibold text-secondary hover:bg-background dark:text-slate-400 dark:hover:bg-slate-950">Dashboard</Link>
                  <button type="button" onClick={() => { closeMenu(); logout(); }} className="block w-full rounded-xl px-3 py-3 text-left font-semibold text-secondary hover:bg-background dark:text-slate-400 dark:hover:bg-slate-950">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu} className="block rounded-xl px-3 py-3 font-semibold text-secondary hover:bg-background dark:text-slate-400 dark:hover:bg-slate-950">Login</Link>
                  <Link to="/register" onClick={closeMenu} className="flex items-center justify-between rounded-xl bg-accent px-4 py-3 font-bold text-white">Get started <ArrowRight size={17} /></Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
