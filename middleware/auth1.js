const jwt = require("jsonwebtoken");
const config = require("config");
const Profile = require("../models/Profile");

module.exports = async (req, res, next) => {
  // Get token from header
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  const token = req.header("x-auth-token");
  console.log("In auth1");
  console.log(token);
  console.log("Out of auth1");

  // Check if not token
  if (!token) {
    return res.json(profiles);
  }

  // Verify token
  try {
    jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      if (error) {
        return res.json(profiles);
      } else {
        req.user = decoded.user;
        console.log(req.user);
        console.log("Out of auth1");
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
