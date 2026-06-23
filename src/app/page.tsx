"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield, Cpu, Clock, Globe, ChevronRight,
  Beaker, Leaf, Cookie, ArrowRight, Cog, Award, Package, Play, Droplets, Container, CreditCard, Tag, ArrowDownToLine, Lock
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { ProductCard } from "@/components/product/ProductCard";
import { GallerySection } from "@/components/ui/GallerySection";
import { AnimatedGear, AnimatedScrew, FloatingParticles } from "@/components/ui/AnimatedMachinery";
import { products, CATEGORIES } from "@/lib/data/products";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

const heroWords = ["Smart", "Filling"];
const heroWords2 = ["Technologies"];

const lineSteps = [
  { t: "Feed", d: "Turn tables & conveyors orient and stage bottles into the line.", num: "01", icon: ArrowDownToLine, color: "text-neon-blue", borderColor: "border-neon-blue", hoverBorder: "hover:border-neon-blue/50" },
  { t: "Fill", d: "Servo auger & nozzle heads dose powders and liquids with precision.", num: "02", icon: Droplets, color: "text-emerald-400", borderColor: "border-emerald-400", hoverBorder: "hover:border-emerald-400/50" },
  { t: "Cap", d: "Rotary cappers seal vials leak-proof and contamination-free.", num: "03", icon: Lock, color: "text-neon-violet", borderColor: "border-neon-violet", hoverBorder: "hover:border-neon-violet/50" },
  { t: "Label", d: "Sticker labelling at up to 30 BPM for round bottles.", num: "04", icon: Tag, color: "text-neon-cyan", borderColor: "border-neon-cyan", hoverBorder: "hover:border-neon-cyan/50" },
];

const industryIcons = [
  { icon: Beaker, title: "Pharmaceutical", desc: "Powder filling, vial sealing, and contamination-free packaging for pharma production lines." },
  { icon: Leaf, title: "Pesticides & Agrochemical", desc: "SS304-grade filling systems built to handle agrochemical powders with chemical resistance." },
  { icon: Cookie, title: "Food Powder Packing", desc: "Auger-based filling for flour, spices, coffee, turmeric, and other food powders." },
  { icon: Droplets, title: "Water Packing", desc: "High-speed bottle rinsing, filling, and capping for mineral water and beverages." },
  { icon: Container, title: "Oil Packing", desc: "Viscous liquid filling machines engineered specifically for edible and industrial oils." },
  { icon: CreditCard, title: "Snap Card Packing", desc: "Specialized blister and snap card packaging automation for consumer goods." },
];

const valueProps = [
  { icon: Shield, title: "SS304 Build Quality", desc: "Every machine built with food and pharma-grade stainless steel across all contact parts." },
  { icon: Cpu, title: "PLC + HMI Control", desc: "Programmable logic controllers with 4.3\" to 7\" HMI touchscreens." },
  { icon: Cog, title: "Servo Precision", desc: "750W servo drive systems deliver repeatable, high-accuracy fills." },
  { icon: Award, title: "Warranty Included", desc: "All machines ship with manufacturer warranty for peace of mind." },
];

const SealedPacketAnimation = () => {
  const [step, setStep] = useState(0); // 0: Filling, 1: Sealed, 2: Dispatched

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 1800); // Change state every 1.8 seconds
    return () => clearInterval(interval);
  }, []);

  const isFilling = step === 0;
  const isSealed = step === 1;
  const isDispatched = step === 2;

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-visible">
      <motion.div
        animate={{
          y: isDispatched ? 60 : 0,
          opacity: isDispatched ? 0 : 1,
          scale: isDispatched ? 0.9 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`relative w-40 h-48 bg-gradient-to-b from-graphite to-graphite-light border-2 rounded-xl flex flex-col items-center justify-center transition-colors duration-500 glow ${
          isFilling ? "border-neon-cyan/60 shadow-[0_0_30px_rgba(0,243,255,0.15)]" : "border-emerald-400/60 shadow-[0_0_40px_rgba(52,211,153,0.15)]"
        }`}
      >
        {/* Top Seal Line - Animates in during Sealed */}
        <motion.div 
          initial={false}
          animate={{ scaleX: isFilling ? 0 : 1, opacity: isFilling ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-3 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-emerald-400/80 rounded-full" 
        />
        
        {/* Packet Graphic */}
        <Package className={`w-14 h-14 mb-4 transition-colors duration-500 ${
          isFilling ? "text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]" : "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"
        }`} />
        
        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full border transition-colors duration-500 ${
          isFilling ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan" : "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
        }`}>
          <span className="text-xs font-bold tracking-[0.2em] uppercase">
            {isFilling ? "Filling" : isSealed ? "Sealed" : "Dispatched"}
          </span>
        </div>
        
        {/* Bottom Seal Line - Always there */}
        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-1.5 rounded-full transition-colors duration-500 ${
          isFilling ? "bg-neon-cyan/80" : "bg-emerald-400/80"
        }`} />
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ════════════════════════════════════════════
          HERO SECTION — Dark with holographic effects
          ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative bg-graphite overflow-hidden min-h-[100svh] flex items-center">
        {/* Holographic texture background */}
        {/* Removed holographic texture background */}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/70 via-graphite/50 to-graphite z-[1]" />

        {/* Animated gears decoration */}
        <AnimatedGear size={280} direction="clockwise" speed={30} className="absolute -right-20 -top-20 text-neon-blue/30 z-[2] hidden md:block" />
        <AnimatedGear size={180} direction="counter-clockwise" speed={25} className="absolute -left-14 bottom-20 text-neon-violet/20 z-[2] hidden md:block" />
        <AnimatedScrew size={120} className="absolute right-[15%] bottom-[10%] text-neon-cyan/20 z-[2] hidden lg:block" />

        {/* Floating particles */}
        <FloatingParticles className="z-[2]" />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 section-container py-20 md:py-28 lg:py-36">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mb-5 text-sm md:text-base font-bold uppercase tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet"
            >
              Precision Filling & Packaging Machinery
            </motion.p>

            {/* Headline — word-by-word stagger */}
            <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white mb-2">
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1, duration: 0.7, ease }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {heroWords2.map((word, i) => (
                <motion.span
                  key={`w2-${i}`}
                  className={`inline-block mr-[0.25em] ${i === 2 ? "text-iri" : ""}`}
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ delay: (heroWords.length + i) * 0.1 + 0.1, duration: 0.7, ease }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subhead */}
            <motion.p
              className="text-steel-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6 mb-10"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease }}
            >
              Engineered in India. Stainless-steel auger, bottle, powder and pouch lines — built for 
              pharma, pesticides and food production. Trusted across Asia & South Africa.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-[image:var(--gradient-iri)] text-graphite font-semibold px-8 py-4 rounded-full text-sm transition-transform min-h-[48px] w-full sm:w-auto"
                >
                  Explore the Range
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-steel-500 text-white font-medium px-8 py-4 rounded-full text-sm hover:bg-white/5 transition-all min-h-[48px] w-full sm:w-auto"
                >
                  Request a Quote
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-steel-500/50 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          TRUST BAND — Stats with count-up
          ════════════════════════════════════════════ */}
      <section className="bg-graphite-light border-y border-steel-700/30">
        <div className="section-container py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { num: <CountUp end={5} suffix="–6" />, label: "Week Delivery" },
              { num: "SS304", label: "Stainless Steel" },
              { num: "PLC", label: "Servo Controlled" },
              { num: <CountUp end={2} suffix="+" />, label: "Export Regions" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-heading text-neon-blue font-bold text-2xl md:text-3xl">
                  {stat.num}
                </div>
                <p className="text-steel-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MARQUEE — Horizontal Sliding Machine Images
          ════════════════════════════════════════════ */}
      <section className="bg-graphite py-10 overflow-hidden border-b border-steel-700/30">
        <div className="section-container mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-neon-blue font-semibold">Our Engineering Excellence</p>
        </div>
        <div className="relative w-full overflow-hidden py-2">
          <div className="animate-marquee-reverse">
            {/* Wrapper 1 */}
            <div className="flex gap-6 pr-6 shrink-0">
              {[...products, ...products].map((product, i) => (
                <Link 
                  key={`w1-${product.slug}-${i}`} 
                  href={`/products/${product.slug}`} 
                  className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl overflow-hidden bg-graphite-light p-4 border border-steel-700/50 hover:border-neon-cyan/50 transition-all hover:-translate-y-1"
                >
                  <Image
                    src={product.image || '/images/sft-logo.jpg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 192px, 256px"
                    className="object-contain p-4"
                  />
                </Link>
              ))}
            </div>
            {/* Wrapper 2 (Exact Duplicate for seamless loop) */}
            <div className="flex gap-6 pr-6 shrink-0">
              {[...products, ...products].map((product, i) => (
                <Link 
                  key={`w2-${product.slug}-${i}`} 
                  href={`/products/${product.slug}`} 
                  className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl overflow-hidden bg-graphite-light p-4 border border-steel-700/50 hover:border-neon-cyan/50 transition-all hover:-translate-y-1"
                >
                  <Image
                    src={product.image || '/images/sft-logo.jpg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 192px, 256px"
                    className="object-contain p-4"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PRODUCTION LINE — The Flow
          ════════════════════════════════════════════ */}
      <section className="bg-graphite py-16 md:py-24 relative overflow-hidden">
        <AnimatedGear size={200} direction="clockwise" speed={40} className="absolute -right-16 top-10 text-steel-700/30" />
        <div className="section-container relative z-10">
          <AnimatedSection className="mb-14 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neon-violet">The Line</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white max-w-2xl mx-auto">
              The <span className="text-iri">Automated</span> Flow
            </h2>
            <p className="mt-4 max-w-xl text-steel-400 mx-auto">
              From raw material to a sealed, labelled product. Every Smart Filling system is built as one continuous sequence.
            </p>
          </AnimatedSection>

          {/* Aesthetic Vertical Flow Diagram */}
          <div className="relative max-w-4xl mx-auto py-4 md:py-10">
            
            {/* Faded Background Line (Static Track) */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-steel-700/30 transform md:-translate-x-1/2 rounded-full" />
            
            {/* Water Droplets Flow Animation */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-8 transform md:-translate-x-1/2 overflow-hidden pointer-events-none z-[5]">
               {[...Array(6)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ top: ["-10%", "110%"] }}
                   transition={{ 
                     duration: 5, 
                     repeat: Infinity, 
                     ease: "linear", 
                     delay: i * (5/6) 
                   }}
                   className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
                 >
                   <Droplets className="w-4 h-4 opacity-80" />
                 </motion.div>
               ))}
            </div>
            
            <StaggerContainer staggerDelay={0.3} className="flex flex-col gap-12 md:gap-0 relative z-10">
              {lineSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                const Icon = step.icon;
                return (
                  <StaggerItem key={step.t}>
                    <div className="relative flex flex-col md:flex-row items-start md:items-center group md:h-48">
                      
                      {/* Timeline Node & Icon */}
                      <div className={`absolute left-[0px] md:left-1/2 top-[0px] md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-[60px] h-[60px] bg-graphite border-[4px] ${step.borderColor} rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                         <Icon className={`w-6 h-6 ${step.color}`} />
                      </div>
                      
                      {/* Content Box Container */}
                      <div className={`w-full md:w-1/2 flex pl-20 md:pl-0 pt-2 md:pt-0 ${isEven ? 'md:pr-12 md:justify-end' : 'md:ml-auto md:pl-12 md:justify-start'}`}>
                        {/* The Box */}
                        <div className={`relative w-full p-6 md:p-8 rounded-2xl bg-graphite-light border border-steel-700/50 ${step.hoverBorder} transition-colors shadow-xl group-hover:-translate-y-1 duration-300 text-left ${isEven ? 'md:text-right' : ''}`}>
                          {/* The Bubble Tail (Desktop) */}
                          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-graphite-light border-steel-700/50 transform rotate-45 ${isEven ? '-right-[11px] border-r border-t' : '-left-[11px] border-l border-b'} transition-colors`} />
                          
                          <span className={`text-xs font-bold tracking-[0.2em] uppercase ${step.color}`}>Step {step.num}</span>
                          <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1 mb-2">{step.t}</h3>
                          <p className="text-steel-400 text-sm leading-relaxed">{step.d}</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
              
              {/* Final Sealed Packet Animation */}
              <StaggerItem key="FinalPacket">
                <div className="relative flex flex-col items-start md:items-center mt-4 md:mt-0 md:h-48">
                  {/* End of line connector dot */}
                  <div className="absolute left-[28px] md:left-1/2 top-0 transform md:-translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] z-10" />
                  
                  <div className="w-full md:w-1/2 flex pl-20 md:pl-0 pt-6 md:pt-10 md:mx-auto md:justify-center overflow-visible h-64">
                    <SealedPacketAnimation />
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          VIDEO SHOWCASE — Machine in Action
          ════════════════════════════════════════════ */}
      <section className="bg-graphite-light py-16 md:py-24 relative overflow-hidden">
        <FloatingParticles />
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-10 md:mb-14">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neon-cyan">See It Work</p>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-white mb-4">
              Our Machines <span className="text-iri">in Action</span>
            </h2>
            <p className="text-steel-400 max-w-lg mx-auto">
              Watch our packing machinery running on a live production line — precision, speed, and consistency in every cycle.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-steel-700/50 glow">
                <video
                  className="w-full max-h-[80vh] object-contain rounded-2xl"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/video/packing-machine.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
                {/* Decorative gear overlays */}
                <AnimatedGear size={80} direction="clockwise" speed={20} className="absolute -top-4 -right-4 text-neon-blue/10 pointer-events-none" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MACHINE CATEGORIES
          ════════════════════════════════════════════ */}
      <section className="bg-graphite py-16 md:py-20 relative">
        <AnimatedGear size={160} direction="counter-clockwise" speed={35} className="absolute -left-12 top-20 text-steel-700/20" />
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-10 md:mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
              Our Machine Categories
            </h2>
            <p className="text-steel-400 max-w-lg mx-auto">
              From semi-automatic to fully automatic systems, find the right machine for your production line.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {CATEGORIES.map((cat) => (
              <StaggerItem key={cat.id}>
                <Link href={`/products?category=${cat.id}`} className="block group">
                  <motion.div
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.97 }}
                    className="holo-bg rounded-2xl border border-steel-700/50 bg-graphite-light p-6 md:p-8 hover:border-neon-blue/30 hover:glow transition-all h-full"
                  >
                    <h3 className="font-heading font-bold text-lg text-white mb-2">{cat.label}</h3>
                    <p className="text-steel-400 text-sm leading-relaxed mb-4">{cat.description}</p>
                    <span className="inline-flex items-center text-neon-blue text-sm font-semibold group-hover:gap-2 transition-all">
                      Explore <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURED PRODUCTS
          ════════════════════════════════════════════ */}
      <section className="bg-graphite-light py-16 md:py-20 relative overflow-hidden">
        <AnimatedScrew size={100} className="absolute right-8 top-20 text-steel-700/20 hidden lg:block" />
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-10 md:mb-12">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon-violet">The Range</p>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-white mb-3">
              Machines for every stage.
            </h2>
            <p className="text-steel-400 max-w-lg mx-auto">
              Explore our most popular filling, capping, and packing machinery.
            </p>
          </AnimatedSection>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto scroll-snap-x scrollbar-hide pb-4 -mx-4 px-4">
              {products.slice(0, 6).map((product) => (
                <div key={product.slug} className="min-w-[280px] max-w-[300px] shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <StaggerContainer className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border border-steel-600 text-white hover:border-neon-blue/40 hover:text-neon-blue px-6 py-3 rounded-full text-sm font-medium transition-all min-h-[44px]"
              >
                View All Machines <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INDUSTRIES SERVED
          ════════════════════════════════════════════ */}
      <section className="bg-graphite py-16 md:py-20">
        <div className="section-container">
          <AnimatedSection className="text-center mb-10 md:mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
              Industries We Serve
            </h2>
          </AnimatedSection>

          <div className="relative w-full overflow-hidden py-4">
            <div className="animate-marquee-reverse items-stretch">
              {/* Wrapper 1 */}
              <div className="flex gap-5 pr-5 shrink-0">
                {[...industryIcons, ...industryIcons].map(({ icon: Icon, title, desc }, idx) => (
                  <div key={`w1-${title}-${idx}`} className="w-[280px] md:w-[320px] shrink-0 holo-bg rounded-2xl border border-steel-700/50 bg-graphite-light p-6 text-center md:text-left flex flex-col h-full hover:border-neon-blue/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center mx-auto md:mx-0 mb-4 shrink-0">
                      <Icon className="w-6 h-6 text-neon-blue" />
                    </div>
                    <h3 className="font-heading font-bold text-white mb-2 shrink-0">{title}</h3>
                    <p className="text-steel-400 text-sm leading-relaxed flex-grow">{desc}</p>
                  </div>
                ))}
              </div>
              {/* Wrapper 2 (Exact Duplicate) */}
              <div className="flex gap-5 pr-5 shrink-0">
                {[...industryIcons, ...industryIcons].map(({ icon: Icon, title, desc }, idx) => (
                  <div key={`w2-${title}-${idx}`} className="w-[280px] md:w-[320px] shrink-0 holo-bg rounded-2xl border border-steel-700/50 bg-graphite-light p-6 text-center md:text-left flex flex-col h-full hover:border-neon-blue/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center mx-auto md:mx-0 mb-4 shrink-0">
                      <Icon className="w-6 h-6 text-neon-blue" />
                    </div>
                    <h3 className="font-heading font-bold text-white mb-2 shrink-0">{title}</h3>
                    <p className="text-steel-400 text-sm leading-relaxed flex-grow">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AnimatedSection className="text-center mt-8">
            <Button href="/industries" variant="ghost" className="text-steel-300 hover:text-white">
              Learn More About Industries <ArrowRight className="w-4 h-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHY CHOOSE US
          ════════════════════════════════════════════ */}
      <section className="bg-graphite-light py-16 md:py-20 relative overflow-hidden">
        <AnimatedGear size={140} direction="clockwise" speed={30} className="absolute right-[-40px] bottom-10 text-steel-700/15" />
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-10 md:mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
              Why Smart Filling Technologies
            </h2>
            <p className="text-steel-400 max-w-lg mx-auto">
              Engineering credibility you can verify — every claim backed by the specs on our machines.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {valueProps.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-steel-700/50 bg-graphite p-6 hover:border-neon-blue/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-neon-violet/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-neon-violet" />
                  </div>
                  <h3 className="font-heading font-semibold text-white mb-1.5">{title}</h3>
                  <p className="text-steel-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          GALLERY — Machine Photos & Videos
          ════════════════════════════════════════════ */}
      <GallerySection />

      {/* ════════════════════════════════════════════
          CTA BAND — Holographic
          ════════════════════════════════════════════ */}
      <section className="relative px-4 py-16 md:py-24 bg-graphite">
        <div className="holo-bg section-container max-w-5xl overflow-hidden rounded-3xl border border-steel-700/50 bg-graphite-light p-8 sm:p-16 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-white mb-4 relative z-10">
              Let&apos;s engineer <span className="text-iri">your line.</span>
            </h2>
            <p className="text-steel-400 max-w-lg mx-auto mb-8 relative z-10">
              Tell us what you fill — we&apos;ll spec the machine. Warranty included,
              delivery in 5–6 weeks, export to Asia and South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[image:var(--gradient-iri)] text-graphite font-semibold px-8 py-4 rounded-full text-sm min-h-[48px] w-full sm:w-auto"
                >
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 border border-steel-500 text-white font-medium px-8 py-4 rounded-full text-sm hover:bg-white/5 transition-all min-h-[48px] w-full sm:w-auto"
                >
                  View Machines
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
