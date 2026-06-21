import type { ProductSpec } from "@/lib/data/products";
import { cn } from "@/lib/utils";

interface DatasheetProps {
  specs: ProductSpec[];
  /** Compact mode shows fewer specs (for cards) */
  compact?: boolean;
  className?: string;
}

/**
 * Datasheet — the signature component of the Smart Filling Technologies brand.
 * 
 * Renders specs in a labeled-row / monospace-value format that reads like
 * a real industrial datasheet. On mobile, labels and values stack vertically.
 * On tablet+, they render as two-column label:value rows.
 * 
 * This is the visual heart of the brand identity: "we show our specs,
 * we don't hide behind marketing fluff."
 */
export function Datasheet({ specs, compact, className }: DatasheetProps) {
  const displaySpecs = compact ? specs.slice(0, 4) : specs;

  return (
    <div className={cn("w-full", className)}>
      <div className="border border-steel-700/50 rounded-xl overflow-hidden">
        {displaySpecs.map((spec, i) => (
          <div
            key={spec.label}
            className={cn(
              "flex flex-col sm:flex-row sm:items-baseline",
              "px-4 py-3 sm:py-2.5",
              i % 2 === 0 ? "bg-graphite" : "bg-graphite-light",
              i !== displaySpecs.length - 1 && "border-b border-steel-700/30"
            )}
          >
            {/* Label */}
            <span className="text-xs uppercase tracking-wider text-steel-500 font-medium sm:w-[40%] sm:shrink-0 mb-0.5 sm:mb-0">
              {spec.label}
            </span>
            {/* Value — always monospace */}
            <span className="font-mono text-sm text-steel-200 font-medium sm:w-[60%]">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Inline spec badge — small single spec for use inside cards or headers */
export function SpecBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-baseline gap-1.5 bg-graphite border border-steel-700/50 rounded px-2.5 py-1">
      <span className="text-[10px] uppercase tracking-wider text-steel-500 font-medium">{label}</span>
      <span className="font-mono text-xs text-steel-200 font-semibold">{value}</span>
    </div>
  );
}
