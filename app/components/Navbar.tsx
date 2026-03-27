"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      if (diff < -10) {
        setVisible(true);
      } else if (diff > 3) {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`w-full fixed top-0 left-0 z-50 px-[130px] py-8 bg-[#111111] transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex justify-between items-center">
        <div className="flex font-bold leading-none text-xl">
          BDev
        </div>

        <div className="flex gap-[15px] font-bold leading-none">
          <a className="inline-flex items-center gap-1" href="#aboutMe">
            About Me <ChevronDown size={14}/>
          </a>
          <a className="inline-flex items-center gap-1" href="#projects">
            Projects <ChevronDown size={14}/>
          </a>
          <a className="inline-flex items-center gap-1" href="#contact">
            Contact Me <ChevronDown size={14}/>
          </a>
        </div>
      </nav>
    </header>
  );
}