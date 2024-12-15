function checkUserExistance() {
    document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get email and password from the form
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {

                console.log('Attempting to send POST request to /sign-in');
                const response = await fetch('/sign-in', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    console.error(`Server error: ${response.status}`);
                }

                console.log('POST request successful');
            // Handle the response
            if (response.status === 404) {
                console.log('User not found. Showing error pop-up.'); // Debug log
                document.getElementById('userNotExist').classList.add('d-block');
                document.getElementById('userNotExist').classList.remove('d-none');
            } else if (response.status === 200) {
                console.log('User found'); // Debug log
                // Sign-in successful, hide the error message if it's visible
                document.getElementById('userNotExist').classList.add('d-none');
                document.getElementById('userNotExist').classList.remove('d-block');

                // Redirect or perform additional actions on successful sign-in
                window.location.href = '/sign-in'; // Example redirection after success
            } else if (response.status === 401) {
                // Invalid credentials (wrong password)
                document.getElementById('userNotExist').classList.add('d-block');
                document.getElementById('userNotExist').classList.remove('d-none');
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

// Initialize the function
checkUserExistance();