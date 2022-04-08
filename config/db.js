// const mongoose = require("mongoose");
// const config = require("config");
// const db = config.get("mongoURI");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useNewUrlParser: true,
//       // useCreateIndex: true,
//       // useFindAndModify: false,
//     });
//     console.log("MongoDB Connected...");
//   } catch (err) {
//     console.error(err.message);
//     // Exit process with failure
//     process.exit(1);
//   }
// };

const mongoose = require("mongoose");
exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => {
      console.log(`Database Connected:${con.connection.host}`);
    })
    .catch((err) => console.log(err));
};

// module.exports = connectDB;
