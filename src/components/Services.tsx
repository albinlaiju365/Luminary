"use client";

import { motion } from "framer-motion";

interface ServicesProps {
    onBook: () => void;
}

export default function Services({ onBook }: ServicesProps) {
    const services = [
        "Massage Therapy",
        "Aromatherapy",
        "Body Relaxation",
        "Mindfulness Sessions",
        "Private Resort Experiences"
    ];

    return (
        <section id="services" className="section-padding px-8 bg-transparent border-y border-charcoal/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-32">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full md:w-1/3"
                >
                    <span className="text-[10px] uppercase tracking-[0.5em] text-text-light mb-12 block">Philosophy</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-8 leading-tight font-light uppercase">The<br />Disciplines.</h2>
                    <p className="text-text-muted text-sm font-light leading-loose max-w-sm">
                        Our offerings are not menu items, but foundational dialogues. Each session is a bespoke response to your physical and mental architecture. 💆‍♀️
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="w-full md:w-2/3 space-y-12"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
                            }}
                            className="flex flex-col gap-6 group cursor-pointer pb-12 border-b border-charcoal/5 last:border-0"
                        >
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-2xl md:text-4xl font-serif text-charcoal group-hover:italic transition-all duration-700 font-light">
                                    {service}
                                </h3>
                                <button
                                    onClick={onBook}
                                    className="text-[10px] text-charcoal uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-700 animate-text-rgb font-medium"
                                >
                                    Book
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        </section>

    );
}
