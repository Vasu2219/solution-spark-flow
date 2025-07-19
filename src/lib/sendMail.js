export async function sendMail({ to, subject, text, html }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const response = await fetch(`${API_BASE_URL}/api/send-mail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, text, html }),
  });
  const data = await response.json();
  return data;
} 