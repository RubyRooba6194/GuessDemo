import React from "react";
import { motion } from "framer-motion";
import Coin from "../../assets/Coin.svg?react";

const coinVariants = {
  hidden: { opacity: 0, scale: 0, y: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: [0.5, 1.2, 1],
    y: [0, -150, 600], // Emerge up then fall down
    x: Math.random() * 300 - 150,
    rotate: Math.random() * 720 - 360,
    transition: {
      delay: i * 0.02,
      duration: 1.5 + Math.random(),
      ease: "circOut",
    },
  }),
};

export const GoldCoinAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-400"
          variants={coinVariants}
          initial="hidden"
          animate="visible"
          custom={i}
          style={{ width: 20 + Math.random() * 25 }}
        >
          <Coin />
        </motion.div>
      ))}
    </div>
  );
};
