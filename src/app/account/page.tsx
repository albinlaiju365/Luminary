"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppleNavbar from "@/components/AppleNavbar";
import { Clock, Calendar, Scissors, LogOut, ChevronRight, MapPin } from "lucide-react";

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState("upcoming");

    // Mock data
    const upcomingBookings = [
        { id: 1, service: "Classic Haircut", date: "April 1st, 2026", time: "10:30 AM", stylist: "Marcus T.", status: "Confirmed" }
    ];
    
    const pastBookings = [
        { id: 2, service: "Balayage & Styling", date: "February 15th, 2026", time: "01:00 PM", stylist: "Elena R.", status: "Completed" },
        { id: 3, service: "Signature Facial", date: "January 4th, 2026", time: "04:45 PM", stylist: "Sarah L.", status: "Completed" }
    ];

    return (
        <main className="min-h-screen bg-sand-50 text-charcoal-900 pb-20 font-sans">
            <AppleNavbar onBook={() => window.location.href = '/'} hideNavItems />

            <div className="pt-28 md:pt-40 container-premium max-w-6xl">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal-900 tracking-tight mb-3">My Sanctuary</h1>
                    <p className="text-text-secondary font-light text-lg">Welcome back, John</p>
                </div>

                <div className="grid md:grid-cols-[1fr_2.5fr] gap-8 lg:gap-12">
                    {/* Sidebar */}
                    <aside className="space-y-4">
                        <div className="bg-sand-100/50 rounded-[2.5rem] p-4 shadow-sm border border-black/5 flex flex-col h-full min-h-[500px]">
                            <div className="flex flex-col space-y-1">
                                <button 
                                    onClick={() => setActiveTab("upcoming")}
                                    className={`text-left px-5 py-3.5 rounded-3xl font-medium transition-all duration-300 ${activeTab === 'upcoming' ? 'bg-charcoal-900 text-white shadow-premium' : 'text-text-secondary hover:bg-white hover:text-charcoal-900'}`}
                                >
                                    Upcoming Rituals
                                </button>
                                <button 
                                    onClick={() => setActiveTab("history")}
                                    className={`text-left px-5 py-3.5 rounded-3xl font-medium transition-all duration-300 ${activeTab === 'history' ? 'bg-charcoal-900 text-white shadow-premium' : 'text-text-secondary hover:bg-white hover:text-charcoal-900'}`}
                                >
                                    Past Experiences
                                </button>
                                <button 
                                    onClick={() => setActiveTab("preferences")}
                                    className={`text-left px-5 py-3.5 rounded-3xl font-medium transition-all duration-300 ${activeTab === 'preferences' ? 'bg-charcoal-900 text-white shadow-premium' : 'text-text-secondary hover:bg-white hover:text-charcoal-900'}`}
                                >
                                    Preferences
                                </button>
                            </div>

                            <div className="mt-auto pt-6 border-t border-black/5">
                                <button 
                                    onClick={() => window.location.href = '/'}
                                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-3xl font-medium border border-transparent text-red-600/80 hover:text-red-700 hover:bg-white transition-all duration-300"
                                >
                                    <LogOut className="w-4 h-4 stroke-[1.5]" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="bg-white rounded-[3rem] p-8 md:p-12 shadow-premium border border-black/5 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {/* UPCOMING */}
                            {activeTab === "upcoming" && (
                                <motion.div key="upcoming" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}} className="space-y-8">
                                    <h2 className="text-3xl font-serif text-charcoal-900 tracking-tight mb-8">Upcoming Rituals</h2>
                                    {upcomingBookings.length === 0 ? (
                                        <div className="text-center py-20 bg-sand-50 rounded-[2.5rem] border border-black/5">
                                            <p className="text-text-secondary font-light mb-6">Your calendar is currently clear.</p>
                                            <a href="/" className="btn-premium">Reserve a session</a>
                                        </div>
                                    ) : (
                                        upcomingBookings.map(b => (
                                            <div key={b.id} className="border border-black/5 rounded-[2.5rem] p-8 hover:shadow-premium transition-all duration-500 bg-sand-50/30">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                                                    <div>
                                                        <h3 className="text-2xl font-serif text-charcoal-900 mb-2">{b.service}</h3>
                                                        <span className="inline-block border border-green-800/20 text-green-800 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full">{b.status}</span>
                                                    </div>
                                                    <div className="flex gap-3 w-full sm:w-auto">
                                                        <button className="flex-1 sm:flex-none px-6 py-3 rounded-full border border-black/10 text-[13px] tracking-wide font-medium hover:bg-white transition-colors">Reschedule</button>
                                                        <button className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-red-50 text-red-600 text-[13px] tracking-wide font-medium hover:bg-red-100 transition-colors">Cancel</button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white p-6 rounded-[2rem] border border-black/5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-sand-50 rounded-full"><Calendar className="w-5 h-5 text-text-tertiary stroke-[1.5]" /></div>
                                                        <div>
                                                            <p className="text-[11px] uppercase tracking-wider text-text-tertiary font-semibold mb-0.5">Date</p>
                                                            <p className="text-sm font-medium text-charcoal-900">{b.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-sand-50 rounded-full"><Clock className="w-5 h-5 text-text-tertiary stroke-[1.5]" /></div>
                                                        <div>
                                                            <p className="text-[11px] uppercase tracking-wider text-text-tertiary font-semibold mb-0.5">Time</p>
                                                            <p className="text-sm font-medium text-charcoal-900">{b.time}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-sand-50 rounded-full"><Scissors className="w-5 h-5 text-text-tertiary stroke-[1.5]" /></div>
                                                        <div>
                                                            <p className="text-[11px] uppercase tracking-wider text-text-tertiary font-semibold mb-0.5">Stylist</p>
                                                            <p className="text-sm font-medium text-charcoal-900">{b.stylist}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </motion.div>
                            )}

                            {/* HISTORY */}
                            {activeTab === "history" && (
                                <motion.div key="history" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}} className="space-y-8">
                                    <h2 className="text-3xl font-serif text-charcoal-900 tracking-tight mb-8">Past Experiences</h2>
                                    <div className="space-y-4">
                                        {pastBookings.map(b => (
                                            <div key={b.id} className="flex items-center justify-between p-6 border border-black/5 rounded-[2rem] hover:bg-sand-50 transition-colors group cursor-pointer">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-white border border-black/5 rounded-full flex items-center justify-center shrink-0">
                                                        <Scissors className="w-6 h-6 text-text-tertiary stroke-[1.5]" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-serif text-xl text-charcoal-900 mb-1">{b.service}</h4>
                                                        <p className="text-sm font-light text-text-secondary">{b.date} • {b.stylist}</p>
                                                    </div>
                                                </div>
                                                <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-text-tertiary group-hover:text-charcoal-900 transition-colors">
                                                    Rebook <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* PREFERENCES */}
                            {activeTab === "preferences" && (
                                <motion.div key="preferences" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}} className="space-y-8">
                                    <h2 className="text-3xl font-serif text-charcoal-900 tracking-tight mb-8">Preferences</h2>
                                    <div className="space-y-8 max-w-md">
                                        <div>
                                            <label className="text-xs uppercase tracking-[0.2em] font-semibold text-text-tertiary mb-3 block">Preferred Sanctuary</label>
                                            <div className="flex items-center justify-between p-5 border border-black/5 rounded-2xl bg-sand-50/50">
                                                <div className="flex items-center gap-3 text-charcoal-900"><MapPin className="w-5 h-5 text-text-tertiary"/> <span className="font-medium">Sōl Studio, New York</span></div>
                                            </div>
                                        </div>
                                        <hr className="border-black/5" />
                                        <div>
                                            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-text-tertiary mb-4">Communication</h4>
                                            <div className="space-y-4">
                                                <label className="flex items-center gap-4 cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-black/20 text-charcoal-900 focus:ring-charcoal-900 accent-charcoal-900" />
                                                    <span className="text-sm font-light text-charcoal-900">Receive SMS curated reminders</span>
                                                </label>
                                                <label className="flex items-center gap-4 cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-black/20 text-charcoal-900 focus:ring-charcoal-900 accent-charcoal-900" />
                                                    <span className="text-sm font-light text-charcoal-900">Receive WhatsApp notifications</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </main>

    );
}
