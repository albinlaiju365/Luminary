"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
            {/* Decorative large text */}
            <h2 className="absolute top-20 left-0 text-[12rem] md:text-[20rem] font-serif text-[var(--text-primary)] opacity-[0.02] pointer-events-none select-none leading-none">
                CALM
            </h2>

            <div className="container max-w-4xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <span className="block text-sm tracking-[0.2em] uppercase text-[var(--accent)] mb-8">
                        The Philosophy
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-10 text-[var(--text-primary)]">
                        A sanctuary designed for <br />
                        <span className="italic text-[var(--text-secondary)]">silence and restoration.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
                        At LUMIÈRE, we believe in the quiet power of touch to heal and restore.
                        Our space is a carefully curated respite from the noise of the world,
                        dedicated entirely to your well-being through professional care and an
                        unwavering commitment to peace.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
