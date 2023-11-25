import React from "react";

const MeteoContext = React.createContext(null);

export const MeteoProvider = MeteoContext.Provider;
export const MeteoConsumer = MeteoContext.Consumer;
export default MeteoContext;
