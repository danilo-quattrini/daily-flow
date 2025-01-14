import addHabitToList from "./add-habit.js";

document.addEventListener("DOMContentLoaded", async () => {
  const popupOverlay = document.querySelector(".popup-overlay");
  const closePopupBtn = document.querySelector(".close-popup");
  const addHabitBtn = document.querySelector(".add-habit-button");
  const newHabitForm = document.getElementById("newHabitForm");
  /*const deleteAccountBtn = document.querySelector(".delete-account-button");
  const deletePopupOverlay = document.querySelector(".delete-popup-overlay");*/

  if (!popupOverlay || !closePopupBtn || !addHabitBtn || !newHabitForm) {
    console.error("One or more required elements are missing.");
    return;
  }
  // Open and close popup logic for the habit
  addHabitBtn.addEventListener("click", () =>
    popupOverlay.classList.remove("hidden"),
  );
  closePopupBtn.addEventListener("click", () =>
    popupOverlay.classList.add("hidden"),
  );
  // Close the popup when clicking outside the form
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) popupOverlay.classList.add("hidden");
  });

  /*// Logic for showing the pop up in the delete mode in the habit
  deleteAccountBtn.addEventListener("click", () => {
    deletePopupOverlay.classList.remove("hidden");
  });
  // Close pop-up when clicking outside the container
  deletePopupOverlay.addEventListener("click", (e) => {
    if (e.target === deletePopupOverlay) {
      deletePopupOverlay.classList.add("hidden");
    }
  });*/

  // Fetch and display habits
  try {
    const response = await fetch("dashboard/get-habit");
    if (!response.ok) throw new Error("Failed to fetch habits");

    const habits = await response.json();
    habits.forEach(addHabitToList);
  } catch (error) {
    console.error("Error fetching habits:", error);
  }

  // Add a new habit
  newHabitForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(newHabitForm);
    const habitData = Object.fromEntries(formData.entries());
    const mode = newHabitForm.getAttribute("data-mode");
    try {
      if (mode === "add") {
        const response = await fetch("dashboard/add-habit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(habitData),
        });
        if (!response.ok) throw new Error("Failed to add habit");

        const newHabit = await response.json();
        addHabitToList(newHabit);

        popupOverlay.classList.add("hidden");
        newHabitForm.reset();
      }
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  });
});
