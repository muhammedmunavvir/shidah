"use client"

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
  Send
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e:any) => {
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
      { name: "Blog", href: "#" }
    ],
    products: [
      { name: "Categories", href: "#" },
      { name: "New Arrivals", href: "#" },
      { name: "Best Sellers", href: "#" },
      { name: "Sale", href: "#" },
      { name: "Gift Cards", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Size Guide", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
      { name: "Accessibility", href: "#" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="font-bold text-2xl text-white">Shidah</span>
              </div>
              
              <p className="text-gray-300 leading-relaxed max-w-md">
                Discover premium products with exceptional quality and style. 
                We're committed to bringing you the best shopping experience with 
                curated collections and outstanding customer service.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                  <MapPin className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">123 Fashion Street, Style City, SC 12345</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                  <Phone className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                  <Mail className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">hello@shidah.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`p-3 bg-white/10 backdrop-blur-sm rounded-lg ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/20`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">Products</h3>
                <ul className="space-y-2">
                  {footerLinks.products.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">Support</h3>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">Legal</h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">Stay Updated</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Subscribe to our newsletter for exclusive offers and new arrivals.
                </p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 transition-colors"
                  />
                </div>
                <Button
                  onClick={handleSubscribe}
                  className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 transform hover:scale-105 ${
                    isSubscribed ? 'bg-green-500 hover:bg-green-600' : ''
                  }`}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>Subscribed!</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Subscribe</span>
                    </div>
                  )}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4">
                <p className="text-xs text-gray-400 mb-3">Trusted by 50,000+ customers</p>
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs text-gray-300 ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span>© 2024 Shidah. Made with</span>
                <Heart className="h-4 w-4 text-red-400 fill-current animate-pulse" />
                <span>in Kerala, India</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <span>All rights reserved</span>
                <div className="flex space-x-4">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='4' fill='%23003087'/%3E%3Cpath d='M15.5 7.5h-3l-1.5 10h2l.3-2h2.4l.3 2h2l-1.5-10zm-1.5 6l.5-3.5.5 3.5h-1zm8.5-6h-2.5l-1 10h2l.2-2h1.8c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm-.5 5.5h-1l.5-3.5h1v3.5z' fill='white'/%3E%3C/svg%3E" alt="Visa" className="h-6" />
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='4' fill='%23EB001B'/%3E%3Crect x='20' width='20' height='25' rx='4' fill='%23FF5F00'/%3E%3Cpath d='M25 12.5c0-2.5-1-4.8-2.5-6.5-1.5 1.7-2.5 4-2.5 6.5s1 4.8 2.5 6.5c1.5-1.7 2.5-4 2.5-6.5z' fill='%23FF5F00'/%3E%3C/svg%3E" alt="Mastercard" className="h-6" />
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect width='40' height='25' rx='4' fill='%23003087'/%3E%3Cpath d='M8 10h24v5H8v-5z' fill='%23009cde'/%3E%3Ctext x='20' y='18' text-anchor='middle' fill='white' font-family='Arial' font-size='6' font-weight='bold'%3EPayPal%3C/text%3E%3C/svg%3E" alt="PayPal" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
