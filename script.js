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

  // Student Study Inquiry Email & WhatsApp Form
  const studyEmailForm = document.getElementById("studyEmailForm");
  const sendFormToWhatsapp = document.getElementById("sendFormToWhatsapp");

  function collectInquiryData() {
    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const phone = document.getElementById("studentPhone").value.trim();
    const country = document.getElementById("preferredCountry").value;
    const degree = document.getElementById("degreeLevel").value;
    const course = document.getElementById("desiredCourse").value.trim();
    const notes = document.getElementById("studentMessage").value.trim();

    return { name, email, phone, country, degree, course, notes };
  }

  if (studyEmailForm) {
    studyEmailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = collectInquiryData();
      const subject = encodeURIComponent(`Study Abroad Inquiry: ${d.degree} in ${d.course} (${d.country}) - ${d.name}`);
      const body = encodeURIComponent(
        `Hello ATELINGS Admissions Team,

` +
        `I would like to apply / inquire about studying abroad:

` +
        `• Full Name: ${d.name}
` +
        `• Student Email: ${d.email}
` +
        `• WhatsApp / Phone: ${d.phone}
` +
        `• Preferred Country: ${d.country}
` +
        `• Degree Level: ${d.degree}
` +
        `• Desired Course / Major: ${d.course}
` +
        `• Additional Notes: ${d.notes || "N/A"}

` +
        `Please let me know the available universities, tuition fees, and scholarship options.

Best regards,
${d.name}`
      );
      window.location.href = `mailto:admissions@atelings.com?subject=${subject}&body=${body}`;
    });
  }

  if (sendFormToWhatsapp) {
    sendFormToWhatsapp.addEventListener("click", () => {
      const d = collectInquiryData();
      if (!d.name || !d.course) {
        alert("Please enter at least your Name and what you want to study first.");
        return;
      }
      const msg = encodeURIComponent(
        `Hello ATELINGS! I want to inquire about studying abroad:
` +
        `• Name: ${d.name}
` +
        `• Email: ${d.email || "Not provided"}
` +
        `• Phone: ${d.phone || "Not provided"}
` +
        `• Country: ${d.country}
` +
        `• Degree: ${d.degree}
` +
        `• Course: ${d.course}
` +
        `• Notes: ${d.notes || "N/A"}`
      );
      window.open(`https://wa.me/8613186800768?text=${msg}`, "_blank", "noopener");
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

  // Smart Scored FAQ Engine (Matches the exact topic the student asks about!)
  const faqTopics = [
    {
      keywords: ["china", "chinese", "beijing", "shanghai", "chengdu", "csc", "jw202", "jw201"],
      reply:
        "🇨🇳 <strong>Studying in China:</strong><br>We place students in top Chinese universities for English-taught Bachelor's, Master's, PhD, and Chinese Language programs. CSC, provincial, and university scholarships are available. Message our China desk on WhatsApp at <strong>+86 131 8680 0768</strong> or <strong>+86 132 8113 5605</strong>."
    },
    {
      keywords: ["india", "indian", "delhi", "punjab", "bangalore", "pharmacy", "btech"],
      reply:
        "🇮🇳 <strong>Studying in India:</strong><br>India offers 100% English-medium degrees in IT, Computer Science, Pharmacy, Engineering, and Business with merit scholarships up to 50%. Contact our India desk directly at <strong>+91 73474 90143</strong>!"
    },
    {
      keywords: ["europe", "uk", "canada", "abroad", "country", "countries", "destination"],
      reply:
        "🌍 <strong>Study Destinations:</strong><br>ATELINGS assists with admissions in <strong>China, India, and Europe</strong>. Tell us your preferred country and course in the <a href='#inquiry-form'>Email Study Inquiry Form</a> on this page for a personalized shortlist!"
    },
    {
      keywords: ["course", "courses", "major", "majors", "program", "programs", "engineering", "mbbs", "medicine", "business", "computer", "nursing", "subject"],
      reply:
        "🎓 <strong>Popular Courses &amp; Majors:</strong><br>• Medicine (MBBS), Nursing &amp; Pharmacy<br>• Computer Science, AI &amp; Software Engineering<br>• Civil, Mechanical &amp; Electrical Engineering<br>• International Business, Economics &amp; MBA<br>Write what you want to study in our <a href='#inquiry-form'>Email Inquiry Form</a> to get matched!"
    },
    {
      keywords: ["scholarship", "scholarships", "funding", "free", "discount", "bursary"],
      reply:
        "🏅 <strong>Scholarships Available:</strong><br>Yes! Depending on your academic grades, you can qualify for partial or full tuition scholarships (including CSC, Provincial, and University Merit Scholarships). Send your transcripts to <strong>admissions@atelings.com</strong> or WhatsApp <strong>+86 131 8680 0768</strong> for a free assessment."
    },
    {
      keywords: ["document", "documents", "require", "requirement", "requirements", "passport", "transcript", "certificate", "need"],
      reply:
        "📄 <strong>Required Documents:</strong><br>1. Valid Passport scan<br>2. Academic Transcripts &amp; Graduation Certificate<br>3. Recent white-background passport photo<br>4. English proficiency certificate or brief Study Plan<br>5. Medical checkup form (for visa/enrollment)"
    },
    {
      keywords: ["tuition", "fee", "fees", "cost", "price", "accommodation", "dorm", "cheap", "affordable", "money"],
      reply:
        "💰 <strong>Tuition &amp; Living Costs:</strong><br>Tuition varies by country and scholarship level—many self-funded programs in China and India range from <strong>$1,500 to $4,500/year</strong>, and scholarship winners pay significantly less or $0 tuition. Message us your desired course for exact fee breakdowns!"
    },
    {
      keywords: ["visa", "visas", "embassy", "arrival", "pickup", "x1", "x2"],
      reply:
        "🛂 <strong>Student Visa &amp; Arrival:</strong><br>Once your Admission Notice and visa forms (such as JW201/JW202) are issued, ATELINGS guides you through your embassy visa application and coordinates airport pickup when you land."
    },
    {
      keywords: ["instagram", "facebook", "social", "follow", "page"],
      reply:
        "📱 <strong>Follow ATELINGS on Social Media:</strong><br>Stay updated on scholarship deadlines and student arrivals on <a href='https://www.instagram.com/' target='_blank' rel='noopener'>Instagram</a> and <a href='https://www.facebook.com/' target='_blank' rel='noopener'>Facebook</a>!"
    },
    {
      keywords: ["email", "mail", "write", "form", "inquiry", "send"],
      reply:
        "✉️ <strong>Email Your Study Plan:</strong><br>You can write what you want to study directly in our <a href='#inquiry-form'>Email Inquiry Form</a> on this page, or email us anytime at <strong>admissions@atelings.com</strong>."
    },
    {
      keywords: ["contact", "whatsapp", "phone", "number", "call", "advisor", "agent", "help"],
      reply:
        "📞 <strong>Direct Advisor Contacts:</strong><br>• China Desk 1: <strong>+86 131 8680 0768</strong><br>• China Desk 2: <strong>+86 132 8113 5605</strong><br>• India Desk: <strong>+91 73474 90143</strong><br>• Email: <strong>admissions@atelings.com</strong>"
    },
    {
      keywords: ["apply", "application", "start", "intake", "intakes", "when", "deadline"],
      reply:
        "🚀 <strong>How to Apply (2026/2027 Intakes Open):</strong><br>1. Fill out the <a href='#inquiry-form'>Email Study Inquiry Form</a> with what you want to study, OR<br>2. Tap any green <strong>WhatsApp</strong> button to send your passport and transcripts directly to an advisor!"
    },
    {
      keywords: ["hi", "hello", "hey", "greetings", "morning", "afternoon", "evening"],
      reply:
        "Hello! 👋 Welcome to <strong>ATELINGS</strong>. What would you like to study abroad, and which country are you interested in (China, India, or Europe)?"
    }
  ];

  function getBotReply(question) {
    const clean = question.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
    const words = clean.split(/\s+/).filter(Boolean);

    let bestMatch = null;
    let highestScore = 0;

    for (const item of faqTopics) {
      let score = 0;
      for (const kw of item.keywords) {
        if (words.includes(kw)) {
          score += 2; // Exact word match
        } else if (kw.length >= 4 && clean.includes(kw)) {
          score += 1; // Partial word match
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch.reply;
    }

    return "I'd love to help with that! You can ask me about <strong>China, India, courses, scholarships, tuition fees, required documents, or student visas</strong>—or write what you want to study in our <a href='#inquiry-form'>Email Inquiry Form</a> so an advisor can reply directly.";
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
    }, 250);
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
