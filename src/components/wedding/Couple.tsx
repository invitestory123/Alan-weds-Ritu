import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "./data";
import { Parallax } from "./Parallax";
import { Reveal, Ornament } from "./Reveal";

function Person({
  person,
  role,
}: {
  person: typeof wedding.bride;
  role: string;
}) {
  return (
    <Reveal className="relative">
      <div className="bg-card/70 border-gold/30 shadow-luxe relative overflow-hidden rounded-[2rem] border px-6 py-6 sm:px-8 sm:py-7 backdrop-blur-sm">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "url('https://media.invitestory.in/kerala-sands/images/mandala-texture.jpg')",
            backgroundSize: "cover",
          }}
        />
        <div className="relative flex flex-col items-center text-center">
          <span className="text-gold text-[0.6rem] tracking-[0.45em] uppercase font-medium">
            {role}
          </span>
          <h3 className="text-primary mt-1.5 text-2xl sm:text-3xl font-light">{person.fullName}</h3>
          <p className="text-muted-foreground mt-1 text-xs tracking-wide">{person.line}</p>
          {person.note && (
            <div className="mt-3.5 pt-3 border-t border-gold/20 max-w-xs">
              <p className="text-foreground/80 text-xs sm:text-[13px] leading-relaxed italic font-light">
                &ldquo;{person.note}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Couple() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = wedding.photos || [{ src: wedding.coupleImage, alt: "Ashwin & Hamsa" }];

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-20">
      <img
        src="https://media.invitestory.in/kerala-sands/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-6 -left-10 w-36 sm:w-44 opacity-40"
      />
      <img
        src="https://media.invitestory.in/kerala-sands/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-10 -bottom-6 w-36 sm:w-44 rotate-180 opacity-40"
      />

      <div className="relative mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="The Couple" />
          <h2 className="text-primary mt-4 sm:mt-5 text-3xl sm:text-4xl font-light">Two hearts, one thread</h2>
          <p className="text-muted-foreground mx-auto mt-2.5 sm:mt-3 max-w-sm text-xs sm:text-sm leading-relaxed italic px-2">
            &ldquo;{wedding.quote}&rdquo;
          </p>
        </Reveal>

        {photos.length > 0 && (
          <Reveal className="mt-8 sm:mt-10">
            <div className="relative mx-auto overflow-hidden rounded-[2rem] border-2 border-gold/40 shadow-2xl p-2 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent backdrop-blur-xs max-w-[360px]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-emerald-ink/20">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photos[photoIndex].src}
                    src={photos[photoIndex].src}
                    alt={photos[photoIndex].alt}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-emerald-ink/80 via-transparent to-transparent pointer-events-none" />

                {photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      aria-label="Previous photo"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-emerald-ink/60 border border-gold/30 text-gold-soft flex items-center justify-center backdrop-blur-md hover:bg-emerald-ink/80 transition-all active:scale-90"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      aria-label="Next photo"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-emerald-ink/60 border border-gold/30 text-gold-soft flex items-center justify-center backdrop-blur-md hover:bg-emerald-ink/80 transition-all active:scale-90"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none px-4">
                  <span className="font-display text-gold-foil text-lg sm:text-xl tracking-wider block">
                    {wedding.groom.name} &amp; {wedding.bride.name}
                  </span>
                  {photos.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-2">
                      {photos.map((_, idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === photoIndex ? "w-5 bg-gold" : "w-1.5 bg-ivory/40"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
          <Parallax speed={20}>
            <Person person={wedding.groom} role="The Groom" />
          </Parallax>
          <div className="flex justify-center">
            <span className="font-script text-gold animate-float-soft text-4xl sm:text-5xl">&amp;</span>
          </div>
          <Parallax speed={-20}>
            <Person person={wedding.bride} role="The Bride" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
