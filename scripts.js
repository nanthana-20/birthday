document.getElementById("surpriseButton").addEventListener("click", function() {
    document.getElementById("popup").classList.remove("hidden");
    document.getElementById("animationBox").classList.remove("hidden");
});

document.getElementById("closeButton").addEventListener("click", function() {
    document.getElementById("popup").classList.add("hidden");
    document.getElementById("animationBox").classList.add("hidden");
});
