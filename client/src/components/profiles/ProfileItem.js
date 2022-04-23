import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { upvote, downvote } from "../../actions/profile";
const ProfileItem = ({
  upvote,
  downvote,
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
    totalVotes,
    id = _id,
  },
}) => {
  console.log(id);
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>

        <>
          <button
            onClick={() => upvote(id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" /> <span>{totalVotes}</span>
          </button>
          <button
            onClick={() => downvote(id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>
        </>
      </div>

      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { upvote, downvote })(ProfileItem);
