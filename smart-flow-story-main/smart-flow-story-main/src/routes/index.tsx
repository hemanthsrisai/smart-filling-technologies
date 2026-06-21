import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import holo from "@/assets/holographic-texture.png";
import m2head from "@/assets/machine-2head.png";
import m4head from "@/assets/machine-4head.png";
import m6head from "@/assets/machine-6head.png";
import mAuger from "@/assets/machine-auger-semi.png";
import mPowder from "@/assets/machine-powder-bottle.png";
import mPouch from "@/assets/machine-pouch.png";
import mTurn from "@/assets/machine-turntable.png";
import mCap from "@/assets/machine-capping.png";
import mConv from "@/assets/machine-conveyor.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Filling Technologies | Precision Filling & Packaging Machines" },
      {
        name: "description",
        content:
          "Smart Filling Technologies manufactures precision auger, bottle, powder & pouch filling, capping and packaging machines for pharma, pesticides and food.",
      },
    ],
  }),
  component: Index,
});

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const machines = [
  { img: m2head, name: "2-Head Bottle Filling", cat: "Semi Automatic", spec: "PLC + 4.3\" HMI · Servo dosing" },
  { img: mAuger, name: "Semi-Auto Auger Filler", cat: "Semi Automatic", spec: "220VAC · SS304 · powder dosing" },
  { img: m4head, name: "4-Head Bottle Filling", cat: "Automatic", spec: "12–18 BPM · 7\" HMI" },
  { img: m6head, name: "6-Head Bottle Filling", cat: "Automatic", spec: "18–24 BPM · 750W servo" },
  { img: mPowder, name: "Auto Powder Filling", cat: "Automatic", spec: "Auger feed · servo accuracy" },
  { img: mPouch, name: "Auger Pouch Filling", cat: "Automatic", spec: "30–50 kg/min · collar former" },
  { img: mTurn, name: "Turn Table", cat: "SPM", spec: "Bottle feeding · 1HP VFD" },
  { img: mCap, name: "Rotary Capping", cat: "SPM", spec: "Torque-controlled sealing" },
  { img: mConv, name: "Conveyor 1.5–5 m", cat: "SPM", spec: "VFD speed control · SS304" },
];

const categories = ["All", "Semi Automatic", "Automatic", "SPM"] as const;

const lineSteps = [
  { t: "Feed", d: "Turn tables & conveyors orient and stage bottles into the line." },
  { t: "Fill", d: "Servo auger & nozzle heads dose powders and liquids with precision." },
  { t: "Cap", d: "Rotary cappers seal vials leak-proof and contamination-free." },
  { t: "Label", d: "Sticker labelling at up to 30 BPM for round bottles." },
];

const fills = [
  "Wheat Flour", "Rice Flour", "Besan", "Spices", "Chilli Powder",
  "Turmeric", "Coffee", "Curry Powder", "Chemical Powder", "Bleaching Powder",
];

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const shown = machines.filter((m) => active === "All" || m.cat === active);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[image:var(--gradient-iri)] text-sm font-bold text-background">S</span>
            <span className="truncate text-sm font-semibold tracking-tight">Smart Filling Technologies</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#story" className="transition-colors hover:text-foreground">Process</a>
            <a href="#machines" className="transition-colors hover:text-foreground">Machines</a>
            <a href="#fills" className="transition-colors hover:text-foreground">Applications</a>
            <a href="#contact" className="rounded-full bg-[image:var(--gradient-iri)] px-4 py-1.5 font-medium text-background">Enquire</a>
          </nav>
          <a href="#contact" className="shrink-0 rounded-full bg-[image:var(--gradient-iri)] px-4 py-1.5 text-sm font-medium text-background md:hidden">Enquire</a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" ref={heroRef} className="relative flex min-h-screen items-center justify-center px-4 sm:px-6">
        <motion.img
          src={holo}
          alt=""
          aria-hidden
          style={{ y }}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-5 text-xs uppercase tracking-[0.35em] text-muted-foreground"
          >
            Precision Filling & Packaging Machinery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="text-4xl font-bold leading-[1.08] sm:text-6xl md:text-7xl"
          >
            We build the machines that<br />
            <span className="text-iri">fill, seal & finish</span> your product.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="mx-auto mt-7 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Stainless-steel auger, bottle, powder and pouch lines — engineered for
            pharma, pesticides and food production.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            <a href="#machines" className="rounded-full bg-[image:var(--gradient-iri)] px-7 py-3 text-sm font-semibold text-background transition-transform hover:scale-105">
              Explore the range
            </a>
            <a href="#contact" className="rounded-full border border-border px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Request a quote
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Story / production line */}
      <Section id="story">
        <Eyebrow>The Line</Eyebrow>
        <motion.h2 variants={fadeUp} className="max-w-2xl text-3xl font-bold sm:text-5xl">
          From raw material to a <span className="text-silver">sealed, labelled</span> product.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-xl text-muted-foreground">
          Every Smart Filling system is built as one continuous, automated flow.
        </motion.p>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {lineSteps.map((s, i) => (
            <motion.div
              key={s.t}
              variants={fadeUp}
              className="group relative bg-card p-7 transition-colors hover:bg-secondary"
            >
              <span className="text-sm font-semibold text-iri">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[image:var(--gradient-iri)] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Machines */}
      <Section id="machines">
        <Eyebrow>The Range</Eyebrow>
        <motion.h2 variants={fadeUp} className="text-3xl font-bold sm:text-5xl">
          Machines for every stage.
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                active === c
                  ? "bg-[image:var(--gradient-iri)] text-background"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((m) => (
            <motion.article
              key={m.name}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-card p-6">
                <div className="holo-bg absolute inset-0" />
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="relative z-10 max-h-44 w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-accent">{m.cat}</span>
                <h3 className="mt-1.5 text-lg font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.spec}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Fills / applications */}
      <Section id="fills">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Applications</Eyebrow>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold sm:text-5xl">
              Built to handle<br /><span className="text-iri">powders that misbehave.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-md text-muted-foreground">
              A stirred hopper prevents bridging while servo-driven augers deliver
              consistent, high-speed accuracy — from fine spices to dense chemicals.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2.5">
              {fills.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {f}
                </span>
              ))}
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="relative">
            <div className="holo-bg overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-card p-8">
              <img src={mPouch} alt="Automatic auger pouch filling line" className="float relative z-10 mx-auto max-h-80 w-auto object-contain" />
            </div>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            ["24×7", "Maintenance-free operation"],
            ["SS304", "Pharma-grade contact parts"],
            ["1 MOQ", "Single machine to full line"],
          ].map(([k, v]) => (
            <motion.div key={k} variants={fadeUp} className="rounded-2xl border border-border bg-card p-7 text-center">
              <div className="text-4xl font-bold text-silver">{k}</div>
              <p className="mt-2 text-sm text-muted-foreground">{v}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <section id="contact" className="relative px-4 py-20 sm:px-6 sm:py-28">
        <div className="holo-bg mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card p-6 text-center sm:p-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative z-10 text-3xl font-bold sm:text-5xl"
          >
            Let's engineer <span className="text-iri">your line.</span>
          </motion.h2>
          <p className="relative z-10 mx-auto mt-5 max-w-lg text-muted-foreground">
            Tell us what you fill — we'll spec the machine. Warranty included,
            delivery in 5–6 weeks, export to Asia and South Africa.
          </p>
          <div className="relative z-10 mt-9 flex flex-wrap justify-center gap-3">
            <a href="mailto:sales@smartfilling.com" className="rounded-full bg-[image:var(--gradient-iri)] px-8 py-3 text-sm font-semibold text-background transition-transform hover:scale-105">
              Email our team
            </a>
            <a href="tel:+910000000000" className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Call us
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Smart Filling Technologies</span>
          <span>Pharma · Pesticides · Food · Chemical packaging</span>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p variants={fadeUp} className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
      {children}
    </motion.p>
  );
}
