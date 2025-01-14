document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const deleteAccountBtn = document.getElementById("delete-account-btn");
  const popupOverlay = document.querySelector(".popup-overlay");
  const closePopupBtns = document.querySelectorAll(".close-popup");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const nameInput = document.getElementById("name-form");
  const surnameInput = document.getElementById("surname-form");
  const submitBtn = document.getElementById("submit-button");

  // Ensure all elements exist
  if (
    !deleteAccountBtn ||
    !popupOverlay ||
    !closePopupBtns ||
    !emailInput ||
    !emailError ||
    !nameInput ||
    !surnameInput ||
    !submitBtn
  ) {
    console.error(
      "One or more DOM elements are missing. Ensure IDs and class names are correct.",
    );
    return;
  }

  // Show the pop-up when the delete button is clicked
  deleteAccountBtn.addEventListener("click", () => {
    popupOverlay.classList.remove("hidden");
  });

  // Close the pop-up when the cancel button is clicked
  closePopupBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      popupOverlay.classList.add("hidden");
    }),
  );

  // Debounced email validation
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function validateForm() {
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email || !name || !surname) {
      submitBtn.setAttribute("disabled", "true");
      submitBtn.classList.add("disabled");
      emailInput.classList.remove("is-invalid");
      emailError.innerHTML = "";
      return true;
    }

    if (isValidEmail) {
      emailError.innerHTML = "";
      submitBtn.removeAttribute("disabled");
      submitBtn.classList.remove("disabled");
      emailInput.classList.remove("is-invalid");
    } else {
      emailError.innerHTML =
        '<img src="/public/img/svg/x-circle.svg" alt="Error" width="18" height="18"/> Email is not valid';
      submitBtn.setAttribute("disabled", "true");
      submitBtn.classList.add("disabled");
      emailInput.classList.add("is-invalid");
    }
  }

  // Attach input event listeners with debounce
  const debouncedValidateForm = debounce(validateForm, 300);
  emailInput.addEventListener("input", debouncedValidateForm);
  nameInput.addEventListener("input", debouncedValidateForm);
  surnameInput.addEventListener("input", debouncedValidateForm);
});
