"use client";

import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Blue Blob */}
      <motion.div
        initial={{ x: -100, y: -100 }}
        animate={{ x: [ -100, 100, -100 ], y: [ -100, 50, -100 ] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl"
      />

      {/* Green Blob */}
      <motion.div
        initial={{ x: 200, y: 200 }}
        animate={{ x: [ 200, -150, 200 ], y: [ 200, -50, 200 ] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-green-400/30 rounded-full blur-3xl"
      />
    </div>
  );
}
