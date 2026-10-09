import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Hero } from "@/components/wedding/Hero";
import { Couple } from "@/components/wedding/Couple";
import { Countdown } from "@/components/wedding/Countdown";
import { EventDetails } from "@/components/wedding/EventDetails";
import { Footer } from "@/components/wedding/Footer";
import { Opener } from "@/components/wedding/Opener";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";

const title = "Alan & Ritu · 20 December 2026, Kottayam";
const description =
  "Together with their families, Alan Thankachan and Ritu Raju invite you to their wedding on 20 December 2026 at Nalukettu, Windsor Castle, Kottayam.";
const ogImage = "/images/groom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="bg-emerald-ink min-h-screen w-full flex justify-center items-center overflow-x-hidden">
      <AnimatePresence>
        {!opened && <Opener key="opener" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && (
        <>
          <ScrollProgress />
          <MusicPlayer autoPlay={true} />
        </>
      )}

      <motion.main
        initial={{ opacity: 0, scale: 1.03 }}
        animate={opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="bg-background relative w-full max-w-[540px] overflow-hidden shadow-2xl md:my-8 md:rounded-[2.5rem] md:border md:border-gold/30 min-h-screen"
      >
        <Hero />
        <Couple />
        <Countdown />
        <EventDetails />
        <Footer />
      </motion.main>
    </div>
  );
}

