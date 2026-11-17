import Layout from "../navbar/Layout.jsx";
import LoadState from "../modalDirectory/LoadState.jsx";
import PageHeader from "../navbar/PageHeader.jsx";
import useApi from "../../services/useApi.js";
import "../styles/AnnouncementPage.css";

export default function AnnouncementPage() {
  const { data, error, loading, reload } = useApi("/api/announcements");
  return (
    <Layout>
      <PageHeader title="Announcements">Latest updates and school notices.</PageHeader>
      <LoadState loading={loading} error={error} onRetry={reload} />
      {data && (
        <section className="card announcement-list">
          {data.map((announcement) => (
            <article
              className={`announcement-item${announcement.important ? " important" : ""}`}
              key={announcement._id}
            >
              <div className={`tag${announcement.important ? "" : " secondary"}`}>{announcement.category}</div>
              <h2>{announcement.title}</h2>
              <p>{announcement.body}</p>
              <span className="meta">Posted by {announcement.postedBy} â€¢ {announcement.postedAt}</span>
            </article>
          ))}
          {data.length === 0 && <p>No announcements have been posted.</p>}
        </section>
      )}
    </Layout>
  );
}