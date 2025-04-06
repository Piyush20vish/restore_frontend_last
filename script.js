const brands = [
  { name: "Apple", img: "https://logo.clearbit.com/apple.com", url: "https://www.apple.com" },
  { name: "Dell", img: "https://logo.clearbit.com/dell.com", url: "https://www.dell.com" },
  { name: "Havells", img: "https://logo.clearbit.com/havells.com", url: "https://www.havells.com" },
  { name: "HP", img: "https://logo.clearbit.com/hp.com", url: "https://www.hp.com" },
  { name: "Samsung", img: "https://logo.clearbit.com/samsung.com", url: "https://www.samsung.com" },
  { name: "Lenovo", img: "https://logo.clearbit.com/lenovo.com", url: "https://www.lenovo.com" },
];

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function loadBrands() {
  const container = document.getElementById('brands-container');
  brands.forEach(brand => {
    const a = document.createElement('a');
    a.href = brand.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = brand.img;
    img.alt = brand.name;

    const p = document.createElement('p');
    p.innerText = brand.name;

    a.appendChild(img);
    a.appendChild(p);
    container.appendChild(a);
  });
}

// Typing sound
const typingSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-typewriter-soft-click-1122.mp3');

async function sendMessage() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML += <div class="chat user"><span class="avatar">👤</span><p>${input}</p></div>;
  document.getElementById("userInput").value = '';

  const typingDiv = document.createElement("div");
  typingDiv.className = "chat bot typing";
  typingDiv.innerHTML = '<span class="avatar">🤖</span><p class="dots">...</p>';
  chatbox.appendChild(typingDiv);
  chatbox.scrollTop = chatbox.scrollHeight;

  typingSound.play();

  try {
    const response = await fetch('https://restore-backend-final.vercel.app/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    setTimeout(() => {
      typingDiv.remove();
      chatbox.innerHTML += <div class="chat bot"><span class="avatar">🤖</span><p>${data.reply}</p></div>;
      chatbox.scrollTop = chatbox.scrollHeight;
      typingSound.pause();
      typingSound.currentTime = 0;
    }, 1000);
  } catch (error) {
    typingDiv.remove();
    chatbox.innerHTML += <div class="chat bot"><span class="avatar">🤖</span><p>Error: Bot could not respond.</p></div>;
  }
}

document.addEventListener('DOMContentLoaded', loadBrands);