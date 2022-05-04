import "../App.css";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";

function Mynavbar(props) {
  const [showToday, setShowToday] = useState(true);

  useEffect(() => {
    //console.log("use effect: " + showToday);
    if (showToday) props.setShowToday(true);
    else props.setShowToday(false);

    axios
      .get("https://weather-mood-server.herokuapp.com/users/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        //console.log(response.data.username);
        props.setCurrentUser(response.data.username);
      });
  }, []);

  const handleTodayClick = () => {
    setShowToday(true);
    props.setShowToday(true);
  };

  const handleForecastClick = () => {
    setShowToday(false);
    props.setShowToday(false);
  };

  const handleSignInClick = () => {
    props.setOpenSignIn(true);
    props.setOpenSignUp(false);
  };

  const handleSignUpClick = () => {
    props.setOpenSignIn(false);
    props.setOpenSignUp(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    props.setAuthState(false);
    props.setCurrentUser("");
  };

  let todayFontWeight =
    showToday && !props.openSignIn && !props.openSignUp
      ? { fontWeight: "bold" }
      : { fontWeight: "normal" };

  let forecastFontWeight =
    !showToday && !props.openSignIn && !props.openSignUp
      ? { fontWeight: "bold" }
      : { fontWeight: "normal" };

  let signInFontWeight = props.openSignIn
    ? { fontWeight: "bold" }
    : { fontWeight: "normal" };

  let signUpFontWeight = props.openSignUp
    ? { fontWeight: "bold" }
    : { fontWeight: "normal" };

  return (
    <Navbar bg="light" sticky="top" className="weatherNavbar sticky-top">
      <Container>
        <Navbar.Brand>WeatherMood</Navbar.Brand>
        <Nav className="me-auto">
          <div className="navbarLinks">
            <div className="navbarLeft">
              <div
                className="navItem"
                style={todayFontWeight}
                onClick={() => {
                  if (!props.openSignIn && !props.openSignUp)
                    handleTodayClick();
                }}
              >
                Today
              </div>
              <div
                className="navItem"
                style={forecastFontWeight}
                onClick={() => {
                  if (!props.openSignIn && !props.openSignUp)
                    handleForecastClick();
                }}
              >
                Forecast
              </div>
            </div>
            <div className="navbarRight">
              {!props.authState ? (
                <div className="SignInAndSignUp">
                  <div
                    className="navItem"
                    style={signInFontWeight}
                    onClick={() => {
                      handleSignInClick();
                    }}
                  >
                    Sign In
                  </div>
                  <div
                    className="navItem"
                    style={signUpFontWeight}
                    onClick={() => {
                      handleSignUpClick();
                    }}
                  >
                    Sign Up
                  </div>
                </div>
              ) : (
                <div className="UsernameAndLogout">
                  <div className="Signedusername">Hi, {props.currentUser}</div>
                  <div
                    className="Logout"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Log out
                  </div>
                </div>
              )}
            </div>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Mynavbar;
