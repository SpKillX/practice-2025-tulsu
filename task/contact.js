// Связаться с нами
$(document).ready(function() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: $('#contactName').val(),
      email: $('#contactEmail').val(),
      phone: $('#contactPhone').val(),
      message: $('#contactMessage').val()
    };

    if (!validateContactForm(formData)) {
      return false;
    }

    const submitBtn = $(this).find('button[type="submit"]');
    const originalText = submitBtn.html();
    submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Sending...');

    $.ajax({
      url: 'send_contact.php', // Файл обработки на сервере
      type: 'POST',
      dataType: 'json',
      data: formData,
      success: function(response) {
        if (response.success) {
          showContactMessage('Your message has been sent successfully!', 'success');
          $('#contactForm')[0].reset();
        } else {
          showContactMessage(response.message || 'Error sending message. Please try again.', 'error');
        }
      },
      error: function() {
        showContactMessage('Connection error. Please try again later.', 'error');
      },
      complete: function() {
        submitBtn.prop('disabled', false).html(originalText);
      }
    });
  });

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
});