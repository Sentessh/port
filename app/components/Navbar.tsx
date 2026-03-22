"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";


export default function Navbar(){

    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        function handleScroll(){
            if(window.scrollY < lastScrollY){
                setVisible(true);
            }else{
                setVisible(false);
            }
            setLastScrollY(window.scrollY);
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return(
        <header className={` w-full fixed top-0 left-0 px-130 py-8 bg-[#111111] ${visible ? "translate-y-0" : "-translate-y-full"}`}>
            <nav className={` flex  justify-between items-center `}>
                <div className={"flex font-bold leading-none text-xl"}>
                    BDev
                </div>

                <div className="flex gap-15 font-bold leading-none">
                    <a className="inline-flex items-center gap-1" href="#aboutMe">About Me<ChevronDown size={14}/></a>
                    <a className="inline-flex items-center gap-1" href="#projects">Projects<ChevronDown size={14}/></a>
                    <a className="inline-flex items-center gap-1" href="#contact">Contact Me<ChevronDown size={14}/></a>
                </div>
            </nav>
        </header>
    );

}