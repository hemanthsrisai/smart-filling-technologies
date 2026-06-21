import Image from "next/image";
import type { Product } from "@/lib/data/products";

/**
 * Product image component — uses real product photos from the design assets.
 * Falls back to a styled gradient placeholder if the image fails to load.
 */
export function ProductImage({ product, className }: { product: Product; className?: string }) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center relative overflow-hidden ${className || ""}`}
      style={{
        background: `linear-gradient(135deg, ${product.placeholderGradient[0]}20 0%, ${product.placeholderGradient[1]}30 100%)`,
      }}
    >
      {/* Holographic shimmer overlay */}
      <div className="holo-bg absolute inset-0 z-0" />

      <Image
        src={product.image}
        alt={`${product.name} - ${product.shortDescription}`}
        width={500}
        height={400}
        className="relative z-10 w-auto max-h-[90%] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-110 p-4"
        loading="lazy"
      />
    </div>
  );
}
