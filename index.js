const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const http = require("http").createServer(app);
const jwt = require("jsonwebtoken");
const io = require("socket.io")(http);

const dotenv = require("dotenv");
dotenv.config();

const db = require("./server/models");

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api/auth", cors(corsOptions), (req, res) => {
  res.json({ message: "noGoal" });
});

app.use("/api/jwt", (req, res) => {
  let token = jwt.sign(
    { user: "Mac" },
    process.env.SECRET_KEY,
    {expiresIn: "2h"},
    (err, token) => {
      res.json({ token });
    }
  );
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

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
