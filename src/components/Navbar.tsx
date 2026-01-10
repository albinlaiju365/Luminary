"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
    onBook: () => void;
}

export default function Navbar({ onBook }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-700">
            <div className="container-custom py-4 md:py-5 relative flex items-center justify-between">
                {/* Mobile/Default Logo - Hidden on desktop when not scrolled */}
                <Link
                    href="/"
                    className={`text-base md:text-lg font-serif text-charcoal tracking-[0.2em] uppercase font-light transition-opacity duration-700 ${isScrolled ? 'opacity-100' : 'opacity-100 md:opacity-0 md:pointer-events-none'}`}
                >
                    Luminary
                </Link>

                <div className={`hidden md:flex items-center gap-12 absolute top-1/2 transition-all duration-1000 ease-[0.22,1,0.36,1] ${isScrolled
                    ? "right-0 -translate-y-1/2 translate-x-0"
                    : "left-1/2 -translate-y-1/2 -translate-x-1/2"
                    }`}>
                    <Link href="#experience" className="text-[10px] uppercase tracking-[0.3em] text-text-muted hover:text-charcoal transition-colors font-medium">Experience</Link>
                    <Link href="#services" className="text-[10px] uppercase tracking-[0.3em] text-text-muted hover:text-charcoal transition-colors font-medium">Services</Link>
                    <button
                        onClick={onBook}
                        className="text-[10px] uppercase tracking-[0.3em] text-charcoal transition-all font-medium h-10 flex items-center animate-text-rgb"
                    >
                        Book
                    </button>
                </div>

                <button className="md:hidden text-charcoal" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X strokeWidth={1} /> : <Menu strokeWidth={1} />}
                </button>
            </div>


            {/* Mobile Dropdown - Keeping it clean */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-stone-50 border-b border-sand-100 shadow-sm md:hidden flex flex-col items-center py-12 gap-8">
                    <Link href="#experience" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-[0.3em] text-charcoal">Experience</Link>
                    <Link href="#services" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-[0.3em] text-charcoal">Services</Link>
                    <button
                        onClick={() => { onBook(); setIsOpen(false); }}
                        className="text-xs uppercase tracking-[0.3em] text-charcoal font-medium animate-text-rgb"
                    >
                        Book
                    </button>
                </div>
            )}
        </nav>
    );
}
