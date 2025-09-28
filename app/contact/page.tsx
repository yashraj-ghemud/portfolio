"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function ContactPage() {

    const [isHackerMode, setIsHackerMode] = useState(false);
    const [glitchText, setGlitchText] = useState("CONTACT");
    const [typingText, setTypingText] = useState("");
    const [showMatrix, setShowMatrix] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeField, setActiveField] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const matrixRef = useRef<HTMLCanvasElement>(null);

    // Matrix Rain Effect
    useEffect(() => {
        if (!matrixRef.current || !showMatrix) return;

        const canvas = matrixRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = typeof window !== "undefined" ? window.innerWidth : 800;
        canvas.height = typeof window !== "undefined" ? window.innerHeight : 600;

        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            if (!ctx) return;
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00ff41";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, [showMatrix]);

    // Glitch Text Effect
    useEffect(() => {
        const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";
        let interval: NodeJS.Timeout;

        if (isHackerMode) {
            interval = setInterval(() => {
                const randomText = "CONTACT".split("").map(char =>
                    Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
                ).join("");
                setGlitchText(randomText);
                setTimeout(() => setGlitchText("CONTACT"), 100);
            }, 200);
        }

        return () => clearInterval(interval);
    }, [isHackerMode]);

    // Typing Effect
    useEffect(() => {
        const text = "ESTABLISHING SECURE CONNECTION...";
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                setTypingText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
        return () => clearInterval(typeInterval);
    }, []);

    // Mouse Tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        if (typeof window !== "undefined") {
            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    // Particle System Component
    const ParticleSystem = () => (
        <div className="fixed inset-0 pointer-events-none z-0">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                        left: Math.random() * 100 + "%",
                        top: Math.random() * 100 + "%",
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </div>
    );

    // Radar Effect
    const RadarEffect = () => (
        <motion.div
            className="fixed inset-0 pointer-events-none z-10"
            style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                    rgba(0, 255, 255, 0.1) 0%, 
                    rgba(0, 255, 255, 0.05) 20%, 
                    transparent 40%)`
            }}
            animate={{
                opacity: [0.5, 1, 0.5]
            }}
            transition={{
                duration: 2,
                repeat: Infinity
            }}
        />
    );

    // Holographic Scanner Lines
    const ScannerLines = () => (
        <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{
                        y: typeof window !== "undefined" ? window.innerHeight + 10 : 610,
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setShowMatrix(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000));

        setIsSubmitting(false);
        setShowMatrix(false);
        alert("Message transmitted successfully! 🚀");
    };

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* Matrix Background */}
            <AnimatePresence>
                {showMatrix && (
                    <motion.canvas
                        ref={matrixRef}
                        className="fixed inset-0 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>

            {/* Particle System */}
            <ParticleSystem />

            {/* Radar Effect */}
            <RadarEffect />

            {/* Scanner Lines */}
            <ScannerLines />

            {/* Grid Background */}
            <motion.div
                className="fixed inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px"
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "50px 50px"]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <main className="max-w-6xl mx-auto px-6 py-16 relative z-20">
                {/* Enhanced Header with Glitch Effect */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        className="text-6xl md:text-8xl font-black mb-4 relative"
                        onMouseEnter={() => setIsHackerMode(true)}
                        onMouseLeave={() => setIsHackerMode(false)}
                        style={{
                            fontFamily: "monospace",
                            textShadow: "0 0 10px cyan, 0 0 20px cyan, 0 0 40px cyan"
                        }}
                    >
                        {glitchText.split("").map((letter, i) => (
                            <motion.span
                                key={i}
                                className="inline-block"
                                animate={isHackerMode ? {
                                    y: [0, -5, 0],
                                    color: ["#00ffff", "#ff0080", "#00ffff"],
                                    scale: [1, 1.1, 1]
                                } : {}}
                                transition={{
                                    duration: 0.2,
                                    delay: i * 0.05,
                                    repeat: isHackerMode ? Infinity : 0
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.div
                        className="text-cyan-400 font-mono text-lg"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {typingText}
                        <motion.span
                            animate={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            █
                        </motion.span>
                    </motion.div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Side - Contact Info with Holographic Effect */}
                    <motion.div
                        initial={{ opacity: 0, x: -100, rotateY: -15 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring" }}
                        className="space-y-8 relative"
                    >
                        {/* Holographic Border */}
                        <motion.div
                            className="absolute inset-0 rounded-xl opacity-50"
                            style={{
                                background: "linear-gradient(45deg, transparent, cyan, transparent, magenta, transparent)",
                                padding: "2px"
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-full h-full bg-black rounded-xl" />
                        </motion.div>

                        <div className="relative z-10 p-8">
                            <motion.h3
                                className="text-3xl font-bold mb-6 text-cyan-400"
                                style={{ fontFamily: "monospace" }}
                                whileHover={{ scale: 1.05, textShadow: "0 0 20px cyan" }}
                            >
                                INITIALIZE_CONTACT
                            </motion.h3>

                            <motion.p
                                className="text-neutral-300 mb-8 font-mono leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 2 }}
                            >
                                Developer : yashraj ghemud
                            </motion.p>

                            <div className="space-y-6">
                                {[
                                    { icon: "📧", text: "yashraj.ghemud@example.com", href: "mailto:yashraj.ghemud@example.com" },
                                    { icon: "💼", text: "LinkedIn Neural Network", href: "https://linkedin.com/in/yashraj-g" },
                                    { icon: "🐱", text: "GitHub Repository", href: "https://github.com/yashraj-ghemud" },
                                    { icon: "🔐", text: "Encrypted Channel", href: "#" }
                                ].map((item, i) => (
                                    <motion.a
                                        key={i}
                                        href={item.href}
                                        className="flex items-center space-x-4 group cursor-pointer p-3 rounded-lg relative overflow-hidden"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + i * 0.2 }}
                                        whileHover={{
                                            scale: 1.05,
                                            x: 10,
                                        }}
                                        onMouseEnter={() => setActiveField(`contact-${i}`)}
                                        onMouseLeave={() => setActiveField("")}
                                    >
                                        <motion.span
                                            className="text-2xl"
                                            animate={activeField === `contact-${i}` ? {
                                                rotate: [0, 360],
                                                scale: [1, 1.2, 1]
                                            } : {}}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {item.icon}
                                        </motion.span>

                                        <motion.span
                                            className="font-mono text-cyan-400 group-hover:text-white transition-colors relative z-10"
                                            animate={activeField === `contact-${i}` ? {
                                                x: [0, 5, 0],
                                                textShadow: "0 0 10px cyan"
                                            } : {}}
                                        >
                                            {item.text}
                                        </motion.span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form with Cyberpunk Style */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, rotateY: 15 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring", delay: 0.3 }}
                        className="relative"
                    >
                        {/* Form Container with Neon Glow */}
                        <motion.div
                            className="bg-neutral-900/80 backdrop-blur-sm border-2 border-cyan-500/50 rounded-xl p-8 relative overflow-hidden"
                            whileHover={{
                                borderColor: "rgb(6 182 212)",
                                boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.h3
                                className="text-2xl font-bold mb-6 text-center font-mono"
                                style={{ textShadow: "0 0 10px cyan" }}
                            >
                                SECURE_MESSAGE_PROTOCOL
                            </motion.h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.input
                                    type="text"
                                    placeholder="ENTER_USER_NAME"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    className="w-full px-4 py-4 bg-black/50 border-2 border-neutral-700 rounded-lg 
                                             font-mono text-cyan-400 placeholder-cyan-600 focus:outline-none 
                                             focus:border-cyan-500 transition-all duration-300"
                                />

                                <motion.input
                                    type="email"
                                    placeholder="ENTER_YOUR_EMAIL"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className="w-full px-4 py-4 bg-black/50 border-2 border-neutral-700 rounded-lg 
                                             font-mono text-cyan-400 placeholder-cyan-600 focus:outline-none 
                                             focus:border-purple-500 transition-all duration-300"
                                />

                                <motion.textarea
                                    placeholder="COMPOSE_ENCRYPTED_MESSAGE..."
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => handleInputChange("message", e.target.value)}
                                    className="w-full px-4 py-4 bg-black/50 border-2 border-neutral-700 rounded-lg 
                                             font-mono text-cyan-400 placeholder-cyan-600 focus:outline-none 
                                             focus:border-yellow-500 transition-all duration-300 resize-none"
                                />

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-black 
                                             rounded-lg font-bold font-mono text-lg relative overflow-hidden
                                             disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={!isSubmitting ? {
                                        scale: 1.02,
                                        boxShadow: "0 0 30px rgba(6, 182, 212, 0.8)"
                                    } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                >
                                    <span className="relative z-10">
                                        {isSubmitting ? "TRANSMITTING..." : "SEND_MESSAGE"}
                                    </span>
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Status Bar */}
                <motion.div
                    className="mt-16 p-4 bg-black/50 border border-cyan-500/30 rounded-lg font-mono text-xs text-cyan-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                >
                    <div className="flex justify-between items-center">
                        <span>DEV NINJA</span>
                        <span>DEV NINJA</span>
                        <span>DEV NINJA</span>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
