// non-animated imports
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

// import LogoDrawDesktop from "./desktop/logoDrawDesktop";
// import WordDrawDesktop from "./desktop/wordDrawDesktop";
import FullLogoDesktop from "./desktop/fullLogoDesktop";
import NavItemsDesktop from "./desktop/navItemsDesktop";

export default function Nav() {
  return (
    <AppBar
      position="static"
      className="appBar"
      style={{ background: "transparent", boxShadow: "none" }}
    >
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
          <FullLogoDesktop />
          <NavItemsDesktop />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
