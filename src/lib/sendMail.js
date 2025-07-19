export async function sendMail({ to, subject, text, html }) {
  const response = await fetch('http://localhost:5000/api/send-mail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, text, html }),
  });
  const data = await response.json();
  return data;
} 