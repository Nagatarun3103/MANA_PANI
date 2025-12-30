
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple validation for demonstration
        if (email === 'test@example.com' && password === 'password') {
            alert('Login successful!');
            // Redirect to a new page or dashboard
            // window.location.href = '/dashboard.html';
        } else {
            // Create and display an error message
            const errorElement = document.createElement('p');
            errorElement.textContent = 'Invalid username or password for the selected role.';
            errorElement.className = 'text-red-500 text-center';
            
            // Remove any existing error message before adding a new one
            const existingError = form.querySelector('.text-red-500');
            if (existingError) {
                existingError.remove();
            }
            
            form.insertBefore(errorElement, form.querySelector('button[type="submit"]'));
        }
    });
});
