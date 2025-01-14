export async function deleteHabit(habitId) {
  if (!confirm("Are you sure you want to delete this habit?")) return;

  try {
    const response = await fetch(`dashboard/delete-habit/${habitId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitId }),
    });
    if (!response.ok) throw new Error("Failed to delete habit");
    console.log("Delete response:", response);

    document.querySelector(`.habit-item[data-id="${habitId}"]`)?.remove();
    alert("Habit deleted successfully.");
  } catch (error) {
    console.error("Error deleting habit:", error);
    alert("Failed to delete habit. Please try again.");
  }
}

export function openEditPopup(habit) {
  const popupOverlay = document.querySelector(".popup-overlay");
  const newHabitForm = document.getElementById("newHabitForm");
  const popupTitle = popupOverlay.querySelector("h1");
  const submitButton = document.querySelector(".submit-button");
  const cancelButton = document.querySelector(".close-popup");

  if (
    !popupOverlay ||
    !newHabitForm ||
    !popupTitle ||
    !submitButton ||
    !cancelButton
  ) {
    console.error("Popup elements are missing.", {
      popupOverlay,
      newHabitForm,
      popupTitle,
      submitButton,
      cancelButton,
    });
    return;
  }

  // Open the popup with updated content
  popupOverlay.classList.remove("hidden");
  popupTitle.textContent = "Edit Habit";
  submitButton.textContent = "Edit";
  cancelButton.textContent = "Cancel";
  newHabitForm.setAttribute("data-mode", "edit");

  // Pre-fill the form
  newHabitForm.habitName.value = habit.name;
  newHabitForm.habitFrequency.value = habit.frequency;
  newHabitForm.startDate.value = habit.time;
  newHabitForm.progress.value = habit.progress;

  // Attach a custom editing ID
  newHabitForm.setAttribute("data-editing-id", habit.id);

  // Modify the form submit behavior for editing
  newHabitForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(newHabitForm);
    const updatedHabitData = Object.fromEntries(formData.entries());
    const mode = newHabitForm.getAttribute("data-mode");
    try {
      // Update the habit only if is in the edit mode (not in the add mode)
      if (mode === "edit") {
        const response = await fetch(`dashboard/update-habit/${habit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedHabitData),
        });
        if (!response.ok) throw new Error("Failed to update habit");

        const habitItem = document.querySelector(
          `.habit-item[data-id="${habit.id}"]`,
        );
        if (habitItem) {
          habitItem.querySelector(".habit-title").textContent =
            updatedHabitData.name;
          habitItem.querySelector(".habit-time").textContent =
            `Started At ${updatedHabitData.time}`;
        }

        popupOverlay.classList.add("hidden");
        newHabitForm.reset();
      }
    } catch (error) {
      console.error("Error updating habit:", error);
      alert("Failed to update habit. Please try again.");
    }
  };
}
