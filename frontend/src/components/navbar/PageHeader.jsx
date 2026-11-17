import "../styles/PageHeader.css";

export default function PageHeader({ title, children }) {
  return (
    <div className="head">
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}