import { motion } from "framer-motion";

export default function Reveal({children, className="", delay=0, y=24, once=true}){
  return <motion.div
    className={className}
    initial={{opacity:0,y}}
    whileInView={{opacity:1,y:0}}
    viewport={{once,amount:0.12}}
    transition={{duration:0.55,delay,ease:[0.22,1,0.36,1]}}
  >{children}</motion.div>
}