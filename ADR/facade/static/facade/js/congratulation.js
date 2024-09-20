// Mystery Typing Effect for the Congratulations Text
document.addEventListener("DOMContentLoaded", function () {
    const title = document.querySelector('h1');
    const subtitle = document.querySelector('h2');
    const paragraphs = document.querySelectorAll('p');

    function typeWriter(textElement, speed = 100) {
        const text = textElement.textContent;
        textElement.textContent = '';
        let i = 0;

        const typeInterval = setInterval(() => {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    }

    // Typing effect for title, subtitle, and paragraphs
    typeWriter(title, 150);
    setTimeout(() => typeWriter(subtitle, 100), 2000);
    paragraphs.forEach((p, index) => {
        setTimeout(() => typeWriter(p, 50), 4000 + (index * 1000));
    });
});

// Share button click effect
const shareButton = document.getElementById('share-button');
shareButton.addEventListener('click', function () {
    alert('Achievement shared successfully!');
    shareButton.textContent = 'Shared!';
    shareButton.disabled = true;
});


// OTHER WAYS TO HIDDE TEXT

// Color picker
// let colorPicker = document.getElementById("color-picker");
// colorPicker.addEventListener("change", function (event) {
//     if (event.target.value === "#FF0000") {
//         document.getElementById("hidden-text").style.display = "block";
//     }
// });

// Typing rythm
// let typingRhythm = [];
// document.addEventListener("keydown", function (event) {
//     typingRhythm.push(event.key);
//     if (typingRhythm.join("") === "dot-dot-dash-dot") {
//         document.getElementById("hidden-text").style.display = "block";
//         typingRhythm = [];
//     }
// });

// Image manipulation
// let image = document.getElementById("image");
// image.addEventListener("click", function (event) {
//     let rotationCount = 0;
//     image.addEventListener("contextmenu", function (event) {
//         rotationCount++;
//         if (rotationCount === 3) {
//             document.getElementById("hidden-text").style.display = "block";
//         }
//     });
// });

// Text selector
// let textSelection = "";
// document.addEventListener("selectstart", function (event) {
//     textSelection = window.getSelection().toString();
//     if (textSelection === "specific sequence of text") {
//         document.getElementById("hidden-text").style.display = "block";
//     }
// });
