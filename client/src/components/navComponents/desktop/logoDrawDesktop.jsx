import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function LogoDrawDesktop() {
  let pathVariants = {
    start: { opacity: 0, pathLength: 0, fill: "#00000000" },
    finished: {
      opacity: 1,
      pathLength: 1,

      transition: {
        duration: 1.3,
        ease: "easeOut",
        staggerChildren: 0.075,
      },
    },
  };

  return (
    <div style={{ margin: "10px" }} className="logoLinkDiv logoLink">
      <Link to="/">
        <motion.svg
          className="logoLink"
          version="1.0"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          width="200px"
          height="200px"
          viewBox="0 0 800 800"
          variants={pathVariants}
          initial="start"
          animate="finished"
          display={{ xs: "none", md: "flex" }}
        >
          <motion.rect
            className="cls-1"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            x="621.66"
            y="43.69"
            width="36.69"
            height="128.42"
            transform="translate(-.74 211.29) rotate(-18.74)"
          />
          <motion.path
            className="cls-1"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m643.19,174.73l-.03-.1-41.28-121.71,34.94-11.85.03.1,41.28,121.71-34.94,11.85Zm-41.06-121.68l41.18,121.42,34.56-11.72-41.19-121.42-34.56,11.72Z"
          />

          <motion.rect
            className="cls-1"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            x="457.46"
            y="89.7"
            width="166.2"
            height="106.61"
            transform="translate(-17.29 181.21) rotate(-18.74)"
          />
          <motion.rect
            className="cls-1"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            x="269.32"
            y="171.17"
            width="199.43"
            height="67.71"
            transform="translate(-46.3 129.4) rotate(-18.74)"
          />
          <motion.rect
            className="cls-1"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            x="150.91"
            y="242.88"
            width="127.65"
            height="28.97"
            transform="translate(-71.29 82.61) rotate(-18.74)"
          />
          <motion.rect
            className="cls-1"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            x="135.41"
            y="254.84"
            width="32.55"
            height="47.82"
            transform="translate(-81.5 63.49) rotate(-18.74)"
          />
          <motion.path
            className="cls-1"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m435.46,277.15c0,12.17-9.87,22.04-22.04,22.04h0c-12.17,0-22.04-9.87-22.04-22.04v-39.57c0-12.17,9.87-22.04,22.04-22.04h0c12.17,0,22.04,9.87,22.04,22.04v39.57Z"
          />

          <motion.circle
            className="cls-1"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            cx="413.42"
            cy="274.32"
            r="11.91"
            transform="translate(-7.88 12.26) rotate(-1.68)"
          />
          <motion.path
            className="cls-1"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m413.42,286.3c-6.6,0-11.98-5.37-11.98-11.98s5.37-11.98,11.98-11.98,11.98,5.37,11.98,11.98-5.37,11.98-11.98,11.98Zm0-23.81c-6.53,0-11.84,5.31-11.84,11.84s5.31,11.84,11.84,11.84,11.84-5.31,11.84-11.84-5.31-11.84-11.84-11.84Z"
          />

          <motion.path
            className="cls-3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m437.98,345.9c0,15.88-10.56,28.75-23.6,28.75h0c-13.03,0-23.6-12.87-23.6-28.75v-24.56c0-15.88,10.56-28.75,23.6-28.75h0c13.03,0,23.6,12.87,23.6,28.75v24.56Z"
          />
          <motion.rect
            className="cls-3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            x="378.6"
            y="354.38"
            width="73.46"
            height="41.43"
          />
          <motion.rect
            className="cls-2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            x="372.72"
            y="375.1"
            width="88.63"
            height="54.61"
          />
          <motion.path
            className="cls-2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m333.74,563.14c-2.6,5.37-9.07,7.61-14.44,5.01h0c-5.37-2.6-7.61-9.07-5.01-14.44l63.5-130.96c2.6-5.37,9.07-7.61,14.44-5.01h0c5.37,2.6,7.61,9.07,5.01,14.44l-63.5,130.96Z"
          />
          <motion.path
            className="cls-2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m285.45,655.83c-1.88,3.87-6.54,5.49-10.41,3.61h0c-3.87-1.88-5.49-6.54-3.61-10.41l45.79-94.44c1.88-3.87,6.54-5.49,10.41-3.61h0c3.87,1.88,5.49,6.54,3.61,10.41l-45.79,94.44Z"
          />
          <motion.path
            className="cls-2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m255.52,710.37c-1.05,2.16-3.77,3-6.09,1.88h0c-2.31-1.12-3.34-3.78-2.3-5.94l25.53-52.65c1.05-2.16,3.77-3,6.09-1.88h0c2.31,1.12,3.34,3.78,2.3,5.94l-25.53,52.65Z"
          />
          <motion.path
            className="cls-2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m499.51,562.41c2.6,5.37,9.07,7.61,14.44,5.01h0c5.37-2.6,7.61-9.07,5.01-14.44l-63.5-130.96c-2.6-5.37-9.07-7.61-14.44-5.01h0c-5.37,2.6-7.61,9.07-5.01,14.44l63.5,130.96Z"
          />
          <motion.path
            className="cls-2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m547.8,655.1c1.88,3.87,6.54,5.49,10.41,3.61h0c3.87-1.88,5.49-6.54,3.61-10.41l-45.79-94.44c-1.88-3.87-6.54-5.49-10.41-3.61h0c-3.87,1.88-5.49,6.54-3.61,10.41l45.79,94.44Z"
          />
          <motion.path
            className="cls-2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m578.79,709.96c1.08,2.18,3.73,3.11,5.92,2.07h0c2.19-1.04,3.09-3.65,2.01-5.84l-26.3-53.2c-1.08-2.18-3.73-3.11-5.92-2.07h0c-2.19,1.04-3.09,3.65-2.01,5.84l26.3,53.2Z"
          />

          <motion.path
            className="cls-3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m425.09,545.54c0,5.39-4.37,9.76-9.76,9.76h0c-5.39,0-9.76-4.37-9.76-9.76v-131.41c0-5.39,4.37-9.76,9.76-9.76h0c5.39,0,9.76,4.37,9.76,9.76v131.41Z"
          />
          <motion.path
            className="cls-3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m422.37,633.28c0,3.64-3.15,6.58-7.04,6.58h0c-3.89,0-7.04-2.95-7.04-6.58v-88.64c0-3.64,3.15-6.58,7.04-6.58h0c3.89,0,7.04,2.95,7.04,6.58v88.64Z"
          />
          <motion.path
            className="cls-3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m419.54,678.46c0,2.32-1.88,4.21-4.21,4.21h0c-2.32,0-4.21-1.88-4.21-4.21v-56.63c0-2.32,1.88-4.21,4.21-4.21h0c2.32,0,4.21,1.88,4.21,4.21v56.63Z"
          />
          <motion.path
            className="cls-3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m425.09,682.67c0,1.27-1.03,2.31-2.31,2.31h-14.9c-1.27,0-2.31-1.03-2.31-2.31h0c0-1.27,1.03-2.31,2.31-2.31h14.9c1.27,0,2.31,1.03,2.31,2.31h0Z"
          />

          <motion.path
            className="cls-3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m261.64,710.4c0,1.41-1.14,2.56-2.56,2.56h-16.51c-1.41,0-2.56-1.14-2.56-2.56h0c0-1.41,1.14-2.56,2.56-2.56h16.51c1.41,0,2.56,1.14,2.56,2.56h0Z"
          />
          <motion.path
            className="cls-3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            d="m594.32,710.43c0,1.41-1.14,2.56-2.56,2.56h-16.51c-1.41,0-2.56-1.14-2.56-2.56h0c0-1.41,1.14-2.56,2.56-2.56h16.51c1.41,0,2.56,1.14,2.56,2.56h0Z"
          />
        </motion.svg>
      </Link>
    </div>
  );
}

export default LogoDrawDesktop;
