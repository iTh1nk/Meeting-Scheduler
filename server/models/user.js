const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    index: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  group: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  meetings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meeting",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
