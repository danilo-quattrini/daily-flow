// Initiate the form fields
const emailValue = document.getElementById('email').value;
const passwordValue = document.getElementById('password').value;
// Select the form
const form = document.querySelector('form');

// Add event listener to check fields on input change
form.addEventListener('input', function () {
    // Check if email and password fields are not empty
    if (emailValue === '' || passwordValue === '') {
        document.getElementById('submit-button').removeAttribute('disabled');
    }else if (emailValue !== '' && passwordValue !== '') {
        document.getElementById('submit-button').setAttribute('disabled', 'true');
    }
});