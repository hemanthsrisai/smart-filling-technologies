"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/gallery", label: "Gallery" },
  { href: "/export", label: "Export" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-graphite/95 backdrop-blur-md shadow-lg border-b border-steel-700/50"
            : "bg-graphite/70 backdrop-blur-sm"
        )}
      >
        <div className="section-container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 min-h-[44px] min-w-[44px]">
            <Image
              src="/images/sft-logo.jpg"
              alt="Smart Filling Technologies"
              width={64}
              height={64}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-contain bg-white p-1 shadow-glow"
              priority
            />
            <div className="leading-tight hidden sm:block">
              <span className="font-heading font-bold text-lg md:text-xl text-white block tracking-tight">
                Smart Filling
              </span>
              <span className="text-xs md:text-sm text-purple-300 font-medium tracking-wider uppercase">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-steel-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="text-iri bg-clip-text text-transparent bg-[image:var(--gradient-iri)] font-semibold text-sm px-4 py-2.5 md:px-6 md:py-3 rounded-full border border-neon-blue/30 hover:border-neon-blue/60 transition-all min-h-[44px] flex items-center"
              >
                Get a Quote
              </Link>
            </motion.div>

            {/* Hamburger - mobile only */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-steel-300 hover:text-white"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-graphite/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-graphite z-50 lg:hidden flex flex-col shadow-2xl border-l border-steel-700/50"
            >
              <div className="flex items-center justify-between p-4 border-b border-steel-700/50">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/sft-logo.jpg"
                    alt="SFT"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-lg object-contain bg-white p-0.5"
                  />
                  <span className="font-heading font-bold text-white">Menu</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-steel-400" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-6 py-4 text-lg font-medium text-steel-300 hover:text-white hover:bg-white/5 transition-colors min-h-[52px]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-steel-700/50">
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-lg transition-colors text-lg min-h-[52px]"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to offset fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
