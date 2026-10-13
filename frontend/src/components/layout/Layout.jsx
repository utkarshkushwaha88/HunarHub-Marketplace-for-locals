import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout(){return <div className="min-h-screen bg-background dark:bg-slate-950 text-primary dark:text-slate-100"><Navbar/><Outlet/><Footer/></div>}