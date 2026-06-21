"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { Datasheet } from "./Datasheet";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-steel-700/50 bg-graphite-light
        hover:border-neon-blue/30 hover:shadow-lg hover:shadow-neon-blue/5 transition-all duration-300"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-steel-800 to-graphite">
          <ProductImage product={product} />
          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-graphite/80 backdrop-blur-sm text-steel-300 text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded z-20">
            {product.categoryLabel}
          </span>
          {/* In Stock badge */}
          {product.specs.some(s => s.label === "Availability" && s.value === "In stock") && (
            <span className="absolute top-3 right-3 bg-accent text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded z-20">
              In Stock
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <span className="text-[10px] uppercase tracking-widest text-neon-violet font-medium">{product.categoryLabel}</span>
          <h3 className="font-heading font-bold text-white text-base md:text-lg leading-snug mt-1 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-steel-400 mb-3 leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Compact specs — show key spec in monospace */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.specs.slice(0, 3).map((spec) => (
              <span key={spec.label} className="inline-flex items-baseline gap-1 bg-graphite border border-steel-700/50 rounded px-2 py-1">
                <span className="text-[9px] uppercase tracking-wider text-steel-500">{spec.label}</span>
                <span className="font-mono text-[11px] text-steel-200 font-medium">{spec.value}</span>
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center text-neon-blue text-sm font-semibold group-hover:gap-2 transition-all">
            <span>View Full Specs</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
