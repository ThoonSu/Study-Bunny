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

// --- PROTECTION LOGIC ---
const protectedLinks = document.querySelectorAll(".protected-link");

protectedLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const isSignedIn = localStorage.getItem("bunnyName");

    if (!isSignedIn) {
      e.preventDefault(); // Stop the link from opening
      alert("Oops! You need to hop into your account first. 🐰");
      window.location.href = "signin.html";
    }
  });
});

// --- NAVBAR UPDATE ---
window.onload = () => {
  const user = localStorage.getItem("bunnyName");
  const loginBtn = document.getElementById("login-nav-btn");

  if (user && loginBtn) {
    loginBtn.innerText = "Log Out";
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("bunnyName");
      window.location.reload();
    });
  }
  // year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
};
