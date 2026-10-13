import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function Login() {
  const { login, errorMessage } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [state, setState] = useState({ loading: false, error: "" });

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, error: "" });
    try {
      await login(form);
      navigate("/");
    } catch (error) {
      setState({ loading: false, error: errorMessage(error, "Login failed.") });
      return;
    }
    setState({ loading: false, error: "" });
  };

  return <main className="relative grid min-h-[calc(100vh-72px)] place-items-center overflow-hidden bg-background dark:bg-slate-950 px-4 py-12">
    <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-soft dark:bg-violet-950/40 blur-3xl"/>
    <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-soft dark:bg-violet-950/40 blur-3xl"/>
    <form onSubmit={submit} className="relative w-full max-w-md rounded-3xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-900 p-7 shadow-float dark:shadow-2xl dark:shadow-black/30 sm:p-9">
      <Link to="/" className="inline-flex items-center gap-2 text-lg font-black text-primary dark:text-slate-100"><span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white">H</span>Hunar<span className="text-accent">Hub</span></Link>
      <h1 className="mt-8 text-3xl font-black tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-secondary dark:text-slate-400">Sign in to continue to HunarHub.</p>
      {state.error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-300">{state.error}</p>}
      <div className="mt-7 space-y-4">
        <label className="block text-sm font-bold text-primary dark:text-slate-100">Email
          <input required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-2 w-full rounded-xl border border-border dark:border-slate-800 bg-transparent px-4 py-3 outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent-soft" type="email" placeholder="you@example.com"/>
        </label>
        <label className="block text-sm font-bold text-primary dark:text-slate-100">Password
          <input required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="mt-2 w-full rounded-xl border border-border dark:border-slate-800 bg-transparent px-4 py-3 outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent-soft" type="password" placeholder="••••••••"/>
        </label>
      </div>
      <div className="mt-4 flex justify-end text-sm"><Link className="font-bold text-accent" to="/forgot-password">Forgot password?</Link></div>
      <button disabled={state.loading} className="mt-6 w-full rounded-xl bg-accent px-5 py-3 font-bold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60">{state.loading ? "Signing in…" : "Login"}</button>
      <p className="mt-6 text-center text-sm text-secondary dark:text-slate-400">Don't have an account? <Link className="font-bold text-accent" to="/register">Sign up</Link></p>
    </form>
  </main>;
}
