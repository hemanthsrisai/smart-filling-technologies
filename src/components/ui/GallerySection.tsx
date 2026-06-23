"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

/* ─── Gallery Data ─── */
interface GalleryItem {
  type: "image" | "video";
  src: string;
  thumb?: string;
  title: string;
  span?: string; // tailwind col/row span class
}

const galleryItems: GalleryItem[] = [
  // Images
  { type: "image", src: "/gallery/gallery-image-1.jpg", title: "Multi-Head Pouch Packing Machine", span: "md:col-span-2 md:row-span-2" },
  { type: "image", src: "/gallery/gallery-image-2.jpg", title: "Single-Head Packing Unit" },
  { type: "image", src: "/gallery/gallery-image-3.jpg", title: "Production Floor – Machines Ready for Dispatch" },
  { type: "image", src: "/gallery/gallery-image-4.jpg", title: "Liquid Filling System" },
  // Videos
  { type: "video", src: "/gallery/gallery-video-1.mp4", title: "Pouch Filling Line in Action" },
  { type: "video", src: "/gallery/gallery-video-2.mp4", title: "High-Speed Packaging Demo", span: "md:col-span-2" },
  { type: "video", src: "/gallery/gallery-video-3.mp4", title: "Auger Filling Operation" },
  { type: "video", src: "/gallery/gallery-video-4.mp4", title: "Liquid Filling Process" },
  { type: "video", src: "/gallery/gallery-video-5.mp4", title: "Sealing Machine Demo" },
  { type: "video", src: "/gallery/gallery-video-6.mp4", title: "Complete Production Run", span: "md:col-span-2" },
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

/* ─── Video Card ─── */
function VideoCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-graphite-light border border-steel-700/30 hover:border-neon-cyan/40 transition-colors duration-300 ${item.span || ""}`}
      onMouseEnter={() => {
        setIsHovered(true);
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        videoRef.current?.pause();
      }}
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
        {/* Play overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 0 : 1 }}
          className="absolute inset-0 bg-graphite/60 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </motion.div>
      </div>
      {/* Title bar */}
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
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-graphite-light border border-steel-700/30 hover:border-neon-violet/40 transition-colors duration-300 ${item.span || ""}`}
      onClick={onClick}
    >
      <div className={`relative w-full overflow-hidden ${item.span?.includes("row-span-2") ? "aspect-square" : "aspect-video"}`}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Hover gradient overlay */}
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
          <video
            src={item.src}
            controls
            autoPlay
            className="w-full h-full max-h-[85vh] object-contain bg-black rounded-2xl"
          />
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

/* ─── Main Gallery Section ─── */
export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

  const filtered = filter === "all" ? galleryItems : galleryItems.filter((i) => i.type === filter);

  const filters = [
    { key: "all" as const, label: "All" },
    { key: "image" as const, label: "Photos" },
    { key: "video" as const, label: "Videos" },
  ];

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
            Real machines, real production lines. Browse our latest builds and watch them in action
            on the factory floor.
          </p>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.2} className="flex justify-center gap-2 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border min-h-[44px] ${
                filter === f.key
                  ? "bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 border-neon-cyan/40 text-white shadow-[0_0_20px_rgba(0,243,255,0.1)]"
                  : "bg-graphite-light border-steel-700/50 text-steel-400 hover:text-white hover:border-steel-500"
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </AnimatedSection>

        {/* Masonry Grid */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
      {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </section>
  );
}
