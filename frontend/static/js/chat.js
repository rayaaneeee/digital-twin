const BACKEND_URL = "http://localhost:8000";

const messagesEl = document.getElementById("chat-messages");
const inputEl = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

let history = [];

function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addMessage(role, text = "", typing = false) {
  const wrap = document.createElement("div");
  wrap.className = `message ${role}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble" + (typing ? " typing" : "");
  bubble.textContent = text;
  wrap.appendChild(bubble);
  messagesEl.appendChild(wrap);
  scrollToBottom();
  return bubble;
}

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  inputEl.value = "";
  sendBtn.disabled = true;

  addMessage("user", text);
  history.push({ role: "user", content: text });

  const aiBubble = addMessage("assistant", "", true);
  let fullResponse = "";

  try {
    const res = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      aiBubble.classList.remove("typing");
      aiBubble.textContent = err.detail || `Error ${res.status}. Please try again.`;
      sendBtn.disabled = false;
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    aiBubble.classList.remove("typing");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split("\n")) {
        if (line.startsWith("data: ")) {
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") break;
          try {
            const { text: token } = JSON.parse(payload);
            fullResponse += token;
            aiBubble.textContent = fullResponse;
            scrollToBottom();
          } catch {
            // ignore malformed SSE frames
          }
        }
      }
    }

    history.push({ role: "assistant", content: fullResponse });

  } catch (err) {
    aiBubble.classList.remove("typing");
    aiBubble.textContent = "Connection error — is the backend running? (python main.py)";
  }

  sendBtn.disabled = false;
  inputEl.focus();
}

// Send on Enter
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
