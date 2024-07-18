const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});
const TodoModel = new mongoose.model("todos", TodoSchema);
module.exports = TodoModel;