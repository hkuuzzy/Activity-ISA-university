import Layout from "../navbar/Layout.jsx";
import PageHeader from "../navbar/PageHeader.jsx";
import "../styles/ProfilePage.css";

const profileInfo = [
  ["Full Name", "Jane Dela Cruz"],
  ["Age", "19"],
  ["Course", "BS Information Technology"],
  ["Address", "18 San Miguel St., Quezon City"],
  ["Student No.", "2024-1048"],
  ["Birthdate", "2006-05-14"],
];

const studentSchedule = [
  ["7:30 AM", "Programming 1", "Room 301"],
  ["9:00 AM", "Data Structures", "Room 204"],
  ["10:30 AM", "Physics", "Lab 2"],
  ["1:00 PM", "English Literature", "Room 110"],
];

export default function ProfilePage() {
  return (
    <Layout>
      <PageHeader title="User Profile">Personal information and account details.</PageHeader>
      <div className="profile-layout">
        <section className="card profile-card">
          <div className="profile-top">
            <div className="avatar-wrap"><div className="avatar">JD</div></div>
            <div><h2>Jane Dela Cruz</h2><p className="muted">Student ID: 2024-1048</p></div>
          </div>
          <div className="profile-grid">
            {profileInfo.map(([label, value]) => (
              <div className="info-block" key={label}>
                <span className="label">{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="card schedule-panel">
          <h3>Student Schedule</h3>
          {studentSchedule.map(([time, subject, room]) => (
            <div className="schedule-item" key={time}>
              <div className="time">{time}</div>
              <div><strong>{subject}</strong><span>{room}</span></div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}