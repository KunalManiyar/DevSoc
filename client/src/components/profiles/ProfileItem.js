import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { upvote, downvote, getProfiles } from "../../actions/profile";

const ProfileItem = ({
  upvote,
  downvote,
  profileId,
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
    totalVotes,
  },
  showActions,
}) => {
  useEffect(() => {
    getProfiles();
  }, [upvote, downvote]);
  console.log(profileId);
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
        {showActions && (
          <>
            <button
              onClick={() => upvote(profileId)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" /> <span>{totalVotes}</span>
            </button>
            <button
              onClick={() => downvote(profileId)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>
          </>
        )}
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
ProfileItem.defaultProps = {
  showActions: true,
};
ProfileItem.propTypes = {
  profileId: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { upvote, downvote })(ProfileItem);
