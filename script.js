// ===== STardust Trail =====
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'stardust-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

// ===== Typewriter Effect for Secret Page =====
document.addEventListener('DOMContentLoaded', function() {
    // Only run on secret page (check for lyric lines)
    const lines = document.querySelectorAll('.lyric-line');
    if (lines.length > 0) {
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(20px)';
            setTimeout(() => {
                line.style.transition = 'all 1s';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 500 * index);
        });
    }
});

// ===== Confetti Celebration (call this when game is completed) =====
function celebrate() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = `hsl(${Math.random() * 60 + 40}, 100%, 50%)`;
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 100);
    }
}

// ===== Console Easter Egg (runs on any page) =====
console.log('%c🎵 "i love you and i don\'t want to..." 🎵', 'color: gold; font-size: 16px; font-style: italic;');
console.log('%c— for you, from me', 'color: #ffb6c1; font-size: 12px;');

// ===== Game Logic (if on game page) =====
// This assumes you already have the game variables from earlier.
// If you haven't set up the game yet, refer to the previous game code.
// For completeness, I'll include a minimal game setup that works with the confetti.

// Example game data (replace with your own questions)
const questions = [
    {
        q: "Would you rather relive primary school with me or skip straight to 10 years from now?",
        a: "Either way, I'm there. 🥺",
        b: "Either way, I'm there. 🥺"
    },
    {
        q: "Would you rather listen to Jelly Roll on repeat for 24 hours or text me for 24 hours straight?",
        a: "You can pick both, you know. 😏",
        b: "You can pick both, you know. 😏"
    },
    {
        q: "Would you rather I call you 'bestie' forever... or something else?",
        a: "😳 something else sounds interesting...",
        b: "😏 say more about that 'something else'"
    },
    {
        q: "Would you rather build me another repository or let me build you one first?",
        a: "Too late. I already started. 💻",
        b: "Too late. I already started. 💻"
    },
    {
        q: "Would you rather kiss me in the rain or in front of everyone we know?",
        a: "Iconic either way. 🌧️👀",
        b: "Iconic either way. 🌧️👀"
    }
];

let currentQuestion = 0;

window.onload = function() {
    // Check if we're on game page by looking for game container
    if (document.getElementById('question')) {
        showQuestion();
    }
};

function showQuestion() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const feedbackEl = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!questionEl) return;
    
    feedbackEl.innerHTML = '';
    if (nextBtn) nextBtn.style.display = 'none';
    
    if (currentQuestion < questions.length) {
        questionEl.innerHTML = questions[currentQuestion].q;
        
        let optionsHtml = '';
        optionsHtml += `<button class="option-btn" onclick="answer('a')">✨ option A</button>`;
        optionsHtml += `<button class="option-btn" onclick="answer('b')">✨ option B</button>`;
        optionsEl.innerHTML = optionsHtml;
    } else {
        // Game completed
        questionEl.innerHTML = "🎉 you made it through all the questions!";
        optionsEl.innerHTML = '';
        feedbackEl.innerHTML = "You chose me every time. I chose you too.";
        if (nextBtn) nextBtn.style.display = 'none';
        
        // Show secret page link if it exists
        const secretLink = document.getElementById('secretLink');
        if (secretLink) secretLink.style.display = 'inline-block';
        
        // Trigger confetti
        celebrate();
    }
}

function answer(choice) {
    const feedbackEl = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');
    const optionsEl = document.getElementById('options');
    
    let feedbackText = "";
    if (choice === 'a') {
        feedbackText = questions[currentQuestion].a;
    } else {
        feedbackText = questions[currentQuestion].b;
    }
    
    feedbackEl.innerHTML = feedbackText;
    optionsEl.innerHTML = '';
    if (nextBtn) nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}
