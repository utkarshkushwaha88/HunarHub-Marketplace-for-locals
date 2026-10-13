import { Star } from "lucide-react";
import { motion } from "framer-motion";
export default function RatingStars({value}){return <motion.span whileHover={{scale:1.04}} className="inline-flex items-center gap-1 font-bold text-warning"><Star size={14} fill="currentColor"/> {value}</motion.span>}