export async function sendToVeo(prompt, type = "text") {
  const response = await fetch("http://localhost:5000/api/veo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, type }),
  });
  const data = await response.json();
  return data;
}
