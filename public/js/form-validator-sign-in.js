document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-button');

    // Function to validate the form
    function validateForm() {
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        if (emailValue === '' || passwordValue === '') {
            submitButton.setAttribute('disabled', 'true');
        } else {
            submitButton.removeAttribute('disabled');
        }
    }

    // Validate on page load (to handle autofill)
    validateForm();

    // Add event listeners for input and change events
    emailInput.addEventListener('input', validateForm);
    emailInput.addEventListener('change', validateForm);
    passwordInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('change', validateForm);
});