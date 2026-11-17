const records = {
  students: [
    { _id: "student-1", name: "Maria Santos", age: 19, course: "BSIT", address: "123 Rizal St., Manila", studentNo: "2024-1001", birthdate: "2006-03-14" },
    { _id: "student-2", name: "John Dela Cruz", age: 20, course: "BSCS", address: "45 Mabini Ave., Quezon City", studentNo: "2024-1002", birthdate: "2005-11-02" },
    { _id: "student-3", name: "Anne Reyes", age: 18, course: "BSBA", address: "88 Aurora Blvd., Pasig", studentNo: "2024-1003", birthdate: "2007-01-09" },
  ],
  teachers: [
    { _id: "teacher-1", name: "Prof. Carmela Lopez", age: 42, department: "Computer Science", teacherNo: "T-101" },
    { _id: "teacher-2", name: "Prof. Daniel Ramos", age: 38, department: "Business Administration", teacherNo: "T-102" },
    { _id: "teacher-3", name: "Prof. Grace Mendoza", age: 45, department: "General Education", teacherNo: "T-103" },
  ],
  announcements: [
    { _id: "announcement-1", category: "Important", title: "Midterm Examinations", body: "Midterm exams will begin next Monday, October 14, at 8:00 AM. Students are required to bring their school ID and assigned materials.", postedBy: "Registrar", postedAt: "October 8", important: true },
    { _id: "announcement-2", category: "Campus", title: "Library Hours Extended", body: "The university library will remain open until 8:00 PM during the exam week to support student review sessions and study groups.", postedBy: "Library Office", postedAt: "October 7", important: false },
    { _id: "announcement-3", category: "Event", title: "Career Fair 2026", body: "Students are invited to attend the annual career fair on Friday, October 18, where local companies will present internship and scholarship opportunities.", postedBy: "Career Services", postedAt: "October 6", important: false },
  ],
};

function copy(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function request(path, options = {}) {
  const method = options.method || "GET";

  if (path === "/api/dashboard" && method === "GET") {
    return {
      students: records.students.length,
      teachers: records.teachers.length,
      classesToday: 12,
      attendance: "96%",
      featuredAnnouncement: copy(records.announcements[0] || null),
    };
  }

  const collection = {
    "/api/students": "students",
    "/api/teachers": "teachers",
    "/api/announcements": "announcements",
  }[path];

  if (collection && method === "GET") {
    return copy(records[collection]);
  }

  if ((path === "/api/students" || path === "/api/teachers") && method === "POST") {
    const record = JSON.parse(options.body);
    record._id = `${collection}-${Date.now()}`;
    records[collection].push(record);
    return copy(record);
  }

  throw new Error(`No demo data is available for ${method} ${path}.`);
}