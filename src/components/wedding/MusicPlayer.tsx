import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { wedding } from "./data";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            className="bg-emerald-ink/90 border-gold/40 text-ivory flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs shadow-lg backdrop-blur-md"
          >
            <span className="text-[0.65rem] tracking-wider uppercase">Wedding Song</span>
            {wedding.youtubeUrl && (
              <a
                href={wedding.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:text-gold-soft flex items-center gap-1 transition-colors"
                title="Watch on YouTube"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center"
      >
        <button
          type="button"
          onClick={onToggle}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
          className="border-gold/40 bg-emerald-ink/90 shadow-gold text-gold hover:border-gold relative grid h-12 w-12 place-items-center rounded-full border backdrop-blur-md transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <span className="flex items-center gap-0.5">
              <motion.span
                animate={{ height: ["4px", "14px", "4px"] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                className="bg-gold w-0.5 rounded-full"
              />
              <motion.span
                animate={{ height: ["12px", "4px", "12px"] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: 0.2, ease: "easeInOut" }}
                className="bg-gold w-0.5 rounded-full"
              />
              <motion.span
                animate={{ height: ["6px", "16px", "6px"] }}
                transition={{ repeat: Infinity, duration: 0.7, delay: 0.4, ease: "easeInOut" }}
                className="bg-gold w-0.5 rounded-full"
              />
            </span>
          ) : (
            <Play className="h-5 w-5 fill-current ml-0.5" />
          )}
        </button>
      </motion.div>
    </div>
  );
}
