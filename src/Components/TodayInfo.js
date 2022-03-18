import "../App.css";
import React from "react";

function TodayInfo(props) {
  return (
    <div className="TodayInfo" style={props.logo}>
      <div className="description">Today: {props.todayWeather.weather}</div>
      <div className="temperature">
        {props.todayWeather.temp}
        {props.todayWeather.graph}
      </div>
    </div>
  );
}

export default TodayInfo;
