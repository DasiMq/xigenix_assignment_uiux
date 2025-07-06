// Tab 
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// Category Selection
const categoryCards = document.querySelectorAll(".category-card");
const categoryError = document.getElementById("categoryError");

categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    categoryCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");

    categoryError.textContent = "";
    categoryError.classList.remove("visible");
  });
});

// Sheet Modal 
document.addEventListener("DOMContentLoaded", () => {
  const sheetOverlay = document.getElementById("sheetOverlay");
  const sheet = document.getElementById("sheet");

  const addRecipientBtn = document.getElementById("addRecipientBtn");
  const closeSheetBtn = document.getElementById("closeSheet");
  const cancelBtn = document.getElementById("cancelRecipient");
  const saveBtn = document.getElementById("saveRecipient");

  const nameInput = document.getElementById("recipientName");
  const phoneInput = document.getElementById("recipientPhone");
  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");

  const pickupInput = document.getElementById("pickupLocation");
  const dropInput = document.getElementById("dropLocation");
  const pickupError = document.getElementById("pickupError");
  const dropError = document.getElementById("dropError");

  const continueBtn = document.getElementById("continue-btn");

  // Sheet Open/Close Handlers
  const openSheet = () => {
    sheetOverlay?.classList.add("active");
    sheet?.classList.add("active");
  };

  const closeSheet = () => {
    sheetOverlay?.classList.remove("active");
    sheet?.classList.remove("active");
  };

  addRecipientBtn?.addEventListener("click", openSheet);
  closeSheetBtn?.addEventListener("click", closeSheet);
  cancelBtn?.addEventListener("click", closeSheet);

  sheetOverlay?.addEventListener("click", (e) => {
    if (e.target === sheetOverlay) closeSheet();
  });

  // Name & Phone Input Validation
  nameInput?.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z ]/g, "");
    nameError?.classList.remove("visible");
  });

  phoneInput?.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    phoneError?.classList.remove("visible");
  });

  // Save Recipient
  saveBtn?.addEventListener("click", () => {
    const name = nameInput?.value.trim() || "";
    const phone = phoneInput?.value.trim() || "";

    let valid = true;

    if (!name || !/^[A-Za-z ]+$/.test(name)) {
      nameError.textContent = "Please enter a valid name (letters only).";
      nameError.classList.add("visible");
      valid = false;
    } else {
      nameError.textContent = "";
      nameError.classList.remove("visible");
    }

    if (!/^[0-9]{9,15}$/.test(phone)) {
      phoneError.textContent = "Please enter a valid phone number (9–15 digits).";
      phoneError.classList.add("visible");
      valid = false;
    } else {
      phoneError.textContent = "";
      phoneError.classList.remove("visible");
    }

    if (!valid) return;

    // Update Button Display
    addRecipientBtn.innerHTML = `
      <img src="assets/icons/user-stroke-rounded.svg" class="user-svg-green" />
      Recipient: ${name} (${phone})
    `;
    addRecipientBtn.style.background = "var(--green-50)";
    addRecipientBtn.style.borderColor = "var(--green-500)";
    addRecipientBtn.style.color = "var(--green-600)";

    closeSheet();
  });

  // Pickup & Drop Location Validation
  pickupInput?.addEventListener("input", () => {
    if (pickupInput.value.trim() !== "") {
      pickupError.textContent = "";
      pickupError.classList.remove("visible");
      pickupInput.classList.remove("input-field-invalid");
    }
  });

  dropInput?.addEventListener("input", () => {
    if (dropInput.value.trim() !== "") {
      dropError.textContent = "";
      dropError.classList.remove("visible");
      dropInput.classList.remove("input-field-invalid");
    }
  });

  // Continue Button Validation
  continueBtn?.addEventListener("click", () => {
    const selectedCategory = document.querySelector(".category-card.selected");
    const pickupValue = pickupInput?.value.trim();
    const dropValue = dropInput?.value.trim();

    let valid = true;

    if (!pickupValue) {
      pickupError.textContent = "Please enter your pickup location.";
      pickupError.classList.add("visible");
      pickupInput.classList.add("input-field-invalid");
      valid = false;
    }

    if (!dropValue) {
      dropError.textContent = "Please enter the recipient's location.";
      dropError.classList.add("visible");
      dropInput.classList.add("input-field-invalid");
      valid = false;
    }

    if (!selectedCategory) {
      categoryError.textContent = "Please select a category.";
      categoryError.classList.add("visible");
      valid = false;
    }

    if (valid) {
      alert("Proceeding to delivery options...");
    }
  });

  // Responsive Behavior
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeSheet();
    }
  });
});
