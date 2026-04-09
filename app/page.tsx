"use client"
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import emailjs from "@emailjs/browser";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";

export default function Home() {
  const { scrollY } = useScroll();
  const[scrolled, setScrolled] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  const [contactForm, setContactForm] = useState({ name: "", email: "", title: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error" | "limited">("idle");

  async function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setContactStatus("sending");

    const ipRes = await fetch("https://api.ipify.org?format=json");
    const { ip } = await ipRes.json();

    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from("contact_submissions")
      .select("id")
      .eq("ip", ip)
      .gte("created_at", sixHoursAgo);

    if (existing && existing.length > 0) {
      setContactStatus("limited");
      return;
    }

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { name: contactForm.name, email: contactForm.email, title: contactForm.title, message: contactForm.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      await supabase.from("contact_submissions").insert({ ip });
      setContactStatus("sent");
      setContactForm({ name: "", email: "", title: "", message: "" });
    } catch {
      setContactStatus("error");
    }
  }

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 80);
    });
  },[scrollY]);

  useEffect(() => {
    async function fetchProject(){
      const { data } = await supabase.from("projects").select("*").order("order");
      if (data){
        setProjects(data);
      }
    }
    fetchProject();
  }, []);

  return(
    <main className="overflow-visible">
      <Navbar />

      <motion.section animate={{
        scale : scrolled ? 0.8 : 1,
        borderRadius: scrolled ? "24px" : "0px",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="h-screen px-1 py-1 bg-[#111111] flex flex-col items-center justify-center relative overflow-hidden">
        <h1 className="font-bold text-[64px]">Hello, my name is Bernardo!</h1>
        <h2 className="text-2xl">And here you'll be able to see some of my work!</h2>
        <Marquee items={["Api Development", "FrontEnd", "BackEnd", "Data Analytics", "AI"]} />
      </motion.section>

      <motion.section
        className="bg-[#111111] rounded-2xl p-10 h-[70vh] mx-[186px] mt-4 mb-25 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex gap-10"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="w-1/2 h-full flex items-center justify-center">
          <img
            src="https://jxxnwnoikngatnldtzry.supabase.co/storage/v1/object/public/profile-pic/me.png"
            alt="Bernardo"
            className="w-[70%] h-[70%] object-cover rounded-xl"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold">About Me!</h1>
          <p className="text-justify pr-10">Hello! I'm Bernardo, a Computer Science student at UFSJ. I'm a versatile developer who enjoys tackling diverse challenges across the tech stack. My primary toolkit includes Python, C/C++, C#, Java, and web development. Outside of my academic and corporate leadership roles, I'm an active creator—currently developing a 2D game in Unity. I love blending leadership, technical problem-solving, and continuous learning to build great software.</p>
        </div>
      </motion.section>

      <motion.section
        className="bg-[#111111] rounded-2xl p-10 pb-10 mx-[186px] mt-4 mb-25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
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

      <motion.section
        id="contact"
        className="bg-[#111111] rounded-2xl p-10 mx-[186px] mt-4 mb-25 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex gap-10"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="w-1/2 flex flex-col justify-center gap-4">
          <h2 className="text-4xl font-bold">Let's Talk!</h2>
          <p className="text-white/50 text-lg">Fill out the form to get in touch.</p>
        </div>

        <form onSubmit={handleContact} className="w-1/2 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={contactForm.name}
            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 outline-none transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 outline-none transition-colors"
          />
          <input
            type="text"
            placeholder="Reason for Contact"
            required
            value={contactForm.title}
            onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 outline-none transition-colors"
          />
          <textarea
            placeholder="Message"
            required
            rows={4}
            value={contactForm.message}
            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 outline-none transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={contactStatus === "sending" || contactStatus === "sent"}
            className="bg-purple-500 px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {contactStatus === "sending" ? "Sending..." : contactStatus === "sent" ? "Message Sent!" : "Send Message"}
          </button>
          {contactStatus === "limited" && (
            <p className="text-red-400 text-sm text-center">You can only send one message every 6 hours.</p>
          )}
          {contactStatus === "error" && (
            <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      </motion.section>
    </main>
  );
}
