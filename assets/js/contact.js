const form = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');

form.addEventListener('input', () => {
  const isFormValid = form.checkValidity();
  submitButton.disabled = !isFormValid;
});