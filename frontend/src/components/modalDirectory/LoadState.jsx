export default function LoadState({ loading, error, onRetry }) {
  if (loading) return <p className="notice" role="status">Loading...</p>;
  if (error) {
    return (
      <div className="notice error" role="alert">
        <span>{error}</span>
        <button className="text-button" type="button" onClick={onRetry}>Try again</button>
      </div>
    );
  }
  return null;
}