// Show the loading overlay when the page starts loading
document.getElementById("loading-overlay").style.display = "flex";

// Listen for the load event to hide the loading overlay
window.addEventListener("load", function () {
        document.getElementById("loading-overlay").style.display = "none";
});

// Fallback: hide the loading overlay after 10 seconds if the load event hasn't fired
setTimeout(function () {
    console.log("Fallback: hiding loading overlay after 10 seconds");
    document.getElementById("loading-overlay").style.display = "none";
}, 10000); // 10 seconds
