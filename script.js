const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');
const heartsContainer = document.getElementById('hearts-container');

// Function to move the "No" button
const moveButton = () => {
    // 1. Get the boundaries of the card
    const containerWidth = questionContainer.clientWidth - noBtn.offsetWidth;
    const containerHeight = questionContainer.clientHeight - noBtn.offsetHeight;

    // 2. Get the position of the "Yes" button so we can avoid it
    const yesRect = {
        left: yesBtn.offsetLeft,
        top: yesBtn.offsetTop,
        right: yesBtn.offsetLeft + yesBtn.offsetWidth,
        bottom: yesBtn.offsetTop + yesBtn.offsetHeight
    };

    let randomX, randomY;
    let overlap = false;

    // 3. Keep generating random positions until we find one that DOESN'T overlap
    do {
        randomX = Math.floor(Math.random() * containerWidth);
        randomY = Math.floor(Math.random() * containerHeight);

        // Calculate where the "No" button would be
        const noRect = {
            left: randomX,
            top: randomY,
            right: randomX + noBtn.offsetWidth,
            bottom: randomY + noBtn.offsetHeight
        };

        // Check if they overlap (with a 20px buffer so they don't even touch)
        overlap = !(
            noRect.right < yesRect.left - 20 || 
            noRect.left > yesRect.right + 20 || 
            noRect.bottom < yesRect.top - 20 || 
            noRect.top > yesRect.bottom + 20
        );

    } while (overlap); // If overlap is true, loop runs again

    // 4. Apply the safe position
    noBtn.style.position = 'absolute'; 
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
};

// Event listeners for moving the button
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
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
