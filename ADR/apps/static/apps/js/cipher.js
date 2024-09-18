const form = document.getElementById("form");
const keywordInput = document.getElementById("keyword");
const keywordError = document.getElementById("keywordError");

form.addEventListener("submit", function (event) {
    const keyword = keywordInput.value;

    // Validate that the keyword contains only letters (no numbers or symbols)
    const isValidKeyword = /^[a-zA-Z]+$/.test(keyword);

    if (!isValidKeyword) {
        // Prevent form submission if keyword is invalid
        event.preventDefault();
        keywordError.style.display = "block"; // Show error message
    } else {
        keywordError.style.display = "none"; // Hide error message if valid
    }
});
