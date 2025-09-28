"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { projects } from "@/data/projects";

// ---------- Icons (unchanged visuals) ----------
const CalculatorIcon = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect x="40" y="30" width="120" height="140" rx="12" fill="#374151" stroke="#fbbf24" strokeWidth="2" />
        <rect x="50" y="40" width="100" height="30" rx="4" fill="#111827" />
        <text x="140" y="60" fontSize="14" fill="#fbbf24" textAnchor="end" fontFamily="monospace">123.45</text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const x = 55 + col * 22;
            const y = 85 + row * 18;
            const isOperator = [3, 7, 11, 15].includes(i);
            return (
                <g key={i}>
                    <rect x={x} y={y} width="18" height="14" rx="3" fill={isOperator ? "#fbbf24" : "#4b5563"} stroke="#6b7280" />
                    <text x={x + 9} y={y + 10} fontSize="8" fill={isOperator ? "#000" : "#fff"} textAnchor="middle" fontFamily="sans-serif">
                        {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'][i]}
                    </text>
                </g>
            );
        })}
    </svg>
);

const DashboardIcon = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect x="20" y="20" width="160" height="160" rx="12" fill="#1f2937" stroke="#fbbf24" strokeWidth="2" />
        <rect x="30" y="30" width="140" height="20" rx="4" fill="#374151" />
        <circle cx="45" cy="40" r="4" fill="#ef4444" /><circle cx="60" cy="40" r="4" fill="#f59e0b" /><circle cx="75" cy="40" r="4" fill="#10b981" />
        <circle cx="70" cy="90" r="25" fill="none" stroke="#4b5563" strokeWidth="2" />
        <path d="M 70 65 A 25 25 0 0 1 95 90 L 70 90 Z" fill="#fbbf24" />
        <path d="M 95 90 A 25 25 0 0 1 70 115 L 70 90 Z" fill="#10b981" />
        <path d="M 70 115 A 25 25 0 1 1 70 65 L 70 90 Z" fill="#ef4444" />
        <rect x="110" y="105" width="8" height="15" fill="#fbbf24" /><rect x="120" y="95" width="8" height="25" fill="#10b981" />
        <rect x="130" y="100" width="8" height="20" fill="#ef4444" /><rect x="140" y="90" width="8" height="30" fill="#8b5cf6" /><rect x="150" y="110" width="8" height="10" fill="#f59e0b" />
        <rect x="30" y="130" width="35" height="20" rx="4" fill="#065f46" stroke="#10b981" /><text x="47" y="143" fontSize="10" fill="#10b981" textAnchor="middle">Users</text>
        <rect x="75" y="130" width="35" height="20" rx="4" fill="#7c2d12" stroke="#ef4444" /><text x="92" y="143" fontSize="10" fill="#ef4444" textAnchor="middle">Sales</text>
        <rect x="120" y="130" width="35" height="20" rx="4" fill="#92400e" stroke="#fbbf24" /><text x="137" y="143" fontSize="10" fill="#fbbf24" textAnchor="middle">Orders</text>
        <polyline points="30,160 50,155 70,160 90,150 110,155 130,145 150,150 170,140" stroke="#fbbf24" strokeWidth="2" fill="none" />
    </svg>
);

const LostFoundIcon = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect x="20" y="20" width="160" height="160" rx="12" fill="#1f2937" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="80" cy="80" r="20" fill="none" stroke="#fbbf24" strokeWidth="3" />
        <line x1="95" y1="95" x2="110" y2="110" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        <rect x="130" y="50" width="15" height="25" rx="3" fill="#374151" stroke="#10b981" /><rect x="132" y="52" width="11" height="8" rx="1" fill="#10b981" />
        <circle cx="140" cy="90" r="3" fill="#ef4444" /><rect x="137" y="93" width="6" height="2" fill="#ef4444" /><rect x="137" y="96" width="4" height="2" fill="#ef4444" />
        <rect x="125" y="110" width="20" height="12" rx="2" fill="#8b5563" stroke="#f59e0b" />
        <line x1="130" y1="113" x2="140" y2="113" stroke="#f59e0b" strokeWidth="1" /><line x1="130" y1="116" x2="135" y2="116" stroke="#f59e0b" strokeWidth="1" />
        <path d="M 60 130 C 60 125, 65 120, 70 120 C 75 120, 80 125, 80 130 C 80 135, 70 145, 70 145 C 70 145, 60 135, 60 130 Z" fill="#ef4444" stroke="#dc2626" />
        <circle cx="70" cy="130" r="3" fill="#fff" /><text x="45" y="65" fontSize="20" fill="#ef4444" fontFamily="serif">?</text><text x="120" y="170" fontSize="20" fill="#10b981" fontFamily="serif">!</text>
        <line x1="70" y1="145" x2="100" y2="160" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="100" y1="80" x2="130" y2="60" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="100" y1="80" x2="140" y2="90" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
);

// ---------- Helpers ----------
const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes("calculator")) return <CalculatorIcon />;
    if (title.toLowerCase().includes("dashboard")) return <DashboardIcon />;
    if (title.toLowerCase().includes("lost")) return <LostFoundIcon />;
    return null;
};

// Precompute stable “randoms” once per mount to avoid different layouts on re-renders
const useStableOrbs = (count = 20) =>
    useMemo(
        () =>
            Array.from({ length: count }, () => ({
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: Math.random() * 10 + 10,
                delay: Math.random() * 2,
            })),
        []
    );

export default function ProjectsClient() {
    const [showExplosion, setShowExplosion] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const orbs = useStableOrbs(20);

    useEffect(() => {
        const t1 = setTimeout(() => setShowExplosion(true), 2000);
        const t2 = setTimeout(() => setShowParticles(true), 2200);
        const t3 = setTimeout(() => setShowCards(true), 1000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    const letterAnimation = {
        hidden: { opacity: 0, y: 50, rotateX: -90, scale: 0 },
        visible: (i: number) => ({
            opacity: 1, y: 0, rotateX: 0, scale: 1,
            transition: { delay: i * 0.1, duration: 0.8, type: "spring", damping: 12, stiffness: 200 }
        })
    };

    const cardAnimation = {
        hidden: { opacity: 0, y: 100, rotateY: -30, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1, y: 0, rotateY: 0, scale: 1,
            transition: { delay: 3 + i * 0.2, duration: 0.8, type: "spring", stiffness: 100, damping: 15 }
        }),
        hover: { y: -10, rotateY: 5, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }
    };

    const explosionAnimation = {
        hidden: { scale: 0, opacity: 0 },
        visible: { scale: [0, 1.5, 1], opacity: [0, 1, 1], transition: { duration: 1, times: [0, 0.6, 1], ease: "easeOut" } }
    };

    const FloatingOrbs = () => (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {orbs.map((v, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                    style={{ width: v.width, height: v.height, left: `${v.left}%`, top: `${v.top}%`, filter: "blur(1px)" }}
                    animate={{ x: [0, 50, -25, 0], y: [0, -30, 20, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: v.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: v.delay }}
                />
            ))}
        </div>
    );

    const MatrixRain = () => {
        const rows = useMemo(() => Array.from({ length: 50 }, (_, i) => ({ left: (i * 2) % 100, d: 5 + (i % 3), delay: (i % 10) * 0.2 })), []);
        const strings = useMemo(() => ['101010', 'abc123', 'xyz789', '111000', 'def456', 'ghi789', '010101', 'jkl012', 'mno345', '000111', 'pqr678', 'stu901'], []);
        return (
            <div className="fixed inset-0 pointer-events-none z-1">
                {rows.map((r, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-green-400/20 text-sm font-mono"
                        style={{ left: `${r.left}%`, top: -20 }}
                        animate={{ y: typeof window !== "undefined" ? window.innerHeight + 20 : 900, opacity: [0, 1, 0] }}
                        transition={{ duration: r.d, repeat: Infinity, delay: r.delay, ease: "linear" }}
                    >
                        {strings[i % strings.length]}
                    </motion.div>
                ))}
            </div>
        );
    };

    const ParticleRain = () => {
        const parts = useMemo(() => Array.from({ length: 50 }, (_, i) => ({ x: (i * 25) % (typeof window !== "undefined" ? window.innerWidth : 1200), delay: (i % 5) * 0.1, d: 2 + (i % 3) })), []);
        return (
            <div className="fixed inset-0 pointer-events-none z-10">
                {parts.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                        initial={{ x: p.x, y: -10, opacity: 1 }}
                        animate={{ y: typeof window !== "undefined" ? window.innerHeight + 10 : 900, opacity: 0, transition: { duration: p.d, delay: p.delay, ease: "linear" } }}
                        style={{ boxShadow: "0 0 6px #fbbf24" }}
                    />
                ))}
            </div>
        );
    };

    const projectsText = "PROJECTS";

    return (
        <div className="relative min-h-screen overflow-hidden bg-black">
            {/* Golden screen perimeter */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                    animate={{ opacity: [0.5, 1, 0.5], boxShadow: ["0 0 10px #fbbf24", "0 0 30px #fbbf24", "0 0 10px #fbbf24"] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                    animate={{ opacity: [0.5, 1, 0.5], boxShadow: ["0 0 10px #fbbf24", "0 0 30px #fbbf24", "0 0 10px #fbbf24"] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                <motion.div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400 to-transparent"
                    animate={{ opacity: [0.5, 1, 0.5], boxShadow: ["0 0 10px #fbbf24", "0 0 30px #fbbf24", "0 0 10px #fbbf24"] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                <motion.div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400 to-transparent"
                    animate={{ opacity: [0.5, 1, 0.5], boxShadow: ["0 0 10px #fbbf24", "0 0 30px #fbbf24", "0 0 10px #fbbf24"] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
                {[0, 1, 2, 3].map((i) => (
                    <motion.div key={i} className={`absolute w-4 h-4 bg-yellow-400 rounded-full ${i === 0 ? "top-0 left-0" : i === 1 ? "top-0 right-0" : i === 2 ? "bottom-0 left-0" : "bottom-0 right-0"}`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.5 }} />
                ))}
            </div>

            {/* Cinematic background */}
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
            <FloatingOrbs />
            <MatrixRain />
            <motion.div className="fixed inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: `linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)`, backgroundSize: "50px 50px" }}
                animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />

            {/* Lightning + particles */}
            <motion.div className="fixed inset-0 pointer-events-none z-20" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0, 1, 0], backgroundColor: ["rgba(255,255,255,0)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0)"] }} transition={{ duration: 0.3, delay: 2.2, times: [0, 0.1, 0.2, 0.8, 1] }} />
            <AnimatePresence>{showParticles && <ParticleRain />}</AnimatePresence>

            <main className="relative z-30 max-w-6xl mx-auto px-6 py-20 min-h-screen flex flex-col">
                {/* Title with story animation */}
                <div className="flex justify-center items-center mb-20 h-32 relative">
                    <div className="absolute inset-0">
                        {Array.from({ length: 10 }, (_, i) => (
                            <motion.div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full" style={{ top: `${(i * 10) % 100}%`, left: "-10px" }}
                                animate={{ x: ["0px", "100vw"], rotate: [0, 360], scale: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "linear" }} />
                        ))}
                        {Array.from({ length: 3 }, (_, i) => (
                            <motion.div key={i} className="absolute border-2 border-yellow-400/20 rounded-full" style={{ width: 100 + i * 50, height: 100 + i * 50, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                                animate={{ rotate: [0, 360], scale: [1, 1.2, 1], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }} />
                        ))}
                    </div>

                    <div className="flex space-x-2 relative z-10">
                        {"PROJECTS".split("").map((letter, i) => (
                            <motion.span key={i} custom={i} initial={letterAnimation.hidden} animate={letterAnimation.visible(i) as any}
                                className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
                                style={{ textShadow: "0 0 30px rgba(255, 215, 0, 0.5)", transformStyle: "preserve-3d" }}>
                                {letter}
                                <motion.div className="absolute inset-0 text-6xl md:text-8xl font-black text-yellow-400/30"
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}>
                                    {letter}
                                </motion.div>
                                {Array.from({ length: 3 }, (_, s) => (
                                    <motion.div key={s} className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                        style={{ top: `${(s * 30) % 100}%`, left: `${(s * 40) % 100}%` }}
                                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: s * 0.5 }} />
                                ))}
                            </motion.span>
                        ))}
                    </div>

                    <AnimatePresence>
                        {showExplosion && (
                            <motion.div initial={explosionAnimation.hidden} animate={explosionAnimation.visible as any} className="absolute">
                                <div className="relative">
                                    <motion.div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500"
                                        animate={{ scale: [1, 3, 0], opacity: [1, 0.8, 0], rotate: [0, 180, 360] }} transition={{ duration: 1 }}
                                        style={{ boxShadow: "0 0 100px rgba(255, 215, 0, 0.8)" }} />
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <motion.div key={i} className="absolute w-1 bg-gradient-to-r from-yellow-400 to-transparent"
                                            style={{ height: "200px", top: "-100px", left: "50%", transformOrigin: "50% 100%", rotate: `${i * 30}deg` }}
                                            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 0.8, delay: i * 0.05 }} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Cards */}
                <AnimatePresence>
                    {showCards && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
                            {projects.map((p, i) => (
                                <motion.article key={p.title} custom={i} initial={cardAnimation.hidden} animate={cardAnimation.visible(i) as any} whileHover={cardAnimation.hover as any}
                                    className="group relative rounded-2xl overflow-hidden border-2 border-neutral-800 bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 cursor-pointer backdrop-blur-sm"
                                    style={{ transformStyle: "preserve-3d", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                                    onClick={() => window.open(p.link, "_blank")}>
                                    <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100" transition={{ duration: 0.3 }} />
                                    <div className="aspect-video bg-gradient-to-br from-neutral-700 via-neutral-600 to-neutral-800 relative overflow-hidden p-4">
                                        <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"
                                            animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }} />
                                        <motion.div className="relative z-10 w-full h-full flex items-center justify-center p-4"
                                            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                                            {getProjectIcon(p.title)}
                                        </motion.div>
                                        {Array.from({ length: 5 }, (_, s) => (
                                            <motion.div key={s} className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
                                                style={{ top: `${s * 20 + 10}%`, left: `${s * 15 + 10}%` }}
                                                animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6], scale: [1, 1.5, 1] }}
                                                transition={{ duration: 2 + s * 0.5, repeat: Infinity, delay: s * 0.3 }} />
                                        ))}
                                    </div>
                                    <div className="p-6 relative z-10">
                                        <motion.h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors" whileHover={{ scale: 1.05 }}>
                                            {p.title}
                                        </motion.h3>
                                        <p className="text-neutral-400 text-sm mb-4 leading-relaxed">{p.desc}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {p.tags.map((t, ti) => (
                                                <motion.span key={t} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 3.5 + i * 0.2 + ti * 0.1 }}
                                                    className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 border border-neutral-600 text-neutral-300 hover:border-yellow-400/50 transition-colors backdrop-blur-sm">
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </div>
                                        <motion.div className="flex items-center text-yellow-400 text-sm font-medium group-hover:text-yellow-300" whileHover={{ x: 5 }}>
                                            <span>View Project</span>
                                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="ml-2">→</motion.span>
                                        </motion.div>
                                    </div>
                                    <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                        style={{ background: "linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.1) 50%, transparent 70%)", transform: "translateX(-100%)" }}
                                        whileHover={{ transform: "translateX(100%)", transition: { duration: 0.8 } }} />
                                </motion.article>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
