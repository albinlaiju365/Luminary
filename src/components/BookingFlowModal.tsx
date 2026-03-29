"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ChevronRight, Clock, Calendar, User, Scissors } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SERVICES = [
    { id: "s1", name: "Classic Haircut", duration: "45 min", price: "$40", trending: true },
    { id: "s2", name: "Balayage & Styling", duration: "120 min", price: "$150", trending: false },
    { id: "s3", name: "Signature Facial", duration: "60 min", price: "$85", trending: true },
    { id: "s4", name: "Deep Tissue Massage", duration: "90 min", price: "$120", trending: false },
];

const STYLISTS = [
    { id: "st1", name: "Elena R.", rating: 4.9, specialty: "Color Specialist" },
    { id: "st2", name: "Marcus T.", rating: 4.8, specialty: "Precision Cuts" },
    { id: "st3", name: "Sarah L.", rating: 5.0, specialty: "Spa Therapist" },
];

const TIME_SLOTS = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "04:45 PM"];

export default function BookingFlowModal({ isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState(1);
    
    // Form State
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedStylist, setSelectedStylist] = useState("");
    const [customerDetails, setCustomerDetails] = useState({ name: "", phone: "", notes: "" });
    const [otp, setOtp] = useState("");

    const handleNext = () => setStep((s) => Math.min(s + 1, 6));
    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const resetAndClose = () => {
        setTimeout(() => {
            setStep(1);
            setSelectedService("");
            setSelectedDate(new Date());
            setSelectedTime("");
            setSelectedStylist("");
        }, 500);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 font-sans">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetAndClose}
                        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full sm:w-[540px] h-[90vh] sm:h-[85vh] max-h-[850px] bg-sand-50 sm:rounded-[3rem] rounded-t-[3rem] overflow-hidden shadow-float flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-black/5 shrink-0 bg-white">
                            <div>
                                <h2 className="text-xl font-serif font-medium tracking-tight text-charcoal-900">
                                    {step === 1 && "Select Ritual"}
                                    {step === 2 && "Date & Time"}
                                    {step === 3 && "Choose Artisan"}
                                    {step === 4 && "Your Details"}
                                    {step === 5 && "Verification"}
                                    {step === 6 && "Confirmed"}
                                </h2>
                                {step < 6 && (
                                    <p className="text-[11px] uppercase tracking-widest text-text-tertiary font-semibold mt-1">Step {step} of 5</p>
                                )}
                            </div>
                            <button
                                onClick={resetAndClose}
                                className="p-3 bg-sand-50 hover:bg-sand-100 rounded-full text-text-secondary transition-colors"
                            >
                                <X className="w-5 h-5 stroke-[1.5]" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        {step < 6 && (
                            <div className="h-1 bg-black/5 w-full shrink-0">
                                <motion.div 
                                    className="h-full bg-gold"
                                    initial={{ width: `${((step - 1) / 5) * 100}%` }}
                                    animate={{ width: `${(step / 5) * 100}%` }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </div>
                        )}

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto w-full p-8 subtle-scroll bg-sand-50/50">
                            <AnimatePresence mode="wait">
                                {/* STEP 1: SERVICE */}
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                        {SERVICES.map((s) => (
                                            <div 
                                                key={s.id}
                                                onClick={() => setSelectedService(s.id)}
                                                className={`p-6 border rounded-[2rem] cursor-pointer transition-all duration-300 ${selectedService === s.id ? "border-charcoal-900 bg-white shadow-premium" : "border-black/5 bg-white/50 hover:bg-white hover:border-black/10"}`}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="font-serif text-[1.15rem] text-charcoal-900">{s.name}</h3>
                                                        {s.trending && <span className="bg-sand-200 text-charcoal-900 text-[9px] uppercase tracking-widest font-semibold px-2 py-1 rounded-full">Popular</span>}
                                                    </div>
                                                    <span className="font-medium text-charcoal-900">{s.price}</span>
                                                </div>
                                                <p className="text-sm text-text-secondary font-light flex items-center gap-2"><Clock className="w-4 h-4 stroke-[1.5]"/> {s.duration}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* STEP 2: DATE & TIME */}
                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <div className="flex justify-center bg-white border border-black/5 rounded-[2.5rem] p-6 shadow-sm">
                                            <DayPicker 
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                disabled={{ before: new Date() }}
                                                className="apple-calendar font-sans"
                                                modifiersClassNames={{
                                                    selected: 'bg-charcoal-900 text-white rounded-full hover:bg-black font-medium',
                                                    today: 'font-bold text-charcoal-900'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-[0.2em] font-semibold text-text-tertiary mb-4 block">Available Times</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {TIME_SLOTS.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-4 px-4 rounded-2xl text-[13px] tracking-wide font-medium border transition-all duration-300 ${selectedTime === time ? "border-charcoal-900 bg-charcoal-900 text-white shadow-premium" : "border-black/5 bg-white text-text-secondary hover:border-black/20 hover:text-charcoal-900"}`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: STYLIST */}
                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                        <div 
                                            onClick={() => setSelectedStylist("any")}
                                            className={`p-5 border rounded-[2rem] cursor-pointer flex items-center gap-5 transition-all duration-300 ${selectedStylist === "any" ? "border-charcoal-900 bg-white shadow-premium" : "border-black/5 bg-white/50 hover:bg-white hover:border-black/10"}`}
                                        >
                                            <div className="w-14 h-14 bg-sand-100 rounded-full flex items-center justify-center shrink-0">
                                                <User className="w-6 h-6 text-text-secondary stroke-[1.5]"/>
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-lg text-charcoal-900 mb-1">Anyone Available</h3>
                                                <p className="text-sm font-light text-text-secondary">Maximum availability</p>
                                            </div>
                                        </div>
                                        {STYLISTS.map((s) => (
                                            <div 
                                                key={s.id}
                                                onClick={() => setSelectedStylist(s.id)}
                                                className={`p-5 border rounded-[2rem] cursor-pointer flex items-center gap-5 transition-all duration-300 ${selectedStylist === s.id ? "border-charcoal-900 bg-white shadow-premium" : "border-black/5 bg-white/50 hover:bg-white hover:border-black/10"}`}
                                            >
                                                <div className="w-14 h-14 bg-sand-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                                                    <img src={`https://i.pravatar.cc/150?img=${s.id.replace('st', '')}`} alt={s.name} className="w-full h-full object-cover filter grayscale-[20%]" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-serif text-lg text-charcoal-900 mb-1">{s.name}</h3>
                                                    <p className="text-sm font-light text-text-secondary">{s.specialty}</p>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide bg-sand-100 text-charcoal-900 px-3 py-1.5 rounded-full">
                                                    ★ {s.rating}
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* STEP 4: DETAILS */}
                                {step === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="bg-white p-6 rounded-[2rem] mb-8 border border-black/5 shadow-sm">
                                            <h4 className="text-[10px] font-semibold text-text-tertiary uppercase tracking-[0.2em] mb-3">Booking Summary</h4>
                                            <p className="font-serif text-lg text-charcoal-900 mb-2">{SERVICES.find(s=>s.id === selectedService)?.name} <span className="text-text-tertiary">|</span> {SERVICES.find(s=>s.id === selectedService)?.price}</p>
                                            <p className="text-sm font-light text-text-secondary flex items-center gap-2"><Calendar className="w-4 h-4 stroke-[1.5]"/> {selectedDate ? format(selectedDate, "MMM dd, yyyy") : ""} at {selectedTime}</p>
                                        </div>

                                        <div className="space-y-5">
                                            <div>
                                                <label className="text-xs uppercase tracking-[0.15em] font-semibold text-text-tertiary mb-2 block ml-2">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    value={customerDetails.name}
                                                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                                                    className="w-full bg-white border border-black/10 rounded-[1.5rem] px-5 py-4 focus:outline-none focus:ring-0 focus:border-charcoal-900 transition-colors font-light"
                                                    placeholder="e.g. Jane Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs uppercase tracking-[0.15em] font-semibold text-text-tertiary mb-2 block ml-2">Phone Number</label>
                                                <input 
                                                    type="tel" 
                                                    value={customerDetails.phone}
                                                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                                                    className="w-full bg-white border border-black/10 rounded-[1.5rem] px-5 py-4 focus:outline-none focus:ring-0 focus:border-charcoal-900 transition-colors font-light"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs uppercase tracking-[0.15em] font-semibold text-text-tertiary mb-2 block ml-2">Optional Notes</label>
                                                <textarea 
                                                    value={customerDetails.notes}
                                                    onChange={(e) => setCustomerDetails({...customerDetails, notes: e.target.value})}
                                                    className="w-full bg-white border border-black/10 rounded-[1.5rem] px-5 py-4 focus:outline-none focus:ring-0 focus:border-charcoal-900 transition-colors font-light resize-none h-28"
                                                    placeholder="Any specific styling requests or allergies?"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 5: OTP */}
                                {step === 5 && (
                                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center pt-10">
                                        <div className="w-20 h-20 bg-white border border-black/5 shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-8 h-8 text-charcoal-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-3xl font-serif text-charcoal-900 tracking-tight mb-2">Verify Identity</h3>
                                        <p className="text-text-secondary font-light text-sm max-w-[250px] mx-auto">We sent a 4-digit security code to <span className="font-semibold text-charcoal-900">{customerDetails.phone}</span></p>
                                        
                                        <div className="flex justify-center gap-4 my-10">
                                            {[1,2,3,4].map((i) => (
                                                <input 
                                                    key={i}
                                                    type="text" 
                                                    maxLength={1}
                                                    className="w-16 h-20 text-center text-3xl font-light bg-white border border-black/10 rounded-2xl focus:outline-none focus:border-charcoal-900 transition-colors"
                                                    onChange={(e) => {
                                                        if(e.target.value.length === 1 && i < 4) {
                                                            const next = e.target.nextElementSibling as HTMLInputElement;
                                                            if(next) next.focus();
                                                        }
                                                        if(i === 4 && e.target.value.length === 1) {
                                                            setOtp("1234"); // Simulated setting
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <button className="text-[11px] uppercase tracking-widest font-semibold text-text-tertiary hover:text-charcoal-900 transition-colors">Resend Code</button>
                                    </motion.div>
                                )}

                                {/* STEP 6: CONFIRMED */}
                                {step === 6 && (
                                    <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center space-y-8 pt-12">
                                        <div className="relative">
                                            <motion.div 
                                                initial={{ scale: 0 }} 
                                                animate={{ scale: 1 }} 
                                                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                                                className="w-28 h-28 bg-white shadow-premium rounded-full flex items-center justify-center"
                                            >
                                                <CheckCircle2 className="w-14 h-14 text-green-700 stroke-[1.5]" />
                                            </motion.div>
                                        </div>
                                        <div>
                                            <h3 className="text-4xl font-serif text-charcoal-900 tracking-tight mb-3">Confirmed.</h3>
                                            <p className="text-text-secondary font-light text-lg max-w-[280px] mx-auto">Your sanctuary is reserved. We look forward to welcoming you.</p>
                                        </div>
                                        
                                        <div className="bg-white w-full rounded-[2rem] p-8 text-left mt-4 border border-black/5 shadow-sm">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-semibold mb-4">Reservation Details</p>
                                            <div className="space-y-4">
                                                <p className="text-charcoal-900 font-serif text-xl">{SERVICES.find(s=>s.id === selectedService)?.name}</p>
                                                <div className="h-px w-full bg-black/5" />
                                                <p className="text-text-secondary font-light text-sm flex items-center gap-3"><Calendar className="w-5 h-5 text-gold"/> {selectedDate ? format(selectedDate, "EEEE, MMMM do") : ""} at {selectedTime}</p>
                                                <p className="text-text-secondary font-light text-sm flex items-center gap-3"><Scissors className="w-5 h-5 text-gold"/> With {selectedStylist === "any" ? "Next Available Artisan" : STYLISTS.find(s=>s.id === selectedStylist)?.name}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer Controls */}
                        {step < 6 && (
                            <div className="p-6 border-t border-black/5 bg-white shrink-0 flex gap-4">
                                {step > 1 && (
                                    <button 
                                        onClick={handleBack}
                                        className="px-8 py-4 rounded-full font-medium text-text-secondary bg-sand-50 hover:bg-sand-100 transition-colors border border-black/5 text-[13px] tracking-wide"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    onClick={handleNext}
                                    disabled={
                                        (step === 1 && !selectedService) ||
                                        (step === 2 && (!selectedDate || !selectedTime)) ||
                                        (step === 3 && !selectedStylist) ||
                                        (step === 4 && (!customerDetails.name || !customerDetails.phone)) ||
                                        (step === 5 && !otp)
                                    }
                                    className="flex-1 btn-premium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 py-4 text-[13px] tracking-widest uppercase hover:translate-y-0"
                                >
                                    {step === 5 ? "Confirm" : "Continue"}
                                    {step !== 5 && <ChevronRight className="w-4 h-4 stroke-[2]" />}
                                </button>
                            </div>
                        )}
                        {step === 6 && (
                            <div className="p-6 border-t border-black/5 bg-white shrink-0">
                                <button
                                    onClick={resetAndClose}
                                    className="w-full btn-premium py-4 text-[13px] tracking-widest uppercase font-semibold"
                                >
                                    Add to Calendar
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
