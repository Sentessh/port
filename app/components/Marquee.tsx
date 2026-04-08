"use client";

import { useEffect, useRef, useState } from "react";

export default function Marquee({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const singleRef = useRef<HTMLSpanElement>(null);
  const x = useRef(0);
  const [copies, setCopies] = useState(4);

  const text = items.join(" · ") + " · ";

  useEffect(() => {
    if (singleRef.current && containerRef.current) {
      const singleWidth = singleRef.current.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil((viewportWidth * 2) / singleWidth) + 1;
      setCopies(needed);
    }
  }, []);

  useEffect(() => {
    let animationId: number;

    function animate() {
      x.current -= 1.5;

      if (containerRef.current && singleRef.current) {
        const singleWidth = singleRef.current.offsetWidth;
        if (Math.abs(x.current) >= singleWidth) {
          x.current += singleWidth;
        }
        containerRef.current.style.transform = `translate3d(${x.current}px, 0px, 0px)`;
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [copies]);

  return (
    <div className="overflow-hidden w-full absolute bottom-8 left-0">
      <div ref={containerRef} className="flex whitespace-nowrap">
        {Array.from({ length: copies }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? singleRef : undefined}
            className="text-white text-2xl pr-8 uppercase"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
