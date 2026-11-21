const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 1 },
    course: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    studentNo: { type: String, required: true, trim: true },
    birthdate: { type: String, required: true },
  },
  { timestamps: true },
);

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 1 },
    department: { type: String, required: true, trim: true },
    teacherNo: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const announcementSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    postedBy: { type: String, required: true, trim: true },
    postedAt: { type: String, required: true },
    important: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = {
  Announcement: mongoose.model("Announcement", announcementSchema),
  Student: mongoose.model("Student", studentSchema),
  Teacher: mongoose.model("Teacher", teacherSchema),
};
