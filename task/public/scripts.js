$(document).ready(function() {

  

 

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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

    $.ajax({
        url: '/api/events',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success && response.data.length > 0) {
                const $eventsPair = $('.events__pair');
                $eventsPair.empty();
                response.data.forEach((item, index) => {
                    const position = index % 2 === 0 ? 'left' : 'right';
                    $eventsPair.append(`
                        <div class="events__card">
                            <div class="events__image-container events__image-container--${position}">
                                <img src="${item.image}" class="events__image" alt="${item.title}">
                            </div>
                            <div class="events__label-box events__label-box--${position}">
                                <p class="events__label events__label--${item.title.toLowerCase().replace(' ', '-')}">${item.title}</p>
                            </div>
                            <div class="events__square events__square--${position}"></div>
                        </div>
                    `);
                });
            }
        },
        error: function() {
            console.error('Error loading Private Events data');
        }
    });


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
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        myMap.behaviors.disable('scrollZoom');
      }
    }


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
  

  function showForm(formId) {
    $('.auth-form').hide();
    $('#' + formId).show();
    $('#authMessage').hide();
  }
  
  
});
  });