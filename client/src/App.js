import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import HomeBody from "./components/HomeBody";
import Admin from "./components/Admin";
import Signup from "./components/Signup";
import NoMatch from "./components/NoMatch";

import { AssignContext } from "./AssignContext";
import Axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState("");

  const parseJwt = (token) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/auth", {
      headers: {
        authorization: localStorage.getItem("auth"),
      },
    })
      .then((resp) => {
        if (resp.data.message === "ok") {
          setIsAuthenticated(true);
          setLoginUser(parseJwt(localStorage.getItem("auth").split(" ")[1]).user);
        }
      })
      .catch((err) => {
        if (err) console.log(err.response);
      });
  }, [isAuthenticated]);

  return (
    <div>
      <AssignContext.Provider value={{ isAuthenticated, setIsAuthenticated, loginUser }}>
        <NavMenu />
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <HomeBody />} />
            <Route exact path="/admin" render={(props) => <Admin />} />
            <Route
              exact
              path="/signup"
              render={(props) => (isAuthenticated ? <HomeBody /> : <Signup />)}
            />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AssignContext.Provider>
    </div>
  );
}

export default App;
