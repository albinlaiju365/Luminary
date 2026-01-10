"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Testimonials() {
    const quotes = [
        "“I felt lighter the moment I entered.”",
        "“This place changed how I relax.”",
        "“Peace in physical form.”"
    ];

    return (
        <section id="testimonials" className="section-padding px-8 bg-transparent relative overflow-hidden">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <Image src="/textures.png" alt="Plaster Texture" fill className="object-cover" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
                    {quotes.map((quote, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: index * 0.4 }}
                            className="flex flex-col items-center"
                        >
                            <p className="text-xl md:text-2xl font-serif text-charcoal italic opacity-70 mb-12 leading-relaxed">
                                {quote}
                            </p>
                            <div className="w-px h-12 bg-charcoal/10" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

    );
}
