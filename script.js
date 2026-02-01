const noBtnContainer = document.getElementById('noBtnContainer');
const noBtn = document.getElementById('noBtn');
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');
const heartsContainer = document.getElementById('hearts-container');

// Function to move the "No" button
const moveButton = () => {
    // Get dimensions of the visible area
    const maxWidth = window.innerWidth - noBtn.offsetWidth;
    const maxHeight = window.innerHeight - noBtn.offsetHeight;

    // Calculate random positions ensuring it stays on screen
    // Using a buffer of 50px from edges
    const randomX = Math.max(50, Math.floor(Math.random() * (maxWidth - 50)));
    const randomY = Math.max(50, Math.floor(Math.random() * (maxHeight - 50)));

    // Switch position type to fixed so it can move anywhere on screen relative to viewport
    noBtn.style.position = 'fixed'; 
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Add a little rotation for fun
    const randomRotate = Math.floor(Math.random() * 360);
    noBtn.style.transform = `rotate(${randomRotate}deg)`;
};

// Event listeners for "No" button movement
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent tapping on mobile
    moveButton();
});

// --- THE SUCCESS STATE ---

function acceptLove() {
    // 1. Hide the question card
    questionContainer.classList.add('hidden');
    
    // 2. Show the success card
    successContainer.classList.remove('hidden');
    
    // 3. Start the falling hearts animation
    createHearts();
}

function createHearts() {
    // Create 50 hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤'; // You can use an emoji or an SVG here
            
            // Randomize size, position, and fall speed
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 and 5s
            
            heartsContainer.appendChild(heart);
            
            // Cleanup hearts after they fall to prevent memory leaks
            setTimeout(() => {
                heart.remove();
            }, 5000);

        }, i * 100); // Stagger the creation of hearts slightly
    }
}