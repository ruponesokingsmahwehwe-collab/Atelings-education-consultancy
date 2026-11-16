document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  // Chatbot Elements
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotForm = document.getElementById("chatbotForm");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const chatbotChips = document.getElementById("chatbotChips");
  const openChatFromPage = document.getElementById("openChatFromPage");

  function openChat() {
    chatbotWindow.classList.add("open");
    chatbotWindow.setAttribute("aria-hidden", "false");
    chatbotInput.focus();
  }

  function closeChat() {
    chatbotWindow.classList.remove("open");
    chatbotWindow.setAttribute("aria-hidden", "true");
  }

  chatbotToggle.addEventListener("click", () => {
    if (chatbotWindow.classList.contains("open")) {
      closeChat();
    } else {
      openChat();
    }
  });

  chatbotClose.addEventListener("click", closeChat);

  if (openChatFromPage) {
    openChatFromPage.addEventListener("click", openChat);
  }

  // Built-in FAQ Knowledge Base
  const faqResponses = [
    {
      keywords: ["china", "chinese", "csc", "jw202", "mbbs"],
      reply:
        "We offer full admission and scholarship support for top universities in China (Bachelor's, Master's, PhD, and Chinese Language programs). Most programs are taught in English! Message our China desk on WhatsApp at +86 131 8680 0768 or +86 132 8113 5605 to get matched."
    },
    {
      keywords: ["india", "indian", "pharmacy", "it"],
      reply:
        "Studying in India gives you 100% English-taught degrees in IT, Engineering, Business, and Pharmacy with merit scholarships available. Contact our India desk directly at +91 73474 90143 on WhatsApp or call!"
    },
    {
      keywords: ["document", "require", "requirement", "passport", "transcript", "need"],
      reply:
        "To start your application, you generally need: 1) Valid Passport scan, 2) Academic Transcripts & Certificates, 3) Passport-size white-background photo, and 4) Study Plan / English proficiency certificate."
    },
    {
      keywords: ["scholarship", "funding", "tuition", "fee", "cost", "cheap", "affordable"],
      reply:
        "Yes! ATELINGS assists students with partial and full tuition scholarships (including university and provincial scholarships) depending on your grades and chosen country. Send your transcripts on WhatsApp (+86 131 8680 0768) for a free eligibility check."
    },
    {
      keywords: ["visa", "embassy", "arrival", "pickup"],
      reply:
        "Once your Admission Notice and visa documents (such as JW201/JW202 for China) arrive, we guide you step-by-step through your student visa application and airport pickup."
    },
    {
      keywords: ["contact", "whatsapp", "phone", "number", "call", "advisor", "agent"],
      reply:
        "You can reach ATELINGS advisors anytime:<br>• China Desk 1: +86 131 8680 0768<br>• China Desk 2: +86 132 8113 5605<br>• India Desk: +91 73474 90143<br>Click any green WhatsApp button on the page to chat immediately!"
    },
    {
      keywords: ["apply", "application", "start", "intake", "when"],
      reply:
        "Applications for the 2026/2027 intakes are open now! To start, click 'Chat on WhatsApp' and tell us your preferred country, degree level, and major."
    }
  ];

  function getBotReply(question) {
    const q = question.toLowerCase();
    for (const item of faqResponses) {
      if (item.keywords.some((kw) => q.includes(kw))) {
        return item.reply;
      }
    }
    return "Great question! For personalized guidance on your specific grades and course options, please message an ATELINGS advisor on WhatsApp at <strong>+86 131 8680 0768</strong>, <strong>+86 132 8113 5605</strong>, or <strong>+91 73474 90143</strong>.";
  }

  function appendMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `msg ${sender}`;
    div.innerHTML = text;
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function handleUserQuestion(text) {
    if (!text.trim()) return;
    appendMessage(text, "user");
    setTimeout(() => {
      appendMessage(getBotReply(text), "bot");
    }, 300);
  }

  chatbotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatbotInput.value;
    chatbotInput.value = "";
    handleUserQuestion(text);
  });

  chatbotChips.querySelectorAll("button").forEach((chip) => {
    chip.addEventListener("click", () => {
      handleUserQuestion(chip.getAttribute("data-q"));
    });
  });
});
