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
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Story", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" },
    ],
    products: [
      { name: "Categories", href: "#" },
      { name: "New Arrivals", href: "#" },
      { name: "Best Sellers", href: "#" },
      { name: "Sale", href: "#" },
      { name: "Gift Cards", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Size Guide", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
      { name: "Accessibility", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
  ];

  return (
    <footer
      className="
      relative overflow-hidden
      bg-gray-100 text-gray-800
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 
      dark:text-white
      "
    >
      {/* Light Mode Background Shape */}
      <div className="absolute inset-0 bg-white/70 dark:bg-transparent" />

      {/* Dark Mode Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* BRAND */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="
                  h-12 w-12 rounded-xl flex items-center justify-center 
                  bg-gradient-to-r from-purple-500 to-pink-500 
                  transform hover:scale-110 transition
                ">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="font-bold text-2xl dark:text-white text-gray-900">
                  Shidah
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 max-w-md">
                Discover premium products with exceptional quality and style.
                We bring you curated fashion with an outstanding shopping experience.
              </p>

              {/* Contact */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 group">
                  <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition" />
                  <span className="text-sm">123 Fashion Street, Kerala, India</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 group">
                  <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 group">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition" />
                  <span className="text-sm">support@shidah.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="
                      p-3 rounded-lg 
                      bg-gray-200/60 hover:bg-gray-300 
                      dark:bg-white/10 dark:hover:bg-white/20
                      backdrop-blur-sm 
                      transition transform hover:scale-110
                    "
                  >
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white capitalize">
                    {title}
                  </h3>
                  <ul className="space-y-2">
                    {links.map((l) => (
                      <li key={l.name}>
                        <a
                          href={l.href}
                          className="
                            text-gray-600 dark:text-gray-300 text-sm 
                            hover:text-purple-600 dark:hover:text-white 
                            transition flex items-center group
                          "
                        >
                          {l.name}
                          <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Subscribe for exclusive offers & updates.
              </p>

              <Input
                type="email"
                placeholder="Enter your email"
                className="
                  bg-white border-gray-300 text-gray-900
                  dark:bg-white/10 dark:text-white dark:border-white/20
                  placeholder:text-gray-400
                  focus:border-purple-500
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                onClick={handleSubscribe}
                className="
                  w-full py-6 
                  bg-purple-600 hover:bg-purple-700 text-white
                  dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600
                  dark:hover:from-purple-700 dark:hover:to-pink-700
                  transition transform hover:scale-105
                "
              >
                {isSubscribed ? (
                  <span className="flex items-center space-x-2">
                    <Star className="h-4 w-4" /> <span>Subscribed!</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Send className="h-4 w-4" /> <span>Subscribe</span>
                  </span>
                )}
              </Button>

              {/* Ratings */}
              <div className="pt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Trusted by 50,000+ customers
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="text-xs text-gray-600 dark:text-gray-300 ml-2">
                    4.9/5 rating
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="
            mt-16 border-t 
            border-gray-300 dark:border-white/10
            bg-gray-200/60 dark:bg-black/20 
            backdrop-blur-sm
          ">
            <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                © 2024 Shidah • Made with
                <Heart className="h-4 w-4 text-red-500 fill-red-500 mx-1 animate-pulse" />
                in Kerala, India
              </div>

              <div className="flex items-center space-x-6 text-gray-700 dark:text-gray-300">
                <span>All rights reserved</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
