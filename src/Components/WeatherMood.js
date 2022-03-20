import "../App.css";

function WeatherMood(props) {
  const handleDeleteClick = () => {
    //console.log(props.id);
    props.deletePost(props.id);
  };

  return props.content === "" ? (
    <div></div>
  ) : (
    <div className="WeatherMood">
      <div className="WeatherMoodUser">{props.username}</div>
      <div className="WeatherMoodContent">
        <div className="WeatherMoodDate">
          {props.createAt}
          {props.year}-{props.month}-{props.day} at {props.hour}:{props.minute}{" "}
        </div>
        <div className="WeatherMoodText">{props.content}</div>
      </div>
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
