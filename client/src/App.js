import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import HomeBody from "./components/HomeBody";
import Admin from "./components/Admin";
import NoMatch from "./components/NoMatch";

import { AssignContext } from "./AssignContext";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <AssignContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        <NavMenu />
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <HomeBody />} />
            <Route exact path="/admin" render={(props) => <Admin />} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AssignContext.Provider>
    </div>
  );
}

export default App;
