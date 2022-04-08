const express = require("express");
const request = require("request");
const auth = require("../../middleware/auth");
const router = express.Router();

router.get("/home", (req, res) => {
  request("http://127.0.0.1:8000/flask", function (error, response, body) {
    console.error("error:", error); // Print the error
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    body = JSON.parse(body);
    res.send(body); //Display the response on the website
  });
});
module.exports = router;
