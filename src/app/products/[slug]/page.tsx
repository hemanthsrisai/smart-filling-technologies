import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { Datasheet } from "@/components/product/Datasheet";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { ArrowLeft, Download, MessageSquare, CheckCircle } from "lucide-react";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ${product.brand || "Smart Filling Technologies"}`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Smart Filling Technologies`,
      description: product.shortDescription,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const relatedProducts = getRelatedProducts(slug, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-graphite-light border-b border-steel-700/50">
        <div className="section-container py-3">
          <Link href="/products" className="inline-flex items-center text-sm text-steel-400 hover:text-neon-blue transition-colors min-h-[44px]">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to All Machines
          </Link>
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-graphite">
        <div className="section-container py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-steel-700/50 bg-graphite-light">
              <ProductImage product={product} />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-wider text-steel-400 font-medium bg-steel-800 px-2.5 py-1 rounded">{product.categoryLabel}</span>
                {product.brand && (
                  <span className="text-xs uppercase tracking-wider text-neon-violet font-semibold bg-neon-violet/10 px-2.5 py-1 rounded">{product.brand}</span>
                )}
              </div>
              <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-3 leading-tight">{product.name}</h1>
              <p className="text-steel-400 text-base leading-relaxed mb-6">{product.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[image:var(--gradient-iri)] text-graphite font-semibold px-6 py-3 rounded-lg transition-transform hover:scale-[1.02] min-h-[48px]">
                  <MessageSquare className="w-4 h-4" />
                  Request Quote
                </Link>
                <button className="inline-flex items-center justify-center gap-2 border-2 border-steel-600 text-white hover:border-neon-blue hover:text-neon-blue font-semibold px-6 py-3 rounded-lg transition-colors min-h-[48px]" title="PDF spec sheet will be available soon">
                  <Download className="w-4 h-4" />
                  Download Spec Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-graphite-light py-10 md:py-14">
        <div className="section-container">
          <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-6">Technical Specifications</h2>
          <div className="max-w-2xl"><Datasheet specs={product.specs} /></div>
        </div>
      </section>

      {/* Usage */}
      <section className="bg-graphite py-10 md:py-14">
        <div className="section-container">
          <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-4">Usage &amp; Applications</h2>
          <p className="text-steel-400 leading-relaxed max-w-2xl">{product.usageAndApplications}</p>
        </div>
      </section>

      {/* Suitable For Packing */}
      {product.suitableForPacking && product.suitableForPacking.length > 0 && (
        <section className="bg-graphite-light py-10 md:py-14">
          <div className="section-container">
            <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-6">Suitable for Packing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
              {product.suitableForPacking.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-graphite border border-steel-700/50 rounded-lg px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-neon-blue shrink-0" />
                  <span className="text-sm text-steel-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <section className="bg-graphite py-10 md:py-14">
          <div className="section-container">
            <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-6">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-neon-violet mt-0.5 shrink-0" />
                  <span className="text-sm text-steel-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
