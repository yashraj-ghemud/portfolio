"use client";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

// Enhanced skills data
const skillsData = {
  "Frontend": ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Framer Motion", "Vue.js"],
  "Backend": ["Node.js", "Express.js", "Python", "C++", "REST APIs", "GraphQL", "MongoDB", "PostgreSQL"],
  "Mobile & Apps": ["React Native", "Flutter", "App Development", "Progressive Web Apps", "Ionic", "Xamarin"],
  "3D & Animation": ["3D Animation", "3D Game Development", "Blender", "Three.js", "WebGL", "Unity"],
  "Security & Hacking": ["Penetration Testing", "Network Security", "Ethical Hacking", "Cybersecurity", "Network Hijacking", "RAT Development", "Ransomware Defense"],
  "AI & Data": ["Generative AI", "Machine Learning", "Data Structures & Algorithms", "Python AI", "Prompt Engineering", "Deep Learning"],
  "Database & Tools": ["SQL", "MongoDB", "PostgreSQL", "Git", "Docker", "AWS", "Firebase"]
} as const;

// Enhanced color palettes
const colorPalettes = {
  "Frontend": ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  "Backend": ["#96ceb4", "#ffeaa7", "#dda0dd"],
  "Mobile & Apps": ["#74b9ff", "#fd79a8", "#fdcb6e"],
  "3D & Animation": ["#6c5ce7", "#a29bfe", "#fd79a8"],
  "Security & Hacking": ["#00b894", "#00cec9", "#55efc4"],
  "AI & Data": ["#e17055", "#fdcb6e", "#f39c12"],
  "Database & Tools": ["#81ecec", "#74b9ff", "#a29bfe"]
} as const;

type Category = keyof typeof skillsData;

export default function SkillsPage() {
  const [mounted, setMounted] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [showCurrentCategory, setShowCurrentCategory] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
  }>>([]);

  // Stable random values - only generated on client
  const stableValues = useMemo(() => {
    if (!mounted) return { floatingElements: [] };
    
    return {
      floatingElements: Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 2,
        delay: Math.random() * 3,
        hue: Math.random() * 360
      }))
    };
  }, [mounted]);

  const categories = Object.keys(skillsData) as Category[];
  const currentCategory = categories[currentCategoryIndex];

  useEffect(() => {
    setMounted(true);
    // Show first category after initial load
    setTimeout(() => {
      triggerCategoryAnimation(0);
    }, 1500);
  }, []);

  // Trigger category animation and droplet explosion
  const triggerCategoryAnimation = (categoryIndex: number) => {
    const category = categories[categoryIndex];
    createDropletExplosion(category);
    
    // Show category after brief delay
    setTimeout(() => {
      setShowCurrentCategory(true);
    }, 800);
  };

  // Navigate to next category
  const goToNextCategory = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setShowCurrentCategory(false);
      setTimeout(() => {
        setCurrentCategoryIndex(prev => prev + 1);
        triggerCategoryAnimation(currentCategoryIndex + 1);
      }, 500);
    }
  };

  // Navigate to previous category
  const goToPreviousCategory = () => {
    if (currentCategoryIndex > 0) {
      setShowCurrentCategory(false);
      setTimeout(() => {
        setCurrentCategoryIndex(prev => prev - 1);
        triggerCategoryAnimation(currentCategoryIndex - 1);
      }, 500);
    }
  };

  // Colorful droplet explosion
  const createDropletExplosion = (category: Category) => {
    const colors = colorPalettes[category];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const newParticles = Array.from({ length: 35 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX + (Math.random() - 0.5) * 300,
      y: centerY + (Math.random() - 0.5) * 300,
      color: colors[i % colors.length],
      size: 8 + Math.random() * 12
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Cleanup particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 6000);
  };

  // Enhanced droplet rain animation
  const DropletRain = () => (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: particle.x,
              top: particle.y,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              filter: `blur(0.8px)`
            }}
            initial={{ 
              scale: 0, 
              opacity: 0
            }}
            animate={{
              scale: [0, 1.8, 1.2, 0],
              opacity: [0, 1, 0.9, 0],
              y: [particle.y - 150, particle.y, particle.y + 500, particle.y + 1000],
              x: [particle.x, particle.x + (Math.random() - 0.5) * 400],
              rotate: [0, Math.random() * 720]
            }}
            exit={{ 
              scale: 0, 
              opacity: 0 
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  // Floating background elements
  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stableValues.floatingElements.map(element => (
        <motion.div
          key={element.id}
          className="absolute w-5 h-5 rounded-full opacity-20"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            backgroundColor: `hsl(${element.hue}, 70%, 60%)`
          }}
          animate={{
            y: [0, -250, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 2.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Current category display
  const CurrentCategoryDisplay = () => {
    const colors = colorPalettes[currentCategory];

    return (
        <>
        <Navbar />
        
      <AnimatePresence mode="wait">
        {showCurrentCategory && (
          <motion.div 
            key={currentCategory}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            {/* Category Title with Letter Animation */}
            <motion.div className="mb-16">
              <h2 className="text-5xl md:text-7xl font-black mb-8 flex justify-center flex-wrap gap-2">
                {currentCategory.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${currentCategory}-${letterIndex}`}
                    className="inline-block"
                    style={{
                      color: colors[letterIndex % colors.length],
                      textShadow: `0 0 25px ${colors[letterIndex % colors.length]}`
                    }}
                    initial={{ 
                      y: 300, 
                      opacity: 0, 
                      rotate: (Math.random() - 0.5) * 720,
                      scale: 0 
                    }}
                    animate={{ 
                      y: 0, 
                      opacity: 1, 
                      rotate: 0,
                      scale: 1 
                    }}
                    transition={{
                      delay: letterIndex * 0.12,
                      duration: 1,
                      type: "spring",
                      stiffness: 100,
                      damping: 12
                    }}
                    whileHover={{
                      scale: 1.3,
                      rotate: [0, -15, 15, 0],
                      y: [-10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h2>

              {/* Skills Grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                {skillsData[currentCategory].map((skill, skillIndex) => (
                  <motion.div
                    key={`${currentCategory}-${skill}`}
                    className="group cursor-pointer"
                    initial={{ 
                      scale: 0, 
                      opacity: 0,
                      y: 80,
                      rotate: Math.random() * 180
                    }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      y: 0,
                      rotate: 0
                    }}
                    transition={{
                      delay: 2 + skillIndex * 0.12,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 120
                    }}
                    whileHover={{ 
                      scale: 1.12,
                      y: -8,
                      rotateY: 10,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className="p-5 rounded-2xl border-2 text-center relative overflow-hidden backdrop-blur-sm transition-all duration-300"
                      style={{
                        borderColor: colors[skillIndex % colors.length],
                        backgroundColor: `${colors[skillIndex % colors.length]}15`,
                        boxShadow: `0 6px 25px ${colors[skillIndex % colors.length]}35`
                      }}
                    >
                      {/* Skill Text */}
                      <span 
                        className="font-bold text-lg relative z-10 block"
                        style={{
                          color: colors[skillIndex % colors.length],
                          textShadow: `0 0 12px ${colors[skillIndex % colors.length]}70`
                        }}
                      >
                        {skill}
                      </span>

                      {/* Animated hover glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle, ${colors[skillIndex % colors.length]}25, transparent 70%)`
                        }}
                        transition={{ duration: 0.4 }}
                      />

                      {/* Floating micro particles on hover */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: colors[i % colors.length],
                              top: `${20 + (i * 15) % 60}%`,
                              left: `${15 + (i * 18) % 70}%`
                            }}
                            animate={{
                              y: [0, -25, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0]
                            }}
                            transition={{
                              duration: 1.8,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
    </>
  )};

  // Navigation arrows
  const NavigationArrows = () => (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-6">
      {/* Previous Arrow */}
      <motion.button
        className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={goToPreviousCategory}
        disabled={currentCategoryIndex === 0}
        whileHover={currentCategoryIndex > 0 ? { 
          scale: 1.15, 
          rotate: -10,
          boxShadow: "0 0 35px rgba(147, 51, 234, 0.8)"
        } : {}}
        whileTap={currentCategoryIndex > 0 ? { scale: 0.9 } : {}}
        animate={{
          boxShadow: [
            "0 0 20px rgba(147, 51, 234, 0.4)",
            "0 0 35px rgba(59, 130, 246, 0.6)",
            "0 0 20px rgba(147, 51, 234, 0.4)"
          ]
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity },
          default: { duration: 0.3 }
        }}
      >
        ↑
      </motion.button>

      {/* Category Indicator */}
      <div className="flex flex-col items-center gap-2">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            className="w-3 h-3 rounded-full border-2"
            style={{
              backgroundColor: index === currentCategoryIndex ? colorPalettes[category][0] : "transparent",
              borderColor: index === currentCategoryIndex ? colorPalettes[category][0] : "#6b7280"
            }}
            animate={{
              scale: index === currentCategoryIndex ? 1.4 : 1,
              boxShadow: index === currentCategoryIndex ? `0 0 15px ${colorPalettes[category][0]}` : "none"
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Next Arrow */}
      <motion.button
        className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-red-600 flex items-center justify-center text-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={goToNextCategory}
        disabled={currentCategoryIndex === categories.length - 1}
        whileHover={currentCategoryIndex < categories.length - 1 ? { 
          scale: 1.15, 
          rotate: 10,
          boxShadow: "0 0 35px rgba(236, 72, 153, 0.8)"
        } : {}}
        whileTap={currentCategoryIndex < categories.length - 1 ? { scale: 0.9 } : {}}
        animate={{
          boxShadow: [
            "0 0 20px rgba(236, 72, 153, 0.4)",
            "0 0 35px rgba(220, 38, 38, 0.6)",
            "0 0 20px rgba(236, 72, 153, 0.4)"
          ]
        }}
        transition={{
          boxShadow: { duration: 2.2, repeat: Infinity },
          default: { duration: 0.3 }
        }}
      >
        ↓
      </motion.button>
    </div>
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="text-white text-3xl font-bold"
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Skills...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <FloatingElements />
      <DropletRain />

      {/* Animated Grid Background */}
      <motion.div 
        className="fixed inset-0 opacity-8"
        animate={{
          backgroundPosition: ["0px 0px", "100px 100px"]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px"
        }}
      />

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, type: "spring", stiffness: 80 }}
          className="text-center mb-20"
        >
          <h1 className="text-7xl md:text-9xl font-black mb-8">
            {"SKILLS".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: i * 0.15, 
                  duration: 1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotateY: 15,
                  textShadow: "0 0 30px rgba(168, 85, 247, 0.9)"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed"
          >
            Master of multiple domains:  <span className="text-cyan-400 font-bold">I create what others use, </span> <span className="text-purple-400 font-bold">secure what others fear to lose.</span>
          </motion.p>
        </motion.div>

        {/* Current Category Display */}
        <div className="min-h-[600px] flex items-center justify-center">
          <CurrentCategoryDisplay />
        </div>

        {/* Navigation Arrows */}
        <NavigationArrows />

        {/* Back to Top Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.button
            className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xl shadow-lg"
            whileHover={{ 
              scale: 1.15, 
              rotate: 360,
              boxShadow: "0 0 40px rgba(99, 102, 241, 0.7)"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
