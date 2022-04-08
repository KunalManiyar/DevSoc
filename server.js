const express = require("express");
// const connectDB = require("./config/db");
const { connectDatabase } = require("./config/db");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}
connectDatabase();

// Init Middleware
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
