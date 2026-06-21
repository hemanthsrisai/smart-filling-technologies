"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, MapPin, Shield, Clock, Package, CheckCircle, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { AnimatedGear, FloatingParticles } from "@/components/ui/AnimatedMachinery";

const currentMarkets = [
  { name: "Asia", description: "Established presence across Asian markets with active installations in pharmaceutical and agrochemical facilities." },
  { name: "South Africa", description: "Growing customer base in South Africa's pharmaceutical and pesticide manufacturing sectors." },
];

const expansionCountries = [
  { name: "Nigeria", description: "Growing agrochemical and pharmaceutical repackaging industry with demand for reliable filling equipment." },
  { name: "Kenya", description: "East Africa's pharmaceutical manufacturing hub with an expanding food processing sector." },
  { name: "South Africa", description: "Established pharmaceutical and agrochemical markets with high quality standards for imported machinery." },
  { name: "Ethiopia", description: "Rapidly growing manufacturing sector with increasing demand for packaging automation across industries." },
  { name: "Ghana", description: "Expanding pesticide formulation and food processing industries driving demand for filling machinery." },
  { name: "Tanzania", description: "Agricultural processing growth driving demand for powder filling and packing systems." },
];

const exportTerms = [
  { icon: Package, label: "Payment Terms", value: "100% against delivery" },
  { icon: Shield, label: "GST (Domestic)", value: "18% applicable" },
  { icon: Clock, label: "Delivery Time", value: "5–6 weeks or ready stock" },
  { icon: Package, label: "MOQ", value: "1 machine" },
  { icon: CheckCircle, label: "Sample Policy", value: "Contact us for information" },
];

export default function ExportPage() {
  return (
    <>
      <section className="bg-graphite py-12 md:py-16 relative overflow-hidden">
        <AnimatedGear size={180} direction="clockwise" speed={30} className="absolute -left-14 -bottom-14 text-neon-blue/15" />
        <FloatingParticles />
        <div className="section-container text-center relative z-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon-cyan">Global Reach</p>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Export Markets</h1>
          <p className="text-steel-400 max-w-xl mx-auto">
            Precision filling machinery engineered in India, trusted by buyers across Asia and Africa.
          </p>
        </div>
      </section>

      <section className="bg-graphite-light py-12 md:py-16">
        <div className="section-container">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-neon-blue" />
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">Current Markets</h2>
            </div>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {currentMarkets.map((market) => (
              <StaggerItem key={market.name}>
                <div className="bg-neon-blue/5 border border-neon-blue/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-neon-blue" />
                    <h3 className="font-heading font-bold text-white">{market.name}</h3>
                  </div>
                  <p className="text-sm text-steel-400 leading-relaxed">{market.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-graphite py-12 md:py-16">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">Expansion Focus: <span className="text-iri">Sub-Saharan Africa</span></h2>
            <p className="text-steel-400 mb-8 max-w-xl">Expanding into Sub-Saharan Africa to serve the growing demand for pharmaceutical, agrochemical, and food processing machinery.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {expansionCountries.map((country) => (
              <StaggerItem key={country.name}>
                <div className="bg-graphite-light border border-steel-700/50 rounded-2xl p-5 h-full hover:border-neon-violet/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-neon-violet" />
                    <h3 className="font-heading font-semibold text-white">{country.name}</h3>
                  </div>
                  <p className="text-sm text-steel-400 leading-relaxed">{country.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-graphite-light py-12 md:py-16">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-8">Export Terms</h2>
          </AnimatedSection>
          <div className="max-w-xl">
            <div className="border border-steel-700/50 rounded-xl overflow-hidden">
              {exportTerms.map((term, i) => {
                const Icon = term.icon;
                return (
                  <div key={term.label} className={`flex items-center gap-4 px-5 py-4 ${i % 2 === 0 ? "bg-graphite" : "bg-graphite-light"} ${i < exportTerms.length - 1 ? "border-b border-steel-700/30" : ""}`}>
                    <Icon className="w-4 h-4 text-steel-500 shrink-0" />
                    <span className="text-sm text-steel-500 w-[120px] shrink-0">{term.label}</span>
                    <span className="font-mono text-sm text-steel-200 font-medium">{term.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-12 md:py-16">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-6">Trade Credentials</h2>
            <div className="max-w-xl bg-graphite-light border border-steel-700/50 rounded-xl overflow-hidden">
              {[["IEC Code", "To be provided"], ["GSTIN", "To be provided"], ["Certifications", "To be provided"]].map(([label, value], i) => (
                <div key={label} className={`flex items-center gap-4 px-5 py-4 ${i % 2 !== 0 ? "bg-graphite" : ""} ${i < 2 ? "border-b border-steel-700/30" : ""}`}>
                  <span className="text-sm text-steel-500 w-[120px] shrink-0">{label}</span>
                  <span className="font-mono text-sm text-steel-500 italic">{value}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-graphite-light py-12 md:py-16">
        <div className="holo-bg section-container max-w-4xl rounded-3xl border border-steel-700/50 bg-graphite p-8 sm:p-16 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4 relative z-10">Interested in Importing Our Machinery?</h2>
            <p className="text-steel-400 max-w-md mx-auto mb-8 relative z-10">Contact us to discuss your requirements, shipping, and delivery timeline.</p>
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
