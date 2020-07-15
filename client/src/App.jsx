import React, { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/LandingPage/Signup";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserProfile from "./components/UserProfile/userProfile";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import Lobby from "./components/Lobby/Lobby";
import Board from "./components/Board/Board";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    setUser(true);
  };

  useEffect(() => {
    fetch("http://localhost:3051/", {
      method: "POST",
      credentials: "include",
    }).then((result) => {
      if (result.status === 200) {
        console.log("You are logged in ");
        setUser(true);
        setLoading(false);
      } else {
        setLoading(false);
        setUser(false);
      }
    });
    return () => {};
  }, [user, loading]);

  return (
    <div className="App">
      <Router>
        <Route
          exact
          path="/"
          render={(props) => (
            <LandingPage {...props} handleLogin={handleLogin} user={user} />
          )}
        />
        {loading && <div>Is loadin </div>}

        {loading ? (
          ""
        ) : (
          <ProtectedRoute exact path="/lobby" user={user} component={Lobby} />
        )}
        {loading ? (
          ""
        ) : (
          <ProtectedRoute exact path="/board" user={user} component={Board} />
        )}

        <Route exact path="/signup" component={Signup} />
        {loading ? (
          ""
        ) : (
          <ProtectedRoute
            exact
            path="/profile"
            user={user}
            component={UserProfile}
          />
        )}

        {loading ? (
          ""
        ) : (
          <Route exact path="/unauthorized" component={Unauthorized} />
        )}
      </Router>
    </div>
  );
}

export default App;
