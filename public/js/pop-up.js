document.addEventListener('DOMContentLoaded', () => {
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

            if (!response.ok)  new Error('Failed to add habit');

            // Get the newly created habit
            const newHabit = await response.json();

            // Add the habit to the "Today's Habits" list
            addHabitToList(newHabit);

            // Reset the form and close the pop-up
            newHabitForm.reset();
            popupOverlay.classList.add('hidden');
        }catch (error) {
            console.error('Error:', error);
            alert('Failed to add habit. Please try again.');
        }
    });


    // Function to add a habit to the list dynamically
    function addHabitToList(habit) {
        const li = document.createElement('li');
        li.classList.add('habit-item');
        li.innerHTML = `
        <div class="habit-content">
          <img class="habit-icon" src="../public/img/svg/habit-icon.svg" alt="Icon">
          <div class="habit-details">
            <span class="habit-title">${habit.name}</span>
            <span class="habit-time">At ${habit.time}</span>
          </div>
        </div>
        <select class="habit-status">
          <option value="to-do" ${habit.progress === 0 ? 'selected' : ''}>TO-DO</option>
          <option value="done" ${habit.progress === 100 ? 'selected' : ''}>Done</option>
          <option value="not-done" ${habit.progress !== 100 && habit.progress !== 0 ? 'selected' : ''}>Not done</option>
        </select>
      `;
        habitList.appendChild(li);
    }
});