"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // Add global hover listeners for interactive elements
        const handleMouseOver = (e) => {
            if (
                e.target.tagName === "BUTTON" ||
                e.target.tagName === "A" ||
                e.target.closest("button") ||
                e.target.closest("a")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="cursor-dot"
                animate={{ x: mousePosition.x, y: mousePosition.y }}
                transition={{ type: "tween", ease: "backOut", duration: 0 }}
            />
            <motion.div
                className="cursor-outline"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.8 : 0.4,
                    borderWidth: isHovered ? "2px" : "1px",
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
            />
        </>
    );
}
