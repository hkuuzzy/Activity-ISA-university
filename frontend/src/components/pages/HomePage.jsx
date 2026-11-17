import Layout from "../navbar/Layout.jsx";
import LoadState from "../modalDirectory/LoadState.jsx";
import PageHeader from "../navbar/PageHeader.jsx";
import useApi from "../../services/useApi.js";
import "../styles/HomePage.css";

const schedule = [
  ["7:30 AM", "Grade 9 “ Rizal A English", "Room 101"],
  ["9:00 AM", "Grade 10 “ Rizal A Mathematics", "Room 204"],
  ["10:30 AM", "Grade 11 “ Mabini A Science", "Lab 2"],
  ["1:00 PM", "Grade 12 “ Luna A History", "Room 305"],
];

export default function HomePage() {
  const { data, error, loading, reload } = useApi("/api/dashboard");
  return (
    <Layout>
      <PageHeader title="Good day">Here is what is happening at school today.</PageHeader>
      <LoadState loading={loading} error={error} onRetry={reload} />
      {data && (
        <>
          <div className="grid">
            <div className="card stat"><b>{data.students}</b><span>Students</span></div>
            <div className="card stat"><b>{data.teachers}</b><span>Professors</span></div>
            <div className="card stat"><b>{data.classesToday}</b><span>Classes today</span></div>
            <div className="card stat"><b>{data.attendance}</b><span>Attendance this week</span></div>
          </div>
          <section className="card board">
            <h2>Today's schedule</h2>
            {schedule.map(([time, description, room], index) => (
              <div className={`slot${index === 1 ? " now" : ""}`} key={time}>
                <time>{time}</time><span>{description}</span><span className="muted">{room}</span>
              </div>
            ))}
          </section>
          {data.featuredAnnouncement && (
            <section className="card board">
              <h2>Announcements</h2>
              <p><b>{data.featuredAnnouncement.title}</b> <span className="muted">Posted by {data.featuredAnnouncement.postedBy}</span></p>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}