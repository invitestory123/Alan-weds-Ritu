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
          <span className="text-gold text-[0.6rem] tracking-[0.45em] uppercase">
            {role}
          </span>
          <h3 className="text-primary mt-1.5 text-2xl sm:text-3xl font-light">{person.fullName}</h3>
          <p className="text-muted-foreground mt-1 text-xs tracking-wide">{person.line}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Couple() {
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
          <p className="text-muted-foreground mx-auto mt-2 sm:mt-3 max-w-xs text-xs sm:text-sm leading-relaxed">
            Seven vows, seven steps, and a lifetime of ordinary mornings made beautiful.
          </p>
        </Reveal>

        {wedding.coupleImage && (
          <Reveal className="mt-8 sm:mt-10">
            <div className="relative mx-auto overflow-hidden rounded-[2rem] border-2 border-gold/40 shadow-2xl p-2 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent backdrop-blur-xs max-w-[360px]">
              <div className="relative overflow-hidden rounded-[1.6rem]">
                <img
                  src={wedding.coupleImage}
                  alt={`${wedding.groom.name} & ${wedding.bride.name}`}
                  loading="lazy"
                  className="w-full h-auto object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-ink/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                  <span className="font-display text-gold-foil text-lg sm:text-xl tracking-wider">
                    {wedding.groom.name} &amp; {wedding.bride.name}
                  </span>
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
