import { Search } from "lucide-react";
export default function SearchBar({placeholder="Search...", value="", onChange}) {
  return <div className="flex w-full items-center gap-2 rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 shadow-sm transition focus-within:border-accent/40 focus-within:ring-4 focus-within:ring-accent-soft">
    <Search size={18} className="shrink-0 text-secondary dark:text-slate-400"/>
    <input value={value} onChange={onChange} className="min-w-0 flex-1 bg-transparent text-sm text-primary dark:text-slate-100 outline-none placeholder:text-secondary dark:text-slate-400" placeholder={placeholder}/>
  </div>;
}
