import React from "react";
import { useTheme } from "@mui/material/styles";
import Sparkles from "react-sparkle";
import { motion } from "framer-motion";

export default function Home() {
  let divVariants = {
    start: { opacity: 0 },
    finished: {
      opacity: 1,

      transition: {
        duration: 1.3,
        ease: "easeOut",
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <div className="flex column center relative coverPage homeCoverImg">
      <Sparkles
        count={15}
        minSize={2}
        maxSize={8}
        overflowPx={0}
        fadeOutSpeed={4}
        flicker={true}
        flickerSpeed={"slower"}
      />
      <motion.div
        className="textCenter"
        variants={divVariants}
        initial="start"
        animate="finished"
      >
        <h1 className="homeHeader">welcome to astroDash</h1>
        <h3 className="homeHeader">astroDash makes it easy to plan a shoot</h3>
        <h4 className="homeHeader">
          aggregate forecast data, AR landscape images, and more in one place
        </h4>
      </motion.div>
    </div>
  );
}
