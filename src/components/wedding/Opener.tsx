import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Aurora } from "@/components/Aurora";
import { Petals } from "./Petals";
import { wedding } from "./data";

/**
 * Full-screen "seal + curtain" opener. Tapping the wax seal splits the
 * gold curtains and reveals the invitation.
 */
export function Opener({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {[-1, 1].map((dir) => (
        <motion.div
          key={dir}
          className="bg-emerald-ink absolute inset-y-0 w-[51%] overflow-hidden"
          style={{ [dir === -1 ? "left" : "right"]: 0 }}
          animate={opening ? { x: `${dir * 105}%` } : { x: 0 }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <Aurora intensity={0.55} />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('https://media.invitestory.in/kerala-sands/images/mandala-texture.jpg')",
              backgroundSize: "cover",
              backgroundPosition: dir === -1 ? "right center" : "left center",
            }}
          />
          <div
            className="absolute inset-y-0 w-[2px]"
            style={{
              [dir === -1 ? "right" : "left"]: 0,
              background: "var(--gradient-gold)",
            }}
          />
        </motion.div>
      ))}

      <Petals count={10} />

      <AnimatePresence>
        {!opening && (
          <motion.div
            className="relative z-10 flex flex-col items-center px-4 sm:px-8 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gold/80 text-[0.5rem] sm:text-[0.55rem] tracking-[0.45em] sm:tracking-[0.5em] uppercase">
              A wedding invitation
            </span>
            <h1 className="text-gold-foil font-display mt-4 sm:mt-5 text-4xl sm:text-5xl md:text-6xl leading-none font-light">
              {wedding.groom.name}
              <span className="font-script text-gold/80 mx-2 sm:mx-3 text-2xl sm:text-3xl">&amp;</span>
              {wedding.bride.name}
            </h1>
            <span className="rule-gold mt-5 sm:mt-6 w-28 sm:w-32" />

            <motion.button
              onClick={open}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              className="group relative mt-8 sm:mt-12 grid h-24 w-24 sm:h-28 sm:w-28 place-items-center"
              aria-label="Open the invitation"
            >
              <motion.span
                className="border-gold/40 absolute inset-0 rounded-full border"
                animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeOut" }}
              />
              <motion.span
                className="shadow-gold grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full"
                style={{ backgroundImage: "var(--gradient-gold)" }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
              >
                <span className="font-script text-emerald-ink text-2xl sm:text-3xl leading-none">
                  {wedding.groom.name[0]}
                  {wedding.bride.name[0]}
                </span>
              </motion.span>
            </motion.button>

            <motion.p
              className="text-ivory/60 mt-6 sm:mt-8 text-[0.55rem] sm:text-[0.6rem] tracking-[0.35em] sm:tracking-[0.4em] uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            >
              Tap the seal to open
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
