import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { RealisticHammer } from "../ui/RealisticHammer";
import { GoldCoinAnimation } from "./GoldCoinAnimation";

interface VerificationAnimationProps {
  isMatch: boolean;
  onComplete: () => void;
}

export const VerificationAnimation: React.FC<VerificationAnimationProps> = ({
  isMatch,
  onComplete,
}) => {
  const hammerControls = useAnimationControls();
  const boxControls = useAnimationControls();
  const textControls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      // 1. Hammer appears and hovers
      await hammerControls.start({
        opacity: 1,
        y: -50,
        rotate: -15,
        transition: { duration: 0.5, ease: "easeOut" },
      });

      // 2. Hammer swings down to hit
      await hammerControls.start({
        y: 80,
        rotate: 45,
        transition: { duration: 0.3, ease: "easeIn" },
      });

      // 3. Impact effect
      boxControls.start({
        scale: [1, 1.1, 0.95, 1],
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.4 },
      });
      await hammerControls.start({
        y: 60,
        rotate: 35,
        transition: { duration: 0.1 },
      });

      if (isMatch) {
        // 4a. Success: Open box and show reward
        await boxControls.start({
          filter: "hue-rotate(60deg) saturate(2)",
          transition: { duration: 0.5 },
        });
        textControls.start({ opacity: 1, y: 0 });
      } else {
        // 4b. Failure: Hammer retracts and show message
        await hammerControls.start({
          y: -80,
          rotate: -20,
          transition: { duration: 0.5, ease: "easeOut" },
        });
        textControls.start({ opacity: 1, y: 0 });
      }

      // 5. Trigger cleanup and navigation
      setTimeout(onComplete, 4000);
    };

    sequence();
  }, [hammerControls, boxControls, textControls, isMatch, onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center">
      <div className="relative w-48 h-48">
        {/* The Hammer */}
        <motion.div
          className="absolute z-10"
          style={{ top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 }}
          animate={hammerControls}
        >
          <RealisticHammer />
        </motion.div>

        {/* The Box */}
        <motion.div
          className="absolute inset-0"
          animate={boxControls}
        ></motion.div>

        {isMatch && <GoldCoinAnimation />}
      </div>

      {/* Result Text */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={textControls}
      >
        {isMatch ? (
          <h2 className="text-3xl font-bold text-yellow-400">SUCCESS!</h2>
        ) : (
          <h2 className="text-3xl font-bold text-gray-500">
            Better luck next time!
          </h2>
        )}
      </motion.div>
    </div>
  );
};
