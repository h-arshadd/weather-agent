const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/chat";

// One id per page load, so every visitor gets their own conversation memory
const SESSION_ID = crypto.randomUUID();

/**
 * Sends a message to the backend.
 * Expected response: { reply: string, weather?: "clear" | "clouds" | "rain" | "snow" | "storm" }
 */
export async function sendMessage(message) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: SESSION_ID }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}