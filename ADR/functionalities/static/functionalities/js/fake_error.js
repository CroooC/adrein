document.getElementById("mystery-word").onclick = function () {
    var hint = document.getElementById("hidden-hint"); // Toggle visibility
    hint.style.display = (hint.style.display === "block") ? "none" : "block";
};
