import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { CATEGORIES } from "@/lib/data/products";

export function Footer() {
  return (
    <footer className="bg-graphite text-steel-300 border-t border-steel-700/50">
      {/* Main Footer */}
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/sft-logo.jpg"
                alt="Smart Filling Technologies"
                width={36}
                height={36}
                className="w-9 h-9 rounded-lg object-contain bg-white p-0.5"
              />
              <div className="leading-tight">
                <span className="font-heading font-bold text-sm text-white block tracking-tight">
                  Smart Filling
                </span>
                <span className="text-[10px] text-steel-400 font-medium tracking-wider uppercase">
                  Technologies
                </span>
              </div>
            </Link>
            <p className="text-sm text-steel-400 leading-relaxed max-w-xs">
              Precision filling &amp; packing machinery engineered in India.
              SS304 stainless steel construction with PLC + servo control systems.
            </p>
            <p className="text-xs text-steel-500 mt-4">
              Brand: <span className="text-accent font-semibold">Apex</span>
            </p>
          </div>

          {/* Machine Categories */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Machines
            </h3>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="text-sm text-steel-400 hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-steel-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-sm text-steel-400 hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/export" className="text-sm text-steel-400 hover:text-white transition-colors">
                  Export Markets
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-steel-400 hover:text-white transition-colors">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-steel-500 shrink-0" />
                {/* TODO: Replace with actual company address */}
                <span className="text-sm text-steel-400">India</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-steel-500 shrink-0" />
                {/* TODO: Replace with actual phone number */}
                <a href="tel:+919948945413" className="text-sm text-steel-400 hover:text-white transition-colors">
                  +91 99489 45413
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-steel-500 shrink-0" />
                {/* TODO: Replace with actual email */}
                <a href="mailto:hemanthbln0@gmail.com" className="text-sm text-steel-400 hover:text-white transition-colors">
                  hemanthbln0@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-steel-700/30">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-steel-500 text-center sm:text-left">
            © {new Date().getFullYear()} Smart Filling Technologies. All rights reserved.
          </p>
          <p className="text-xs text-steel-500 text-center sm:text-right">
            Pharma · Pesticides · Food · Chemical packaging
          </p>
        </div>
      </div>
    </footer>
  );
}
