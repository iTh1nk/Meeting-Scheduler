const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const db = require("./server/models");

const PORT = process.env.PORT || 3001;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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
