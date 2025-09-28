"use client";
import { motion, AnimatePresence } from "framer-motion";
import HeroImage from "@/components/HeroImage";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";

export default function HomeClient() {
  const [mounted, setMounted] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const animationFrame = useRef<number | null>(null);

  // Pre-generate stable random values
  const stableValues = useMemo(() => ({
    particles: Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2
    })),
    orbs: Array.from({ length: 8 }, () => ({
      width: 50 + Math.random() * 100,
      height: 50 + Math.random() * 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      moveX: Math.random() * 200 - 100,
      moveY: Math.random() * 200 - 100,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5
    })),
    magicParticles: Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 3
    }))
  }), []);

  // About me text
  const aboutText = `I’m Yashraj Ghemud, a B.Tech IT undergraduate with a passion for cutting-edge technology and creative problem-solving. 🚀 Skilled in Python 🐍, full-stack development 🌐, and app creation 📱, I also dive deep into cybersecurity—penetration testing 🛡️, RATs 🕷️, ransomware defense 🔒, network hijacking prevention 🌐, SQL & database design 🗄️—and craft immersive 3D animations 🎨, games 🎮, and AI-powered experiences 🤖. Always exploring generative AI and prompt engineering ✨, I thrive on transforming bold ideas into robust, user-centric solutions. Let’s build the future together! 🌟`;

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current < 16) return; // ~60fps throttling

    lastScrollTime.current = now;

    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);

      setScrollProgress(progress);

      if (progress > 0.15 && !showAbout) {
        setShowAbout(true);
      }
    });
  }, [showAbout]);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [handleScroll]);

  // SUPER FAST typing effect - 5x faster!
  useEffect(() => {
    if (!showAbout || typingComplete) return;

    const getTypingDelay = (char: string, index: number) => {
      // ULTRA FAST base speed
      const baseDelay = 0.5 + Math.random() * 0.5; // 8-12ms base (was 25-40ms)

      // Shorter pauses for speed
      if (char === '.' || char === '!' || char === '?') return baseDelay + 20; // was 400ms
      if (char === ',') return baseDelay + 20; // was 200ms
      if (char === '\n') return baseDelay + 20; // was 300ms
      if (char === ' ') return baseDelay + 2; // was 50ms

      // Less hesitation for speed
      if (Math.random() < 0.05) return baseDelay + 30; // was 100ms, reduced frequency

      return baseDelay;
    };

    const timer = setTimeout(() => {
      if (currentIndex < aboutText.length) {
        const nextChar = aboutText[currentIndex];
        setCurrentText(aboutText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setTypingComplete(true);
      }
    }, getTypingDelay(aboutText[currentIndex - 1] || '', currentIndex));

    return () => clearTimeout(timer);
  }, [currentIndex, aboutText, showAbout, typingComplete]);

  // Super fast cursor blink
  useEffect(() => {
    if (!showAbout) return;

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 250); // Even faster blink

    return () => clearInterval(cursorTimer);
  }, [showAbout]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading Home...</div>
      </div>
    );
  }

  const navItems = ["Home", "Projects", "Skills", "Contact"];

  const navVariants: any = {
    hidden: { opacity: 0, y: -20, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    })
  };

  const buttonVariants: any = {
    hidden: { scale: 0, opacity: 0, rotateY: 180 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        delay: 2.2 + i * 0.15,
        duration: 0.8,
        ease: "backOut",
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      scale: 1.1,
      rotateZ: 5,
      boxShadow: "0 0 30px rgba(251,191,36,0.9)",
      background: "linear-gradient(45deg, #fbbf24, #f97316, #dc2626)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      rotateZ: -5,
      transition: { duration: 0.1 }
    }
  };

  const aboutLetterVariants: any = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      scale: 0,
      filter: "blur(10px)"
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        type: "spring",
        stiffness: 200,
        damping: 15,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.2,
      rotateY: 15,
      color: "#fbbf24",
      textShadow: "0 0 20px rgba(251, 191, 36, 0.8)",
      transition: { duration: 0.3 }
    }
  };

  // Dynamic Scroll-Based Background Transformation
  const DynamicBackground = () => {
    // Calculate different background states based on scroll
    const getBackgroundByScroll = () => {
      if (scrollProgress < 0.2) {
        // Initial dark space theme
        return `
          radial-gradient(circle at 30% 70%, rgba(29, 78, 216, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #0f0f23 25%, #1a1a2e 50%, #16213e 75%, #0f172a 100%)
        `;
      } else if (scrollProgress < 0.4) {
        // Transitioning to cyber theme
        return `
          radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.25) 0%, transparent 60%),
          radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.25) 0%, transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%),
          linear-gradient(135deg, #0a0a0a 0%, #0d1b2a 25%, #1b263b 50%, #0f3460 75%, #003366 100%)
        `;
      } else if (scrollProgress < 0.6) {
        // Full cyber/matrix theme
        return `
          radial-gradient(circle at 10% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 50% 10%, rgba(16, 185, 129, 0.2) 0%, transparent 60%),
          radial-gradient(circle at 30% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 60%),
          linear-gradient(45deg, #001122 0%, #002244 25%, #003366 50%, #004488 75%, #0066aa 100%)
        `;
      } else if (scrollProgress < 0.8) {
        // Futuristic neon theme
        return `
          radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 60%),
          radial-gradient(circle at 10% 90%, rgba(34, 197, 94, 0.25) 0%, transparent 60%),
          linear-gradient(225deg, #1a0033 0%, #2d1b69 25%, #3730a3 50%, #1e40af 75%, #1d4ed8 100%)
        `;
      } else {
        // Final galaxy/space theme
        return `
          radial-gradient(circle at 60% 40%, rgba(147, 51, 234, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 60%),
          radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 60%),
          radial-gradient(circle at 50% 10%, rgba(251, 191, 36, 0.2) 0%, transparent 70%),
          linear-gradient(180deg, #1a0033 0%, #2d1b69 20%, #4c1d95 40%, #6b21a8 60%, #7c3aed 80%, #8b5cf6 100%)
        `;
      }
    };

    return (
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          background: getBackgroundByScroll()
        }}
        animate={{
          background: [
            getBackgroundByScroll(),
            getBackgroundByScroll(), // Keep same for stability
          ]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut"
        }}
      />
    );
  };

  // Dynamic particles that change color based on scroll
  const DynamicParticleField = () => (
    <motion.div className="fixed inset-0 pointer-events-none z-1">
      {stableValues.particles.map((particle, i) => {
        // Color changes based on scroll progress
        let hue = 45; // Default yellow
        if (scrollProgress > 0.2) hue = 180; // Cyan
        if (scrollProgress > 0.4) hue = 120; // Green
        if (scrollProgress > 0.6) hue = 280; // Purple
        if (scrollProgress > 0.8) hue = 320; // Pink

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: particle.x + "%",
              top: particle.y + "%",
              background: `hsl(${hue}, 80%, 70%)`,
              boxShadow: `0 0 4px hsl(${hue}, 80%, 70%)`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.8, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </motion.div>
  );

  // Enhanced magic particles with scroll-based colors
  const MagicParticles = () => (
    <motion.div
      className="fixed inset-0 pointer-events-none z-20"
      style={{
        opacity: scrollProgress > 0.1 && scrollProgress < 0.9 ?
          Math.sin(scrollProgress * Math.PI) * 0.8 : 0
      }}
    >
      {stableValues.magicParticles.map((particle, i) => {
        // Color palette changes with scroll
        let colors = ['60, 80%, 70%', '45, 90%, 70%', '30, 85%, 70%']; // Yellow range
        if (scrollProgress > 0.3) colors = ['180, 80%, 70%', '200, 90%, 70%', '160, 85%, 70%']; // Cyan range
        if (scrollProgress > 0.5) colors = ['120, 80%, 70%', '140, 90%, 70%', '100, 85%, 70%']; // Green range
        if (scrollProgress > 0.7) colors = ['280, 80%, 70%', '300, 90%, 70%', '260, 85%, 70%']; // Purple range

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: particle.x + "%",
              top: particle.y + "%",
              width: particle.size,
              height: particle.size,
              background: `hsl(${colors[i % colors.length]})`,
              boxShadow: `0 0 8px hsl(${colors[i % colors.length]})`
            }}
            animate={{
              y: [0, -200, -400],
              x: [0, Math.sin(i) * 80, Math.cos(i) * 40],
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeOut"
            }}
          />
        );
      })}
    </motion.div>
  );

  // Scroll to about function
  const scrollToAbout = () => {
    if (containerRef.current) {
      const aboutSection = containerRef.current.querySelector('#about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={containerRef} className="relative bg-black text-white">
      {/* Dynamic Background Transformation */}
      <DynamicBackground />

      {/* Animated Screen Borders with scroll-based colors */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(to right, transparent, hsl(${45 + scrollProgress * 180}, 80%, 60%), transparent)`
          }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            boxShadow: [
              `0 0 10px hsl(${45 + scrollProgress * 180}, 80%, 60%)`,
              `0 0 25px hsl(${45 + scrollProgress * 180}, 80%, 60%)`,
              `0 0 10px hsl(${45 + scrollProgress * 180}, 80%, 60%)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(to right, transparent, hsl(${80 + scrollProgress * 180}, 80%, 60%), transparent)`
          }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            boxShadow: [
              `0 0 10px hsl(${80 + scrollProgress * 180}, 80%, 60%)`,
              `0 0 25px hsl(${80 + scrollProgress * 180}, 80%, 60%)`,
              `0 0 10px hsl(${80 + scrollProgress * 180}, 80%, 60%)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{
            background: `linear-gradient(to bottom, transparent, hsl(${120 + scrollProgress * 180}, 80%, 60%), transparent)`
          }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            boxShadow: [
              `0 0 10px hsl(${120 + scrollProgress * 180}, 80%, 60%)`,
              `0 0 25px hsl(${120 + scrollProgress * 180}, 80%, 60%)`,
              `0 0 10px hsl(${120 + scrollProgress * 180}, 80%, 60%)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.75 }}
        />
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-1"
          style={{
            background: `linear-gradient(to bottom, transparent, hsl(${160 + scrollProgress * 180}, 80%, 60%), transparent)`
          }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            boxShadow: [
              `0 0 10px hsl(${160 + scrollProgress * 180}, 80%, 60%)`,
              `0 0 25px hsl(${160 + scrollProgress * 180}, 80%, 60%)`,
              `0 0 10px hsl(${160 + scrollProgress * 180}, 80%, 60%)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 2.25 }}
        />
      </div>

      {/* Background Effects */}
      <DynamicParticleField />
      <MagicParticles />

      {/* Floating Orbs with scroll-based colors */}
      <div className="fixed inset-0 pointer-events-none z-1">
        {stableValues.orbs.map((orb, i) => {
          let hue = 45;
          if (scrollProgress > 0.2) hue = 180;
          if (scrollProgress > 0.4) hue = 120;
          if (scrollProgress > 0.6) hue = 280;
          if (scrollProgress > 0.8) hue = 320;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-sm"
              style={{
                width: orb.width,
                height: orb.height,
                left: orb.x + "%",
                top: orb.y + "%",
                background: `radial-gradient(circle, hsl(${hue}, 70%, 50%, 0.2) 0%, transparent 70%)`
              }}
              animate={{
                x: [0, orb.moveX],
                y: [0, orb.moveY],
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: orb.delay
              }}
            />
          );
        })}
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-lg border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -30, rotateY: -180 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: "easeOut" }}
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 20px rgba(251, 191, 36, 0.8)",
              transition: { duration: 0.3 }
            }}
          >
            Dev Ninja
          </motion.a>
          <div className="flex gap-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                custom={i}
                variants={navVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.1,
                  color: "#fbbf24",
                  textShadow: "0 0 10px rgba(251, 191, 36, 0.8)",
                  y: -2
                }}
                className="text-neutral-300 hover:text-white transition-colors font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Dynamic Colorful Animated Line with Glow */}
        <motion.div
          className="relative h-1 overflow-hidden"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ scaleX: { delay: 0.8, duration: 1.5, ease: "easeOut" } }}
          style={{ transformOrigin: "left center" }}
        >
          {/* Animated Gradient Bar */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(90deg, #f97316, #facc15, #22c55e)",
                "linear-gradient(90deg, #22c55e, #3b82f6, #f97316)",
                "linear-gradient(90deg, #3b82f6, #8b5cf6, #facc15)",
                "linear-gradient(90deg, #8b5cf6, #ec4899, #22c55e)"
              ],
              boxShadow: [
                "0 0 10px rgba(249, 115, 22, 0.6)",
                "0 0 10px rgba(34, 197, 94, 0.6)",
                "0 0 10px rgba(59, 130, 246, 0.6)",
                "0 0 10px rgba(139, 92, 246, 0.6)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          {/* Glow Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              boxShadow: [
                "0 0 20px rgba(255,255,255,0.2)",
                "0 0 40px rgba(255,255,255,0.4)",
                "0 0 20px rgba(255,255,255,0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </nav>

      {/* Hero Section */}
      <main className="min-h-screen pt-32 flex flex-col items-center text-center px-6 relative z-10">
        {/* Name Animation */}
        <AnimatePresence>
          <motion.div className="mb-6">
            {"YASHRAJ SACHIN GHEMUD".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.8 + i * 0.05,
                  duration: 0.8,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.2,
                  rotateZ: (Math.random() - 0.5) * 10,
                  textShadow: "0 0 20px rgba(251, 191, 36, 0.8)",
                  transition: { duration: 0.3 }
                }}
                style={{
                  textShadow: "0 0 30px rgba(251, 191, 36, 0.5)"
                }}
                suppressHydrationWarning
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-neutral-300 max-w-3xl mb-12 leading-relaxed"
            style={{
              textShadow: "0 0 10px rgba(255, 255, 255, 0.3)"
            }}
          >
            I am passionate developer{" "}
            <motion.span
              className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              YASHRAJ SACHIN GHEMUD
            </motion.span>{" "}
            and loves crafting beautiful website with animations and cutting-edge technology.
          </motion.p>
        </AnimatePresence>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{
            delay: 1.5,
            duration: 1.5,
            ease: "easeOut",
            type: "spring",
            stiffness: 80
          }}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            boxShadow: "0 20px 40px rgba(251, 191, 36, 0.3)"
          }}
          className="mb-12"
        >
          <HeroImage />
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-6 justify-center mb-16">
          {["Projects", "Skills", "Contact"].map((btn, i) => (
            <motion.a
              key={btn}
              href={`/${btn.toLowerCase()}`}
              className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 via-orange-400 to-red-500 text-black font-bold text-lg overflow-hidden group"
              custom={i}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {btn}
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-xl"
                >
                  ⚡
                </motion.span>
              </span>
              <motion.div
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
                initial={{ scale: 0, x: "-50%", y: "-50%" }}
                whileHover={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 0.3
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center text-neutral-400 cursor-pointer group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          onClick={scrollToAbout}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl mb-2 group-hover:text-yellow-400 transition-colors"
          >
            ↓
          </motion.div>
          <span className="text-sm group-hover:text-yellow-400 transition-colors">Explore More</span>
        </motion.div>
      </main>

      {/* About Me Section */}
      <section
        id="about-section"
        className="min-h-screen relative z-10 flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-4xl mx-auto">
          {/* Flying "ABOUT ME" Title */}
          <AnimatePresence>
            {showAbout && (
              <motion.div className="text-center mb-12">
                {"ABOUT ME".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={aboutLetterVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="inline-block text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent cursor-pointer"
                    style={{
                      textShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SUPER FAST Enhanced Typewriter Text */}
          <AnimatePresence>
            {showAbout && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700 shadow-2xl"
              >
                <div className="text-lg md:text-xl leading-relaxed text-neutral-200 font-mono relative">
                  <div className="whitespace-pre-wrap">
                    {currentText}
                    <motion.span
                      animate={{ opacity: showCursor ? 1 : 0 }}
                      className="text-yellow-400 font-bold text-2xl inline-block ml-1"
                      style={{
                        verticalAlign: "baseline",
                        lineHeight: "1"
                      }}
                    >
                      |
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tech Stack Icons */}
          {showAbout && typingComplete && (
            <motion.div
              className="mt-16 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {['React', 'Next.js', 'Python', 'Node.js', 'JavaScript', 'TypeScript', '3D Graphics', 'AI/ML'].map((tech, i) => (
                <motion.div
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 text-blue-300 text-sm font-medium"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
