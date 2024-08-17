const boxes = document.querySelectorAll('.funny-box');
const levelIndicator = document.querySelector('.level-indicator');
const progressBar = document.querySelector('.progress');
const rewards = document.querySelectorAll('.reward');

let hoveredBoxes = 0;
let level = 1;
let levelThreshold = 6; // adjust the threshold to level up
let progress = 0;

boxes.forEach(box => {
    box.addEventListener('mouseover', () => {
        hoveredBoxes++;
        progress = (hoveredBoxes / levelThreshold) * 100;
        progressBar.style.width = `${progress}%`;
        if (hoveredBoxes >= levelThreshold) {
            levelUp();
        }
    });
});

function levelUp() {
    level++;
    levelIndicator.textContent = `Level ${level}`;
    levelThreshold += 6; // increase the threshold for the next level
    progress = 0;
    progressBar.style.width = `${progress}%`;
}

function unlockReward() {
    const rewardIndex = Math.floor(Math.random() * rewards.length);
    const reward = rewards[rewardIndex];
    reward.classList.add('unlocked');
    // trigger the reward effect (e.g., confetti, fireworks, bonus box)
    triggerReward(reward.dataset.reward);
}

function triggerReward(rewardType) {
    switch (rewardType) {
        case 'confetti':
            // trigger confetti animation
            break;
        case 'fireworks':
            // trigger fireworks animation
            break;
        case 'bonus-box':
            // add a bonus box with a special effect
            break;
    }
}
