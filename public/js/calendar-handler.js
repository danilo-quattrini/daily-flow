function generateCalendar(year, month) {
  const calendarTableBody = document.querySelector(".calendar-table tbody");
  calendarTableBody.innerHTML = ""; // Clear previous calendar content

  // Get the first and last day of the month
  const firstDay = new Date(year, month, 1).getDay(); // Day of the week (0 = Sunday)
  const lastDate = new Date(year, month + 1, 0).getDate(); // Last day of the month

  let currentDay = 1;
  let rows = "";

  // Create rows for the calendar
  for (let week = 0; week < 6; week++) {
    let row = "<tr>";

    // Loop through each day of the week (0 = Sunday, 6 = Saturday)
    for (let day = 0; day < 7; day++) {
      if (week === 0 && day < firstDay) {
        // Add blank cells for days before the 1st
        row += '<td class="blank"></td>';
      } else if (currentDay > lastDate) {
        // Add blank cells after the last day
        row += '<td class="blank"></td>';
      } else {
        // Add the actual day number
        row += `<td>${currentDay}</td>`;
        currentDay++;
      }
    }

    row += "</tr>";
    rows += row;

    // Stop adding rows if we've reached the end of the month
    if (currentDay > lastDate) break;
  }

  // Add the rows to the calendar body
  calendarTableBody.innerHTML = rows;
}

// Initialize the calendar with the current month and year
const today = new Date();
generateCalendar(today.getFullYear(), today.getMonth());

//Script for handle the month of the calendar
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

// Update the calendar when navigating months
function updateCalendar() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById("monthYear").textContent =
    `${monthNames[currentMonth]} ${currentYear}`;
  generateCalendar(currentYear, currentMonth);
}

document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11; // December
    currentYear--;
  }
  updateCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0; // January
    currentYear++;
  }
  updateCalendar();
});

// Initialize the calendar
updateCalendar();
