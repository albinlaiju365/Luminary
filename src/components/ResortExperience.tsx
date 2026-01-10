"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ResortExperience() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section id="resort" ref={sectionRef} className="relative min-h-[60vh] w-full section-padding px-8 flex items-center bg-transparent text-charcoal overflow-hidden">
            <motion.div
                style={{ y: yParallax }}
                className="absolute inset-x-0 top-[-20%] bottom-[-20%] z-0"
            >
                <Image
                    src="/resort.png"
                    alt="Serene Water Elements"
                    fill
                    className="object-cover opacity-40 grayscale"
                />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl"
                >
                    <h2 className="text-5xl md:text-7xl font-serif mb-12 tracking-tighter leading-[0.9] uppercase font-light">
                        Pure<br />
                        Silence.
                    </h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                        className="flex gap-12 items-start"
                    >
                        <div className="w-12 h-px bg-charcoal/20 mt-4 shrink-0" />
                        <p className="text-charcoal/60 text-xl font-light max-w-lg leading-relaxed italic">
                            Architecture that breathes. From heated marble to the sound of falling water, every element is designed to pull you deeper into the present moment.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

        </section>
    );
}
