const mongoose = require("mongoose");
const db = require("../models");

module.exports = {
  getTest: (req, res) => {
    res.json({message: "hello meeting"})
  }
}
