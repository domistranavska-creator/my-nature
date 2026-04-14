(function () {
  if (typeof window === "undefined") return;

  const weatherState = window.weatherState && typeof window.weatherState === "object"
    ? window.weatherState
    : {
        weather: "clear",
        intensity: "light",
        wind: "calm",
        timeOfDay: "day",
        season: "spring"
      };

  function setWeatherState(next) {
    Object.assign(weatherState, next || {});
    window.dispatchEvent(new CustomEvent("weather-state-change", { detail: weatherState }));
    return weatherState;
  }

  window.weatherState = weatherState;
  window.setWeatherState = setWeatherState;
  window.MojaZahradaWeatherState = {
    weatherState,
    setWeatherState
  };
})();
