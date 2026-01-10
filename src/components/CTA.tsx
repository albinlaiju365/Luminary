"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState, MouseEvent } from "react";

export default function CTA() {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const x = (e.clientX - centerX) * 0.3;
        const y = (e.clientY - centerY) * 0.3;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <section className="py-40 bg-stone-50 flex flex-col items-center justify-center text-center px-6">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
            >
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-8">
                    Your Sanctuary Awaits
                </p>

                <h2 className="text-5xl md:text-7xl font-serif text-stone-900 mb-16 tracking-tight">
                    Ready to Unwind?
                </h2>

                <motion.button
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    animate={{ x: position.x, y: position.y }}
                    transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                    className="group relative inline-flex items-center gap-4 bg-stone-900 text-stone-50 px-12 py-6 rounded-full overflow-hidden hover:bg-black transition-all duration-300 shadow-2xl shadow-stone-200"
                    onClick={() => window.open("https://wa.me/?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.", "_blank")}
                >
                    <span className="relative z-10 text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                        Message on WhatsApp
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </motion.button>
            </motion.div>
        </section>
    );
}
