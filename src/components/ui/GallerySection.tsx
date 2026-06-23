"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

/* ─── Gallery Data ─── */
export interface GalleryItem {
  type: "image" | "video";
  src: string;
  title: string;
}

export const galleryItems: GalleryItem[] = [
  { type: "image", src: "/gallery/gallery-image-1.jpg", title: "Multi-Head Pouch Packing Machine" },
  { type: "video", src: "/gallery/gallery-video-1.mp4", title: "Pouch Filling Line in Action" },
  { type: "image", src: "/gallery/gallery-image-2.jpg", title: "Single-Head Packing Unit" },
  { type: "video", src: "/gallery/gallery-video-2.mp4", title: "High-Speed Packaging Demo" },
  { type: "image", src: "/gallery/gallery-image-3.jpg", title: "Production Floor – Ready for Dispatch" },
  { type: "video", src: "/gallery/gallery-video-3.mp4", title: "Auger Filling Operation" },
  { type: "image", src: "/gallery/gallery-image-4.jpg", title: "Liquid Filling System" },
  { type: "video", src: "/gallery/gallery-video-4.mp4", title: "Liquid Filling Process" },
  { type: "video", src: "/gallery/gallery-video-5.mp4", title: "Sealing Machine Demo" },
  { type: "video", src: "/gallery/gallery-video-6.mp4", title: "Complete Production Run" },
  { type: "video", src: "/gallery/gallery-video-7.mp4", title: "Pouch Forming Unit" },
  { type: "video", src: "/gallery/gallery-video-8.mp4", title: "Batch Coding System" },
  { type: "video", src: "/gallery/gallery-video-9.mp4", title: "Conveyor Integration" },
  { type: "video", src: "/gallery/gallery-video-10.mp4", title: "Powder Filling Station" },
  { type: "video", src: "/gallery/gallery-video-11.mp4", title: "Water Packing Line" },
  { type: "video", src: "/gallery/gallery-video-12.mp4", title: "Oil Filling Machine" },
  { type: "video", src: "/gallery/gallery-video-13.mp4", title: "Testing & Quality Check" },
  { type: "video", src: "/gallery/gallery-video-14.mp4", title: "Cap Sealing Unit" },
  { type: "video", src: "/gallery/gallery-video-15.mp4", title: "Labeling Machine" },
  { type: "video", src: "/gallery/gallery-video-16.mp4", title: "Full Assembly Line" },
];

/* ─── Inline Video Card (hover to preview) ─── */
function VideoCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-graphite-light border border-steel-700/30 hover:border-neon-cyan/40 transition-colors duration-300 flex-shrink-0 w-[280px] sm:w-[340px] md:w-[400px] snap-center"
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
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </motion.div>
      </div>
      <div className="p-3 md:p-4">
        <p className="text-sm font-medium text-steel-300 group-hover:text-white transition-colors truncate">{item.title}</p>
      </div>
    </div>
  );
}

/* ─── Inline Image Card ─── */
function ImageCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-graphite-light border border-steel-700/30 hover:border-neon-violet/40 transition-colors duration-300 flex-shrink-0 w-[280px] sm:w-[340px] md:w-[400px] snap-center"
      onClick={onClick}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-3 md:p-4">
        <p className="text-sm font-medium text-steel-300 group-hover:text-white transition-colors truncate">{item.title}</p>
      </div>
    </div>
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

/* ═══════════════════════════════════════════════════
   HOMEPAGE CAROUSEL — horizontal slider with arrows
   ═══════════════════════════════════════════════════ */
export function GalleryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 420; // approx card + gap
    if (direction === "right") {
      // If near end, loop back
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      // If at start, loop to end
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section className="relative px-4 py-20 md:py-32 bg-graphite overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-violet/5 blur-[150px] pointer-events-none" />

      <div className="section-container relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet">
            Our Work in Action
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-3 mb-4">
            Machine <span className="text-iri">Gallery</span>
          </h2>
          <p className="text-steel-400 max-w-2xl mx-auto">
            Real machines, real production lines. Browse our latest builds and watch them in action.
          </p>
        </AnimatedSection>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-graphite/80 backdrop-blur-md border border-steel-700/50 flex items-center justify-center text-white hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all -translate-x-1/2 md:-translate-x-1/3"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-graphite/80 backdrop-blur-md border border-steel-700/50 flex items-center justify-center text-white hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all translate-x-1/2 md:translate-x-1/3"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide py-4 px-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {galleryItems.map((item) =>
              item.type === "video" ? (
                <VideoCard key={item.src} item={item} onClick={() => setSelectedItem(item)} />
              ) : (
                <ImageCard key={item.src} item={item} onClick={() => setSelectedItem(item)} />
              )
            )}
          </div>
        </div>

        {/* View Full Gallery Link */}
        <AnimatedSection delay={0.3} className="text-center mt-8">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-medium text-steel-400 hover:text-white transition-colors border border-steel-700/50 hover:border-neon-cyan/40 px-6 py-3 rounded-full"
          >
            View Full Gallery <ChevronRight className="w-4 h-4" />
          </a>
        </AnimatedSection>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </section>
  );
}
