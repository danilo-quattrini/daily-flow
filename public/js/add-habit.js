import { deleteHabit, openEditPopup } from "./del-edit.js";

function addHabitToList(habit) {
  const habitList = document.querySelector(".habit-list");
  if (!habitList) {
    console.error("Habit list element is missing.");
    return;
  }
  // Check if the habit already exists in the list
  let habitItem = document.querySelector(`.habit-item[data-id="${habit.id}"]`);

  if (habitItem) {
    // Update existing habit DOM element (edit case)
    habitItem.querySelector(".habit-title").textContent = habit.name;
    habitItem.querySelector(".habit-time").textContent =
      `Started At ${habit.time}`;
    habitItem.querySelector(".habit-status-text").textContent =
      habit.progress === 100
        ? "Status: Done"
        : habit.progress > 0
          ? "Status: In Progress"
          : "Status: Not done";
  } else {
    // Create a new habit DOM element (add case)
    habitItem = document.createElement("li");
    habitItem.setAttribute("data-id", habit.id);
    habitItem.classList.add("habit-item");

    // Format the date to "day-month-year"
    const formattedDate = new Date(habit.time).toLocaleDateString("en-GB");

    habitItem.innerHTML = `
             <div class="habit-content">
                <div class="habit-details">
                    <span class="habit-title">${habit.name}</span>
                    <span class="habit-time">Started At: ${formattedDate} - Status: ${
                      habit.progress === 100
                        ? "Done"
                        : habit.progress > 0
                          ? "In Progress"
                          : "Not done"
                    }</span>
                </div>
            </div>
            <div class="habit-buttons">
                <button class="habit-delete-button"><img src="../public/img/svg/delete.svg" alt="Delete"/></button>
                <button class="habit-edit-button"><img src="../public/img/svg/edit.svg" alt="Edit"/></button>
            </div>
        `;
    habitList.appendChild(habitItem);

    // Attach event listeners
    habitItem
      .querySelector(".habit-delete-button")
      .addEventListener("click", () => deleteHabit(habit.id));
    habitItem
      .querySelector(".habit-edit-button")
      .addEventListener("click", () => openEditPopup(habit));
  }
}

export default addHabitToList;
