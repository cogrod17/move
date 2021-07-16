import React from "react";
import { Router, Route } from "react-router-dom";
import Header from "./misc./Header";
import Landing from "./landing/Landing";
import Chat from "./chat/Chat";
import Profile from "./profile/Profile";
import LogoutModal from "./misc./LogoutModal";
import Friends from "./friends/Friends";
import FriendRequests from "./friends/FriendRequests";
import history from "../history";
import "../styles/app.css";
import Feed from "./feed/Feed";
import ScrollToTop from "./ScrollToTop";
import { connect } from "react-redux";
import { signInWithToken } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) history.push("/");
    if (token) {
      this.props.signInWithToken(token);
    }
  }

  render() {
    return (
      <div className="app">
        <LogoutModal />
        <Friends />
        <FriendRequests />
        <Router history={history}>
          <ScrollToTop />
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/feed" exact component={Feed} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/profile/:username" exact component={Profile} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { signInWithToken })(App);
