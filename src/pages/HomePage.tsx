// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const HomePage = () => {
//   const navigate = useNavigate();

//   // For this demo, we always navigate to Guess ID 1
//   const startGuess = () => {
//     navigate("/guess/1");
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center p-4">
//       <motion.h1
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, type: "spring" }}
//         className="text-5xl md:text-7xl font-bold text-white mb-4"
//       >
//         Guess Protocol
//       </motion.h1>
//       <motion.p
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
//         className="text-lg md:text-xl text-purple-300 mb-8 max-w-2xl"
//       >
//         A decentralized application for predicting blockchain data. Press the
//         button below to start your guess.
//       </motion.p>
//       <motion.button
//         onClick={startGuess}
//         className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg transition-all transform flex items-center gap-3 shadow-2xl shadow-purple-600/30"
//         whileHover={{
//           scale: 1.1,
//           boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
//         }}
//         whileTap={{ scale: 0.95 }}
//       >
//         Start Guess
//         <ArrowRight className="w-6 h-6" />
//       </motion.button>
//     </div>
//   );
// };

// export default HomePage;


import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useOnScreen } from "../hooks/useOnScreen";
import { VerifySection } from "../components/guess/VerifySection";

const HomePage = () => {
  const navigate = useNavigate();
  const verifySectionRef = useRef<HTMLDivElement>(null);
  const isVerifySectionVisible = useOnScreen(verifySectionRef);

  const startGuess = () => {
    navigate("/guess/1");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 font-mono">
      {/* --- Main Welcome Section --- */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Guess Protocol
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
          className="text-lg md:text-xl text-purple-300 mb-8 max-w-2xl"
        >
          Submit your guess, then scroll down to verify its accuracy against the
          blockchain.
        </motion.p>
        <motion.button
          onClick={startGuess}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg flex items-center gap-3 shadow-2xl shadow-purple-600/30"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Submit a New Guess
          <ArrowRight className="w-6 h-6" />
        </motion.button>
        <motion.div
          className="mt-20 text-gray-400 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Scroll Down to Verify
          <ChevronDown />
        </motion.div>
      </div>

      {/* --- Verification Section Trigger --- */}
      {/* This invisible div triggers the appearance of the section below */}
      <div ref={verifySectionRef} style={{ height: "1px" }} />

      {/* --- Dynamic Verification Section --- */}
      <div className="min-h-[50vh] flex items-center justify-center py-20">
        <AnimatePresence>
          {isVerifySectionVisible && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <VerifySection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomePage;