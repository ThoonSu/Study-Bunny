document.addEventListener("DOMContentLoaded", function () {
  // --- flashcards ---
  let deck = JSON.parse(localStorage.getItem("bunnyDeck")) || [];
  let currentIndex = 0;

  const qInput = document.getElementById("question");
  const aInput = document.getElementById("answer");
  const qDisplay = document.getElementById("display-q");
  const aDisplay = document.getElementById("display-a");
  const counter = document.getElementById("card-count");
  const addBtn = document.getElementById("add-card-btn");
  const flashcard = document.getElementById("flashcard");

  function updateCard() {
    if (deck.length > 0) {
      qDisplay.innerText = deck[currentIndex].q;
      aDisplay.innerText = deck[currentIndex].a;
      counter.innerText = `${currentIndex + 1} / ${deck.length}`;
    } else {
      qDisplay.innerText = "Deck is empty!";
      aDisplay.innerText = "Add cards to start.";
      counter.innerText = "0 / 0";
    }
    if (flashcard) flashcard.classList.remove("flipped");
  }

  // Add Card Logic
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      const qVal = qInput.value.trim();
      const aVal = aInput.value.trim();

      if (qVal !== "" && aVal !== "") {
        deck.push({ q: qVal, a: aVal });
        localStorage.setItem("bunnyDeck", JSON.stringify(deck));

        // Clear inputs
        qInput.value = "";
        aInput.value = "";

        // Move to the newly created card
        currentIndex = deck.length - 1;
        updateCard();
      } else {
        alert("Please write both a question and an answer! 🐰");
      }
    });
  }

  // Flip logic
  if (flashcard) {
    flashcard.addEventListener("click", function () {
      flashcard.classList.toggle("flipped");
    });
  }

  // Navigation
  document.getElementById("next-btn")?.addEventListener("click", function () {
    if (currentIndex < deck.length - 1) {
      currentIndex++;
      updateCard();
    }
  });

  document.getElementById("prev-btn")?.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCard();
    }
  });

  document.getElementById("clear-btn")?.addEventListener("click", function () {
    if (confirm("Clear your whole deck?")) {
      deck = [];
      localStorage.removeItem("bunnyDeck");
      currentIndex = 0;
      updateCard();
    }
  });

  // Initial load
  updateCard();
});

// Initialize
updateCard();

// --- NAVBAR UPDATE ---
// Function to ensure we only run code once the page is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Bunny Closet Loaded!");

  // 1. DATA RETRIEVAL: Get info from LocalStorage
  const userName = localStorage.getItem("bunnyName");
  const savedClothes = localStorage.getItem("savedClothes");
  const savedHat = localStorage.getItem("savedHat");

  // 2. APPLY NAME: If no name exists, they shouldn't be here!
  const greetingElement = document.getElementById("greeting");
  if (userName) {
    greetingElement.innerText = `Hello, ${userName}!`;
  } else {
    greetingElement.innerText = "Hello, Anonymous Bunny!";
  }

  // 3. APPLY SAVED LOOK: Load images back onto the bunny
  if (savedClothes && savedClothes !== window.location.href) {
    const clothesImg = document.getElementById("clothes-layer");
    clothesImg.src = savedClothes;
    clothesImg.style.opacity = "1";
  }

  if (savedHat && savedHat !== window.location.href) {
    const hatImg = document.getElementById("hat-layer");
    hatImg.src = savedHat;
    hatImg.style.opacity = "1";
  }
});

/**
 * Changes what category is visible in the closet
 */
function showCategory(cat) {
  // Hide all categories
  document.getElementById("clothes-options").classList.add("d-none");
  document.getElementById("hats-options").classList.add("d-none");

  // Show the selected one
  const selected = document.getElementById(cat + "-options");
  if (selected) selected.classList.remove("d-none");

  // Update active tab styling
  document
    .querySelectorAll("#closetTabs .nav-link")
    .forEach((btn) => btn.classList.remove("active"));
  if (event) event.target.classList.add("active");
}

/**
 * Places the item on the bunny
 */
function setLayer(layer, imgSrc) {
  const imgElement = document.getElementById(layer + "-layer");

  if (imgSrc === "" || !imgSrc) {
    imgElement.src = "";
    imgElement.style.opacity = "0";
  } else {
    imgElement.src = imgSrc;
    imgElement.style.opacity = "1";
  }
}

/**
 * Saves the current look to LocalStorage
 */
function saveBunny() {
  const clothesSrc = document.getElementById("clothes-layer").src;
  const hatSrc = document.getElementById("hat-layer").src;

  // We only save if there is actually an image source present
  // (Filtering out the current page URL which browsers sometimes return for empty srcs)
  const validClothes = clothesSrc.includes("images/") ? clothesSrc : "";
  const validHat = hatSrc.includes("images/") ? hatSrc : "";

  localStorage.setItem("savedClothes", validClothes);
  localStorage.setItem("savedHat", validHat);

  alert("Look saved! Your bunny is ready for study time. ");
}
