export async function request(path, options = {}) {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response;
  try {
    response = await fetch(path, { ...options, headers });
  } catch {
    throw new Error("Could not reach the API. Make sure the backend is running with npm run dev:backend.");
  }

  const responseText = await response.text();
  let data;
  try {
    data = responseText ? JSON.parse(responseText) : null;
  } catch {
    throw new Error(`The API returned an invalid response (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(data?.error || `The request failed with status ${response.status}.`);
  }

  return data;
}
