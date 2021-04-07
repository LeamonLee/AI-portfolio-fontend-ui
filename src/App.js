import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Upload from "./components/Upload";
import ShowResult from "./components/ShowResult";
import Home from "./components/Home";

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/od/image/upload">Upload</Link>
          </li>
          <li>
            <Link to="/od/image/show-result">ShowResult</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/od/image/upload">
          <Upload />
        </Route>
        <Route path="/od/image/show-result">
          <ShowResult />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
