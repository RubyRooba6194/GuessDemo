import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldX, Loader, Search } from "lucide-react";
import { getBlockByNumber } from "../../services/service";
import type { GuessData } from "../../utils/types";

export const VerifySection: React.FC = () => {
  const [guess, setGuess] = useState<GuessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<"hit" | "miss" | null>(null);

  useEffect(() => {
    // Load the last guess from local storage when the component appears
    const storedGuess = localStorage.getItem("latestGuess");
    if (storedGuess) {
      setGuess(JSON.parse(storedGuess));
    }
  }, []);

  const handleVerify = async () => {
    if (!guess) return;

    setIsLoading(true);
    setResult(null);

    try {
      // Fetch the actual block hash
      const realBlock = await getBlockByNumber(guess.blockIncrement);
      const realBlockHash = String(realBlock.hash);

      // Compare with the stored guess hash
      if (realBlockHash.toLowerCase() === guess.hash.toLowerCase()) {
        setResult("hit");
      } else {
        setResult("miss");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Failed to fetch block data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!guess) {
    return (
      <div className="text-center text-gray-500">
        <p>No guess submitted yet. Go to the Guess Page to submit one!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto text-center p-8 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-4">Verify Your Guess</h2>
      <div className="bg-gray-900/50 p-4 rounded-lg mb-6 text-left">
        <p className="text-gray-400">
          Guess Hash: <span className="text-white break-all">{guess.hash}</span>
        </p>
        <p className="text-gray-400">
          Token Size: <span className="text-white">{guess.tokenSize}</span>
        </p>
        <p className="text-gray-400">
          Guess Type: <span className="text-white">{guess.guessType}</span>
        </p>
      </div>

      <motion.button
        onClick={handleVerify}
        disabled={isLoading}
        className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-3 mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? <Loader className="animate-spin" /> : <Search />}
        {isLoading ? "Verifying..." : "Verify the Guess"}
      </motion.button>

      <div className="h-24 mt-6">
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              {result === "hit" ? (
                <>
                  <ShieldCheck className="w-16 h-16 text-green-400" />
                  <p className="text-2xl font-bold text-green-400 mt-2">
                    IT'S A HIT!
                  </p>
                </>
              ) : (
                <>
                  <ShieldX className="w-16 h-16 text-red-400" />
                  <p className="text-2xl font-bold text-red-400 mt-2">
                    IT'S A MISS!
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
