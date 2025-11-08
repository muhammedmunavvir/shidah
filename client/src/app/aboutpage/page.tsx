"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Users, Target, Rocket, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 dark:text-gray-100">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-6"
          >
            About <span className="text-gray-900 dark:text-white">Shidah</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
          >
            We’re building the future of online shopping — fast, secure, and
            personalized. Our mission is to make digital commerce feel effortless
            and human.
          </motion.p>
        </section>

        {/* Mission Section */}
        <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
              <Target className="h-7 w-7 text-blue-500 dark:text-blue-400" /> Our
              Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
              We strive to redefine how people connect with products online. From
              curated experiences to next-gen logistics, Shidah stands for trust,
              innovation, and simplicity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/about-mission.jpg"
              alt="Our Mission"
              className="rounded-2xl shadow-lg w-full object-cover border border-gray-200 dark:border-gray-700"
            />
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-12">
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Rocket className="h-8 w-8 text-blue-500 mb-4" />,
                title: "Innovation",
                desc: "We constantly explore new technologies to elevate user experience.",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-500 mb-4" />,
                title: "Community",
                desc: "We value connection — between people, brands, and possibilities.",
              },
              {
                icon: <Star className="h-8 w-8 text-blue-500 mb-4" />,
                title: "Excellence",
                desc: "We take pride in quality, precision, and user satisfaction.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:border-blue-500 transition-colors"
              >
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 text-center mb-12">
            Meet Our Team
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
            {[
              {
                name: "Muhammed Munavvir",
                role: "Founder & Full-Stack Developer",
                img: "/team-1.jpg",
              },
              {
                name: "Aisha Rahman",
                role: "UI/UX Designer",
                img: "/team-2.jpg",
              },
              {
                name: "Rahul Nair",
                role: "Backend Engineer",
                img: "/team-3.jpg",
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:border-blue-500 transition-colors"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-blue-500"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Shidah. All rights reserved.
        </footer>
      </div>
    </>
  );
}
