const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/read-book");

    console.log("Connect successfully");
  } catch (error) {
    console.log("connect fall");
  }
}

module.exports = { connect };
