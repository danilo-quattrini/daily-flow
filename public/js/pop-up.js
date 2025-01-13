import addHabitToList from './add-habit.js';

document.addEventListener('DOMContentLoaded', async () => {
    const popupOverlay = document.querySelector('.popup-overlay');
    const closePopupBtn = document.querySelector('.close-popup');
    const addHabitBtn = document.querySelector('.add-habit-button');
    const newHabitForm = document.getElementById('newHabitForm');

    if (!popupOverlay || !closePopupBtn || !addHabitBtn || !newHabitForm) {
        console.error('One or more required elements are missing.');
        return;
    }

    // Open and close popup logic
    addHabitBtn.addEventListener('click', () => popupOverlay.classList.remove('hidden'));
    closePopupBtn.addEventListener('click', () => popupOverlay.classList.add('hidden'));

    // Fetch and display habits
    try {
        const response = await fetch('dashboard/get-habit');
        if (!response.ok) throw new Error('Failed to fetch habits');

        const habits = await response.json();
        habits.forEach(addHabitToList);
    } catch (error) {
        console.error('Error fetching habits:', error);
    }

    // Add a new habit
    newHabitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(newHabitForm);
        const habitData = Object.fromEntries(formData.entries());
        const mode = newHabitForm.getAttribute('data-mode');
        try {
            if (mode === 'add') {
                const response = await fetch('dashboard/add-habit', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(habitData),
                });
                if (!response.ok) throw new Error('Failed to add habit');

                const newHabit = await response.json();
                addHabitToList(newHabit);

                popupOverlay.classList.add('hidden');
                newHabitForm.reset();
            }
        } catch (error) {
            console.error('Error adding habit:', error);
        }
    });
});