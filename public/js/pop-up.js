// Function to add a habit to the list dynamically
function addHabitToList(habit) {
    const habitList = document.querySelector('.habit-list'); // Select habit list
    if (!habitList) {
        console.error('Habit list element is missing.');
        return;
    }

    const li = document.createElement('li');
    // Attach the habit ID for future reference
    li.setAttribute('data-id', habit.id);
    li.classList.add('habit-item');
    li.innerHTML = `
    <div class="habit-content">
      <img class="habit-icon" src="../public/img/svg/habit-icon.svg" alt="Icon">
      <div class="habit-details">
        <span class="habit-title">${habit.name}</span>
        <span class="habit-time">Started At ${habit.time}</span>
      </div>
    </div>
    <select class="habit-status">
      <option value="to-do" ${habit.progress > 0 ? 'selected' : ''}>TO-DO</option>
      <option value="done" ${habit.progress === 100 ? 'selected' : ''}>Done</option>
      <option value="not-done" ${habit.progress !== 100 && habit.progress !== 0 ? 'selected' : ''}>Not done</option>
    </select>
    <div class="habit-buttons">
        <button class="habit-delete-button"><img src="../public/img/svg/delete.svg" alt="Delete"/></button>
        <button class="habit-edit-button"><img src="../public/img/svg/edit.svg" alt="Edit button"/></button>
    </div>
  `;
    habitList.appendChild(li);
    li.querySelector('.habit-delete-button').addEventListener('click', () => deleteHabit(habit.id));
    li.querySelector('.habit-edit-button').addEventListener('click', () => updateHabit(habit));
}

document.addEventListener('DOMContentLoaded', async () => {
    const popupOverlay = document.querySelector('.popup-overlay');
    const closePopupBtn = document.querySelector('.close-popup');
    const addHabitBtn = document.querySelector('.add-habit-button'); // Trigger button
    const newHabitForm = document.getElementById('newHabitForm');
    const habitList = document.querySelector('.habit-list'); // Select habit list

    if (!popupOverlay || !closePopupBtn || !addHabitBtn || !newHabitForm || !habitList) {
        console.error('One or more required elements are missing.');
        return;
    }

    // Open the popup
    addHabitBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('hidden');
    });

    // Close the popup
    closePopupBtn.addEventListener('click', () => {
        popupOverlay.classList.add('hidden');
    });

    // Form submission
    newHabitForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(newHabitForm);
        const habitData = Object.fromEntries(formData.entries());

        console.log('Habit data to submit:', habitData);
        try {
            // Fetch API to send data to the backend
            const response = await fetch('/add-habit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(habitData),
            });

            if (!response.ok) throw new Error('Failed to add habit');

            // Get the newly created habit
            const newHabit = await response.json();

            // Add the habit to the "Today's Habits" list
            addHabitToList(newHabit);

            // Reset the form and close the pop-up
            newHabitForm.reset();
            popupOverlay.classList.add('hidden');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add habit. Please try again.');
        }
    });

    // Fetch habits for the logged-in user
    try {
        console.log('Fetching habits...');
        const response = await fetch('/get-habit');
        if (!response.ok) {
            console.error('Failed to fetch habits:', response.statusText);
            throw new Error('Failed to fetch habits');
        }

        const habits = await response.json();
        console.log('Habits fetched:', habits);

        if (!Array.isArray(habits) || habits.length === 0) {
            console.log('No habits found for the user.');
            return;
        }

        habits.forEach(addHabitToList);
    } catch (error) {
        console.error('Error loading habits:', error);
        alert('Failed to load habits. Please try again.');
    }
});