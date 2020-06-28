const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const db = require("../models");

module.exports = {
  createUser: (req, res) => {
    res.json({message: "create"})
  },
  readUser: (req, res) => {
    res.json({message: "read"})
  },
  updateUser: (req, res) => {
    res.json({message: "update"})
  },
  deleteUser: (req, res) => {
    res.json({message: "delete"})
  },
}
