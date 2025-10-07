// import React from "react";
// import { motion, type AnimationControls } from "framer-motion";import { Sparkles, Star } from "lucide-react";

// interface RealisticHammerProps {
//   animate?: AnimationControls; // Controlled by a parent component
//   index?: number;
// }

// export const RealisticHammer: React.FC<RealisticHammerProps> = ({
//   animate,
//   index = 0,
// }) => {
//   return (
//     <div className="relative">
//       <motion.div
//         className="relative w-16 h-20 group"
//         animate={animate} // Apply external animation controls
//       >
//         {/* Wooden Handle */}
//         <div
//           className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-14 rounded-full shadow-2xl"
//           style={{
//             background:
//               "linear-gradient(145deg, #D2691E 0%, #CD853F 20%, #8B4513 50%, #654321 80%, #2F1B14 100%)",
//             boxShadow:
//               "inset -2px -2px 4px rgba(139, 69, 19, 0.8), inset 2px 2px 4px rgba(210, 180, 140, 0.6), 0 4px 12px rgba(0,0,0,0.6)",
//           }}
//         />

//         {/* Steel Hammer Head */}
//         <div
//           className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-7 rounded-lg shadow-2xl"
//           style={{
//             background:
//               "linear-gradient(145deg, #F8F8FF 0%, #E6E6FA 15%, #C0C0C0 30%, #A9A9A9 50%, #808080 70%, #696969 85%, #2F2F2F 100%)",
//             boxShadow:
//               "inset -2px -2px 6px rgba(105, 105, 105, 0.8), inset 2px 2px 6px rgba(248, 248, 255, 0.8), 0 6px 16px rgba(0,0,0,0.7)",
//           }}
//         >
//           <motion.div
//             className="absolute top-1 left-1 right-1 h-2 rounded-t opacity-60"
//             style={{
//               background:
//                 "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.7) 70%, transparent 100%)",
//             }}
//             animate={{ x: [-15, 15, -15] }}
//             transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
//           />
//         </div>

//         {/* Floating Magical Aura */}
//         <motion.div
//           className="absolute top-0 left-1/2 transform -translate-x-1/2"
//           animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
//           transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
//         >
//           <Star className="w-4 h-4 text-yellow-300 opacity-70" />
//         </motion.div>

//         {/* Power Status Indicator */}
//         <motion.div
//           className="absolute -top-3 -right-3 text-yellow-400"
//           animate={{ rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
//           transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
//         >
//           <Sparkles className="w-3 h-3" />
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

import React from "react";
import { motion, type AnimationControls } from "framer-motion";

interface RealisticHammerProps {
  animate?: AnimationControls;
  index?: number;
}

export const RealisticHammer: React.FC<RealisticHammerProps> = ({
  animate,
  index = 0,
}) => {
  return (
    <div className="relative">
      <motion.div
        className="relative w-24 h-28" // Increased size for better visuals
        animate={animate}
      >
        {/* Realistic Wooden Handle */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-20 rounded-b-md"
          style={{
            background:
              "linear-gradient(145deg, #8B4513 0%, #A0522D 50%, #654321 100%)",
            boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
          }}
        />
        {/* Steel Hammer Head */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-10"
          style={{
            background: "linear-gradient(145deg, #e0e0e0, #b0b0b0)",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.4), inset 0 2px 2px #ffffff, inset 0 -2px 2px #888888",
            borderRadius: "4px 4px 8px 8px",
          }}
        >
          {/* Hitting Face */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full w-6 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-md shadow-inner" />
          {/* Claw */}
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full w-6 h-8 bg-gradient-to-bl from-gray-300 to-gray-500 rounded-md shadow-inner"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 30% 50%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
