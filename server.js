// Express is backend framework
const express = require("express");
// Mongoose is the ORM for the mongodb database
const mongoose = require("mongoose");
// cors
const cors = require("cors");

// Initialize express
const app = express();

// Bring in config
const config = require("config");
const path = require("path");

// Body-parser middleware
// Body-parser allow us to take request and get the data from the body
app.use(express.json());

// cors
app.use(cors());

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

// MongoDB URI
const db = config.get("mongoURI");
// localhost connection: "mongoURI": "mongodb://localhost:27017/medical-information-system"

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Use routes
// Anything the goes to api/items, should refer to items variable
// app.use("/api/users", require("./api/users"));
app.use("/api/user/login", require("./api/login"));
app.use("/api/user/patient", require("./api/patient"));
app.use("/api/user/physician", require("./api/physician"));
app.use("/api/health-history", require("./api/healthHistory"));
app.use("/api/reset-password", require("./api/resetPassword"));

// Declare PORT number (process.env.port is for HEROKU)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
