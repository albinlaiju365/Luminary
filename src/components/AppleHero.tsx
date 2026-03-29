"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
    onBook: () => void;
}

export default function PremiumHero({ onBook }: HeroProps) {
    return (
        <section className="relative min-h-[100dvh] md:h-[100dvh] snap-start w-full flex items-center justify-center overflow-hidden bg-sand-50 bg-mesh-premium pt-20 md:pt-28 pb-10">
            {/* Elegant Image Container Layout */}
            <div className="container-premium w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                
                {/* Text Content */}
                <div className="z-10 relative flex flex-col items-start text-left max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8"
                    >
                        <span className="uppercase tracking-[0.3em] text-xs font-semibold text-charcoal-800 border border-charcoal-800/10 px-4 py-2 rounded-full backdrop-blur-sm bg-white/30">
                            The Sanctuary
                        </span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl sm:text-7xl lg:text-8xl font-normal text-charcoal-900 leading-[1.05] tracking-tight mb-8"
                    >
                        Mastering the <br/><span className="italic text-charcoal-800/80">art of silence.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-lg md:text-xl text-text-secondary font-light max-w-lg tracking-tight mb-12"
                    >
                        Elevate your wellness ritual in an atmosphere crafted for unparalleled relaxation, precision styling, and absolute serenity.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
                    >
                        <button
                            onClick={onBook}
                            className="bg-charcoal-900 text-white w-full sm:w-auto px-10 py-5 rounded-full text-sm font-medium hover:bg-black transition-all duration-500 shadow-premium hover:shadow-premium-hover flex items-center justify-center gap-3 group"
                        >
                            Reserve your space
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 w-full h-[50vh] lg:h-[75vh] rounded-[2rem] overflow-hidden shadow-float"
                >
                    <img
                        src="/images/spa_interior.png"
                        alt="Serene Spa Environment"
                        className="w-full h-full object-cover transition-opacity duration-700 ease-out mix-blend-multiply opacity-90"
                    />
                    <div className="absolute inset-0 border border-black/5 rounded-[2rem] pointer-events-none" />
                </motion.div>

            </div>
        </section>
    );
}
