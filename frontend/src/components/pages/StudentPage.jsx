import DirectoryPage from "./DirectoryPage.jsx";

const config = {
  title: "Students",
  description: "University information system records.",
  heading: "Student Directory",
  button: "+ Add Student",
  endpoint: "/api/students",
  fields: [
    ["name", "Name", "text"],
    ["age", "Age", "number"],
    ["course", "Course", "text"],
    ["address", "Address", "text"],
    ["studentNo", "Student No.", "text"],
    ["birthdate", "Birthdate", "date"],
  ],
};

export default function StudentPage() {
  return <DirectoryPage config={config} />;
}