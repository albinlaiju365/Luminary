"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WellnessImpact() {
    return (
        <section id="wellness" className="section-padding px-6 bg-transparent flex flex-col items-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl"
            >
                <h2 className="text-3xl md:text-5xl font-serif text-charcoal mb-16 leading-[1.1] font-light uppercase tracking-tighter">
                    This is not just a spa.<br />
                    It’s a return to yourself.
                </h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.5 }}
                    className="flex flex-wrap justify-center gap-10 text-[10px] uppercase tracking-[0.4em] text-text-light font-medium mb-32"
                >
                    <span>Silence</span>
                    <span className="opacity-20">/</span>
                    <span>Light</span>
                    <span className="opacity-20">/</span>
                    <span>Form</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full aspect-[21/9] rounded-sm overflow-hidden"
                >
                    <Image
                        src="/lobby.png"
                        alt="Luminary Reception"
                        fill
                        className="object-cover grayscale desaturate opacity-80"
                    />
                </motion.div>
            </motion.div>

        </section>

    );
}
