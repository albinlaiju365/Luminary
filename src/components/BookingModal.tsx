"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send this to your backend
        console.log("Booking Request:", formData);
        setSubmitted(true);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-charcoal/20 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-md bg-stone-50 rounded-soft p-10 shadow-2xl overflow-hidden border border-sand-100"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-text-light hover:text-charcoal transition-colors"
                        >
                            <X strokeWidth={1} />
                        </button>

                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h2 className="text-3xl font-serif text-charcoal mb-4 uppercase tracking-widest font-light">
                                        Join Luminary
                                    </h2>
                                    <p className="text-text-muted text-sm font-light mb-10 italic">
                                        Begin your journey into architectural silence. ✨
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.3em] text-text-light mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-transparent border-b border-sand-200 py-3 focus:outline-none focus:border-charcoal transition-colors text-sm font-light px-0"
                                                placeholder="Enter your name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.3em] text-text-light mb-2">
                                                Mail ID
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-transparent border-b border-sand-200 py-3 focus:outline-none focus:border-charcoal transition-colors text-sm font-light px-0"
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase tracking-[0.3em] text-text-light mb-2">
                                                No (Phone Number)
                                            </label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-transparent border-b border-sand-200 py-3 focus:outline-none focus:border-charcoal transition-colors text-sm font-light px-0"
                                                placeholder="+91 00000 00000"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full mt-10 text-[10px] uppercase tracking-[0.4em] bg-charcoal text-white py-5 rounded-soft hover:opacity-90 transition-opacity font-medium"
                                        >
                                            Reserve Your Presence
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-10"
                                >
                                    <CheckCircle2 className="w-16 h-16 text-ocean mx-auto mb-6 stroke-[1]" />
                                    <h2 className="text-3xl font-serif text-charcoal mb-4 uppercase tracking-widest font-light">
                                        Sanctuary Reserved
                                    </h2>
                                    <p className="text-text-muted text-sm font-light italic mb-10 max-w-xs mx-auto">
                                        We have received your request. A Luminary concierge will reach out to curate your experience shortly. 🌿
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="text-[10px] uppercase tracking-[0.3em] text-charcoal font-medium border-b border-charcoal/20 pb-1 hover:border-charcoal transition-all"
                                    >
                                        Return to Silence
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
