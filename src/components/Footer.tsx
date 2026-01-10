"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-40 bg-stone-50 border-t border-charcoal/5">
            <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-20">
                <div className="flex flex-col items-start text-left">
                    <h2 className="text-3xl font-serif text-charcoal mb-8 tracking-[0.2em] uppercase font-light">Luminary</h2>
                    <p className="text-text-muted font-light max-w-xs leading-loose text-sm italic">
                        A sanctuary for architectural rest & intentional healing.
                    </p>
                </div>

                <div className="flex flex-col gap-6 items-start">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-text-light mb-4">Connect</span>
                    <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.3em] text-charcoal font-medium">
                        <Link href="#" className="hover:opacity-60 transition-opacity">Instagram</Link>
                        <Link href="#" className="hover:opacity-60 transition-opacity">Contact</Link>
                        <Link href="#" className="hover:opacity-60 transition-opacity">Location</Link>
                    </div>
                </div>

                <div className="flex flex-col items-start md:items-end md:text-right">
                    <p className="text-[10px] text-text-light uppercase tracking-widest leading-loose">
                        &copy; {new Date().getFullYear()} Luminary.<br />
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>

    );
}
