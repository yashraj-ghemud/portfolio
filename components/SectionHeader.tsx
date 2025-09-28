"use client";
import { motion } from "framer-motion";

export default function SectionHeader({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle?: string; 
}) {
  return (
    <div className="mb-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-3xl md:text-4xl font-semibold"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-neutral-400 mt-2"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
