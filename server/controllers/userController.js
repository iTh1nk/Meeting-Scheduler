const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const db = require("../models");

module.exports = {
  getTest: (req, res) => {
    res.json({message: "hello user"})
  }
}
