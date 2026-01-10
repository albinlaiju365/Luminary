"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, Sparkles } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatWidgetProps {
    currentSection: string;
    scrollDepth: number;
}

export default function ChatWidget({ currentSection, scrollDepth }: ChatWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showNudge, setShowNudge] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial nudge logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowNudge(true);
        }, 12000); // 12 seconds nudge

        return () => clearTimeout(timer);
    }, [isOpen]);

    // Scroll trigger nudge
    useEffect(() => {
        if (scrollDepth > 50 && !isOpen && !showNudge) {
            setShowNudge(true);
        }
    }, [scrollDepth, isOpen, showNudge]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);
        setShowNudge(false);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    context: { currentSection, scrollDepth }
                })
            });

            const data = await res.json();
            if (data.content) {
                setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            <AnimatePresence>
                {/* Micro-Nudge */}
                {showNudge && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-20 right-0 w-64 bg-stone-50/80 backdrop-blur-xl p-4 rounded-2xl shadow-luxury border border-sand-100 cursor-pointer mb-2"
                        onClick={() => setIsOpen(true)}
                    >
                        <p className="text-[11px] uppercase tracking-widest text-charcoal/80 font-medium">
                            Want a quick breakdown of this section?
                        </p>
                    </motion.div>
                )}

                {/* Chat Window */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="absolute bottom-0 right-0 w-[360px] md:w-[400px] h-[500px] bg-stone-50/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-sand-100 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex justify-between items-center border-b border-sand-100/50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-ocean animate-pulse" />
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal">Concierge</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-text-light hover:text-charcoal transition-colors">
                                <X size={18} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
                        >
                            {messages.length === 0 && (
                                <div className="space-y-4">
                                    <p className="text-sm text-text-muted italic font-light leading-relaxed">
                                        "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
                                    </p>
                                    <div className="pt-4 space-y-2">
                                        <button
                                            onClick={() => setInput("Explain the high-level vision of Luminary.")}
                                            className="block text-[10px] uppercase tracking-widest text-charcoal border border-sand-200 px-4 py-2 rounded-full hover:border-charcoal transition-colors"
                                        >
                                            Tell me about the vision
                                        </button>
                                        <button
                                            onClick={() => setInput("How does the registration process work?")}
                                            className="block text-[10px] uppercase tracking-widest text-charcoal border border-sand-200 px-4 py-2 rounded-full hover:border-charcoal transition-colors"
                                        >
                                            How do I book?
                                        </button>
                                    </div>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'text-charcoal font-medium bg-sand-100/50 px-4 py-3 rounded-2xl rounded-tr-none'
                                            : 'text-text-main font-light'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex gap-1">
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 rounded-full bg-charcoal" />
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 rounded-full bg-charcoal" />
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 rounded-full bg-charcoal" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-6 border-t border-sand-100/50">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative flex items-center"
                            >
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about features, pricing..."
                                    className="w-full bg-sand-50/50 border border-sand-200 rounded-2xl py-3 pl-4 pr-12 text-sm font-light focus:outline-none focus:border-charcoal transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 p-1 text-text-light hover:text-charcoal transition-colors disabled:opacity-30"
                                    disabled={!input.trim()}
                                >
                                    <Send size={18} strokeWidth={1.5} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}

                {/* Main Toggle Button */}
                {!isOpen && (
                    <motion.button
                        layoutId="chat-button"
                        onClick={() => { setIsOpen(true); setShowNudge(false); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 bg-charcoal text-white rounded-full flex items-center justify-center shadow-luxury relative"
                    >
                        <Sparkles size={22} strokeWidth={1} />
                        {showNudge && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-ocean rounded-full border-2 border-stone-50" />
                        )}
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
