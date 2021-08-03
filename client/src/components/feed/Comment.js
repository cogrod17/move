import React from "react";
import { connect } from "react-redux";

const Comment = () => {
  return (
    <div className="comment">
      <div>
        <h4>Username along one</h4>
        <p className="comment-date">date</p>
      </div>
      <p>
        This is a comment about the post! alsdkjf a;slkfjqweoifj a aasdf a asdf
        asdfasdfa sa sdfa adsfadsf a;sdlkfj q[weoifj ;lak aelfj{" "}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Comment);
