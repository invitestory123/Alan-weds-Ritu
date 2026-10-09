import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, ExternalLink, Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { wedding } from "./data";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube embed URL with autoplay, loop, and API controls
  const embedUrl = `https://www.youtube.com/embed/${wedding.youtubeId}?enablejsapi=1&autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${wedding.youtubeId}&controls=0&modestbranding=1`;

  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      {/* Hidden YouTube Iframe for Audio */}
      <div className="pointer-events-none fixed -top-[9999px] -left-[9999px] h-1 w-1 opacity-0 overflow-hidden" aria-hidden="true">
        {isPlaying && (
          <iframe
            ref={iframeRef}
            width="100"
            height="100"
            src={embedUrl}
            title="Wedding Music Player"
            allow="autoplay; encrypted-media"
          />
        )}
      </div>

      {/* Floating Music Control Bar */}
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
              <a
                href={wedding.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:text-gold-soft flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center"
        >
          <button
            onClick={togglePlay}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
            className="border-gold/40 bg-emerald-ink/90 shadow-gold text-gold hover:border-gold relative grid h-12 w-12 place-items-center rounded-full border backdrop-blur-md transition-colors"
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
    </>
  );
}
