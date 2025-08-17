// Replace with your Cloud Run endpoint
const API_URL = "https://futureai-520522533839.europe-west1.run.app/api/veo";

/**
 * Sends data to the Veo API and returns the response.
 * @param {Object} data - The payload to send (e.g., { prompt: "Hello" })
 * @returns {Promise<Object>} - The JSON response from the API
 */
export async function sendToVeo(data) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error: ${text}`);
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Error calling backend:", err);
    return { error: err.message }; // Optional: return an error object
  }
}
