"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AppleNavbar from "@/components/AppleNavbar";
import AppleHero from "@/components/AppleHero";
import BookingFlowModal from "@/components/BookingFlowModal";
import { Sparkles, MapPin, Clock, Phone, ArrowRight } from "lucide-react";

export default function Home() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    
    // Parallax scroll effect for a premium feel
    return (
        <main id="main-scroll-container" className="relative h-[100dvh] w-full bg-sand-50 text-charcoal-900 overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
            <AppleNavbar onBook={() => setIsBookingOpen(true)} />
            
            {/* The renamed Hero component file */}
            <AppleHero onBook={() => setIsBookingOpen(true)} />

            {/* AI Recommendations / Services Section */}
            <section id="services" className="min-h-[100dvh] md:h-[100dvh] snap-start flex flex-col justify-center py-20 bg-sand-100 overflow-hidden relative">
                <div className="container-premium relative z-10 w-full">
                    <div className="max-w-4xl mb-12 lg:mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-4xl md:text-6xl font-serif text-charcoal-900 tracking-tight mb-8 leading-[1.1]"
                        >
                            Curated with <br/><span className="italic">intelligent design.</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-xl md:text-2xl text-text-secondary font-light max-w-2xl"
                        >
                            State-of-the-art analysis meets artisanal craftsmanship. 
                            We tailor every treatment to your exact geometry and texture.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 w-full">
                        {[
                            { title: "Precision Cutting", desc: "Structured to enhance your natural geometry.", img: "/images/precision_cutting.png", tag: "Haircare" },
                            { title: "Color Alchemy", desc: "Vibrant, damage-free coloring using organic pigments.", img: "/images/color_alchemy.png", tag: "Coloring" }
                        ].map((pkg, i) => (
                            <motion.div 
                                key={pkg.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative rounded-[2.5rem] overflow-hidden bg-sand-50 border border-black/5 cursor-pointer shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-2"
                                onClick={() => setIsBookingOpen(true)}
                            >
                                <div className="h-48 md:h-[30vh] lg:h-64 overflow-hidden relative w-full">
                                    <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-opacity duration-700 ease-out opacity-90 mix-blend-multiply filter grayscale-[30%]" />
                                    
                                    <div className="absolute top-6 left-6 bg-white/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                                        <span className="text-[10px] uppercase font-medium tracking-[0.2em]">{pkg.tag}</span>
                                    </div>
                                </div>
                                
                                <div className="p-8 md:p-10 bg-white">
                                    <h3 className="text-3xl font-serif mb-3 group-hover:text-charcoal-800 transition-colors">
                                        {pkg.title}
                                    </h3>
                                    <p className="text-text-secondary font-light flex items-center justify-between">
                                        {pkg.desc}
                                        <ArrowRight className="w-5 h-5 text-charcoal-400 group-hover:text-gold transition-colors" />
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section id="info" className="min-h-[100dvh] md:h-[100dvh] snap-start flex flex-col justify-center py-20 bg-sand-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-sand-100 hidden md:block rounded-l-[4rem] mix-blend-multiply opacity-50 pointer-events-none" />
                
                <div className="container-premium relative z-10 flex flex-col md:flex-row gap-16 md:gap-24 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex-1 space-y-16"
                    >
                        <div>
                            <span className="uppercase tracking-[0.3em] font-medium text-[10px] mb-4 block text-text-tertiary">Our Space</span>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.1] text-charcoal-900 mb-6">
                                The ultimate <br/>sanctuary.
                            </h2>
                            <p className="text-xl text-text-secondary font-light max-w-sm">Situated in the heart of the city, Sōl Studio is designed for unparalleled tranquility.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-10">
                            {[
                                { icon: MapPin, title: "Address", desc: "123 Wellness Ave, Suite 400\nNew York, NY 10012" },
                                { icon: Clock, title: "Hours", desc: "Mon - Sat: 9:00 AM - 8:00 PM\nSun: 10:00 AM - 6:00 PM" }
                            ].map((info) => (
                                <div key={info.title} className="flex flex-col gap-4">
                                    <info.icon className="w-6 h-6 text-text-tertiary" />
                                    <div>
                                        <h4 className="font-serif text-xl mb-2">{info.title}</h4>
                                        <p className="text-text-secondary font-light whitespace-pre-line text-sm">{info.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 w-full h-[50vh] lg:h-[70vh] rounded-[3rem] overflow-hidden bg-sand-200 shadow-float relative"
                    >
                        <img src="/images/map_location.png" className="w-full h-full object-cover filter grayscale-[40%] opacity-90 transition-opacity duration-700 hover:opacity-100" alt="Map Location" />
                        <div className="absolute inset-0 border border-black/5 rounded-[3rem] pointer-events-none" />
                        
                        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-center p-6 glass-premium rounded-3xl group cursor-pointer hover:bg-white/90 transition-colors">
                            <span className="font-serif text-charcoal-900 tracking-wide text-lg">Open Map Room</span>
                        </div>
                    </motion.div>
                </div>
            </section>



            <BookingFlowModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
