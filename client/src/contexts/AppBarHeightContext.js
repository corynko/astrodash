import React from "react";

const AppBarHeightContext = React.createContext(0); // Default height is 0

export const AppBarHeightProvider = AppBarHeightContext.Provider;
export default AppBarHeightContext;
