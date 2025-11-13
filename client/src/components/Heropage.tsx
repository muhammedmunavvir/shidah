"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Star, ShoppingBag, Heart, Zap } from "lucide-react";

export default function Heropage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="
        relative min-h-screen overflow-hidden
        bg-white text-gray-900
        dark:bg-gradient-to-br dark:from-black dark:via-[#0a0014] dark:to-purple-950 dark:text-white
      "
    >
      {/* Background grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#e5e7eb40_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb40_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)]
          bg-[size:14px_24px]
          [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]
        "
      />

      {/* Floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-indigo-300 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-violet-300 dark:bg-violet-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">

        {/* Badge */}
        <Badge
          variant="secondary"
          className="
            mb-8 px-4 py-2 text-sm font-medium
            bg-purple-100 text-purple-700 border-purple-300
            dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-400/30
            backdrop-blur-sm transition-colors
          "
        >
          <Sparkles className="w-4 h-4 mr-2 text-yellow-500 dark:text-yellow-400" />
          New Spring Collection 2026
        </Badge>

        {/* Heading */}
        <h1 className="text-6xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-none">
          <span className="
            block mb-2 
            bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 
            bg-clip-text text-transparent
          ">
            Welcome to
          </span>

          <span className="
            block 
            bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-500 
            dark:from-purple-400 dark:via-violet-500 dark:to-indigo-400
            bg-clip-text text-transparent animate-pulse
          ">
            shidah.in
          </span>
        </h1>

        {/* Subtitle */}
        <p className="
          text-xl md:text-2xl lg:text-3xl max-w-4xl mb-12 
          text-gray-600 dark:text-gray-300 
          font-light leading-relaxed
        ">
          Discover <span className="font-semibold text-gray-900 dark:text-white">unique, modern fashion</span> that empowers you to{" "}
          <span className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            stand out
          </span>{" "}
          and express yourself with confidence.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          {/* Primary */}
          <Button
            size="lg"
            className="
              font-bold px-8 py-6 text-lg shadow-xl transition-all duration-300 transform hover:scale-105 group
              bg-purple-600 hover:bg-purple-700 text-white
              dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-600 
              dark:hover:from-purple-700 dark:hover:to-indigo-700
            "
          >
            <ShoppingBag className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Shop Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Outline */}
          <Button
            variant="outline"
            size="lg"
            className="
              font-semibold px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm
              border-gray-400 text-gray-900 hover:bg-gray-100
              dark:border-purple-400/40 dark:bg-purple-900/20 dark:text-white dark:hover:bg-purple-900/40
            "
          >
            <Heart className="w-5 h-5 mr-2" />
            View Collection
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-16">

          {/* Card 1 */}
          <Card
            className="
              bg-white border-gray-200 text-gray-900 shadow-sm 
              dark:bg-purple-900/20 dark:border-purple-400/30 dark:text-white
              backdrop-blur-sm hover:scale-105 transition
            "
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">1000+</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Happy Customers</p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card
            className="
              bg-white border-gray-200 text-gray-900 shadow-sm 
              dark:bg-purple-900/20 dark:border-purple-400/30 dark:text-white
              backdrop-blur-sm hover:scale-105 transition
            "
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Unique Designs</p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card
            className="
              bg-white border-gray-200 text-gray-900 shadow-sm 
              dark:bg-purple-900/20 dark:border-purple-400/30 dark:text-white
              backdrop-blur-sm hover:scale-105 transition
            "
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">24/7</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Support</p>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
      <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-8">
  <div className="flex -space-x-2">
    {[...Array(5)].map((_, i) => (
      <img
        key={i}
        src={`https://i.pravatar.cc/40?img=${i + 1}`} // random customer images
        className="
          w-8 h-8 rounded-full border-2 
          border-white dark:border-black-500/30
          object-cover
        "
      />
    ))}
  </div>
  <span>Trusted by thousands of fashion lovers</span>
</div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-purple-400/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-500 dark:bg-purple-300 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Star className="w-2 h-2 text-purple-300 opacity-20" />
          </div>
        ))}
      </div>
    </section>
  );
}
