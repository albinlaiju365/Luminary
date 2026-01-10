"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroProps {
    onBook: () => void;
}

export default function Hero({ onBook }: HeroProps) {
    const collagenImages = {
        slot1: ["/collage-2.png", "/collage-5.png"], // Stay/Atmosphere
        slot2: ["/collage-1.png", "/collage-4.png"], // Massage Detail
        slot3: ["/collage-3.png", "/collage-6.png"], // Architectural/Facial
    };

    const [indices, setIndices] = useState({ slot1: 0, slot2: 0, slot3: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setIndices(prev => ({
                slot1: (prev.slot1 + 1) % collagenImages.slot1.length,
                slot2: (prev.slot2 + 1) % collagenImages.slot2.length,
                slot3: (prev.slot3 + 1) % collagenImages.slot3.length,
            }));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="hero" className="relative min-h-[80vh] md:min-h-[85vh] w-full flex items-center bg-transparent pt-12 md:pt-0 overflow-hidden">

            {/* Background Texture - Minimal */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <Image src="/textures.png" alt="Plaster Texture" fill className="object-cover" />
            </div>

            <div className="relative z-10 container-custom w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">

                    {/* Left Content Column */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-6 tracking-[0.1em] uppercase font-light leading-tight">
                                Luminary
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="mb-8"
                        >
                            <p className="text-sm md:text-base font-serif text-text-muted italic tracking-wide max-w-sm">
                                A sanctuary for architectural rest & intentional healing. ✨
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 1 }}
                            className="flex flex-col items-start"
                        >
                            <p className="text-[10px] md:text-xs text-text-light uppercase tracking-[0.4em] max-w-sm mb-12 leading-relaxed">
                                Experience silence through form. We curate wellness as a dialogue between space, light, and the human body.
                            </p>

                            <div className="flex items-center gap-10">
                                <motion.button
                                    whileHover={{ x: 8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onBook}
                                    className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-charcoal font-medium"
                                >
                                    <span className="relative pb-1 text-text-main">
                                        Reserve Your Journey
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal/20 group-hover:bg-charcoal transition-all duration-500" />
                                    </span>
                                    <span className="w-8 h-[1px] bg-charcoal/20 group-hover:w-12 transition-all duration-500" />
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Collage Column */}
                    <div className="md:col-span-12 lg:col-span-7 relative h-[500px] md:h-[600px] mt-12 lg:mt-16">
                        {/* Main Stay Image Slot */}
                        <div className="absolute top-0 right-0 w-[70%] h-[80%] rounded-sm overflow-hidden shadow-soft">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={collagenImages.slot1[indices.slot1]}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={collagenImages.slot1[indices.slot1]}
                                        alt="Luxury Stay"
                                        fill
                                        className="object-cover desaturate-[0.1]"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Massage Detail Image Slot */}
                        <div className="absolute bottom-0 left-0 w-[45%] h-[50%] rounded-sm overflow-hidden shadow-md z-20 border-4 border-stone-50">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={collagenImages.slot2[indices.slot2]}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={collagenImages.slot2[indices.slot2]}
                                        alt="Treatment Detail"
                                        fill
                                        className="object-cover desaturate-[0.2]"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Architectural Detail Slot */}
                        <div className="absolute top-1/2 left-1/4 w-[35%] h-[40%] rounded-sm overflow-hidden shadow-lg z-10 -translate-y-1/2 border-8 border-stone-50">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={collagenImages.slot3[indices.slot3]}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={collagenImages.slot3[indices.slot3]}
                                        alt="Atmosphere Detail"
                                        fill
                                        className="object-cover opacity-90"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>

            {/* Restrained Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 3, duration: 2 }}
                className="absolute bottom-10 left-8 hidden md:flex flex-col items-center gap-4 z-10"
            >
                <div className="w-px h-16 bg-charcoal" />
            </motion.div>
        </section>
    );
}

