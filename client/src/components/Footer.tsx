"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Star,
  Send,
} from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    company: ["About Us", "Our Story", "Careers", "Press", "Blog"],
    products: ["Categories", "New Arrivals", "Best Sellers", "Sale", "Gift Cards"],
    support: ["Help Center", "Contact Us", "Shipping Info", "Returns", "Size Guide"],
    legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Accessibility"],
  };

  const socialLinks = [Facebook, Twitter, Instagram, Linkedin, Youtube];

  return (
    <footer className="relative overflow-hidden bg-white text-black dark:bg-black dark:text-white border-t border-black/10 dark:border-white/10">
      
      {/* Minimal Grid Background */}
      <div className="absolute inset-0  bg-[size:18px_18px]" />

      <div className="relative z-10 container mx-auto px-6 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* BRAND */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xl border border-black/10 dark:border-white/20">
                S
              </div>
              <span className="text-2xl font-semibold">Shidah</span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Discover premium fashion with simplicity, elegance, and modern charm.
            </p>

            {/* CONTACT */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <MapPin className="h-5 w-5" /> Kerala, India
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Phone className="h-5 w-5" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Mail className="h-5 w-5" /> support@shidah.com
              </div>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex space-x-4">
              {socialLinks.map((Icon, index) => (
                <button
                  key={index}
                  className="p-3 rounded-lg border border-black/10 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-10">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-lg font-semibold mb-4 capitalize">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a className="text-gray-600 dark:text-gray-300 text-sm hover:text-black dark:hover:text-white transition flex items-center group">
                        {link}
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* NEWSLETTER */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Subscribe for exclusive updates.
            </p>

            <Input
              type="email"
              value={email}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-black border border-black/20 dark:border-white/20 text-black dark:text-white placeholder:text-gray-400"
            />

            <Button
              onClick={handleSubscribe}
              className="w-full py-5 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
            >
              {isSubscribed ? "Subscribed!" : "Subscribe"}
            </Button>

            <div className="pt-3">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-300">
                Rated 4.9/5 by customers
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 border-t border-black/10 dark:border-white/20 pt-6 flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            © 2024 Shidah — Made with
            <Heart className="h-4 w-4 text-red-500 fill-red-500" /> in Kerala
          </div>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};
 