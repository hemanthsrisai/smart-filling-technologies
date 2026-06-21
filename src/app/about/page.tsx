"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Cpu, Cog, Award, Globe, Factory, Clock, Package, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { AnimatedGear, InterlockingGears } from "@/components/ui/AnimatedMachinery";

const qualityPoints = [
  { icon: Shield, title: "SS304 Stainless Steel", description: "Every machine is constructed with food and pharma-grade SS304 stainless steel across all contact parts, ensuring corrosion resistance and hygiene compliance." },
  { icon: Cpu, title: "PLC + HMI Control", description: "Programmable logic controllers paired with 4.3\" to 7\" HMI touchscreens provide operator-friendly control with full process visibility." },
  { icon: Cog, title: "Servo-Driven Precision", description: "750W servo drive systems deliver repeatable, high-accuracy fills on every cycle, whether running 12 BPM or 24 BPM production lines." },
];

const whyChooseUs = [
  { icon: Shield, title: "Consistent SS304 Construction", description: "Every machine built with food/pharma-grade stainless steel. No shortcuts, no mixed materials on contact parts." },
  { icon: Cpu, title: "PLC-Controlled Precision", description: "Programmable logic controllers with HMI touchscreens for operator-friendly control and full production monitoring." },
  { icon: Cog, title: "Servo-Driven Accuracy", description: "750W servo systems deliver repeatable, precise fills — accuracy that holds up across thousands of cycles." },
  { icon: Globe, title: "Proven Export Track Record", description: "Machines operating across Asia and South Africa, with expanding reach into Sub-Saharan African markets." },
  { icon: Package, title: "Flexible Terms", description: "100% payment against delivery — no advance payment required. Built to earn trust with new export buyers." },
  { icon: Clock, title: "Quick Delivery", description: "5–6 weeks manufacturing timeline, or ready stock availability for select machines. No long waits." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-graphite py-12 md:py-16 relative overflow-hidden">
        <AnimatedGear size={200} direction="clockwise" speed={35} className="absolute -right-16 -top-16 text-neon-blue/15" />
        <div className="section-container text-center relative z-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon-violet">Our Story</p>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">About Smart Filling Technologies</h1>
          <p className="text-steel-400 max-w-xl mx-auto">Precision filling and packing machinery, engineered in India .</p>
        </div>
      </section>

      <section className="bg-graphite-light py-12 md:py-16">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center">
                  <Factory className="w-5 h-5 text-neon-blue" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">Our Story</h2>
              </div>
              {/* TODO: Replace this placeholder text with the actual company founding story,
                   history, and key milestones. Do not invent specific years, founder names,
                   or awards — use only verified information provided by the client. */}
              <div className="space-y-4 text-steel-400 leading-relaxed">
                <p>Smart Filling Technologies is an Indian manufacturer of precision filling and packing machinery, Every machine is designed and built to serve the pharmaceutical, pesticide and agrochemical, and food powder packing industries.</p>
                <p>The company manufactures a complete range of semi-automatic and automatic filling systems, capping machines, labelling machines, conveyors, and turn tables — all constructed with SS304 stainless steel and controlled by PLC + servo drive systems for production-ready accuracy.</p>
                <p>With an established export presence across Asia and South Africa, Smart Filling Technologies is expanding into Sub-Saharan Africa — Nigeria, Kenya, Ethiopia, Ghana, and Tanzania — to serve the growing demand for reliable, precision packaging machinery in emerging manufacturing markets.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-graphite py-12 md:py-16 relative overflow-hidden">
        <InterlockingGears size={160} className="absolute right-4 bottom-4 opacity-20 hidden lg:block" />
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">Manufacturing Quality</h2>
            <p className="text-steel-400 max-w-lg mx-auto">Every machine that leaves our facility is built to the same exacting standard.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {qualityPoints.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="bg-graphite-light border border-steel-700/50 rounded-2xl p-6 h-full hover:border-neon-blue/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-neon-blue" />
                  </div>
                  <h3 className="font-heading font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-steel-400 leading-relaxed">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-graphite-light py-12 md:py-16">
        <div className="section-container">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">Why Choose Us</h2>
            <p className="text-steel-400 max-w-lg mx-auto">Every claim grounded in the real specs and facts of our machines — no marketing fluff.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChooseUs.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="bg-graphite border border-steel-700/50 rounded-2xl p-6 h-full hover:border-neon-violet/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-neon-violet/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-neon-violet" />
                  </div>
                  <h3 className="font-heading font-semibold text-white mb-1.5">{title}</h3>
                  <p className="text-sm text-steel-400 leading-relaxed">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-graphite py-12 md:py-16">
        <div className="holo-bg section-container max-w-4xl rounded-3xl border border-steel-700/50 bg-graphite-light p-8 sm:p-16 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4 relative z-10">Ready to Discuss Your Requirements?</h2>
            <p className="text-steel-400 max-w-md mx-auto mb-8 relative z-10">Get in touch for a detailed quote on any machine in our range.</p>
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
