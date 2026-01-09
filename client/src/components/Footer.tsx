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
} from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    company: [
      { name: "About Us", href: "/aboutpage" },
      { name: "Our Story", href: "/comingSoon" },
      { name: "Careers", href: "/comingSoon" },
      { name: "Press", href: "/comingSoon" },
      { name: "Blog", href: "/comingSoon" },
    ],
    products: [
      { name: "Categories", href: "/categories" },
      { name: "New Arrivals", href: "/products?filter=new" },
      { name: "Best Sellers", href: "/products?filter=best" },
      { name: "Sale", href: "/products?filter=sale" },
      { name: "Gift Cards", href: "/gift-cards" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/comingSoon" },
      { name: "Size Guide", href: "/comingSoon" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/comingSoon" },
      { name: "Terms of Service", href: "/comingSoon" },
      { name: "Cookie Policy", href: "/comingSoon" },
      { name: "GDPR", href: "/comingSoon" },
      { name: "Accessibility", href: "/comingSoon" },
    ],
  };

  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com/shidah" },
    { Icon: Instagram, href: "https://instagram.com/shidah.in" },
    { Icon: Twitter, href: "https://twitter.com/shidah" },
    { Icon: Linkedin, href: "https://linkedin.com/company/shidah" },
    { Icon: Youtube, href: "https://youtube.com/@shidah" },
  ];

  return (
    <footer className="relative bg-white text-black dark:bg-black dark:text-white border-t border-black/10 dark:border-white/10">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
            {/* Brand & Contact Section */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8">
              {/* Brand Logo & Name */}
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-cyan-950 text-white dark:bg-cyan-950 dark:text-black flex items-center justify-center border border-black/10 dark:border-white/20">
                  <img
                    src="https://res.cloudinary.com/dwypehszo/image/upload/v1764398757/Group_1_qnswwg.jpg"
                    alt="Shidah Logo"
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl md:text-2xl font-semibold">Shidah</span>
              </div>

              {/* Tagline */}
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed max-w-md">
                Discover premium fashion with simplicity, elegance, and modern
                charm.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="truncate">Kerala, India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span>+91 8592980406</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="break-all">shidahh26@gmail.com</span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {socialLinks.map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 md:p-3 rounded-lg border border-black/10 dark:border-white/20
                      hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black 
                      transition-colors duration-200"
                    aria-label={`Visit our ${Icon.name} page`}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns - Responsive Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title} className="space-y-4">
                  <h3 className="text-base md:text-lg font-semibold capitalize">
                    {title}
                  </h3>
                  <ul className="space-y-2.5">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-600 dark:text-gray-300 text-sm md:text-base
                            hover:text-black dark:hover:text-white transition-colors duration-200 
                            flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight
                            className="h-3 w-3 ml-1 md:ml-2 opacity-0 
                              group-hover:opacity-100 group-hover:translate-x-1 
                              transition-all duration-200"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-3 space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h3 className="text-base md:text-lg font-semibold">
                  Stay Updated
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  Subscribe for exclusive updates, new arrivals, and special offers.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-3">
                    <Input
                      type="email"
                      value={email}
                      placeholder="Your email address"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-black border border-black/20 dark:border-white/20 
                        text-black dark:text-white placeholder:text-gray-400 
                        text-sm md:text-base h-11 md:h-12"
                    />
                    <Button
                      type="submit"
                      className="w-full h-11 md:h-12 bg-black text-white dark:bg-white dark:text-black 
                        hover:opacity-90 transition-opacity duration-200 text-sm md:text-base"
                    >
                      {isSubscribed ? "Subscribed!" : "Subscribe"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Ratings */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                  Rated 4.9/5 by customers
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-black/10 dark:border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <span>© 2026 Shidah</span>
                <span className="hidden sm:inline">—</span>
                <span className="flex items-center gap-1">
                  Made with
                  <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500 fill-red-500" />
                  in Kerala
                </span>
              </div>
              <span className="text-xs md:text-sm">All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};