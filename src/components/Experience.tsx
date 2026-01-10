"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Wind, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Experience() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    const cards = [
        {
            icon: <Wind strokeWidth={1} />,
            title: "Deep Relaxation",
            desc: "Therapies designed to silence the world."
        },
        {
            icon: <Sparkles strokeWidth={1} />,
            title: "Mind & Body Healing",
            desc: "Restore your natural rhythm and flow."
        },
        {
            icon: <MapPin strokeWidth={1} />,
            title: "Luxury Environment",
            desc: "Immersive nature, total privacy."
        }
    ];

    return (
        <section id="experience" ref={sectionRef} className="section-padding px-6 bg-transparent relative overflow-hidden">
            {/* Background Decorations with Parallax */}
            <motion.div
                style={{ y: yParallax }}
                className="absolute top-0 left-0 w-1/3 h-[130%] opacity-10 pointer-events-none"
            >
                <Image
                    src="/lobby.png"
                    alt="Healing Ritual Left"
                    fill
                    className="object-cover grayscale"
                />
            </motion.div>

            <motion.div
                style={{ y: yParallax }}
                className="absolute top-0 left-1/3 w-1/3 h-[130%] opacity-10 pointer-events-none"
            >
                <Image
                    src="/resort.png"
                    alt="Healing Ritual Middle"
                    fill
                    className="object-cover grayscale"
                />
            </motion.div>

            <motion.div
                style={{ y: yParallax }}
                className="absolute top-0 right-0 w-1/3 h-[130%] opacity-10 pointer-events-none"
            >
                <Image
                    src="/experience.png"
                    alt="Healing Ritual Right"
                    fill
                    className="object-cover grayscale"
                />
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-32 max-w-2xl"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-10 tracking-tight font-light uppercase">Built for Silence</h2>
                    <p className="text-text-muted text-base font-light leading-relaxed">
                        We prioritize the subtle over the spectacular. Every surface and shadow is curated to eliminate visual noise and invite effortless presence. 🌿
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.3,
                                delayChildren: 0.3
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-charcoal/5"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
                            }}
                            className="pt-16 md:pr-12 md:border-r last:border-r-0 border-charcoal/5"
                        >
                            <span className="text-[10px] text-text-light tracking-[0.5em] uppercase mb-8 block">0{index + 1}</span>
                            <h3 className="text-2xl font-serif text-charcoal mb-6 font-light uppercase tracking-widest">
                                {card.title}
                            </h3>
                            <p className="text-sm text-text-muted leading-loose font-light max-w-[240px]">
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
