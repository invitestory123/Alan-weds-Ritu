import { CalendarPlus, Clock, MapPin, Navigation, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { wedding } from "./data";
import { Reveal, Ornament } from "./Reveal";

function icsStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function addToCalendar() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-reception@wedding`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART:${icsStamp("2026-11-25T19:00:00+05:30")}`,
    `DTEND:${icsStamp("2026-11-25T23:00:00+05:30")}`,
    `SUMMARY:${wedding.groom.name} & ${wedding.bride.name} — Wedding Reception`,
    `LOCATION:${wedding.venue.name}, ${wedding.venue.address}`,
    "DESCRIPTION:Reception of Ashwin N. C. & Hamsa H. V.",
    "END:VEVENT",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-wedding@wedding`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART:${icsStamp("2026-11-26T08:30:00+05:30")}`,
    `DTEND:${icsStamp("2026-11-26T14:00:00+05:30")}`,
    `SUMMARY:${wedding.groom.name} & ${wedding.bride.name} — Wedding Ceremony (Muhurtham)`,
    `LOCATION:${wedding.venue.name}, ${wedding.venue.address}`,
    "DESCRIPTION:Auspicious Muhurtham & Wedding Ceremony of Ashwin N. C. & Hamsa H. V.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "ashwin-and-hamsa-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function EventDetails() {
  return (
    <section className="relative px-4 sm:px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="When & Where" />
          <h2 className="text-primary mt-4 sm:mt-5 text-3xl sm:text-4xl font-light">The celebration</h2>
          <p className="text-muted-foreground mx-auto mt-2 text-xs sm:text-sm">
            Two beautiful occasions to gather, bless, and celebrate.
          </p>
        </Reveal>

        <div className="mt-8 space-y-6">
          {wedding.events.map((evt, idx) => (
            <Reveal key={evt.id} delay={0.08 + idx * 0.08}>
              <div className="border-gold/30 bg-card shadow-luxe overflow-hidden rounded-[2rem] border">
                <div className="from-primary to-emerald-ink bg-gradient-to-br px-6 py-6 text-center">
                  <span className="text-gold/90 text-[0.6rem] tracking-[0.4em] uppercase font-medium">
                    {evt.badge}
                  </span>
                  <h3 className="text-ivory font-display mt-1 text-2xl sm:text-3xl font-light">
                    {evt.title}
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <span className="text-ivory font-display text-4xl sm:text-5xl font-light">
                      {evt.dayNumber}
                    </span>
                    <div className="text-left text-ivory/85 text-xs tracking-[0.25em] uppercase leading-tight border-l border-gold/30 pl-3">
                      <p className="font-medium text-gold-soft">{evt.day}</p>
                      <p>{evt.monthYear}</p>
                    </div>
                  </div>
                </div>

                <div className="divide-gold/15 divide-y">
                  <div className="flex items-center gap-4 px-6 py-4">
                    <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                      {evt.id === "wedding" ? <Sparkles className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                        Timing
                      </p>
                      <p className="text-foreground truncate text-sm font-medium">{evt.timeLabel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 px-6 py-4">
                    <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                        Venue
                      </p>
                      <p className="text-foreground truncate text-sm">{wedding.venue.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="mt-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={addToCalendar}
              className="from-primary to-emerald-ink text-ivory shadow-gold flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-4 text-xs tracking-[0.3em] uppercase font-medium hover:opacity-95 transition-opacity"
            >
              <CalendarPlus className="h-4 w-4" />
              Add events to calendar
            </motion.button>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="border-gold/30 bg-card shadow-luxe mt-6 overflow-hidden rounded-[2rem] border">
            <div className="relative">
              <img
                src="https://media.invitestory.in/kerala-sands/images/map-preview.jpg"
                alt={`Map to ${wedding.venue.name}`}
                loading="lazy"
                width={1024}
                height={768}
                className="h-48 w-full object-cover"
              />
              <div className="from-card absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </div>
            <div className="px-6 pt-2 pb-6 text-center">
              <p className="text-primary text-xl font-medium">{wedding.venue.name}</p>
              <p className="text-muted-foreground mt-1 text-xs max-w-xs mx-auto">{wedding.venue.address}</p>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={wedding.venue.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="border-gold/50 text-primary hover:bg-secondary mt-5 inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Get directions
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
