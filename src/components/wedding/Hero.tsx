import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Aurora } from "@/components/Aurora";
import { Petals } from "./Petals";
import { wedding } from "./data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 });

  const glowY = useTransform(smooth, [0, 1], ["0%", "22%"]);
  const garlandY = useTransform(smooth, [0, 1], ["0%", "38%"]);
  const textY = useTransform(smooth, [0, 1], ["0%", "80%"]);
  const textOpacity = useTransform(smooth, [0, 0.55], [1, 0]);
  const coupleY = useTransform(smooth, [0, 1], ["0%", "-18%"]);
  const coupleScale = useTransform(smooth, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      className="bg-emerald-deep relative flex h-[100svh] min-h-[640px] w-full flex-col items-center overflow-hidden"
    >
      <Aurora intensity={1} />
      <div className="from-emerald-ink/50 via-emerald-deep/20 to-emerald-ink/90 absolute inset-0 bg-gradient-to-b" />
      <motion.div
        aria-hidden
        style={{
          y: glowY,
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.93 0.05 92 / 0.55), transparent 62%)",
        }}
        className="absolute bottom-0 left-1/2 h-[62%] w-[130%] -translate-x-1/2 rounded-t-full blur-2xl"
      />

      <Petals count={12} />

      <motion.img
        src="https://media.invitestory.in/kerala-sands/images/garland.png"
        alt=""
        aria-hidden
        style={{ y: garlandY }}
        className="pointer-events-none absolute -top-2 left-1/2 w-[135%] max-w-none -translate-x-1/2 opacity-90"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 sm:px-6 pt-20 sm:pt-28 md:pt-32 text-center">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-gold-soft/90 text-[0.55rem] sm:text-[0.6rem] tracking-[0.45em] sm:tracking-[0.5em] uppercase"
          >
            Together with their families
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 sm:mt-5 flex flex-col items-center leading-[0.82]"
          >
            <span className="text-gold-foil font-display text-[3.5rem] sm:text-[4.25rem] font-light">
              {wedding.groom.name}
            </span>
            <span className="font-script text-gold/80 my-1 text-2xl sm:text-3xl">and</span>
            <span className="text-gold-foil font-display text-[3.5rem] sm:text-[4.25rem] font-light">
              {wedding.bride.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="rule-gold mt-5 sm:mt-7 w-32 sm:w-40"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="text-ivory/85 mt-4 sm:mt-5 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase"
          >
            20 · 12 · 2026
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.9 }}
            className="text-ivory/60 mt-2 text-[0.65rem] sm:text-[0.7rem] tracking-[0.25em] uppercase"
          >
            Kottayam, Kerala
          </motion.p>
        </motion.div>

        {/* Dual Arched Portraits of Alan & Ritu */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: coupleY, scale: coupleScale }}
          className="mt-auto mb-4 sm:mb-6 flex items-center justify-center gap-3 sm:gap-4 w-[92%] max-w-[360px]"
        >
          <div className="relative group">
            <div className="border-gold/50 shadow-gold relative h-36 w-28 sm:h-44 sm:w-32 overflow-hidden rounded-t-full border-2 bg-gradient-to-b from-gold/20 to-transparent p-1 backdrop-blur-xs">
              <img
                src={wedding.groom.image}
                alt={wedding.groom.fullName}
                className="h-full w-full rounded-t-full object-cover object-top"
              />
            </div>
            <span className="text-gold/90 font-display absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-ink/90 border-gold/30 rounded-full border px-2.5 sm:px-3 py-0.5 text-[0.6rem] sm:text-[0.65rem] tracking-wider uppercase backdrop-blur-sm whitespace-nowrap">
              {wedding.groom.name}
            </span>
          </div>

          <span className="font-script text-gold text-xl sm:text-2xl font-light">&amp;</span>

          <div className="relative group">
            <div className="border-gold/50 shadow-gold relative h-36 w-28 sm:h-44 sm:w-32 overflow-hidden rounded-t-full border-2 bg-gradient-to-b from-gold/20 to-transparent p-1 backdrop-blur-xs">
              <img
                src={wedding.bride.image}
                alt={wedding.bride.fullName}
                className="h-full w-full rounded-t-full object-cover object-top"
              />
            </div>
            <span className="text-gold/90 font-display absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-ink/90 border-gold/30 rounded-full border px-2.5 sm:px-3 py-0.5 text-[0.6rem] sm:text-[0.65rem] tracking-wider uppercase backdrop-blur-sm whitespace-nowrap">
              {wedding.bride.name}
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: textOpacity }}
        className="text-gold/70 absolute bottom-4 z-20 flex flex-col items-center"
      >
        <span className="text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
