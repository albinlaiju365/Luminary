"use client";

import { useEffect, useState } from "react";

export function useSectionObserver() {
    const [activeSection, setActiveSection] = useState<string>("hero");

    useEffect(() => {
        const sections = document.querySelectorAll("section[id], header[id]");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.3, // Trigger when 30% of section is visible
                rootMargin: "-20% 0px -20% 0px" // Focus on center of screen
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return activeSection;
}
