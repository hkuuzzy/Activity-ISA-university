const express = require("express");
const mongoose = require("mongoose");
const { connectToDatabase } = require("./database");
const { Announcement, Student, Teacher } = require("./models");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/students", async (_req, res) => {
  const students = await Student.find().sort({ _id: 1 }).lean();
  res.json(students);
});

app.post("/api/students", async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

app.get("/api/teachers", async (_req, res) => {
  const teachers = await Teacher.find().sort({ _id: 1 }).lean();
  res.json(teachers);
});

app.post("/api/teachers", async (req, res) => {
  const teacher = await Teacher.create(req.body);
  res.status(201).json(teacher);
});

app.get("/api/announcements", async (_req, res) => {
  const announcements = await Announcement.find().sort({ _id: 1 }).lean();
  res.json(announcements);
});

app.get("/api/dashboard", async (_req, res) => {
  const [students, teachers, featuredAnnouncement] = await Promise.all([
    Student.countDocuments(),
    Teacher.countDocuments(),
    Announcement.findOne().sort({ _id: 1 }).lean(),
  ]);

  res.json({
    students,
    teachers,
    classesToday: 12,
    attendance: "96%",
    featuredAnnouncement,
  });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API route not found." });
});

app.use((error, _req, res, _next) => {
  if (
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.Error.CastError ||
    error.status === 400
  ) {
    res.status(400).json({ error: error.message });
    return;
  }

  console.error("API request failed:", error);
  res.status(500).json({ error: "Internal server error." });
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend is listening on port ${port}.`);
    });
  })
  .catch((error) => {
    console.error("Could not start the backend:", error.message);
    process.exitCode = 1;
  });
