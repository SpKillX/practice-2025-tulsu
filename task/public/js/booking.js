$('#bookingForm').on('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      people: $('#people').val(),
      date: $('#date').val(),
      time: $('#time').val()
    };

    if (!validateForm(formData)) {
      return false;
    }

    const submitButton = $(this).find('button[type="submit"]');
    const originalButtonText = submitButton.text();
    submitButton.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Processing...');

    $.ajax({
      url: '/api/booking',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(formData),
      contentType: 'application/json',
      success: function(response) {
        if (response.success) {
          showMessage('Booking successful! We will contact you shortly.', 'success');
          $('#bookingForm')[0].reset();
        } else {
          showMessage(response.message || 'Error occurred. Please try again.', 'error');
        }
      },
      error: function() {
        showMessage('Connection error. Please try again later.', 'error');
      },
      complete: function() {
        submitButton.prop('disabled', false).text(originalButtonText);
      }
    });
  });

  function validateForm(data) {
    $('#messageContainer').empty();
    let isValid = true;

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

  function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.textContent = message;
    $('#messageContainer').append(messageDiv);
    
    setTimeout(() => {
      $(messageDiv).css('opacity', '0');
      setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
  }
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }