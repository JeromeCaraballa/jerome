const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Student = require("./models/Student");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

  
app.get("/", (req, res) => {
  res.send("Server Running");
});


app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});


app.post("/students", async (req, res) => {
  const { name, course, age } = req.body;

  const newStudent = new Student({
    name,
    course,
    age,
  });

  await newStudent.save();
  res.json(newStudent);
});


app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, course, age } = req.body;

  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    { name, course, age },
    { new: true }
  );

  res.json(updatedStudent);
});


app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  await Student.findByIdAndDelete(id);

  res.json({
    message: "Student Deleted",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});