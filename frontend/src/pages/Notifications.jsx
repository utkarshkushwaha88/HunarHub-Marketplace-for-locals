import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCheck } from "lucide-react";
import { notificationApi, apiErrorMessage } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

export default function Notifications() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState("");
  const load = async () => {
    try {
      const { data } = await notificationApi.list();
      setItems(data.data.items || []);
      setUnread(data.data.unreadCount || 0);
    } catch (e) { setError(apiErrorMessage(e, "Could not load notifications.")); }
  };
  useEffect(() => { if (user) load(); }, [user]);
  const read = async (id) => { try { await notificationApi.markRead(id); load(); } catch (e) { setError(apiErrorMessage(e)); } };
  const readAll = async () => { try { await notificationApi.markAllRead(); load(); } catch (e) { setError(apiErrorMessage(e)); } };
  return <main className="min-h-[calc(100vh-76px)] bg-background dark:bg-slate-950"><div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-16">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[.15em] text-accent">Updates</p><h1 className="mt-2 text-4xl font-black">Notifications</h1><p className="mt-2 text-secondary dark:text-slate-400">Service requests, orders, verification and support updates.</p></div>{unread>0&&<button onClick={readAll} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold"><CheckCheck size={17}/> Mark all read</button>}</div>
    {error&&<p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
    <div className="mt-8 space-y-3">{items.length?items.map(n=><div key={n._id} className={`rounded-2xl border p-5 ${n.readAt?"border-border dark:border-slate-800 bg-surface dark:bg-slate-900":"border-accent/30 bg-accent-soft/50 dark:bg-violet-950/20"}`}><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-white"><Bell size={18}/></div><div className="min-w-0 flex-1"><div className="flex flex-wrap justify-between gap-2"><h2 className="font-black">{n.title}</h2>{!n.readAt&&<span className="rounded-full bg-accent px-2 py-1 text-[10px] font-black uppercase text-white">New</span>}</div><p className="mt-1 text-sm leading-6 text-secondary dark:text-slate-400">{n.message}</p><p className="mt-2 text-xs text-secondary/80">{new Date(n.createdAt).toLocaleString()}</p><div className="mt-3 flex gap-2">{n.link&&<Link to={n.link} onClick={()=>!n.readAt&&read(n._id)} className="text-sm font-bold text-accent">Open</Link>}{!n.readAt&&<button onClick={()=>read(n._id)} className="text-sm font-bold text-secondary">Mark read</button>}</div></div></div></div>):<div className="rounded-2xl border border-dashed border-border p-12 text-center"><Bell className="mx-auto text-secondary"/><p className="mt-3 font-bold">No notifications yet.</p></div>}</div>
  </div></main>;
}
