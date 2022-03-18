import "../App.css";
import React, { useEffect, useState } from "react";

function Loading(props) {
  const delay = 5000;

  useEffect(() => {
    setTimeout(() => {
      props.setLoadingVisible(false);
    }, delay);
  }, []);

  return props.loadingVisible ? (
    <div className="Loading">
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  ) : (
    <div></div>
  );
}

export default Loading;
