// non-animated imports
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import LogoDrawDesktop from "./desktop/logoDrawDesktop";

export default function Nav() {
  return (
    <AppBar position="static" className="appBar">
      <Toolbar className="toolBar" disableGutters>
        <Box
          sx={{
            width: 1,
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LogoDrawDesktop />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
