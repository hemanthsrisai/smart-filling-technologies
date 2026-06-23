"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Filter } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { galleryItems, GalleryItem } from "@/components/ui/GallerySection";

/* ─── Video Card ─── */
function VideoCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-graphite-light border border-steel-700/30 hover:border-neon-cyan/40 transition-colors duration-300"
      onMouseEnter={() => { setHovering(true); videoRef.current?.play(); }}
      onMouseLeave={() => { setHovering(false); videoRef.current?.pause(); }}
      onClick={onClick}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <motion.div
          initial={false}
          animate={{ opacity: hovering ? 0 : 1 }}
          className="absolute inset-0 bg-graphite/60 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </motion.div>
      </div>
      <div className="p-3 md:p-4">
        <p className="text-sm font-medium text-steel-300 group-hover:text-white transition-colors truncate">{item.title}</p>
      </div>
    </motion.div>
  );
}

/* ─── Image Card ─── */
function ImageCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-graphite-light border border-steel-700/30 hover:border-neon-violet/40 transition-colors duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-3 md:p-4">
        <p className="text-sm font-medium text-steel-300 group-hover:text-white transition-colors truncate">{item.title}</p>
      </div>
    </motion.div>
  );
}

/* ─── Lightbox ─── */
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-graphite/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </motion.button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative max-w-5xl max-h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video src={item.src} controls autoPlay className="w-full h-full max-h-[85vh] object-contain bg-black rounded-2xl" />
        ) : (
          <div className="relative w-full aspect-[4/3]">
            <Image src={item.src} alt={item.title} fill className="object-contain bg-black rounded-2xl" sizes="90vw" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-graphite/90 to-transparent p-6">
          <p className="text-white font-heading font-bold text-lg">{item.title}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════
   FULL GALLERY PAGE
   ═══════════════════════════════ */
export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

  const filtered = filter === "all" ? galleryItems : galleryItems.filter((i) => i.type === filter);

  const filters = [
    { key: "all" as const, label: "All" },
    { key: "image" as const, label: "Photos" },
    { key: "video" as const, label: "Videos" },
  ];

  return (
    <main className="min-h-screen bg-graphite pt-24 md:pt-32">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet">
            Our Work in Action
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white mt-3 mb-4">
            Machine <span className="text-iri">Gallery</span>
          </h1>
          <p className="text-steel-400 max-w-2xl mx-auto text-lg">
            Browse our complete collection of filling, packing, and sealing machines.
            Hover over videos to preview, click to watch in full.
          </p>
        </AnimatedSection>

        {/* Filter Tabs */}
        <AnimatedSection delay={0.2} className="flex justify-center gap-2 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border min-h-[44px] flex items-center gap-2 ${
                filter === f.key
                  ? "bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 border-neon-cyan/40 text-white shadow-[0_0_20px_rgba(0,243,255,0.1)]"
                  : "bg-graphite-light border-steel-700/50 text-steel-400 hover:text-white hover:border-steel-500"
              }`}
            >
              {f.key === "all" && <Filter className="w-4 h-4" />}
              {f.label}
              <span className="text-xs opacity-60">
                ({f.key === "all" ? galleryItems.length : galleryItems.filter(i => i.type === f.key).length})
              </span>
            </motion.button>
          ))}
        </AnimatedSection>

        {/* Grid */}
        <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20">
          {filtered.map((item) => (
            <StaggerItem key={item.src}>
              {item.type === "video" ? (
                <VideoCard item={item} onClick={() => setSelectedItem(item)} />
              ) : (
                <ImageCard item={item} onClick={() => setSelectedItem(item)} />
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </main>
  );
}
