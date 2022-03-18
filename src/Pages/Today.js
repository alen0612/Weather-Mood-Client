import "../App.css";
import TodayInfo from "../Components/TodayInfo";
import Searchbar from "../Components/Searchbar";
import PostBar from "../Components/PostBar";
import Loading from "../Components/Loading";
import React, { useState } from "react";

function Today(props) {
  const [loadingVisible, setLoadingVisible] = useState(true);

  return loadingVisible ? (
    <div>
      <Loading
        loadingVisible={loadingVisible}
        setLoadingVisible={setLoadingVisible}
      />
    </div>
  ) : (
    <div className="todayContainer">
      <div className="Background" style={props.background}></div>
      <div className="today">
        <Searchbar
          setLocation={props.setLocation}
          setUnit={props.setUnit}
          todayWeather={props.todayWeather}
          setTodayWeather={props.setTodayWeather}
          getWeather={props.getWeather}
        />
        <TodayInfo todayWeather={props.todayWeather} logo={props.logo} />
        <PostBar currentUser={props.currentUser} />
      </div>
      <div></div>
    </div>
  );
}

export default Today;
