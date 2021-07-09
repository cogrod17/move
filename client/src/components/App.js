import React from "react";
import { Router, Route } from "react-router-dom";
import Header from "./misc./Header";
import Landing from "./landing/Landing";
import ViewUser from "./view-user/ViewUser";
import Chat from "./chat/Chat";
import Profile from "./profile/Profile";
import LogoutModal from "./misc./LogoutModal";
import Friends from "./friends/Friends";
import history from "../history";
import "../styles/app.css";
import Feed from "./feed/Feed";
import ScrollToTop from "./ScrollToTop";
import { connect } from "react-redux";
import { signInWithToken } from "../actions";

//import Friends from "./friends/Friends";

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
        <Friends />
        <Router history={history}>
          <ScrollToTop />
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/feed" exact component={Feed} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/viewuser" exact component={ViewUser} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { signInWithToken })(App);
