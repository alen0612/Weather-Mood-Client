import "../App.css";
import WeatherMood from "./WeatherMood";
import React, { useState, useEffect } from "react";
import axios from "axios";

function PostBar(props) {
  let today;

  const [content, setContent] = useState("");
  const [id, setID] = useState(0);
  const [moodList, setMoodList] = useState([]);

  useEffect(() => {
    axios
      .get("https://weather-mood-server.herokuapp.com/posts")
      .then((response) => {
        console.log(response);
        setMoodList(response.data);
        //console.log(moodList);
      });
  }, []);

  const postMood = () => {
    if (content === "") return;
    today = new Date();

    axios
      .post(
        "https://weather-mood-server.herokuapp.com/posts",
        {
          content: content,
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
