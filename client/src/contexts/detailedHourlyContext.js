import React from "react";

const DetailedHourlyContext = React.createContext({
  detailedHourly: null,
  setDetailedHourly: () => {},
});

export const DetailedHourlyProvider = DetailedHourlyContext.Provider;
export const DetailedHourlyConsumer = DetailedHourlyContext.Consumer;
export default DetailedHourlyContext;
