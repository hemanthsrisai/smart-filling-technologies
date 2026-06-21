"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/data/products";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  return (
    <>
      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-graphite/95 backdrop-blur-md border-t border-steel-700/50 p-3 lg:hidden">
        <motion.div whileTap={{ scale: 0.97 }}>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full bg-[image:var(--gradient-iri)] text-graphite font-semibold py-3.5 rounded-lg min-h-[48px]"
          >
            <MessageSquare className="w-4 h-4" />
            Request Quote — {product.name}
          </Link>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-graphite-light">
          <div className="section-container">
            <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-6">
              Related Machines
            </h2>
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto scroll-snap-x scrollbar-hide pb-4 -mx-4 px-4">
                {relatedProducts.map((p) => (
                  <div key={p.slug} className="min-w-[280px] max-w-[300px] shrink-0">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="h-20 lg:hidden" />
    </>
  );
}
