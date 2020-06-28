const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const colors = require("colors");
const http = require("http").createServer(app);
const jwt = require("jsonwebtoken");
const io = require("socket.io")(http);

const dotenv = require("dotenv");
dotenv.config();

const db = require("./server/models");
const userRoutes = require("./server/routes/userRoutes");
const meetingRoutes = require("./server/routes/meetingRoutes");

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/login", (req, res) => {
  let token = jwt.sign(
    { user: "Mac", expiresIn: "60 * 60" },
    process.env.SECRET_KEY,
    (err, token) => {
      res.json({ token });
    }
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api/user", authorizationJWT, userRoutes);
app.use("/api/meeting", meetingRoutes);

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/meetingscheduler",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

http.listen(PORT, () => {
  console.log(`🚀Server is running on PORT: ${PORT}`);
});

//User Authorization
function authorizationJWT(req, res, next) {
  let bearerToken = req.headers["authorization"];
  if (!(bearerToken === undefined)) {
    let token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) res.sendStatus(403);
      else next();
    });
  } else res.sendStatus(403);
}