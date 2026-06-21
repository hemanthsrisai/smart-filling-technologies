"use client";

import Link from "next/link";
import { Beaker, Leaf, Cookie, ArrowRight, CheckCircle } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { AnimatedGear } from "@/components/ui/AnimatedMachinery";
import { motion } from "framer-motion";

const pharmaProducts = [
  { name: "2-Head Bottle Filling Machine", slug: "2-head-bottle-filling-machine" },
  { name: "Semi Automatic Auger Filling Machine", slug: "semi-automatic-auger-filling-machine" },
  { name: "4-Head Bottle Filling Machine", slug: "4-head-bottle-filling-machine" },
  { name: "6-Head Bottle Filling Machine", slug: "6-head-bottle-filling-machine" },
  { name: "Rotary Capping Machine", slug: "rotary-capping-machine" },
];

const pesticideProducts = [
  { name: "2-Head Bottle Filling Machine", slug: "2-head-bottle-filling-machine" },
  { name: "Semi Automatic Auger Filling Machine", slug: "semi-automatic-auger-filling-machine" },
  { name: "4-Head Bottle Filling Machine", slug: "4-head-bottle-filling-machine" },
  { name: "6-Head Bottle Filling Machine", slug: "6-head-bottle-filling-machine" },
  { name: "Labelling Machine", slug: "labelling-machine" },
  { name: "Rotary Capping Machine", slug: "rotary-capping-machine" },
];

const foodProducts = [
  { name: "Automatic Powder Filling Machine for Bottles", slug: "automatic-powder-filling-machine-bottles" },
  { name: "Automatic Auger Filling Machine for Pouches", slug: "automatic-auger-filling-machine-pouches" },
];

const suitableForPacking = [
  "Wheat flour (atta)", "Rice flour", "Besan", "Spices", "Chilli powder",
  "Turmeric powder", "Coffee powder", "Curry powder", "Chemical powder", "Bleaching powder",
];

const industries = [
  {
    icon: Beaker,
    title: "Pharmaceutical",
    bgClass: "bg-graphite",
    description: "Filling and packaging for pharmaceutical products — powders, vials, and bottles. Every machine delivers contamination-free, leak-proof sealing critical for maintaining product sterility and regulatory compliance. SS304 stainless steel contact parts meet pharma-grade hygiene requirements.",
    machines: pharmaProducts,
  },
  {
    icon: Leaf,
    title: "Pesticides & Agrochemical",
    bgClass: "bg-graphite-light",
    description: "Filling machines for pesticide powders and agrochemical products. SS304 stainless steel construction provides chemical resistance required for handling aggressive agrochemical formulations. PLC control ensures precise, consistent fills for regulatory-compliant packaging.",
    machines: pesticideProducts,
  },
  {
    icon: Cookie,
    title: "Food Powder Packing",
    bgClass: "bg-graphite",
    description: "Auger-based filling systems for food-grade powder products in both bottle and pouch formats. Servo-driven accuracy ensures consistent fill weights, while the hopper-mounted stirrer prevents powder bridging for uninterrupted production runs.",
    machines: foodProducts,
    suitableFor: suitableForPacking,
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-graphite py-12 md:py-16 relative overflow-hidden">
        <AnimatedGear size={220} direction="counter-clockwise" speed={35} className="absolute -right-20 -top-20 text-neon-blue/15" />
        <div className="section-container text-center relative z-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon-violet">Applications</p>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Industries We Serve</h1>
          <p className="text-steel-400 max-w-xl mx-auto">
            Precision filling and packing machinery for pharmaceutical, pesticide, and food powder manufacturing.
          </p>
        </div>
      </section>

      {industries.map((ind) => {
        const Icon = ind.icon;
        return (
          <section key={ind.title} className={`${ind.bgClass} py-12 md:py-16`}>
            <div className="section-container">
              <AnimatedSection>
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-neon-blue" />
                    </div>
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">{ind.title}</h2>
                  </div>
                  <p className="text-steel-400 leading-relaxed mb-8">{ind.description}</p>

                  <h3 className="font-heading font-semibold text-steel-300 text-sm uppercase tracking-wider mb-4">Relevant Machines</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {ind.machines.map((m) => (
                      <Link key={m.slug} href={`/products/${m.slug}`} className="flex items-center gap-2 bg-graphite-light border border-steel-700/50 rounded-lg px-4 py-3 hover:border-neon-blue/30 hover:shadow-sm transition-all min-h-[44px] group">
                        <ArrowRight className="w-4 h-4 text-steel-500 group-hover:text-neon-blue transition-colors shrink-0" />
                        <span className="text-sm text-steel-200 group-hover:text-neon-blue transition-colors">{m.name}</span>
                      </Link>
                    ))}
                  </div>

                  {ind.suitableFor && (
                    <>
                      <h3 className="font-heading font-semibold text-steel-300 text-sm uppercase tracking-wider mb-4">Suitable for Packing</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {ind.suitableFor.map((item) => (
                          <div key={item} className="flex items-center gap-2 bg-neon-violet/5 border border-neon-violet/20 rounded-lg px-3 py-2.5">
                            <CheckCircle className="w-3.5 h-3.5 text-neon-violet shrink-0" />
                            <span className="text-xs text-steel-200 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </section>
        );
      })}

      <section className="bg-graphite py-12 md:py-16 relative">
        <div className="holo-bg section-container max-w-4xl rounded-3xl border border-steel-700/50 bg-graphite-light p-8 sm:p-16 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4 relative z-10">Need a Machine for Your Industry?</h2>
            <p className="text-steel-400 max-w-md mx-auto mb-8 relative z-10">Tell us your product and packaging requirements — we will recommend the right machine.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="relative z-10">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[image:var(--gradient-iri)] text-graphite font-semibold px-8 py-4 rounded-full text-sm min-h-[48px]">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
