"use client";
import { useState, useEffect } from "react";
import "aos/dist/aos.css";
import Link from "next/link";

export default function MobileHero() {
  const slides = [
    {
      type: "image",
      src: "https://res.cloudinary.com/dwypehszo/image/upload/v1764336123/6fdb79c4566bc82ed9d31cf0a09f351b_mkiztl.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dwypehszo/image/upload/v1764336123/2854c5c5ba8afd211accd6b822f70e8c_vnnmcr.jpg",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/dwypehszo/video/upload/v1764347956/From_KlickPin_CF_Libasekhas_UK_on_Instagram_Ramzan_Pret_Collection25Shop_Now_wwwlibasekhascouk_Tap_the_link_in_our_bio_We_Ship_Internationally_For_Inquiries_DM_us_anyti_Video_Video_nel_2025_xoa5wo.mp4",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/1200x/4d/60/42/4d604214a5267a52af57ef24e8249e14.jpg",
    },
  ];

  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (slides[index].type === "video") return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const handleTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    if (distance > 50) setIndex((prev) => (prev + 1) % slides.length);
    if (distance < -50)
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full bg-white text-black dark:bg-black dark:text-white">
      {/* MOBILE VERSION */}
      <div
        className="md:hidden relative w-full h-[80vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides[index].type === "image" ? (
          <img
            src={slides[index].src}
            className="w-full h-full object-cover"
            data-aos="fade-left"
          />
        ) : (
          <video
            src={slides[index].src}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={() => setIndex((prev) => (prev + 1) % slides.length)}
          />
        )}

        <div
          className="absolute inset-x-0 bottom-0 px-6 pb-8 z-10 "
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="text-xs uppercase tracking-wide">
              New Collection
            </span>
          </div>

          <h1 className="text-6xl leading-[0.9] font-serif font-light">
            Elegant <br />
            <span className="italic text-amber-400">Pastels</span>
          </h1>

          <p className="text-black/80 dark:text-white/80 text-sm mt-3">
            New arrivals crafted with softness & grace.
          </p>

          <button className="mt-4 w-full bg-black text-white dark:bg-white dark:text-black px-8 py-4  uppercase text-sm">
            Shop Now
          </button>
        </div>
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden md:grid grid-cols-2 h-screen">
        {/* LEFT TEXT */}
        <div
          className="flex flex-col justify-center px-20"
          data-aos="fade-right"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-black/10 dark:bg-white/10 rounded-full w-36">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
            <span className="text-xs uppercase tracking-wide">
              New Collection
            </span>
          </div>

          <h1 className="text-7xl font-serif leading-[0.9]">
            Elegant <br />
            <span className="italic text-amber-300">Pastels</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg mt-4 max-w-md">
            New arrivals crafted with softness & grace for the modern soul.
          </p>

          <Link href="allproducts" className="mt-6 w-fit px-10 py-4 bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white uppercase text-sm transition-colors duration-200">
            shope now
          </Link>
        </div>

        {/* RIGHT IMAGE/VIDEO */}
        <div
          className="flex items-center justify-end pr-10"
          data-aos="fade-left"
        >
          <div className="w-[70%] h-[500px] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/10 dark:bg-black">
            {slides[index].type === "image" ? (
              <img
                src={slides[index].src}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
            ) : (
              <video
                src={slides[index].src}
                className="max-w-full max-h-full object-contain rounded-2xl"
                autoPlay
                muted
                playsInline
                onEnded={() => setIndex((prev) => (prev + 1) % slides.length)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
