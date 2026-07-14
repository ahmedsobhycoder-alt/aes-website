"use client";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            className="fixed inset-0 z-[200] bg-primary pointer-events-none"
            initial={{ x: "-101%" }}
            animate={{ x: ["-101%", "0%", "0%", "101%"] }}
            transition={{ duration: 1.2, times: [0, 0.35, 0.6, 1], ease: EASE }}
          />
        </AnimatePresence>
      )}
      <AnimatePresence mode="wait">
        <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
