import React, { useState, useEffect, useCallback } from "react";
import AppBarHeightContext, {
  AppBarHeightProvider,
} from "./AppBarHeightContext";

export const useAppBarHeight = () => {
  const [appBarHeight, setAppBarHeight] = useState(0);

  const updateAppBarHeight = useCallback(() => {
    const appBar = document.querySelector(".appBar");
    if (appBar) {
      setAppBarHeight(appBar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    updateAppBarHeight();
    window.addEventListener("resize", updateAppBarHeight);
    return () => window.removeEventListener("resize", updateAppBarHeight);
  }, [updateAppBarHeight]);

  return appBarHeight;
};

export const AppBarHeight = ({ children }) => {
  const appBarHeight = useAppBarHeight();

  return (
    <AppBarHeightProvider value={appBarHeight}>{children}</AppBarHeightProvider>
  );
};
