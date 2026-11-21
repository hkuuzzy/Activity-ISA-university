const mongoose = require("mongoose");
const { connectToDatabase } = require("./database");
const { Announcement, Student, Teacher } = require("./models");

const demoData = [
  {
    model: Student,
    records: [
      { name: "Maria Santos", age: 19, course: "BSIT", address: "123 Rizal St., Manila", studentNo: "2024-1001", birthdate: "2006-03-14" },
      { name: "John Dela Cruz", age: 20, course: "BSCS", address: "45 Mabini Ave., Quezon City", studentNo: "2024-1002", birthdate: "2005-11-02" },
      { name: "Anne Reyes", age: 18, course: "BSBA", address: "88 Aurora Blvd., Pasig", studentNo: "2024-1003", birthdate: "2007-01-09" },
    ],
  },
  {
    model: Teacher,
    records: [
      { name: "Prof. Carmela Lopez", age: 42, department: "Computer Science", teacherNo: "T-101" },
      { name: "Prof. Daniel Ramos", age: 38, department: "Business Administration", teacherNo: "T-102" },
      { name: "Prof. Grace Mendoza", age: 45, department: "General Education", teacherNo: "T-103" },
    ],
  },
  {
    model: Announcement,
    records: [
      { category: "Important", title: "Midterm Examinations", body: "Midterm exams will begin next Monday, October 14, at 8:00 AM. Students are required to bring their school ID and assigned materials.", postedBy: "Registrar", postedAt: "October 8", important: true },
      { category: "Campus", title: "Library Hours Extended", body: "The university library will remain open until 8:00 PM during the exam week to support student review sessions and study groups.", postedBy: "Library Office", postedAt: "October 7", important: false },
      { category: "Event", title: "Career Fair 2026", body: "Students are invited to attend the annual career fair on Friday, October 18, where local companies will present internship and scholarship opportunities.", postedBy: "Career Services", postedAt: "October 6", important: false },
    ],
  },
];

async function seedIfEmpty(model, records) {
  const count = await model.countDocuments();
  if (count > 0) {
    console.log(`Skipping ${model.modelName}: its collection already contains ${count} records.`);
    return;
  }

  await model.insertMany(records);
  console.log(`Added ${records.length} ${model.modelName} demo records.`);
}

async function seedDatabase() {
  await connectToDatabase();

  try {
    for (const { model, records } of demoData) {
      await seedIfEmpty(model, records);
    }
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error("Could not seed demo data:", error.message);
  process.exitCode = 1;
});
