// components/Navbar.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">Dev Ninjas</Link>
        <div className="flex gap-6">
          <Link href="/" className="text-neutral-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/projects" className="text-neutral-300 hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/skills" className="text-neutral-300 hover:text-white transition-colors">
            Skills
          </Link>
          <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
