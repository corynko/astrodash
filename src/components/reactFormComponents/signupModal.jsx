import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import SignupForm from "./signupForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#0A0A0A",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SignupModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
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
        onClick={handleOpen}
      >
        sign up
      </Button>
      <Modal
        aria-labelledby="astroDash-sign-up"
        aria-describedby="sign up for astroDash"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <SignupForm />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SignupModal;
