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
