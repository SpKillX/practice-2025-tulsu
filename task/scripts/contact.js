console.log("JS is loaded");
$(document).ready(function() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: $('#contactName').val(),
      email: $('#contactEmail').val(),
      phone: $('#contactPhone').val(),
      message: $('#contactMessage').val()
    };

    if (!validateForm(formData)) {
      return false;
    }

    const submitButton = $(this).find('button[type="submit"]');
    const originalButtonText = submitButton.text();
    submitButton.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Processing...');

    $.ajax({
      url: '/api/contact',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(formData),
      contentType: 'application/json',
      success: function(response) {
        if (response.success) {
          showMessage('Booking successful! We will contact you shortly.', 'success');
          $('#contactForm')[0].reset();
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

