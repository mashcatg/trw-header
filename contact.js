
const contactToggle2 = document.getElementById('contactToggle');
const closeIcon = document.querySelector('.contact-close-icon');

closeIcon.addEventListener('click', (e) => {
e.stopPropagation();
contactToggle2.style.display = 'none';
});
// Logo color swap on dark background
(function () {
const header = document.getElementById("header");
const logoImg = document.getElementById("siteLogo");
const darkFilter = "brightness(0) invert(1)";
const normalFilter = "none";

function updateLogoFilter() {
if (header.classList.contains("mega-menu-open")) {
logoImg.style.filter = darkFilter;
} else {
logoImg.style.filter = normalFilter;
}
}

// Listen for class changes on header
const observer = new MutationObserver(updateLogoFilter);
observer.observe(header, {
attributes: true,
attributeFilter: ["class"],
});

// Initial state
updateLogoFilter();
})();

function getChatId() {
let chatId = sessionStorage.getItem("chatId");
if (!chatId) {
chatId = "chat_" + Math.random().toString(36).substr(2, 9);
sessionStorage.setItem("chatId", chatId);
}
return chatId;
}

const chatContainer = document.getElementById("chat-widget-container");
const chatButton = document.getElementById("chat-widget-button");

chatButton.addEventListener("click", () => {
chatContainer.style.display = "flex";
setTimeout(() => chatContainer.classList.add("open"), 20);
chatButton.style.display = "none";
});

function closeChatWidget() {
chatContainer.classList.remove("open");
chatContainer.classList.add("close");
setTimeout(() => {
chatContainer.style.display = "none";
chatContainer.classList.remove("close");
chatButton.style.display = "flex";
}, 300);
}

function sendMessage() {
const input = document.getElementById("chat-widget-input");
const message = input.value.trim();
if (!message) return;

const chatBody = document.getElementById("chat-widget-body");

// User message
const userMessage = document.createElement("div");
userMessage.className = "chat-message user";
userMessage.textContent = message;
chatBody.appendChild(userMessage);
chatBody.scrollTop = chatBody.scrollHeight;

// Typing indicator
const typingIndicator = document.createElement("div");
typingIndicator.className = "typing";
typingIndicator.innerHTML = "<span></span><span></span><span></span>";
chatBody.appendChild(typingIndicator);
chatBody.scrollTop = chatBody.scrollHeight;

const chatId = getChatId();

fetch('https://mashrafaimancopilot2.app.n8n.cloud/webhook/9cc113e7-d987-45a2-8e91-a4a664624d05/chat', {
method: 'POST',
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ chatId: chatId, message: message, route: 'general' })
})
.then(res => res.json())
.then(data => {
typingIndicator.remove();
const botMessage = document.createElement("div");
botMessage.className = "chat-message bot";
botMessage.innerHTML = formatResponse(data.output || "Sorry, I couldn't understand that.");
chatBody.appendChild(botMessage);
chatBody.scrollTop = chatBody.scrollHeight;
})
.catch(err => { typingIndicator.remove(); console.error(err); });

input.value = "";
input.style.height = "auto";
}

function formatResponse(text) {
text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank">$1</a>');
return text;
}

document.getElementById("chat-widget-send").addEventListener("click", sendMessage);

const inputBox = document.getElementById("chat-widget-input");
inputBox.addEventListener("keydown", e => {
if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});
inputBox.addEventListener("input", function() {
this.style.height = "auto";
this.style.height = Math.min(this.scrollHeight, 120) + "px";
});