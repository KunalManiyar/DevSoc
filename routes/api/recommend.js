const express = require("express");
const request = require("request");
const auth = require("../../middleware/auth");
const router = express.Router();
const Profile = require("../../models/Profile");
// router.get("/home", (req, res) => {
//   request("http://127.0.0.1:8000/flask", function (error, response, body) {
//     console.error("error:", error); // Print the error
//     console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//     body = JSON.parse(body);
//     res.send(body); //Display the response on the website
//   });
// });

router.get("/home", (req, res) => {
  request("http://127.0.0.1:8000/flask", async (error, response, body) => {
    console.error("error:", error); // Print the error
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    body = JSON.parse(body);
    // console.log(body);
    id = ["621bada2a6dfc40e82a90d7f", "622da49aa68d77cb5107a8d9"];
    try {
      const profiles = await Profile.find({
        _id: id,
      }).populate("user", ["name", "avatar"]);

      if (!profiles) return res.status(400).json({ msg: "Profile not found" });
      res.json(profiles); //Display the response on the website
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
