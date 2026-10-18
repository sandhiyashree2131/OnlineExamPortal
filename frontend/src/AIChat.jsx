import { useState } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const question = message.trim();
    setMessages((prev) => [...prev, { role: "You", text: question }]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed");

      setMessages((prev) => [...prev, { role: "AI Assistant", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "AI Assistant", text: " error.message." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ maxWidth: 650, margin: "20px auto", padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
      <h2>ExamEase AI Assistant</h2>
      <p>Ask questions and get help understanding concepts.</p>

      <div style={{ minHeight: 120, maxHeight: 300, overflowY: "auto", marginBottom: 12 }}>
        {messages.map((item, index) => (
          <p key={index}>
            <strong>{item.role}:</strong> {item.text}
          </p>
        ))}
        {loading && <p>AI is thinking...</p>}
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a study question..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </section>
  );
}
