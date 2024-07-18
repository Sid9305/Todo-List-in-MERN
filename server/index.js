const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const dotenv = require("dotenv");
const PORT = 8000;

const TodoModel = require("./models/Todo");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded(true));
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", async (req, res) => {
  const task = req.body.title;
  if (!task) {
    return res.status(400).send("Task title is required");
  }
  const newTask = new TodoModel({
    title: task,
  });

  try {
    await newTask.save();
    res.send("Todo Saved");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving todo");
  }
});

// read
app.get("/display", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    // if any data is there, it gets stored in todos, nhi h toh error deta hai
    res.json(todos);
  } catch (error) {
    console.log(error);
    // server side error : 500
    res.status(500).send("Error");
  }
});

// put request for updating todo task

// 1 , 2 , 3 , 4
// id = 5
app.put("/update/:id", async (req, res) => {
  const id = req.params.id; //id
  const updatedTask = req.body.title; //updated task
  try {
    const update = await TodoModel.findById(id);
    // it returns the object when id is matched

    if (!update) {
      return res.status(404).send("Task not found");
    }
    // update mein data h, means data mil gayi
    update.title = updatedTask; //reassign task
    await update.save(); // stores in db
    res.send("Task updated"); // hogya bhai khatam kaam update ka
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

// delete request
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await TodoModel.findByIdAndDelete(id).exec();
  // exec it reflects the output in the database
  res.send("Deleted");
});

app.listen(PORT, () => {
  console.log("Server is listening on " + PORT);
});
