// import { useLocation, useNavigate } from "react-router-dom";
// import { RewardScreen } from "../components/animations/RewardScreen";
// import { FailureScreen } from "../components/animations/FailureScreen";

// const ResultsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Data passed via router state from GuessPage
//   const { success, actualHash, realBlockHash } = location.state || {
//     success: false,
//     actualHash: "",
//     realBlockHash: "",
//   };

//   // This function is called by the animation screens when they finish
//   const handleComplete = () => {
//     localStorage.clear(); // Clear all localStorage data
//     navigate("/"); // Redirect back to the home page
//   };

//   if (success) {
//     return (
//       <RewardScreen onComplete={handleComplete} realBlockHash={realBlockHash} />
//     );
//   }

//   return (
//     <FailureScreen
//       onComplete={handleComplete}
//       actualHash={actualHash}
//       realBlockHash={realBlockHash}
//     />
//   );
// };

// export default ResultsPage;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { RealisticHammer } from "../components/ui/RealisticHammer";
import { GoldCoinAnimation } from "../components/animations/GoldCoinAnimation";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    success: isMatch,
    actualHash,
    realBlockHash,
  } = location.state || { success: false };

  const [showResult, setShowResult] = useState(false);
  const hammerControls = useAnimationControls();
  const boxControls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      // 1. Hammer appears
      await hammerControls.start({
        opacity: 1,
        y: -100,
        rotate: -25,
        transition: { duration: 0.5 },
      });

      // 2. Hammer hits the box
      await hammerControls.start({
        y: 50,
        rotate: 20,
        transition: { duration: 0.25, ease: "easeIn" },
      });

      // 3. Impact effect
      boxControls.start({ scale: [1, 1.05, 0.95, 1], rotate: [0, 1, -1, 0] });
      await hammerControls.start({
        y: 40,
        rotate: 15,
        transition: { duration: 0.1 },
      });

      // 4. Show result
      if (isMatch) {
        boxControls.start({ filter: "drop-shadow(0 0 20px #facc15)" });
      } else {
        hammerControls.start({
          y: -120,
          rotate: -30,
          transition: { duration: 0.5 },
        });
      }
      setShowResult(true);

      // 5. Navigate home after a delay
      setTimeout(() => {
        localStorage.clear();
        navigate("/");
      }, 6000);
    };

    sequence();
  }, [isMatch, hammerControls, boxControls, navigate]);

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center overflow-hidden font-mono p-4">
      {/* Animation Stage */}
      <div className="relative w-64 h-64">
        <motion.div
          className="absolute z-10"
          style={{ top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 }}
          animate={hammerControls}
        >
          <RealisticHammer />
        </motion.div>
        <motion.div animate={boxControls}></motion.div>
        {isMatch && showResult && <GoldCoinAnimation />}
      </div>

      {/* Result Text */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {isMatch ? (
              <h1 className="text-4xl font-bold text-yellow-400">
                SUCCESS! 2 HITS FOUND!
              </h1>
            ) : (
              <h1 className="text-4xl font-bold text-gray-500">
                Better luck next time!
              </h1>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Block Hash Display */}
      <motion.div
        className="mt-8 text-center bg-black/30 p-4 rounded-lg border border-gray-700 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg font-semibold text-purple-300">
          Verification Details
        </h3>
        <p className="text-xs text-gray-400 mt-2">
          Block Number from Polygon Amoy:
        </p>
        <p className="text-sm text-white break-all">{realBlockHash}</p>
      </motion.div>
    </div>
  );
};

export default ResultsPage;