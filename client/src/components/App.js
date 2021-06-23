import React from "react";
import { Router, Route } from "react-router-dom";
import Header from "./misc./Header";
import Landing from "./landing/Landing";
import WorkoutsHistory from "./profile/WorkoutsHistory";
import Friends from "./friends/Friends";
import WorkoutView from "./profile/WorkoutView";
import Bounties from "./bounties/Bounties";
import Chat from "./chat/Chat";
import Profile from "./profile/Profile";
import LogoutModal from "./misc./LogoutModal";
import history from "../history";
import "../styles/app.css";
import Feed from "./feed/Feed";
import { connect } from "react-redux";
import { signInWithToken } from "../actions";

class App extends React.Component {
  async componentDidMount() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) history.push("/");
    if (token) {
      await this.props.signInWithToken(token);
    }
  }

  render() {
    return (
      <div className="app">
        <LogoutModal />
        <Router history={history}>
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/feed" exact component={Feed} />
          <Route path="/bounties" exact component={Bounties} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/workouts/history" exact component={WorkoutsHistory} />
          <Route path="/workouts/view" exact component={WorkoutView} />
          <Route path="/friends" exact component={Friends} />
          <Route path="/chat" exact component={Chat} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { signInWithToken })(App);
