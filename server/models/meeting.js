const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  title: {
    type: String,
    index: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timeStart: {
    type: Date,
    required: true,
  },
  timeEnd: {
    type: Date,
    required: true
  },
  hosts: {
    type: String,
    required: true,
  },
  attendees: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Meeting = mongoose.model("Meeting", MeetingSchema);
module.exports = Meeting;
