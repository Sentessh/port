"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const[scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 80);
    });
  },[scrollY]);

  return(
    <main>
      <motion.section animate={{ 
        scale : scrolled ? 0.8 : 1,
        borderRadius: scrolled ? "24px" : "0px",
      }} 
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="h-screen rounded-2x1 px-1 py-1 bg-[#111111] flex flex-col items-center justify-center">
        <h1>Lorem ipsum dolor sit amet</h1>
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>Lorem ipsum dolor sit amet</p>
      </motion.section>
      <div className="h-screen"></div>
    </main>
  );
}
