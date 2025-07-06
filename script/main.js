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

  const nameInput = document.getElementById("recipientName");
  const phoneInput = document.getElementById("recipientPhone");
  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");

  // Restrict name input to letters and space only
  nameInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z ]/g, "");
    nameError.classList.remove("visible");
  });

  // Restrict phone input to digits only
  phoneInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    phoneError.classList.remove("visible");
  });

  saveBtn?.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    let valid = true;

    // Validate name
    if (!name || !/^[A-Za-z ]+$/.test(name)) {
      nameError.textContent = "Please enter a valid name (letters only).";
      nameError.classList.add("visible");
      valid = false;
    } else {
      nameError.textContent = "";
      nameError.classList.remove("visible");
    }

    // Validate phone
    if (!/^[0-9]{9,15}$/.test(phone)) {
      phoneError.textContent =
        "Please enter a valid phone number (9–15 digits).";
      phoneError.classList.add("visible");
      valid = false;
    } else {
      phoneError.textContent = "";
      phoneError.classList.remove("visible");
    }

    if (!valid) return;

    // Proceed if valid
    addRecipientBtn.innerHTML = `
    <img src="assets/icons/user-stroke-rounded.svg" alt="Recipient Icon" class="user-svg-green" />
    Recipient: ${name} (${phone})
  `;
    addRecipientBtn.style.background = "var(--green-50)";
    addRecipientBtn.style.borderColor = "var(--green-500)";
    addRecipientBtn.style.color = "var(--green-600)";
    closeSheet();
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
  const pickupInput = document.getElementById("pickupLocation");
  const dropInput = document.getElementById("dropLocation");

  const pickupError = document.getElementById("pickupError");
  const dropError = document.getElementById("dropError");

  const pickupValue = pickupInput.value.trim();
  const dropValue = dropInput.value.trim();

  let valid = true;

  // Validate Pickup Location
  if (!pickupValue) {
    pickupError.textContent = "Please enter your pickup location.";
    pickupError.classList.add("visible");
    pickupInput.classList.add("input-field-invalid");
    valid = false;
  } else {
    pickupError.textContent = "";
    pickupError.classList.remove("visible");
    pickupInput.classList.remove("input-field-invalid");
  }

  // Validate Drop Location
  if (!dropValue) {
    dropError.textContent = "Please enter the recipient's location.";
    dropError.classList.add("visible");
    dropInput.classList.add("input-field-invalid");
    valid = false;
  } else {
    dropError.textContent = "";
    dropError.classList.remove("visible");
    dropInput.classList.remove("input-field-invalid");
  }

  const categoryError = document.getElementById("categoryError");

  // Validate Category
  if (!selectedCategory) {
    categoryError.textContent = "Please select a category.";
    categoryError.classList.add("visible");
    valid = false;
  } else {
    categoryError.textContent = "";
    categoryError.classList.remove("visible");
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
