$(document).ready(function() {
  $('.nav-link[href="#login"]').click(function(e) {
    e.preventDefault();
    $('#authModal').fadeIn();
    showForm('loginForm');
  });
  
  $('.auth-close').click(function() {
    $('#authModal').fadeOut();
  });
  
  $('#showRegister').click(function(e) {
    e.preventDefault();
    showForm('registerForm');
  });
  
  $('#showLogin').click(function(e) {
    e.preventDefault();
    showForm('loginForm');
  });
  
  $('#showForgot').click(function(e) {
    e.preventDefault();
    showForm('forgotForm');
  });
  
  $('#showLoginFromForgot').click(function(e) {
    e.preventDefault();
    showForm('loginForm');
  });
  
  // Обработка входа
  $('#loginBtn').click(function() {
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();
    
    if (!email || !password) {
      showAuthMessage('Please fill all fields', 'error');
      return;
    }
    
    $.ajax({
      url: 'auth.php?action=login',
      type: 'POST',
      dataType: 'json',
      data: {
        email: email,
        password: password
      },
      success: function(response) {
        if (response.success) {
          showAuthMessage('Login successful!', 'success');
          setTimeout(() => {
            $('#authModal').fadeOut();
            location.reload(); // Обновляем страницу после входа
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
    url: 'auth.php?action=register',
    type: 'POST',
    dataType: 'json',
    data: {
      name: name,
      email: email,
      phone: phone,
      password: password
    },
    success: function(response) {
      if (response.success) {
        showAuthMessage('Registration successful! Please login.', 'success');
        // Очищаем форму и переключаем на вход
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
  
  $('#sendCodeBtn').click(function() {
    const email = $('#forgotEmail').val();
    
    if (!email) {
      showAuthMessage('Please enter your email', 'error');
      return;
    }
    
    $.ajax({
      url: 'auth.php?action=send_code',
      type: 'POST',
      dataType: 'json',
      data: {
        email: email
      },
      success: function(response) {
        if (response.success) {
          showAuthMessage('Verification code sent to your email', 'success');
          $('#codeForm').data('email', email);
          showForm('codeForm');
        } else {
          showAuthMessage(response.message || 'Error sending code', 'error');
        }
      }
    });
  });
  
  $('#verifyCodeBtn').click(function() {
    const code = $('#verifyCode').val();
    const email = $('#codeForm').data('email');
    
    if (!code) {
      showAuthMessage('Please enter the code', 'error');
      return;
    }
    
    $.ajax({
      url: 'auth.php?action=verify_code',
      type: 'POST',
      dataType: 'json',
      data: {
        email: email,
        code: code
      },
      success: function(response) {
        if (response.success) {
          showForm('newPasswordForm');
          $('#newPasswordForm').data('email', email);
        } else {
          showAuthMessage(response.message || 'Invalid code', 'error');
        }
      }
    });
  });
  
  $('#savePasswordBtn').click(function() {
    const email = $('#newPasswordForm').data('email');
    const password = $('#newPassword').val();
    const confirm = $('#confirmNewPassword').val();
    
    if (!password || !confirm) {
      showAuthMessage('Please fill all fields', 'error');
      return;
    }
    
    if (password !== confirm) {
      showAuthMessage('Passwords do not match', 'error');
      return;
    }
    
    $.ajax({
      url: 'auth.php?action=reset_password',
      type: 'POST',
      dataType: 'json',
      data: {
        email: email,
        password: password
      },
      success: function(response) {
        if (response.success) {
          showAuthMessage('Password changed successfully! Please login.', 'success');
          showForm('loginForm');
        } else {
          showAuthMessage(response.message || 'Error changing password', 'error');
        }
      }
    });
  });
  
  function showForm(formId) {
    $('.auth-form').hide();
    $('#' + formId).show();
    $('#authMessage').hide();
  }
  
  function showAuthMessage(message, type) {
    const $msg = $('#authMessage');
    $msg.removeClass('success error').addClass(type).text(message).fadeIn();
    setTimeout(() => $msg.fadeOut(), 5000);
  }
});
