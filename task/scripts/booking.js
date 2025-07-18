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

  $('#loginBtn').click(function() {
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();
    
    if (!email || !password) {
      showAuthMessage('Please fill all fields', 'error');
      return;
    }
    
    $.ajax({
      url: '/api/login',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ email: email, password: password }),
      contentType: 'application/json',
      success: function(response) {
        if (response.success) {
          showAuthMessage('Login successful!', 'success');
          setTimeout(() => {
            $('#authModal').fadeOut();
            location.reload();
          }, 1000);
        } else {
          showAuthMessage(response.message || 'Login failed', 'error');
        }
      }
    });
  });

  $('#registerBtn').click(function() {
    const name = $('#regName').val();
    const email = $('#regEmail').val();
    const phone = $('#regPhone').val();
    const password = $('#regPassword').val();
    const confirm = $('#regConfirm').val();
    
    if (!name || !email || !phone || !password || !confirm) {
      showAuthMessage('Please fill all fields', 'error');
      return;
    }
    
    if (password !== confirm) {
      showAuthMessage('Passwords do not match', 'error');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAuthMessage('Please enter a valid email address', 'error');
      return;
    }
    
    if (!/^[\d\s\-+]{10,15}$/.test(phone)) {
      showAuthMessage('Please enter a valid phone number', 'error');
      return;
    }
    
    const btn = $(this);
    const originalText = btn.html();
    btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Registering...');
    
    $.ajax({
      url: '/api/register',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password
      }),
      contentType: 'application/json',
      success: function(response) {
        if (response.success) {
          showAuthMessage('Registration successful! Please login.', 'success');
          $('#regName, #regEmail, #regPhone, #regPassword, #regConfirm').val('');
          showForm('loginForm');
        } else {
          showAuthMessage(response.message || 'Registration failed', 'error');
        }
      },
      error: function() {
        showAuthMessage('Connection error. Please try again later.', 'error');
      },
      complete: function() {
        btn.prop('disabled', false).html(originalText);
      }
    });
  });

  // Keep existing validation and message functions
  function validateContactForm(data) {
    $('#contactMessageContainer').empty();
    let isValid = true;

    if (!data.name.trim()) {
      showContactMessage('Please enter your name', 'error');
      isValid = false;
    }

    if (!data.email.trim()) {
      showContactMessage('Please enter your email', 'error');
      isValid = false;
    } else if (!isValidEmail(data.email)) {
      showContactMessage('Please enter a valid email address', 'error');
      isValid = false;
    }

    if (!data.message.trim()) {
      showContactMessage('Please enter your message', 'error');
      isValid = false;
    }

    return isValid;
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showContactMessage(message, type) {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    $('#contactMessageContainer').html(`<div class="alert ${alertClass}">${message}</div>`);
    
    setTimeout(() => {
      $('#contactMessageContainer').fadeOut(500, function() {
        $(this).empty().show();
      });
    }, 5000);
  }

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
});
