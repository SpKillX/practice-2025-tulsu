// Booking
  document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('bookingForm');
  const messageContainer = document.getElementById('messageContainer');

  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      people: document.getElementById('people').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value
    };

    if (!validateForm(formData)) {
      return false;
    }
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    fetch('book_table.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showMessage('Booking successful! We will contact you shortly.', 'success');
        bookingForm.reset();
      } else {
        showMessage(data.message || 'Error occurred. Please try again.', 'error');
      }
    })
    .catch(error => {
      showMessage('Connection error. Please try again later.', 'error');
      console.error('Error:', error);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    });
  });

  function validateForm(data) {
    let isValid = true;
    messageContainer.innerHTML = '';

    if (!data.name.trim()) {
      showMessage('Please enter your name', 'error');
      isValid = false;
    }

    if (!data.email.trim()) {
      showMessage('Please enter your email', 'error');
      isValid = false;
    } else if (!isValidEmail(data.email)) {
      showMessage('Please enter a valid email address', 'error');
      isValid = false;
    }

    return isValid;
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
  }
});