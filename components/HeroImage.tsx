"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      {/* Main Portfolio Image Container */}
      <motion.div
        className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400/50 relative"
        whileHover={{ rotateY: 10, rotateX: 5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900" />
        
        {/* Animated Background Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="codeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          
          {/* Animated Code Lines Background */}
          {Array.from({ length: 15 }, (_, i) => (
            <motion.line
              key={i}
              x1="20"
              y1={60 + i * 20}
              x2={200 + (i % 3) * 80}
              y2={60 + i * 20}
              stroke="url(#codeGlow)"
              strokeWidth="2"
              opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Pulsing Circle */}
          <motion.circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#codeGlow)"
            strokeWidth="2"
            opacity="0.3"
            animate={{
              r: [180, 190, 180],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
        
        {/* Main Portfolio Logo Image */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <motion.div
            className="relative w-full h-full"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/portfolio_logo.png"
              alt="Portfolio Logo"
              fill
              className="object-contain drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.3))"
              }}
              priority
            />
          </motion.div>
        </div>
        
        {/* Overlay Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-orange-500/10 rounded-3xl"
          animate={{
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Floating Tech Icons Around Image */}
      {[].map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl z-10"
          style={{
            top: `${15 + (i % 3) * 35}%`,
            left: `${5 + (i % 2) * 90}%`
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Floating Code Symbols */}
      {["{ }", "< />", "( )", "=>"].map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute text-sm font-mono text-yellow-400/70 z-10"
          style={{
            top: `${25 + (i % 2) * 50}%`,
            left: `${15 + (i % 2) * 70}%`
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Orbital Elements */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: Math.cos((i * Math.PI) / 2) * 120,
            y: Math.sin((i * Math.PI) / 2) * 120,
            rotate: 360
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Pulsing Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-yellow-400/60 pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 1, 0.5],
          boxShadow: [
            "0 0 20px rgba(251, 191, 36, 0.4)",
            "0 0 40px rgba(251, 191, 36, 0.8)",
            "0 0 20px rgba(251, 191, 36, 0.4)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Corner Sparkles */}
      {[
        { top: "10%", left: "10%" },
        { top: "10%", right: "10%" },
        { bottom: "10%", left: "10%" },
        { bottom: "10%", right: "10%" }
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={pos}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
