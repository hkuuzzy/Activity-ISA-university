import { useState } from "react";
import { request } from "../../services/api.js";
import useApi from "../../services/useApi.js";
import Layout from "../navbar/Layout.jsx";
import LoadState from "../modalDirectory/LoadState.jsx";
import PageHeader from "../navbar/PageHeader.jsx";
import "../styles/DirectoryPage.css";

export default function DirectoryPage({ config }) {
  const { data, error, loading, reload } = useApi(config.endpoint);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true);
    setFormError("");
    const formData = Object.fromEntries(new FormData(form));
    if (formData.age) formData.age = Number(formData.age);
    try {
      await request(config.endpoint, { method: "POST", body: JSON.stringify(formData) });
      form.reset();
      setFormOpen(false);
      await reload();
    } catch (saveError) {
      setFormError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <PageHeader title={config.title}>{config.description}</PageHeader>
      <LoadState loading={loading} error={error} onRetry={reload} />
      {data && (
        <section className="card table-wrap">
          <div className="table-header">
            <h2>{config.heading}</h2>
            <button
              className="btn-small"
              type="button"
              onClick={() => { setFormOpen(!formOpen); setFormError(""); }}
            >
              {formOpen ? "Cancel" : config.button}
            </button>
          </div>
          {formOpen && (
            <form className="record-form" onSubmit={submit}>
              {config.fields.map(([name, label, inputType]) => (
                <label className="field" key={name}>
                  <span>{label}</span>
                  <input name={name} type={inputType} min={inputType === "number" ? "1" : undefined} required />
                </label>
              ))}
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <button className="btn-small" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save record"}
              </button>
            </form>
          )}
          <div className="table-scroll">
            <table>
              <thead>
                <tr>{config.fields.map(([name, label]) => <th key={name}>{label}</th>)}</tr>
              </thead>
              <tbody>
                {data.map((record) => (
                  <tr key={record._id}>
                    {config.fields.map(([name]) => <td key={name}>{record[name]}</td>)}
                  </tr>
                ))}
                {data.length === 0 && <tr><td colSpan={config.fields.length}>No records found.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </Layout>
  );
}