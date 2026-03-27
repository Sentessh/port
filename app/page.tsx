"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const { scrollY } = useScroll();
  const[scrolled, setScrolled] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 80);
    });
  },[scrollY]);

  useEffect(() => {
    async function fetchProject(){
      const { data } = await supabase.from("projects").select("*");
      if (data){
        setProjects(data)
        console.log("fetching...");
      }
    }
    fetchProject();
  }, []);

  return(
    <main className="overflow-visible">
      <motion.section animate={{ 
        scale : scrolled ? 0.8 : 1,
        borderRadius: scrolled ? "24px" : "0px",
      }} 
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="h-screen rounded-2x1 px-1 py-1 bg-[#111111] flex flex-col items-center justify-center">
        <h1>Lorem ipsum dolor sit amet</h1>
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>Lorem ipsum dolor sit amet</p>
      </motion.section>

      <motion.section
        className="bg-[#111111] rounded-2xl p-10 h-[70vh] mx-[186px] mt-4 mb-25"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3  }}
      >
        <p>Lorem ipsum dolor sit amet</p>
      </motion.section>

      <motion.section
        className="bg-[#111111] rounded-2xl p-10 h-[70vh] mx-[186px] mt-4"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3  }}
      >
        <p>Lorem ipsum dolor sit amet</p>
      </motion.section>

      <div className="h-screen"></div>
    </main>
  );
}