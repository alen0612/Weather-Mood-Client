import "../App.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function Searchbar(props) {
  const [span, setSpan] = useState(false);

  const handleButton = () => {
    props.getWeather();
    //props.getForecast();
    setSpan(false);
  };

  const handleSpan = () => {
    //console.log("Span? : " + span);
    setSpan(true);
  };

  return span === true ? (
    <div className="SearchBarSpan">
      <input
        className="SearchBarSpanLocation"
        value={props.todayWeather.location}
        onChange={(event) => props.setLocation(event.target.value)}
        placeholder="City Name"
      />
      <select
        className="SearchBarSpanSelect"
        value={props.todayWeather.unit}
        onChange={(event) => props.setUnit(event.target.value)}
      >
        <option value="metric">°C</option>
        <option value="imperial">°F</option>
      </select>
      <button className="SearchBarSpanButton" onClick={handleButton}>
        Check
      </button>
    </div>
  ) : (
    <div className="SearchBarClose">
      <button className="SearchBarCloseButton" onClick={handleSpan}>
        <FontAwesomeIcon icon={faLocationDot} className="locationIcon" />
        {props.todayWeather.location}
      </button>
    </div>
  );
}

export default Searchbar;
