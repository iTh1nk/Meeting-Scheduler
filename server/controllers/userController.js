const bcrypt = require("bcrypt");
const _ = require("lodash");
const colors = require("colors");

const db = require("../models");

module.exports = {
  createUser: (req, res) => {
    let data = _.pick(req.body, ["username", "password", "email", "group"]);
    db.User.findOne({ username: data.username }).then((dbUser) => {
      if (!dbUser)
        return res.status(404).json({ message: "No username found!" });
      else {
        bcrypt.compare(data.password, dbUser.password, function (err, result) {
          if (err) {
            return res.status(500).json({ error: err });
          } else if (!result) {
            return res
              .status(401)
              .json({ message: "Username or password doesn't match!" });
          } else {
            return res.status(200).json({ token });
          }
        });
      }
    });
  },
  readUser: (req, res) => {
    db.User.find({})
      .then((dbUser) => {
        return res.status(200).json({ dbUser });
      })
      .catch((err) => {
        if (err) return res.status(500);
      });
  },
  updateUser: (req, res) => {
    let id = req.params.id;
    let data = _.pick(req.body, ["password", "email"]);
    bcrypt.hash(data.password, 10, (err, hash) => {
      if (err) {
        console.log(colors.green(err));
        return res.status(500).json({
          error: err,
        });
      } else {
        db.User.update(
          { _id: id },
          {
            $set: {
              password: hash,
              email: data.email,
              updatedAt: Date.now(),
            },
          }
        )
          .then((dbUser) => {
            return res.status(200).json({ message: "User Updated!" });
          })
          .catch((err) => {
            if (err) res.status(500);
          });
      }
    });
  },
  deleteUser: (req, res) => {
    id = req.params.id;
    db.User.findByIdAndDelete({ _id: id })
      .then((dbUser) => {
        return res.status(200).json({ message: "User Deleted!" });
      })
      .catch((err) => {
        if (err) return res.status(500);
      });
  },
};
