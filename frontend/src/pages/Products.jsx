import { useEffect, useState } from "react";
import { productApi, apiErrorMessage } from "../lib/api";
import ProductCard from "../components/product/ProductCard";
import SearchBar from "../components/common/SearchBar";
import { motion } from "framer-motion";

const categories = ["All Categories", "Cobbler", "Potter", "Tailor", "Artisan", "Small Vendor"];

const mapProduct = (p) => ({
  ...p,
  id: p._id,
  seller: p.entrepreneur?.businessName || "Local maker",
  rating: p.rating || 0,
  reviews: p.reviewCount || 0,
  images: p.images || [],
});

export default function Products() {
  const [q, setQ] = useState("");
  const [minPrice,setMinPrice]=useState(""); const [maxPrice,setMaxPrice]=useState("");
  const [cat, setCat] = useState("All Categories");
  const [items, setItems] = useState([]);
  const [state, setState] = useState({ loading: true, error: "" });

  useEffect(() => {
    const timer = setTimeout(async () => {
      setState({ loading: true, error: "" });
      try {
        const { data } = await productApi.list({ search: q || undefined, category: cat === "All Categories" ? undefined : cat, minPrice:minPrice||undefined, maxPrice:maxPrice||undefined });
        setItems((data.data.items || []).map(mapProduct));
        setState({ loading: false, error: "" });
      } catch (error) {
        setState({ loading: false, error: apiErrorMessage(error, "Could not load products.") });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [q, cat, minPrice, maxPrice]);

  return <main className="bg-background dark:bg-slate-950">
    <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
      <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="max-w-3xl">
        <span className="inline-flex rounded-full bg-accent-soft dark:bg-violet-950/40 px-3 py-1 text-xs font-extrabold tracking-wider text-accent">SHOP LOCAL</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-primary dark:text-slate-100 sm:text-5xl">Made by local hands.</h1>
        <p className="mt-4 text-lg leading-7 text-secondary dark:text-slate-400">Discover handmade products from verified local makers.</p>
      </motion.div>
      <div className="mt-9 grid gap-3 rounded-2xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 p-3 md:grid-cols-[minmax(0,1fr)_190px_130px_130px]">
        <SearchBar value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..."/>
        <input value={minPrice} onChange={e=>setMinPrice(e.target.value)} type="number" min="0" placeholder="Min ₹" className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold outline-none"/>
        <input value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} type="number" min="0" placeholder="Max ₹" className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold outline-none"/>
        <select value={cat} onChange={e=>setCat(e.target.value)} className="rounded-xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 px-3 py-2.5 text-sm font-semibold text-secondary dark:text-slate-400 outline-none"><option>{categories[0]}</option>{categories.slice(1).map(x=><option key={x}>{x}</option>)}</select>
      </div>
      {state.error && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-300">{state.error}</p>}
      <div className="mt-8 mb-4 text-sm font-semibold text-secondary dark:text-slate-400">{state.loading ? "Loading products…" : `${items.length} products found`}</div>
      {!state.loading && !items.length ? <div className="rounded-2xl border border-dashed border-secondary/30 bg-surface dark:bg-slate-900 p-12 text-center"><h3 className="font-extrabold">No products found.</h3><p className="mt-2 text-sm text-secondary dark:text-slate-400">Try another search or category.</p></div> :
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(p=><ProductCard key={p.id} p={p}/>)}</div>}
    </div>
  </main>;
}
