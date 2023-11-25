import { useContext } from "react";
import AppBarHeightContext from "../../contexts/AppBarHeightContext";

// non-animated imports
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

// import LogoDrawDesktop from "./desktop/logoDrawDesktop";
// import WordDrawDesktop from "./desktop/wordDrawDesktop";
import FullLogoDesktop from "./desktop/fullLogoDesktop";
import NavItemsDesktop from "./desktop/navItemsDesktop";

export default function Nav() {
  // const appBarHeight = useContext(AppBarHeightContext);
  // const coverPageStyle = {
  //   minHeight: `calc(100vh - ${appBarHeight}px - 150px)`,
  // };

  return (
    <AppBar
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
