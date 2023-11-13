import { motion } from "framer-motion";

//moon phase png imports
import NewMoon from "../../assets/png/moons/new_moon_trans.png";
import WaxingCrescent from "../../assets/png/moons/waxing_crescent_trans.png";
import FirstQuarter from "../../assets/png/moons/first_quarter_trans.png";
import WaxingGibbous from "../../assets/png/moons/waxing_gibbous_trans.png";
import FullMoon from "../../assets/png/moons/full_moon_trans.png";
import WaningGibbous from "../../assets/png/moons/waning_gibbous_trans.png";
import ThirdQuarter from "../../assets/png/moons/third_quarter_trans.png";
import WaningCrescent from "../../assets/png/moons/waning_crescent_trans.png";

const MoonDisplay = ({ moonPhase, moonIllumination }) => {
  //   console.log(moonPhase, moonIllumination);
  const getImageForPhase = (phase) => {
    switch (phase) {
      case "New Moon":
        return NewMoon;
      case "Waxing Crescent":
        return WaxingCrescent;
      case "First Quarter":
        return FirstQuarter;
      case "Waxing Gibbous":
        return WaxingGibbous;
      case "Full Moon":
        return FullMoon;
      case "Waning Gibbous":
        return WaningGibbous;
      case "Third Quarter":
        return ThirdQuarter;
      case "Waning Crescent":
        return WaningCrescent;
      default:
        return FullMoon;
    }
  };
  const phaseImage = getImageForPhase(moonPhase);
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
    <motion.div
      variants={divVariants}
      initial="start"
      animate="finished"
      className="flex column center"
    >
      <h4 className="profileText">the moon is currently a {moonPhase}</h4>
      <img
        className="moonImg"
        src={phaseImage}
        alt="{`Moon phase: ${moonPhase}`}"
      />
      <h4 className="profileText">it is {moonIllumination}% illuminated</h4>
    </motion.div>
  );
};

export default MoonDisplay;
