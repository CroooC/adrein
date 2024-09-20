const boxes = document.querySelectorAll('.funny-box');
const levelIndicator = document.querySelector('.level-indicator');
const progressBar = document.querySelector('.progress');

let hoveredBoxes = 0;
let level = 1;
let levelThreshold = 6; // adjust the threshold to level up
let maxLevel = 9; // add a max level
let progress = 0;

boxes.forEach(box => {
    box.addEventListener('mouseover', () => {
        hoveredBoxes++;
        progress = (hoveredBoxes / levelThreshold) * 120;
        progressBar.style.width = `${progress}%`;
        if (hoveredBoxes >= levelThreshold) {
            levelUp();
        }
    });
});

function levelUp() {
    if (level < maxLevel) {
        level++;
        levelIndicator.textContent = `Level ${level}`;
        levelThreshold += 6; // increase the threshold for the next level
        progress = 0;
        progressBar.style.width = `${progress}%`;
        hoveredBoxes = 0;
    } else {
        levelIndicator.textContent = `Congratulations, you've finished level 9, you've reach the max level!`;
    }
}

// Add a smooth animation to the progress bar
function animateProgressBar() {
    const progressInterval = setInterval(() => {
        const currentWidth = progressBar.style.width.replace('%', '');
        if (currentWidth < progress) {
            progressBar.style.width = `${currentWidth + 1}%`;
        } else {
            clearInterval(progressInterval);
        }
    }, 10);
}

// Call the animateProgressBar function when the progress bar needs to be updated
boxes.forEach(box => {
    box.addEventListener('mouseover', animateProgressBar);
});
