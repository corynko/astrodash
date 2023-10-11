import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SignupModal from "../../reactFormComponents/signupModal";
import SigninModal from "../../reactFormComponents/signinModal";

function NavItemsDesktop() {
  let divVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,

      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div variants={divVariants} initial="initial" animate="animate">
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          textAlign: "center",
        }}
      >
        <Link className="m10" to="/signup">
          <SignupModal />
        </Link>
        <Link className="m10" to="/login">
          <SigninModal />
        </Link>
        {/* TODO: only show profile link if logged in */}
        <Link className="m10" to="/profile">
          <Button
            className="navLink"
            sx={{
              marginX: "1rem",
              fontWeight: 300,
              fontSize: "115%",
              fontFamily: "GothamLight",
              whiteSpace: "nowrap",
              flexGrow: 1,
              color: "#f5f5f5",
            }}
            fullWidth={true}
          >
            profile
          </Button>
        </Link>
        <Link className="m10" to="/contact">
          <Button
            className="navLink"
            sx={{
              marginX: "1rem",
              fontWeight: 300,
              fontSize: "115%",
              fontFamily: "GothamLight",
              whiteSpace: "nowrap",
              flexGrow: 1,
              color: "#f5f5f5",
            }}
            fullWidth={true}
          >
            contact us
          </Button>
        </Link>
      </Box>
    </motion.div>
  );
}

export default NavItemsDesktop;
