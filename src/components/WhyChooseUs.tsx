"use client";

import { motion } from "framer-motion";
import { Users, Moon, CalendarCheck } from "lucide-react";
import { ReactNode } from "react";

interface FeatureItem {
    id: string;
    icon: ReactNode;
    title: string;
    desc: string;
}

const features: FeatureItem[] = [
    {
        id: "practitioners",
        icon: <Users size={24} strokeWidth={1} />,
        title: "Expert Practitioners",
        desc: "Dedicated professionals focused on your wellbeing",
    },
    {
        id: "ambiance",
        icon: <Moon size={24} strokeWidth={1} />,
        title: "Serene Ambiance",
        desc: "A completely noise-free sanctuary",
    },
    {
        id: "appointment",
        icon: <CalendarCheck size={24} strokeWidth={1} />,
        title: "By Appointment",
        desc: "Personalized time slots ensuring total privacy",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-32 bg-white border-t border-b border-stone-100">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="p-5 rounded-full bg-stone-50 text-stone-600">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-stone-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm font-light text-stone-500">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
