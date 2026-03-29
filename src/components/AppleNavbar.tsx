"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface AppleNavbarProps {
    onBook: () => void;
    hideNavItems?: boolean;
}

export default function AppleNavbar({ onBook, hideNavItems = false }: AppleNavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const container = document.getElementById("main-scroll-container");
        
        const handleScroll = (e: Event) => {
            const y = container ? container.scrollTop : window.scrollY;
            setScrolled(y > 20);
        };

        if (container) {
            container.addEventListener("scroll", handleScroll, { passive: true });
            return () => container.removeEventListener("scroll", handleScroll);
        } else {
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            <div className="container-premium mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    {!hideNavItems && (
                        <a href="/" className={`relative z-10 flex items-center gap-2 group transition-all duration-700 pointer-events-auto ${scrolled ? 'opacity-0 -translate-y-4 !pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                            <span className="font-serif text-[1.35rem] tracking-tight text-charcoal-900 group-hover:opacity-70 transition-opacity">Sōl Studio</span>
                        </a>
                    )}

                    {/* Desktop Links (Hidden on mobile) */}
                    {!hideNavItems && (
                        <nav className={`hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 transition-all duration-700 pointer-events-auto ${scrolled ? 'opacity-0 -translate-y-4 !pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                            {['Services', 'Stylists', 'Location'].map((item) => (
                                <a 
                                    key={item} 
                                    href={`#${item.toLowerCase()}`}
                                    className="text-[13px] tracking-wide text-charcoal-800 hover:text-black transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    )}

                    {/* Right Side: Account & CTA */}
                    <div className={`flex items-center gap-3 sm:gap-4 md:gap-5 relative z-10 pointer-events-auto ${hideNavItems ? 'ml-auto' : ''}`}>
                        <a href="/account" className="flex text-text-secondary hover:text-charcoal-800 transition-colors">
                            <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </a>
                        
                        <button
                            onClick={onBook}
                            className={`inline-flex h-8 sm:h-9 px-4 sm:px-6 items-center justify-center rounded-full border border-charcoal-900/20 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-charcoal-900 hover:bg-charcoal-900 hover:border-charcoal-900 hover:text-white transition-all duration-500`}
                        >
                            Book
                        </button>

                        {/* Mobile Menu Button */}
                        {!hideNavItems && (
                            <button 
                                className={`md:hidden relative z-50 p-2 -mr-2 text-charcoal-900 transition-all duration-700 pointer-events-auto ${scrolled ? 'opacity-0 -translate-y-4 !pointer-events-none' : 'opacity-100 translate-y-0'}`}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[60] bg-sand-50 h-[100dvh] flex flex-col pt-20 px-8"
                    >
                        <button
                            className="absolute top-6 right-8 text-charcoal-900 p-2 border border-charcoal-900/10 rounded-full"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="w-5 h-5 stroke-[1.5]" />
                        </button>
                        <nav className="flex flex-col space-y-10 font-serif text-4xl tracking-tight mt-16">
                            <a href="#services" className="text-charcoal-900/80 hover:text-charcoal-900" onClick={() => setMobileMenuOpen(false)}>Services</a>
                            <a href="#stylists" className="text-charcoal-900/80 hover:text-charcoal-900" onClick={() => setMobileMenuOpen(false)}>Stylists</a>
                            <a href="#info" className="text-charcoal-900/80 hover:text-charcoal-900" onClick={() => setMobileMenuOpen(false)}>Location</a>
                            <a href="/account" className="font-sans text-xl mt-8 pt-8 border-t border-charcoal-900/10 text-text-secondary" onClick={() => setMobileMenuOpen(false)}>My Account</a>
                        </nav>
                        <div className="mt-auto pb-12 w-full">
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    onBook();
                                }}
                                className="w-full bg-transparent border border-black/20 text-charcoal-900 py-3.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-colors duration-500"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
