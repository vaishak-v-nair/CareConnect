"use client";

import { motion } from "framer-motion";

export default function SuccessAnimation({
  message,
}: {
  message: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center mt-6"
    >
      <motion.svg
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
        width="80"
        height="80"
        viewBox="0 0 52 52"
        className="mb-4"
      >
        <circle
          cx="26"
          cy="26"
          r="25"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
        />
        <motion.path
          fill="none"
          stroke="#22c55e"
          strokeWidth="4"
          d="M14 27l7 7 16-16"
          strokeLinecap="round"
        />
      </motion.svg>

      <p className="text-green-600 dark:text-green-400 font-semibold">
        {message}
      </p>
    </motion.div>
  );
}
