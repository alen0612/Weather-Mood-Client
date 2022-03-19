import "../App.css";
import WeatherMood from "./WeatherMood";
import React, { useState, useEffect } from "react";
import axios from "axios";

function PostBar(props) {
  let today;

  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [id, setID] = useState(0);
  const [moodList, setMoodList] = useState([]);

  useEffect(() => {
    axios
      .get("https://weather-mood-server.herokuapp.com/posts")
      .then((response) => {
        //console.log(response.data);
        setMoodList(response.data);
        //console.log(moodList);
      });
  }, []);

  const handleSelect = (event) => {
    console.log(event.target.value);
    setMood(event.target.value);
  };

  const postMood = () => {
    if (content === "" || mood === "Mood" || mood === "") return;
    today = new Date();

    axios
      .post(
        "https://weather-mood-server.herokuapp.com/posts",
        {
          content: content,
          mood: mood,
          year: today.getFullYear(),
          month: today.getMonth() + 1,
          day: today.getDate(),
          hour: today.getHours(),
          minute: today.getMinutes(),
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("Loggin to post!");
        } else {
          setMoodList([
            ...moodList,
            {
              content: content,
              mood: mood,
              id: id,
              year: today.getFullYear(),
              month: today.getMonth() + 1,
              day: today.getDate(),
              hour: today.getHours(),
              minute: today.getMinutes(),
              username: response.data.username,
            },
          ]);

          setContent("");
          setMood("");
          setID(id + 1);
        }
      });
  };

  const deletePost = (ID) => {
    axios
      .delete(`https://weather-mood-server.herokuapp.com/posts/${ID}`)
      .then(() => {
        console.log("remove the post");
        const newList = moodList;
        const updateList = newList.filter((item) => item.id !== ID);

        setMoodList(updateList);
      });
  };

  return (
    <div className="PostBar">
      <div className="PostBarInput">
        {/*<Select
          placeholder={defaultMood.label}
          options={options}
          className="PostBarMood"
          isSearchable={false}
          onChange={handleSelect}
        />*/}
        <select
          className="PostBarMood"
          defaultValue={"DEFAULT"}
          onChange={handleSelect}
        >
          <option disabled value="DEFAULT" hidden className="moodSelectDefault">
            Mood?
          </option>
          <option value="Clear" className="moodSelector">
            Clear
          </option>
          <option value="Cloud" className="moodSelector">
            Cloud
          </option>
          <option value="Thunder" className="moodSelector">
            Thunder
          </option>
          <option value="Rain" className="moodSelector">
            Rain
          </option>
          <option value="Mist" className="moodSelector">
            Mist
          </option>
          <option value="Snow" className="moodSelector">
            Snow
          </option>
        </select>
        <textarea
          className="PostBarContent"
          placeholder="What's on your mind?"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        ></textarea>
        <button className="PostBarButton" onClick={postMood}>
          Post
        </button>
      </div>
      <div className="PostBarSpace"></div>
      <div className="PostBarOutput">
        {moodList.map((moodList, index) => {
          return (
            <WeatherMood
              username={moodList.username}
              currentUser={props.currentUser}
              content={moodList.content}
              mood={moodList.mood}
              id={moodList.id}
              year={moodList.year}
              month={moodList.month}
              day={moodList.day}
              hour={moodList.hour}
              minute={moodList.minute}
              key={index}
              deletePost={deletePost}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PostBar;
