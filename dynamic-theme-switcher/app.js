// 1. Select the key DOM elements
const toggleButton = document.querySelector('#theme-toggle');
const body = document.body;

// 2. Check for a previously saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');

// 3. Apply saved theme on page load if present
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  toggleButton.textContent = '☀️ Switch to Light Mode';
}

// 4. Add Click Event Listener
toggleButton.addEventListener('click', () => {
  // Toggle the 'dark-mode' class on the body tag
  body.classList.toggle('dark-mode');

  // Check if dark mode is active after toggle
  const isDarkMode = body.classList.contains('dark-mode');

  if (isDarkMode) {
    toggleButton.textContent = '☀️ Switch to Light Mode';
    localStorage.setItem('theme', 'dark'); // Save preference
  } else {
    toggleButton.textContent = '🌙 Switch to Dark Mode';
    localStorage.setItem('theme', 'light'); // Save preference
  }
});
