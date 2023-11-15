import React from "react";

const WeatherContext = React.createContext(null);

export const WeatherProvider = WeatherContext.Provider;
export const WeatherConsumer = WeatherContext.Consumer;
export default WeatherContext;
