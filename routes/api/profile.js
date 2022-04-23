const express = require("express");
const axios = require("axios");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const auth1 = require("../../middleware/auth1");
const auth2 = require("../../middleware/auth2");
const request = require("request");
var XMLHttpRequest = require("xhr2");

const { check, validationResult } = require("express-validator");
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require("normalize-url");
const checkObjectId = require("../../middleware/checkObjectId");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.get("/loggedInUserProfileId", auth2, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.user.id,
//     }).populate("user", ["name", "avatar"]);

//     if (!profile) {
//       return res.status(400).json({ msg: "There is no profile for this user" });
//     }

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  auth,
  check("status", "Status is required").notEmpty(),
  check("skills", "Skills is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ""
          ? normalize(website, { forceHttps: true })
          : "",
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill) => " " + skill.trim()),
      ...rest,
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", auth1, async (req, res) => {
  const userId = req.user.id;
  var userProfileId = await Profile.find({ user: userId }, { _id: 1 });
  userProfileId = userProfileId[0]["_id"];

  try {
    const requ = new XMLHttpRequest();
    requ.open(
      "POST",
      `http://127.0.0.1:8000/test/${JSON.stringify(userProfileId)}`
    );
    requ.onload = () => {
      const flaskMessage = requ.responseText;
    };
    requ.send();

    request("http://127.0.0.1:8000/flask", async (error, response, body) => {
      body = JSON.parse(body);

      const profiles = [];
      var profile;
      for (let i = 0; i < body.length; i++) {
        profile = await Profile.find({
          _id: body[i],
        }).populate("user", ["name", "avatar"]);
        profiles.push(profile[0]);
      }
      if (!profiles) return res.status(400).json({ msg: "Profile not found" });
      res.json(profiles); //Display the response on the website
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ]);

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  auth,
  check("title", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("from", "From date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  auth,
  check("school", "School is required").notEmpty(),
  check("degree", "Degree is required").notEmpty(),
  check("fieldofstudy", "Field of study is required").notEmpty(),
  check("from", "From date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get("/github/:username", async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `token ${config.get("githubClientId")}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "No Github profile found" });
  }
});

router.put("/upvote/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    // if (req.params.id === req.user.id) {
    // }
    // Check if the user has already upvoted
    if (
      profile.upvotes.some((upvote) => upvote.user.toString() === req.user.id)
    ) {
      return res.status(400).json({ msg: "User already upvoted" });
    } else if (
      profile.downvotes.some(
        (downvote) => downvote.user.toString() === req.user.id
      )
    ) {
      let i;
      for (i = 0; i < profile.downvotes.length; i++) {
        if (profile.downvotes[i].user.toString() === req.user.id) {
          break;
        }
      }
      profile.downvotes.splice(i, 1);
      profile.upvotes.unshift({ user: req.user.id });
      profile.totalVotes = profile.totalVotes + 2;
    } else {
      profile.upvotes.unshift({ user: req.user.id });
      profile.totalVotes = profile.totalVotes + 1;
    }

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/downvote/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    // if (req.params.id === req.user.id) {
    // }
    // Check if the user has already downvoted

    if (
      profile.downvotes.some(
        (downvote) => downvote.user.toString() === req.user.id
      )
    ) {
      return res.status(400).json({ msg: "User already downvoted" });
    } else if (
      profile.upvotes.some((upvote) => upvote.user.toString() === req.user.id)
    ) {
      let i;
      for (i = 0; i < profile.upvotes.length; i++) {
        if (profile.upvotes[i].user.toString() === req.user.id) {
          break;
        }
      }
      profile.upvotes.splice(i, 1);
      profile.downvotes.unshift({ user: req.user.id });
      profile.totalVotes = profile.totalVotes - 2;
    } else {
      profile.downvotes.unshift({ user: req.user.id });
      profile.totalVotes = profile.totalVotes - 1;
    }

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
