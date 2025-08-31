// ---------- SOUND FX ----------
const sounds = {
  correct: new Audio("sounds/correct.mp3"),
  wrong: new Audio("sounds/wrong.mp3"),
  found: new Audio("sounds/found.mp3"),
  levelUp: new Audio("sounds/level-up.mp3")
};

// ---------- GLOBAL XP ----------
let xp = 0;
let currentQuestion = 0;
let answered = false;
let passwordXP = 0;
let currentPasswordQ = 0;
let passwordAnswered = false;

// ---------- LEVEL 1 ----------
const questions = [
  {
    question: "Which email is a phishing attempt?",
    options: ["support@paypal.com", "security-alert@paypalsecure-login.com", "help@paypal.com"],
    correct: 1
  },
  {
    question: "Which Netflix email looks suspicious?",
    options: ["support@netflix.com", "billing@netflix.com", "free-sub@netflixsupport.xyz"],
    correct: 2
  },
  {
    question: "Spot the fake Google email:",
    options: ["noreply@google.com", "security-check@goog13-login.com", "support@google.com"],
    correct: 1
  },
  {
    question: "You see a file named 'invoice.pdf.exe' in an email. What should you do?",
    options: ["Open it", "Delete it immediately", "Forward it to a friend"],
    correct: 1
  },
  {
    question: "A phishing email usually greets you with:",
    options: ["Dear Customer", "Your real full name", "Your employee ID"],
    correct: 0
  },
  {
    question: "What’s the safest action if you doubt an email from your bank?",
    options: ["Click the link", "Call the bank directly", "Reply to the email"],
    correct: 1
  },
  {
    question: "Which Amazon email is not real?",
    options: ["care@amazon.in", "order-help@amazonsupport.live", "support@amazon.in"],
    correct: 1
  },
  {
    question: "You see a file named 'invoice.pdf.exe' in an email. What should you do?",
    options: ["Open it", "Delete it immediately", "Forward it to a friend", "Save it for later"],
    correct: 4
  },
  {
    question: "Which email is a phishing attempt?",
    options: ["support@paypal.com", "security-alert@paypalsecure-login.com", "help@paypal.com"],
    correct: 1
  },
  {
    question: "Pick the phishing bank email:",
    options: ["alerts@hdfcbank.com", "hdfc.support@safe-login.info", "services@hdfcbank.com"],
    correct: 1
  }
];

function startGame() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("level1").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";
  const nextBtn = document.getElementById("next-btn");
  nextBtn.disabled = true;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finish Level" : "Next";
}

function checkAnswer(index) {
  if (answered) return;

  const correct = questions[currentQuestion].correct;
  const feedback = document.getElementById("feedback");
  const optionButtons = document.querySelectorAll("#options button");

  if (index === correct) {
    answered = true;
    feedback.textContent = "✅ Correct! Good catch.";
    feedback.style.color = "#00ffcc";
    xp += 10;
    updateXPBar();
    document.getElementById("next-btn").disabled = false;
  } else {
    feedback.textContent = "❌ Wrong! Try again.";
    feedback.style.color = "#ff4d4d";

    optionButtons[index].classList.add("shake");
    setTimeout(() => {
      optionButtons[index].classList.remove("shake");
    }, 300);
  }
}

function updateXPBar() {
  document.getElementById("xp-bar").style.width = xp + "%";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("level1").style.display = "none";
    document.getElementById("level1-complete").style.display = "block";
    document.getElementById("final-xp").textContent = xp;
  }
}

// ---------- LEVEL 2 ----------
const passwordQuestions = [
  { password: "12345678", options: ["Strong", "Weak", "Compromised"], correct: 2 },
  { password: "XvB!92@cK1", options: ["Strong", "Weak", "Compromised"], correct: 0 },
  { password: "school2025", options: ["Strong", "Weak", "Compromised"], correct: 1 },
  { password: "Pa$$w0rd123", options: ["Strong", "Weak", "Compromised"], correct: 0 },
  { password: "qwerty", options: ["Strong", "Weak", "Compromised"], correct: 2 },
  { password: "SummerHoliday2024", options: ["Strong", "Weak", "Compromised"], correct: 1 },
  { password: "letmein", options: ["Strong", "Weak", "Compromised"], correct: 2 },
  { password: "H&f9!rT#zQ", options: ["Strong", "Weak", "Compromised"], correct: 0 },
  { password: "football123", options: ["Strong", "Weak", "Compromised"], correct: 1 },
  { password: "admin", options: ["Strong", "Weak", "Compromised"], correct: 2 }
];

function startLevel2() {
  document.getElementById("level1-complete").style.display = "none";
  document.getElementById("level2").style.display = "block";
  loadPasswordQuestion();
}

function loadPasswordQuestion() {
  passwordAnswered = false;
  const q = passwordQuestions[currentPasswordQ];
  document.getElementById("password-question-text").textContent = `How strong is this password: "${q.password}"`;

  const optionsContainer = document.getElementById("password-options");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkPasswordAnswer(index);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("password-feedback").textContent = "";
  const nextBtn = document.getElementById("password-next-btn");
  nextBtn.disabled = true;
  nextBtn.textContent = currentPasswordQ === passwordQuestions.length - 1 ? "Finish Level" : "Next";
}

function checkPasswordAnswer(index) {
  if (passwordAnswered) return;

  const correct = passwordQuestions[currentPasswordQ].correct;
  const feedback = document.getElementById("password-feedback");
  const optionButtons = document.querySelectorAll("#password-options button");

  if (index === correct) {
    passwordAnswered = true;
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "#00ffcc";
    passwordXP += 10;
    document.getElementById("password-next-btn").disabled = false;
  } else {
    feedback.textContent = "❌ Wrong! Try again.";
    feedback.style.color = "#ff4d4d";

    optionButtons[index].classList.add("shake");
    setTimeout(() => {
      optionButtons[index].classList.remove("shake");
    }, 300);
  }
}

function nextPasswordQuestion() {
  currentPasswordQ++;
  if (currentPasswordQ < passwordQuestions.length) {
    loadPasswordQuestion();
  } else {
    document.getElementById("level2").style.display = "none";
    startLevel3();
  }
}

// ---------- LEVEL 3 (Multiple Fake Logins) ----------
let level3Index = 0;
let foundCount = 0;

const loginPages = [
  {
    name: "Gmail",
    html: `
      <div id="fake-login">
        <div class="logo">Gma1l</div>
        <input type="text" id="fake-username" placeholder="Username" />
        <input type="password" id="fake-password" placeholder="Password" />
        <button id="fake-login-btn">Login</button>
        <p class="fake-url">http://gmail-login.fakehost.in</p>
      </div>
    `,
    elements: [
      { id: "fake-username", correct: true },
      { class: "logo", correct: true },
      { class: "fake-url", correct: true },
      { id: "fake-login-btn", correct: false },
      { id: "fake-password", correct: false }
    ]
  },
  {
    name: "Facebook",
    html: `
      <div id="fake-login">
        <div class="logo">Faceb00k</div>
        <input type="email" id="fake-email" placeholder="User Email" />
        <input type="password" id="fake-pass" placeholder="Passcode" />
        <button id="fb-login-btn">Login</button>
        <p class="fake-url">https://facebook-account-check.secure.co.vu</p>
      </div>
    `,
    elements: [
      { class: "logo", correct: true },
      { id: "fake-email", correct: true },
      { class: "fake-url", correct: true },
      { id: "fake-pass", correct: false },
      { id: "fb-login-btn", correct: false }
    ]
  },
  {
    name: "Bank",
    html: `
      <div id="fake-login">
        <div class="logo">ICICI-Bank™</div>
        <input type="text" id="account-no" placeholder="Account No." />
        <input type="password" id="secure-pin" placeholder="ATM PIN" />
        <button id="bank-login-btn">Submit</button>
        <p class="fake-url">https://icici-bank-login-verification.rf.gd</p>
      </div>
    `,
    elements: [
      { id: "account-no", correct: true },
      { class: "logo", correct: true },
      { class: "fake-url", correct: true },
      { id: "secure-pin", correct: false },
      { id: "bank-login-btn", correct: false }
    ]
  }
];

function startLevel3() {
  document.getElementById("level3").style.display = "block";
  document.getElementById("level3-feedback").textContent = "";
  level3Index = 0;
  loadFakeLogin();
}

function loadFakeLogin() {
  foundCount = 0;
  const loginData = loginPages[level3Index];
  document.getElementById("fake-login-container").innerHTML = loginData.html;
  document.getElementById("login-instruction").textContent = `Fake Login Page: ${loginData.name} — Spot 3 Red Flags`;

  loginData.elements.forEach((item) => {
    let el = item.id
      ? document.getElementById(item.id)
      : document.querySelector("." + item.class);

    if (!el) return;

    el.onclick = () => {
      if (el.classList.contains("found")) return;

      if (item.correct) {
        el.classList.add("found");
        document.getElementById("level3-feedback").textContent = "✅ Suspicious element spotted!";
        xp += 10;
        updateXPBar();
        foundCount++;

        if (foundCount === 3) {
          level3Index++;
          setTimeout(() => {
            if (level3Index < loginPages.length) {
              loadFakeLogin();
            } else {
              document.getElementById("level3").style.display = "none";
              document.getElementById("game-complete").style.display = "block";
              document.getElementById("total-xp").textContent = xp + passwordXP;
            }
          }, 1000);
        }
      } else {
        el.classList.add("shake");
        document.getElementById("level3-feedback").textContent = "❌ Nope, that seems fine.";
        setTimeout(() => el.classList.remove("shake"), 300);
      }
    };
  });
}
const text = "Stay Safe. Stay Smart. Play Again Soon.";
let index = 0;
function typeText() {
  if (index < text.length) {
    document.getElementById("typing-text").textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 100);
  }
}
typeText();
let lightMode = false;
function toggleTheme() {
  lightMode = !lightMode;
  document.getElementById("theme-toggle").textContent = lightMode ? "🌙" : "💡";
  // You could also switch classes/styles here
}
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '01';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }, () => 1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0F0'; // Green text
  ctx.font = fontSize + 'px monospace';

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    const x = i * fontSize;
    ctx.fillText(text, x, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  });
}

setInterval(drawMatrix, 33);




