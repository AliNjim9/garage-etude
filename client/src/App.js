import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import Room from "./Room";
import {Nav} from './components/NavBar/nav.js';
import {Auth} from './components/Auth/Auth.js';
import {Home} from './components/Home/home.js';
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Footer from "./components/Footer/Footer";
const App = () => {
  return (
    <Router>
      <Nav/>
      <Switch>
					<Route exact path="/auth" component={Auth} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/room" component={Room} />
          <Redirect from="/" to="room" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
