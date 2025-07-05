// Tab functionality
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// Form steps
const locationStep = document.getElementById("location-step");
const recipientStep = document.getElementById("recipient-step");

locationStep.addEventListener("click", () => {
  locationStep.classList.add("completed");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "input-field";
  input.placeholder = "Enter your location";
  input.style.marginTop = "10px";

  if (!locationStep.querySelector(".input-field")) {
    locationStep.appendChild(input);
    input.focus();
  }
});

recipientStep.addEventListener("click", () => {
  recipientStep.classList.add("completed");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "input-field";
  input.placeholder = "Enter recipient's location";
  input.style.marginTop = "10px";

  if (!recipientStep.querySelector(".input-field")) {
    recipientStep.appendChild(input);
    input.focus();
  }
});

// Category selection
const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    categoryCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
  });
});

// Bottom sheet functionality
const addRecipientBtn = document.getElementById("add-recipient-btn");
const bottomSheetOverlay = document.getElementById("bottomSheetOverlay");
const bottomSheet = document.getElementById("bottomSheet");
const closeSheetBtn = document.getElementById("closeSheet");
const saveRecipientBtn = document.getElementById("saveRecipient");

function openBottomSheet() {
  bottomSheetOverlay.classList.add("active");
  bottomSheet.classList.add("active");
}

function closeBottomSheet() {
  bottomSheetOverlay.classList.remove("active");
  bottomSheet.classList.remove("active");
}

addRecipientBtn.addEventListener("click", openBottomSheet);
closeSheetBtn.addEventListener("click", closeBottomSheet);
bottomSheetOverlay.addEventListener("click", (e) => {
  if (e.target === bottomSheetOverlay) {
    closeBottomSheet();
  }
});

saveRecipientBtn.addEventListener("click", () => {
  const name = document.getElementById("recipientName").value;
  const phone = document.getElementById("recipientPhone").value;

  if (name && phone) {
    addRecipientBtn.innerHTML = `👤 Recipient: ${name} (${phone})`;
    addRecipientBtn.style.background = "#f0fdf4";
    addRecipientBtn.style.borderColor = "#10b981";
    addRecipientBtn.style.color = "#059669";
    closeBottomSheet();
  }
});

// Continue button functionality
const continueBtn = document.getElementById("continue-btn");
continueBtn.addEventListener("click", () => {
  const selectedCategory = document.querySelector(".category-card.selected");
  const locationCompleted = locationStep.classList.contains("completed");
  const recipientCompleted = recipientStep.classList.contains("completed");

  if (selectedCategory && locationCompleted && recipientCompleted) {
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
    closeBottomSheet();
  }
});
