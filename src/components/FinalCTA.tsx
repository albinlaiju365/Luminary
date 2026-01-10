"use client";

import { motion } from "framer-motion";

interface FinalCTAProps {
    onBook: () => void;
}

export default function FinalCTA({ onBook }: FinalCTAProps) {
    return (
        <section id="final-cta" className="section-padding px-6 bg-transparent flex flex-col items-center justify-center text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl"
            >
                <div className="mb-12 text-[10px] uppercase tracking-[0.5em] text-text-light font-medium">Limited Availability</div>
                <h2 className="text-4xl md:text-7xl font-serif text-charcoal mb-20 tracking-tight leading-none uppercase font-light">
                    Begin the<br />
                    Ritual.
                </h2>

                <motion.button
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={onBook}
                    className="px-20 py-6 border border-charcoal text-charcoal rounded-soft text-[10px] uppercase tracking-[0.4em] font-medium transition-all duration-700 hover:bg-charcoal hover:text-white h-20 flex items-center"
                >
                    Reserve Your Journey
                </motion.button>
            </motion.div>
        </section>

    );
}
