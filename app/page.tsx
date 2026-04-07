"use client"
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Marquee from "./components/Marquee";

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
        setProjects(data);
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
      className="h-screen px-1 py-1 bg-[#111111] flex flex-col items-center justify-center relative overflow-hidden">
        <h1>Lorem ipsum dolor sit amet</h1>
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>Lorem ipsum dolor sit amet</p>
        <Marquee items={["Api Development", "FrontEnd", "BackEnd", "Data Analytics", "AI"]} />
      </motion.section>

      <motion.section
        className="bg-[#111111] rounded-2xl p-10 h-[70vh] mx-[186px] mt-4 mb-25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <p>Lorem ipsum dolor sit amet</p>
      </motion.section>

      <motion.section
        className="bg-[#111111] rounded-2xl p-10 pb-10 mx-[186px] mt-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`rounded-xl p-5 h-[50vh] flex gap-4 mb-10 ${index % 2 !== 0 ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className="bg-[#2e2e2e] rounded-3xl w-1/2 p-10">
              <img
                src={project.image_url}
                alt={project.type}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="bg-transparent rounded-xl w-1/2 p-10 overflow-hidden break-words text-justify">
              <h2 className="text-2xl font-bold mb-2">{project.type}</h2>
              <div className="h-[2px] w-100 bg-white mb-5"></div>
              <p className="text-lg">{project.description}</p>
            </div>
          </div>
        ))}
      </motion.section>

      <div className="h-screen"></div>
    </main>
  );
}
