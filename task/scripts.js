// Соц. сети
   document.addEventListener('DOMContentLoaded', function() {
   const socialLinks = document.querySelectorAll('.social__link');
  
   socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
           const icon = this.querySelector('i');
      let socialUrl;
      
      switch(icon.classList[1]) {
        case 'fa-facebook-f':
          socialUrl = 'https://facebook.com';
          break;
        case 'fa-twitter':
          socialUrl = 'https://twitter.com';
          break;
        case 'fa-instagram':
          socialUrl = 'https://instagram.com';
          break;
        default:
          socialUrl = 'https://example.com';
      }
      
          window.open(socialUrl, '_blank');
    });
  });
});


       window.addEventListener('scroll', function() {
      const header = document.getElementById('main-header');
      const scrollY = window.scrollY;
      
      if (window.innerWidth > 992) {
        header.classList.toggle('header--fixed', scrollY > 50);
      } else {
        header.classList.toggle('header--scrolled', scrollY > 20);
      }
    });
    
      const navbarToggler = document.querySelector('.navbar-toggler');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const body = document.body;
    
    navbarToggler.addEventListener('click', function() {
      mobileBackdrop.classList.toggle('show');
      body.classList.toggle('mobile-menu-open');
    });
    
    mobileBackdrop.addEventListener('click', function() {
      this.classList.remove('show');
      body.classList.remove('mobile-menu-open');
      const navbarCollapse = document.querySelector('.navbar-collapse.show');
      if (navbarCollapse) navbarToggler.click();
    });
    
       document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
          mobileBackdrop.classList.remove('show');
          body.classList.remove('mobile-menu-open');
          document.querySelector('.navbar-toggler').click();
        }
      });
    });
    
      document.querySelector('.hero__scroll-circle').addEventListener('click', function() {
      window.scrollBy({
        top: window.innerHeight - 100,
        behavior: 'smooth'
      });
    });
    
       document.addEventListener('DOMContentLoaded', function() {
      
      const navLinks = document.querySelectorAll('.menu__nav-link');
      const menuSections = document.querySelectorAll('.menu__section');
      

      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
                    navLinks.forEach(l => l.classList.remove('menu__nav-link--active'));
          menuSections.forEach(s => s.classList.remove('menu__section--active'));
          
          this.classList.add('menu__nav-link--active');
          
          
          const sectionId = this.getAttribute('data-section');
          document.getElementById(sectionId).classList.add('menu__section--active');
        });
      });
    });

   ymaps.ready(init);
    
    function init() {
      var myMap = new ymaps.Map("map", {
        center: [54.183528, 37.611320],
        zoom: 16,
        controls: ['zoomControl']
      });
      var myPlacemark = new ymaps.Placemark([54.183528, 37.611320], {
        hintContent: 'Hungry People Restaurant',
        balloonContent: 'Россия, г. Тула, ул. Тургеньевская, д. 69'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40]
      });
      
      myMap.geoObjects.add(myPlacemark);
      // Disable scroll zoom on mobile
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        myMap.behaviors.disable('scrollZoom');
      }
    }

// Якорные ссылки для навигации
	document.addEventListener('DOMContentLoaded', function() {
   document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
          
          
          if (window.innerWidth <= 992) {
            document.getElementById('mobileBackdrop').classList.remove('show');
            document.body.classList.remove('mobile-menu-open');
            document.querySelector('.navbar-toggler').click();
          }
        }
      }
    });
  });

  
  document.querySelector('.hero__btn--primary').addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector('#booking');
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });

  
  document.querySelector('.hero__btn--secondary').addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector('#specialties');
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });

  
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Здесь можно добавить код для отправки формы
      alert('Your message has been sent!');
      this.reset();
    });
  }
});


window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = '#' + section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentSection) {
      link.classList.add('active');
    }
  });
});

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

// Карусель (без Slick Carousel, т. к. ломается вёрстка)
    document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let interval;

    function goToSlide(index) {
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.display = 'none';
        });
        
        items[index].style.display = 'block';
        setTimeout(() => {
            items[index].style.opacity = '1';
        }, 10);
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentIndex = index;
    }

    function startAutoPlay() {
        interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % items.length;
            goToSlide(nextIndex);
        }, 3000);
    }

    function initCarousel() {
        // Скрываем все слайды кроме первого
        items.forEach((item, index) => {
            item.style.transition = 'opacity 0.5s ease';
            if (index !== 0) {
                item.style.display = 'none';
                item.style.opacity = '0';
            } else {
                item.style.display = 'block';
                item.style.opacity = '1';
            }
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(interval);
                goToSlide(index);
                startAutoPlay();
            });
        });
        
        startAutoPlay();
    }

    initCarousel();
});

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
