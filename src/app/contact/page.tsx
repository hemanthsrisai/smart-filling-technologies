"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getProductNames } from "@/lib/data/products";
import { Send, CheckCircle, Phone, Mail, MapPin, Loader2, Clock } from "lucide-react";
import { AnimatedGear } from "@/components/ui/AnimatedMachinery";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(2, "Country is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  machine: z.string().min(1, "Please select a machine"),
  quantity: z.string().optional(),
  message: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const productNames = getProductNames();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      const phoneNumber = "+919948945413";
      const text = `Hello Smart Filling Technologies, I would like to request a quote.
Name: ${data.name}
Company: ${data.company}
Country: ${data.country}
Email: ${data.email}
Phone: ${data.phone}
Machine: ${data.machine}
Quantity: ${data.quantity || '1'}
Message: ${data.message || 'None'}`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedText}`;
      
      window.open(whatsappUrl, "_blank");
      setIsSubmitted(true);
      reset();
    } catch (error) { 
      console.error("Submit error:", error); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const inputClasses = "w-full min-h-[44px] px-4 py-3 border border-steel-600 rounded-lg text-sm text-white bg-graphite-light placeholder:text-steel-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/20 transition-colors";
  const errorInputClasses = "w-full min-h-[44px] px-4 py-3 border border-red-500 rounded-lg text-sm text-white bg-graphite-light placeholder:text-steel-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-colors";
  const labelClasses = "block text-sm font-medium text-steel-300 mb-1.5";
  const errorClasses = "text-xs text-red-400 mt-1";

  return (
    <>
      <section className="bg-graphite py-12 md:py-16 relative overflow-hidden">
        <AnimatedGear size={180} direction="counter-clockwise" speed={30} className="absolute -left-14 -top-14 text-neon-blue/15" />
        <div className="section-container text-center relative z-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neon-cyan">Get in Touch</p>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Request a Quote</h1>
          <p className="text-steel-400 max-w-xl mx-auto">Tell us about your requirements — our team will prepare a detailed quote within 24 hours.</p>
        </div>
      </section>

      <section className="bg-graphite-light py-10 md:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="bg-graphite border border-steel-700/50 rounded-2xl p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }} className="w-16 h-16 bg-green-900/30 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        </motion.div>
                        <h3 className="font-heading font-bold text-xl text-white mb-2">Quote Request Received</h3>
                        <p className="text-steel-400 max-w-sm mx-auto mb-6">We will review your requirements and send a detailed quote within 24 hours.</p>
                        <button onClick={() => setIsSubmitted(false)} className="text-neon-blue font-semibold text-sm hover:underline min-h-[44px]">Submit Another Request</button>
                      </motion.div>
                    ) : (
                      <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="name" className={labelClasses}>Name *</label>
                            <input id="name" type="text" autoComplete="name" placeholder="Your full name" className={errors.name ? errorInputClasses : inputClasses} {...register("name")} />
                            {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="company" className={labelClasses}>Company Name *</label>
                            <input id="company" type="text" autoComplete="organization" placeholder="Your company" className={errors.company ? errorInputClasses : inputClasses} {...register("company")} />
                            {errors.company && <p className={errorClasses}>{errors.company.message}</p>}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="country" className={labelClasses}>Country *</label>
                          <input id="country" type="text" autoComplete="country-name" placeholder="Your country" className={errors.country ? errorInputClasses : inputClasses} {...register("country")} />
                          {errors.country && <p className={errorClasses}>{errors.country.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="email" className={labelClasses}>Email *</label>
                            <input id="email" type="email" autoComplete="email" placeholder="your@email.com" className={errors.email ? errorInputClasses : inputClasses} {...register("email")} />
                            {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="phone" className={labelClasses}>Phone *</label>
                            <input id="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" className={errors.phone ? errorInputClasses : inputClasses} {...register("phone")} />
                            {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="machine" className={labelClasses}>Machine of Interest *</label>
                            <select id="machine" className={errors.machine ? errorInputClasses : inputClasses} {...register("machine")} defaultValue="">
                              <option value="" disabled>Select a machine</option>
                              {productNames.map((name) => (<option key={name} value={name}>{name}</option>))}
                            </select>
                            {errors.machine && <p className={errorClasses}>{errors.machine.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="quantity" className={labelClasses}>Quantity</label>
                            <input id="quantity" type="number" min="1" placeholder="1" className={inputClasses} {...register("quantity")} />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="message" className={labelClasses}>Message</label>
                          <textarea id="message" rows={4} placeholder="Tell us about your production requirements, bottle sizes, fill volumes, or any specific needs..." className={`${inputClasses} min-h-[100px] resize-y`} {...register("message")} />
                        </div>
                        <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-[image:var(--gradient-iri)] text-graphite disabled:bg-steel-700 disabled:text-steel-500 font-semibold py-4 rounded-lg transition-colors min-h-[52px] flex items-center justify-center gap-2">
                          {isSubmitting ? (<><Loader2 className="w-4 h-4 animate-spin" />Submitting...</>) : (<><Send className="w-4 h-4" />Request a Quote</>)}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-1">
              <AnimatedSection delay={0.2}>
                <div className="bg-graphite border border-steel-700/50 rounded-2xl p-6 sticky top-24">
                  <h3 className="font-heading font-bold text-white mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-neon-blue/10 flex items-center justify-center shrink-0"><Phone className="w-4 h-4 text-neon-blue" /></div>
                      <div>
                        <p className="text-xs text-steel-500 uppercase tracking-wider mb-0.5">Phone</p>
                        <a href="tel:+919948945413" className="text-sm text-steel-200 font-medium hover:text-neon-blue transition-colors">+91 99489 45413</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-neon-blue/10 flex items-center justify-center shrink-0"><Mail className="w-4 h-4 text-neon-blue" /></div>
                      <div>
                        <p className="text-xs text-steel-500 uppercase tracking-wider mb-0.5">Email</p>
                        <a href="mailto:hemanthbln0@gmail.com" className="text-sm text-steel-200 font-medium hover:text-neon-blue transition-colors">hemanthbln0@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-neon-blue/10 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 text-neon-blue" /></div>
                      <div>
                        <p className="text-xs text-steel-500 uppercase tracking-wider mb-0.5">Location</p>
                        <p className="text-sm text-steel-200 font-medium">India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-neon-blue/10 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-neon-blue" /></div>
                      <div>
                        <p className="text-xs text-steel-500 uppercase tracking-wider mb-0.5">Business Hours</p>
                        <p className="text-sm text-steel-200 font-medium">Mon–Sat, 9:00 AM – 6:00 PM IST</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-steel-700/30">
                    <p className="text-xs text-steel-500 leading-relaxed">Response within 24 hours. For urgent inquiries, call us directly during business hours.</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
