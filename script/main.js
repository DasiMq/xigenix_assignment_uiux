// Tab functionality
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// Category selection
const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    // If already selected, remove it
    if (card.classList.contains("selected")) {
      card.classList.remove("selected");
    } else {
      // Deselect others and select the clicked one
      categoryCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
    }
  });
});

// Sheet functionality
document.addEventListener("DOMContentLoaded", () => {
  const addRecipientBtn = document.getElementById("add-recipient-btn");
  const sheetOverlay = document.getElementById("sheetOverlay");
  const sheet = document.getElementById("sheet");
  const closeSheetBtn = document.getElementById("closeSheet");
  const cancelBtn = document.getElementById("cancelRecipient");
  const saveBtn = document.getElementById("saveRecipient");

  function openSheet() {
    sheetOverlay.classList.add("active");
    sheet.classList.add("active");
  }

  function closeSheet() {
    sheetOverlay.classList.remove("active");
    sheet.classList.remove("active");
  }

  addRecipientBtn?.addEventListener("click", openSheet);
  closeSheetBtn?.addEventListener("click", closeSheet);
  cancelBtn?.addEventListener("click", closeSheet);

  // Only close when clicking directly on the overlay, not inside the sheet
  sheetOverlay?.addEventListener("click", (e) => {
    if (e.target === sheetOverlay) {
      closeSheet();
    }
  });

  saveBtn?.addEventListener("click", () => {
    const name = document.getElementById("recipientName").value;
    const phone = document.getElementById("recipientPhone").value;

    if (name && phone) {
      addRecipientBtn.innerHTML = `
      <img src="assets/icons/user-stroke-rounded.svg" alt="Recipient Icon" class="user-svg-green" />
      Recipient: ${name} (${phone})
    `;
      addRecipientBtn.style.background = "var(--green-50)";
      addRecipientBtn.style.borderColor = "var(--green-500)";
      addRecipientBtn.style.color = "var(--green-600)";
      closeSheet();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeSheet();
    }
  });
});

// Continue button functionality
const continueBtn = document.getElementById("continue-btn");

continueBtn.addEventListener("click", () => {
  const selectedCategory = document.querySelector(".category-card.selected");
  const pickupInput = document.querySelector(
    'input[placeholder="Choose your location"]'
  );
  const dropInput = document.querySelector(
    'input[placeholder="Choose recipient\'s location"]'
  );

  const isPickupFilled = pickupInput && pickupInput.value.trim() !== "";
  const isDropFilled = dropInput && dropInput.value.trim() !== "";

  if (selectedCategory && isPickupFilled && isDropFilled) {
    alert("Proceeding to delivery options...");
  } else {
    alert("Please complete all required fields");
  }
});

// Mobile navigation
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
mobileNavItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    mobileNavItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Responsive animations
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeSheet();
  }
});
