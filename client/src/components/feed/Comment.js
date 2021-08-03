import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import { formatDate } from "../../helperFunctions";

const Comment = ({ data }) => {
  return (
    <div className="comment">
      <div>
        <h4 onClick={() => history.push(`/profile/${data.author}`)}>
          {data.author}
        </h4>
        <p className="comment-date">{formatDate(data.date)}</p>
      </div>
      <p className="comment-body">{data.text}</p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Comment);
