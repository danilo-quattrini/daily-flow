import { deleteHabit, /*openEditPopup*/ } from './del-edit.js';

function addHabitToList(habit) {
    const habitList = document.querySelector('.habit-list');
    if (!habitList) {
        console.error('Habit list element is missing.');
        return;
    }

    const li = document.createElement('li');
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
            <button class="habit-edit-button"><img src="../public/img/svg/edit.svg" alt="Edit"/></button>
        </div>
    `;
    habitList.appendChild(li);

    li.querySelector('.habit-delete-button').addEventListener('click', () => deleteHabit(habit.id));
    /*li.querySelector('.habit-edit-button').addEventListener('click', () => openEditPopup(habit));*/
}

export default addHabitToList;