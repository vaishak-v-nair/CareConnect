"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center overflow-hidden">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mt-20"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            AI-Powered Healthcare Intake
          </span>
          <br />
          for NGOs
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Collect patient requests. Automatically triage urgency using AI.
          Manage volunteers in one intelligent dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/support"
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition font-medium"
            >
              Request Support
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/volunteer"
              className="px-8 py-4 bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-700 transition font-medium"
            >
              Become a Volunteer
            </Link>
          </motion.div>
        </div>

        <Link
          href="/admin"
          className="block mt-8 text-gray-500 hover:text-gray-800 transition"
        >
          Admin Dashboard →
        </Link>
      </motion.div>

      {/* Features Section */}
      <section className="mt-28 grid md:grid-cols-3 gap-8 max-w-6xl">

        {[
          {
            title: "Smart Intake",
            color: "text-blue-600",
            text: "Collect structured patient information with built-in validation and urgency tagging.",
          },
          {
            title: "AI Auto-Triage",
            color: "text-green-600",
            text: "Automatically summarize cases and categorize urgency using AI.",
          },
          {
            title: "Volunteer Management",
            color: "text-gray-800",
            text: "Register and manage volunteers efficiently through a centralized dashboard.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h3 className={`font-semibold text-lg mb-3 ${item.color}`}>
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
