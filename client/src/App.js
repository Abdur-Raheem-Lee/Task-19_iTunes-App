import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Music from "./components/Music";
import Books from "./components/Books";
import Favorite from "./components/Favorite";

class App extends React.Component {
  render() {
    return (
      // Using "Router", "Switch", "Route" and "Link" to navigate between components so that the webpage
      // doesn't need to load everytime the user goes to a new component/page
      <Router>
        <div>
          <h1>The Music and eBook Store</h1>
          <nav>
            <ul>
              <li>
                <Link to={"/Home"}>
                  <h4>
                    <b>Home</b>
                  </h4>
                </Link>
              </li>
              <li>
                <Link to={"/Music"}>
                  <h4>
                    <b>Music</b>
                  </h4>
                </Link>
              </li>
              <li>
                <Link to={"/Books"}>
                  <h4>
                    <b>Books</b>
                  </h4>
                </Link>
              </li>
              <li>
                <Link to={"/Favorite"}>
                  <h4>
                    <b>Favorites</b>
                  </h4>
                </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/Home" component={Home} />
            <Route path="/Music" component={Music} />
            <Route path="/Books" component={Books} />
            <Route path="/Favorite" component={Favorite} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
