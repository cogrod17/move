import React from "react";
import { Router, Route } from "react-router-dom";
import Header from "./misc./Header";
import Landing from "./landing/Landing";
import Chat from "./chat/Chat";
import Profile from "./profile/Profile";
import LogoutModal from "./misc./LogoutModal";
import Friends from "./friends/Friends";
import FriendRequests from "./friends/FriendRequests";
import EditImage from "./profile/EditImage";
import NewChat from "./chat/NewChat";
import NewWorkout from "./profile/NewWorkout";
import history from "../history";
import "../styles/app.css";
import Feed from "./feed/Feed";
import ScrollToTop from "./ScrollToTop";
import Loader from "./misc./Loader";
import { connect } from "react-redux";
import { signInWithToken, isLoading } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      history.push("/");
      this.props.isLoading(false);
    }
    if (token) this.props.signInWithToken(token);
  }

  render() {
    if (this.props.loading) return <Loader />;

    return (
      <div className="app">
        <LogoutModal />
        <Friends />
        <FriendRequests />
        <NewChat />
        <EditImage />
        <NewWorkout />
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

export default connect(mapStateToProps, { signInWithToken, isLoading })(App);
