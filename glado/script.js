const surpriseBtn = document.getElementById("envelopeBtn");
const surpriseMessage = document.getElementById("surpriseLetter");
const btnLabel = surpriseBtn.querySelector("span");
const askBox = document.getElementById("askBox");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let celebrating = false;

// Starting state: only the envelope is visible
surpriseMessage.removeAttribute("hidden");
askBox.removeAttribute("hidden");
surpriseMessage.style.display = "none";
askBox.style.display = "none";
btnLabel.textContent = "Tap to open";

// Close button at the top of the letter
const closeBtn = document.createElement("button");
closeBtn.type = "button";
closeBtn.textContent = "Tap to close 💌";
closeBtn.style.cssText =
    "display:block;margin:0 auto 20px;padding:12px 28px;border:none;" +
    "border-radius:999px;background:#f06292;color:#fff;font-size:1.1rem;cursor:pointer;";
surpriseMessage.insertBefore(closeBtn, surpriseMessage.firstChild);

function showLetter() {
    surpriseMessage.style.cssText =
        "display:flex;flex-direction:column;align-items:center;justify-content:center;" +
        "text-align:center;position:fixed;top:0;left:0;width:100%;height:100%;" +
        "overflow:auto;z-index:5000;padding:30px 20px;box-sizing:border-box;" +
        "background:linear-gradient(180deg,#fff5f8,#ffe4ee);";
    Array.from(surpriseMessage.children).forEach(function (el) {
        el.style.maxWidth = "700px";
    });
    document.body.style.overflow = "hidden";
    surpriseMessage.scrollTop = 0;
}

function hideLetter() {
    surpriseMessage.style.cssText = "display:none;";
    document.body.style.overflow = "";
    btnLabel.textContent = "Tap to open";
    surpriseBtn.scrollIntoView({ behavior: "smooth", block: "center" });
}

closeBtn.addEventListener("click", hideLetter);

// Envelope: only shows the Yes / No question
surpriseBtn.addEventListener("click", function () {
    if (celebrating) return;
    askBox.style.display = askBox.style.display === "none" ? "block" : "none";
});

// Pumping heart + blue bubbles
function makeBubble(layer, alreadyRising) {
    const bubble = document.createElement("span");
    bubble.className = "bubble";
    const size = 20 + Math.random() * 50;
    const duration = 3 + Math.random() * 2;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = duration + "s";
    bubble.style.animationDelay = alreadyRising ? -Math.random() * duration + "s" : "0s";
    bubble.addEventListener("animationend", function () {
        bubble.remove();
    });
    layer.appendChild(bubble);
}

function celebrate(done) {
    const layer = document.createElement("div");
    layer.className = "celebrate";

    const heart = document.createElement("span");
    heart.className = "pump-heart";
    heart.textContent = "💖";
    layer.appendChild(heart);

    document.body.appendChild(layer);
    document.body.style.overflow = "hidden";

    for (let n = 0; n < 50; n++) {
        makeBubble(layer, true);
    }
    const timer = setInterval(function () {
        makeBubble(layer, false);
    }, 120);

    setTimeout(function () {
        clearInterval(timer);
        layer.remove();
        done();
    }, 10000);
}

// Yes: bubbles first, then the letter pops up straight away
yesBtn.addEventListener("click", function () {
    askBox.style.display = "none";
    noBtn.style.position = "";
    noBtn.style.left = "";
    noBtn.style.top = "";
    celebrating = true;

    celebrate(function () {
        celebrating = false;
        showLetter();
    });
});

// No escapes around the screen
function escapeNo() {
    const pad = 10;
    const maxX = window.innerWidth - noBtn.offsetWidth - pad;
    const maxY = window.innerHeight - noBtn.offsetHeight - pad;
    noBtn.style.position = "fixed";
    noBtn.style.left = Math.max(pad, Math.random() * maxX) + "px";
    noBtn.style.top = Math.max(pad, Math.random() * maxY) + "px";
}

noBtn.addEventListener("mouseenter", escapeNo);
noBtn.addEventListener("touchstart", function (e) {
    e.preventDefault();
    escapeNo();
}, { passive: false });
noBtn.addEventListener("click", escapeNo);

// Music player
const loveSong = document.getElementById("loveSong");
const musicBtn = document.getElementById("musicBtn");
const musicStatus = document.getElementById("musicStatus");

musicBtn.addEventListener("click", async function () {
    if (loveSong.paused) {
        try {
            await loveSong.play();

            musicBtn.textContent = "⏸ Pause Our Song";
            musicStatus.textContent = "Playing a song for my love ❤️";
        } catch (error) {
            musicStatus.textContent =
                "Please add your song to the music folder first.";
        }
    } else {
        loveSong.pause();

        musicBtn.textContent = "▶ Play Our Song";
        musicStatus.textContent = "Song paused. Press play to continue.";
    }
});

// Keep the button text synchronized with the audio
loveSong.addEventListener("ended", function () {
    musicBtn.textContent = "▶ Play Our Song";
});

const photos = [
  "photos/home1.jpg",
  "photos/home2.jpg",
  "photos/home3.jpg"
];
let i = 0;
const hero = document.querySelector(".hero");

setInterval(() => {
  i = (i + 1) % photos.length;
  hero.style.backgroundImage =
    'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${photos[i]}")';
}, 4000);
const heroSection = document.querySelector(".hero");

function createHeart() {
    const heart = document.createElement("span");
    heart.classList.add("floating-heart");
    const emojis = ["❤️", "💖", "💕", "💗"];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = 16 + Math.random() * 24 + "px";
    const duration = 5 + Math.random() * 4;
    heart.style.animationDuration = duration + "s";
    heroSection.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createHeart, 500);
const envelopeBtn = document.getElementById("envelopeBtn");
const surpriseLetter = document.getElementById("surpriseLetter");

if (envelopeBtn && surpriseLetter) {
    envelopeBtn.addEventListener("click", function () {
        surpriseLetter.hidden = !surpriseLetter.hidden;

        if (surpriseLetter.hidden) {
            envelopeBtn.innerHTML = '💌<span>Tap to open</span>';
        } else {
            envelopeBtn.innerHTML = '💖<span>Tap to close</span>';
        }
    });
} else {
    console.error("Envelope button or secret letter is missing in HTML.");
}