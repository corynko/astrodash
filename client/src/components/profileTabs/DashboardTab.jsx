import AppBarHeightContext from "../../contexts/AppBarHeightContext";
import { useContext, useState } from "react";

export const DashboardTab = ({ weatherData }) => {
  const appBarHeight = useContext(AppBarHeightContext);
  const coverPageStyle = {
    minHeight: `calc(100vh - ${appBarHeight}px - 150px)`,
  };
  return (
    <div className="flex column center profileCoverPage" style={coverPageStyle}>
      <h1 className="homeHeader textCenter stroke25">
        welcome to your dashboard
      </h1>
      <h4 className="homeHeader m25 textCenter stroke25">
        pinned components will appear here
      </h4>
    </div>
  );
};
