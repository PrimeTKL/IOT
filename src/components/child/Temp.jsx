/* eslint-disable react/prop-types */
// import React from "react";

import { useEffect } from "react";

const units = {
  Celcius: "°C",
  Fahrenheit: "°F",
};

const config = {
  minTemp: -20,
  maxTemp: 50,
  unit: "Celcius",
};
const Temp = ({ temp }) => {
  useEffect(() => {
    const range = document.querySelector("input[type='range']");
    const temperature = document.getElementById("temperature");

    // function setTemperature() {
    temperature.style.height =
      ((range.value - config.minTemp) / (config.maxTemp - config.minTemp)) *
        100 +
      "%";
    temperature.dataset.value = range.value + units[config.unit];
    // }

    // range.addEventListener("input", setTemperature);
    // setTimeout(setTemperature, 1000);
  }, [temp]);

  return (
    <>
      {/* <h1 className="text-white">TEMP: {temp}</h1> */}
      <div id="wrapper" className="text-white select-none">
        <div id="termometer">
          <div
            id="temperature"
            style={{ height: 0 }}
            data-value={`${temp}°C`}
          ></div>
          <div id="graduations"></div>
        </div>

        <div id="playground">
          <div id="range">
            <input id="minTemp" type="text" value="-20" />
            <input type="range" min="-20" max="50" value={temp} />
            <input id="maxTemp" type="text" value="50" />
          </div>
          <p id="unit">Celcius C°</p>
        </div>

        {/* <p id="info">Click on the values to change them!</p> */}
      </div>
    </>
  );
};

export default Temp;
