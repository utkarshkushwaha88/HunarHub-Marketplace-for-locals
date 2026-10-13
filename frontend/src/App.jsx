import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./lib/ProtectedRoute";
import Home from "./pages/Home";
import Entrepreneurs from "./pages/Entrepreneurs";
import EntrepreneurProfile from "./pages/EntrepreneurProfile";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";
import Notifications from "./pages/Notifications";

export default function App(){return <Routes><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/entrepreneurs" element={<Entrepreneurs/>}/><Route path="/entrepreneurs/:id" element={<EntrepreneurProfile/>}/><Route path="/products" element={<Products/>}/><Route path="/products/:id" element={<ProductDetails/>}/><Route path="/services" element={<Services/>}/><Route path="/services/:id" element={<ServiceDetails/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/forgot-password" element={<ForgotPassword/>}/><Route path="/how-it-works" element={<HowItWorks/>}/><Route path="/help" element={<HelpCenter/>}/><Route path="/contact" element={<Contact/>}/><Route element={<ProtectedRoute/>}><Route path="/notifications" element={<Notifications/>}/></Route><Route element={<ProtectedRoute/>}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/cart" element={<Cart/>}/></Route><Route path="*" element={<NotFound/>}/></Route></Routes>}
