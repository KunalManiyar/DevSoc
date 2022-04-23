const jwt = require("jsonwebtoken");
const config = require("config");
const Profile = require("../models/Profile");

module.exports = async (req, res, next) => {
  // Get token from header
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  const token = req.header("x-auth-token");

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

        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
