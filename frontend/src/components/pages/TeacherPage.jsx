import DirectoryPage from "./DirectoryPage.jsx";

const config = {
  title: "Professors",
  description: "Faculty management and department assignments.",
  heading: "Faculty Directory",
  button: "+ Add Professor",
  endpoint: "/api/teachers",
  fields: [
    ["name", "Name", "text"],
    ["age", "Age", "number"],
    ["department", "Department", "text"],
    ["teacherNo", "Teacher No.", "text"],
  ],
};

export default function TeacherPage() {
  return <DirectoryPage config={config} />;
}