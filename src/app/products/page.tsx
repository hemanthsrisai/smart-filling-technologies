"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, CATEGORIES, getProductsByCategory, type ProductCategory } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { AnimatedGear } from "@/components/ui/AnimatedMachinery";

type FilterOption = "all" | ProductCategory;

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const filteredProducts = activeFilter === "all" ? products : getProductsByCategory(activeFilter);
  const filters: { id: FilterOption; label: string }[] = [
    { id: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.id as FilterOption, label: c.label.replace(" Machines", "") })),
  ];

  return (
    <>
      <section className="bg-graphite py-12 md:py-16 relative overflow-hidden">
        <AnimatedGear size={200} direction="clockwise" speed={30} className="absolute -right-16 -top-16 text-neon-blue/20" />
        <div className="section-container text-center relative z-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon-violet">The Range</p>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Our Machines</h1>
          <p className="text-steel-400 max-w-lg mx-auto">
            Semi-automatic and automatic filling, capping, labelling, and packing machinery.
            Every machine built with SS304 stainless steel and PLC + servo control.
          </p>
        </div>
      </section>
      <section className="bg-graphite-light py-10 md:py-16">
        <div className="section-container">
          <div className="flex flex-wrap gap-2 justify-center mb-8 md:mb-12">
            {filters.map((f) => (
              <motion.button
                key={f.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium min-h-[44px] transition-all ${
                  activeFilter === f.id
                    ? "bg-[image:var(--gradient-iri)] text-graphite font-semibold"
                    : "border border-steel-700/50 text-steel-400 bg-graphite hover:text-white hover:border-steel-500"
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
          {filteredProducts.length === 0 && (
            <p className="text-center text-steel-500 py-12">No machines found in this category.</p>
          )}
        </div>
      </section>
    </>
  );
}
