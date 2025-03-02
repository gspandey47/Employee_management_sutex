import Company_info from './card_container/Company_info';
import Card from './card_container/Card';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoticeIcon from './card_container/Notification';

function Home() {
  const [showSpiderMan, setShowSpiderMan] = useState(true);

  useEffect(() => {
    // Spider-Man ko 4 seconds ke baad disappear karne ke liye
    const timer = setTimeout(() => {
      setShowSpiderMan(false);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <>
      {/* Spider-Man Animation */}
      <AnimatePresence>
        {showSpiderMan && (
          <motion.div
            initial={{ opacity: 0, y: -100 }} // Start from top and invisible
            animate={{ opacity: 1, y: 0 }} // Fade in and move down
            exit={{ opacity: 0, y: -100 }} // Fade out and move up
            transition={{ duration: 1 }} // Smooth animation
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50"
          >
            <motion.div
              initial={{ scale: 0 }} // Start small
              animate={{ scale: 1 }} // Grow to normal size
              exit={{ scale: 0 }} // Shrink and disappear
              transition={{ duration: 0.5, delay: 0.5 }} // Smooth scaling
              className="text-center"
            >
              <img
                src="./src/assets/il_fullxfull.4576419046_hmal.webp" // Spider-Man image URL
                alt="Spider-Man"
                className="w-48 h-48 mb-4"
              />
              <motion.h1
                initial={{ opacity: 0 }} // Start invisible
                animate={{ opacity: 1 }} // Fade in
                exit={{ opacity: 0 }} // Fade out
                transition={{ duration: 0.5, delay: 1 }} // Smooth fade
                className="text-4xl font-bold text-white"
              >
                Welcome to the Home Page!
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container lg:h-full pl-3 md:pl-3 w-full h-full sm:px-6 lg:pl-10 bg-purple-900 flex flex-col-reverse space-x-2 py-4 gap-3 lg:py-5 pr-2 lg:flex-row rounded-bl-md md:ml-4 rounded-br-md shadow-xl">
        <Company_info/>
        <Card/>
        <NoticeIcon/>
      </div>
    </>
  );
}

export default Home;




















// import React, { useState } from 'react'
// import Company_info from './card_container/Company_info';
// import Card from './card_container/Card';
// function Home() {

  

//   return (
//     <>
    
//     <div className="container lg:h-full pl-3 md:pl-3 w-full h-full sm:px-6 lg:pl-10 bg-purple-900 flex flex-col-reverse space-x-2 py-4 gap-3 lg:py-5 pr-2  lg:flex-row rounded-bl-md md:ml-4 rounded-br-md shadow-xl">
//    <Company_info/>
//     <Card/>
//     </div>
    
   
    
    


    
      
//     </>
//   )
// }

// export default Home



// import React from "react";
// import { motion } from "framer-motion";

// const Home = () => {
//   // Flowers ki barsat ke liye random positions aur animations
//   const flowers = Array.from({ length: 50 }).map((_, index) => ({
//     id: index,
//     x: Math.random() * 100, // Random horizontal position
//     y: -Math.random() * 100, // Start from top
//     delay: Math.random() * 5, // Random delay for animation
//     duration: 5 + Math.random() * 5, // Random duration for falling
//   }));

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 overflow-hidden">
//       {/* Flowers ki barsat */}
//       <div className="absolute inset-0 overflow-hidden">
//         {flowers.map((flower) => (
//           <motion.div
//             key={flower.id}
//             initial={{ y: flower.y, x: `${flower.x}vw` }}
//             animate={{ y: "100vh" }} // Flowers neeche tak girne ke liye
//             transition={{
//               delay: flower.delay,
//               duration: flower.duration,
//               repeat:2000, // Loop the animation
//               ease: "linear", // Smooth falling effect
//             }}
//             className="absolute text-4xl"
//             style={{ x: `${flower.x}vw` }}
//           >
//             🌸
//           </motion.div>
//         ))}
//       </div>

//       {/* Welcome Message */}
//       <motion.div
//         initial={{ opacity: 0, y: -50 }} // Start from top and invisible
//         animate={{ opacity: 1, y: 0 }} // Fade in and move down
//         transition={{ duration: 1.5, delay: 1 }} // Smooth animation
//         className="text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl"
//       >
//         <motion.h1
//           initial={{ scale: 0 }} // Start small
//           animate={{ scale: 1 }} // Grow to normal size
//           transition={{ duration: 1, delay: 2 }} // Smooth scaling
//           className="text-6xl font-bold text-purple-800 mb-4"
//         >
//           Welcome!
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }} // Start invisible
//           animate={{ opacity: 1 }} // Fade in
//           transition={{ duration: 1, delay: 3 }} // Smooth fade
//           className="text-2xl text-gray-700"
//         >
//           Aapka swagat hai is amazing platform par! 🚀
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// };

// export default Home;