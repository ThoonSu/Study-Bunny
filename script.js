// Greeting
console.log("🐰 BunnyBurrow Landing Page Loaded");

//If the user already has a bunny, change the button text
window.onload = () => {
  const savedBunny = localStorage.getItem("bunnyName");
  const heroBtn = document.querySelector(".btn-bunny");

  if (savedBunny && heroBtn) {
    heroBtn.innerText = "Visit " + savedBunny;
    heroBtn.href = "dashboard.html"; // Redirect to a dashboard instead of creator
  }
};
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("btn-back-to-top");

  // Show the button when the user scrolls down 200px from the top
  window.onscroll = function () {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  };

  // When the user clicks the button, scroll to the top smoothly
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
