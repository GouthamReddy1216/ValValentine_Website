const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn'); // Added specific reference
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');
const heartsContainer = document.getElementById('hearts-container');

// Function to move the "No" button
const moveButton = () => {
    // 1. Get the size of the container (The Card)
    // We subtract the button size so it doesn't clip over the edge
    const containerWidth = questionContainer.clientWidth - noBtn.offsetWidth;
    const containerHeight = questionContainer.clientHeight - noBtn.offsetHeight;

    // 2. Calculate a random position within the card's limits
    const randomX = Math.floor(Math.random() * containerWidth);
    const randomY = Math.floor(Math.random() * containerHeight);

    // 3. Apply the new position
    // 'absolute' positions it relative to the Card, not the window
    noBtn.style.position = 'absolute'; 
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
};

// Event listeners for "No" button movement
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent tapping on mobile
    moveButton();
});

// --- THE SUCCESS STATE ---

function acceptLove() {
    questionContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');
    createHearts();
}

function createHearts() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤'; 
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            heartsContainer.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 5000);
        }, i * 100);
    }
}