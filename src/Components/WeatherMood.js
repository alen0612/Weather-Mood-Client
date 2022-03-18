import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faCloud,
  faSmog,
  faSnowflake,
  faSun,
  faTint,
} from "@fortawesome/free-solid-svg-icons";

function WeatherMood(props) {
  let icon;

  if (props.mood === "Clear") icon = <FontAwesomeIcon icon={faSun} />;
  else if (props.mood === "Cloud") icon = <FontAwesomeIcon icon={faCloud} />;
  else if (props.mood === "Thunder")
    icon = <FontAwesomeIcon icon={faBoltLightning} />;
  else if (props.mood === "Rain") icon = <FontAwesomeIcon icon={faTint} />;
  else if (props.mood === "Snow") icon = <FontAwesomeIcon icon={faSnowflake} />;
  else if (props.mood === "Mist") icon = <FontAwesomeIcon icon={faSmog} />;

  const handleDeleteClick = () => {
    //console.log(props.id);
    props.deletePost(props.id);
  };

  return props.content === "" || props.mood === "Mood" || props.mood === "" ? (
    <div></div>
  ) : (
    <div className="WeatherMood">
      <div className="WeatherMoodIcon">{icon}</div>
      <div className="WeatherMoodContent">
        <div className="WeatherMoodDate">
          {props.createAt}
          {props.year}-{props.month}-{props.day} at {props.hour}:{props.minute}{" "}
        </div>
        <div className="WeatherMoodText">{props.content}</div>
      </div>
      <div className="WeatherMoodUser">{props.username}</div>
      {props.currentUser === props.username ? (
        <button className="WeatherMoodDelete" onClick={handleDeleteClick}>
          X
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default WeatherMood;
