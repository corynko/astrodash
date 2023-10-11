import React from "react";
import { useTheme } from "@mui/material/styles";
import Sparkles from "react-sparkle";
import { motion } from "framer-motion";

import SignupForm from "../components/reactFormComponents/signupForm";

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
        count={18}
        minSize={2}
        maxSize={8}
        overflowPx={0}
        fadeOutSpeed={4}
        flicker={true}
        flickerSpeed={"slowest"}
      />
      <motion.div
        className="textCenter"
        variants={divVariants}
        initial="start"
        animate="finished"
      >
        <h1 className="homeHeader m25 p75">welcome to astroDash</h1>
        <h3 className="homeHeader m25">
          astroDash makes it easy to plan a shoot
        </h3>
        <h4 className="homeHeader m25">
          aggregate forecast data, AR landscape images, and more in one place
        </h4>
      </motion.div>
    </div>
  );
}