"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { galleryItems, GalleryItem } from "@/components/ui/GallerySection";
import { CustomVideoPlayer } from "@/components/ui/CustomVideoPlayer";

/* ─── Video Card ─── */
function VideoCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-graphite border border-steel-700/50 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] transition-all duration-500 h-[220px] sm:h-[260px] md:h-[300px]"
      onMouseEnter={() => { setHovering(true); videoRef.current?.play(); }}
      onMouseLeave={() => { setHovering(false); videoRef.current?.pause(); }}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
      
      <motion.div
        initial={false}
        animate={{ scale: hovering ? 1.1 : 1, opacity: hovering ? 0 : 1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-2">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-[10px] font-bold tracking-wider text-white uppercase">Video</span>
        </div>
        <p className="text-sm md:text-base font-semibold text-white drop-shadow-md truncate">{item.title}</p>
      </div>
    </motion.div>
  );
}

/* ─── Image Card ─── */
function ImageCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-graphite border border-steel-700/50 hover:border-neon-violet/50 hover:shadow-[0_0_30px_rgba(167,139,250,0.15)] transition-all duration-500 h-[220px] sm:h-[260px] md:h-[300px]"
      onClick={onClick}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="w-2 h-2 rounded-full bg-neon-violet" />
          <span className="text-[10px] font-bold tracking-wider text-white uppercase">Photo</span>
        </div>
        <p className="text-sm md:text-base font-semibold text-white drop-shadow-md truncate">{item.title}</p>
      </div>
    </motion.div>
  );
}

/* ─── Lightbox ─── */
function Lightbox({ 
  item, 
  onClose,
  onNext,
  onPrev
}: { 
  item: GalleryItem; 
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onClose]);

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

      {/* Prev Button */}
      {onPrev && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.button>
      )}

      {/* Next Button */}
      {onNext && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </motion.button>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <CustomVideoPlayer key={item.src} src={item.src} />
        ) : (
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] max-h-[85vh]">
            <Image key={item.src} src={item.src} alt={item.title} fill className="object-contain bg-black rounded-2xl" sizes="90vw" />
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

  // Handle browser back button to close lightbox
  useEffect(() => {
    if (selectedItem) {
      window.history.pushState({ lightbox: true }, "");
      const handlePopState = () => setSelectedItem(null);
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [selectedItem]);

  const closeLightbox = () => {
    setSelectedItem(null);
    if (window.history.state?.lightbox) {
      window.history.back();
    }
  };

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
        {selectedItem && (
          <Lightbox 
            item={selectedItem} 
            onClose={closeLightbox} 
            onNext={() => {
              const idx = galleryItems.indexOf(selectedItem);
              setSelectedItem(galleryItems[(idx + 1) % galleryItems.length]);
            }}
            onPrev={() => {
              const idx = galleryItems.indexOf(selectedItem);
              setSelectedItem(galleryItems[(idx - 1 + galleryItems.length) % galleryItems.length]);
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
